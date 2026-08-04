'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma, OrderStatus, PaymentStatus } from "@prisma/client";
import { sendOrderConfirmationEmail, sendAdminOrderNotification } from "@/lib/mail";
import { getShippingCost } from "./shipping";
import { requireAdmin } from "@/lib/auth";
import { createOrderSchema, CreateOrderInput } from "@/lib/validations";
import { rateLimit } from "@/lib/rate-limit";

// Rate limit: 10 orders per email per hour
const ORDER_MAX_PER_HOUR = 10;
const ORDER_WINDOW_MS = 60 * 60 * 1000; // 1 hour

export async function createOrder(rawData: unknown) {
    // Validate input with Zod
    const parsed = createOrderSchema.safeParse(rawData);
    if (!parsed.success) {
        return { success: false, error: parsed.error.issues[0]?.message || "Datos inválidos" };
    }
    const data = parsed.data;

    // Rate limiting by customer email
    const { allowed } = await rateLimit(
        `order:${data.customerEmail.toLowerCase()}`,
        ORDER_MAX_PER_HOUR,
        ORDER_WINDOW_MS
    );
    if (!allowed) {
        return { success: false, error: "Has realizado demasiados pedidos. Intenta de nuevo más tarde." };
    }

    try {
        const { items, customerName, customerEmail, customerPhone, shippingAddress, paymentToken } = data;

        // 1. Fetch products to get real prices and check stock
        const productIds = items.map((item: { id: string }) => item.id);
        const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
            include: { images: true }
        });

        // 2. Validate stock and calculate totals
        let subtotal = 0;
        const orderItemsData: any[] = [];

        for (const item of items) {
            const product = products.find((p: any) => p.id === item.id);

            if (!product) {
                return { success: false, error: `Producto con ID ${item.id} no encontrado` };
            }

            if (product.manageInventory && product.stockQuantity < item.quantity) {
                return { success: false, error: `Stock insuficiente para ${product.name}` };
            }

            const price = Number(product.price);
            const itemSubtotal = price * item.quantity;
            subtotal += itemSubtotal;

            orderItemsData.push({
                productId: product.id,
                quantity: item.quantity,
                price: price, // Store as number, Prisma handles Decimal conversion if schema matches
                subtotal: itemSubtotal,
                productSnapshot: {
                    name: product.name,
                    slug: product.slug,
                    image: product.images && product.images.length > 0 ? product.images[0].url : null,
                }
            });
        }

        // Calculate Shipping based on Department
        const department = shippingAddress?.department || 'Lima';
        const shippingCost = await getShippingCost(department);

        const total = subtotal + shippingCost;

        // 3. Create Order Transaction
        let order;
        try {
            order = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
                // Generate order number (simple timestamp based for MVP)
                const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

                // Create Order
                const newOrder = await tx.order.create({
                    data: {
                        orderNumber,
                        customerName,
                        customerEmail,
                        customerPhone,
                        shippingAddress,
                        status: 'PENDING',
                        paymentStatus: 'PENDING',
                        shippingCost,
                        subtotal,
                        discount: 0,
                        total,
                        paymentMethod: paymentToken ? 'Card' : 'Other',
                        items: {
                            create: orderItemsData.map((item: any) => ({
                                productId: item.productId,
                                quantity: item.quantity,
                                price: item.price,
                                subtotal: item.subtotal,
                                productSnapshot: item.productSnapshot
                            }))
                        }
                    }
                });

                // Update stock atomically: the `gte` guard means concurrent orders for
                // the same product can't both succeed if only one has stock left — the
                // loser's updateMany affects 0 rows and we roll back the whole order.
                for (const item of items) {
                    const product = products.find((p: any) => p.id === item.id);
                    if (product && product.manageInventory) {
                        const result = await tx.product.updateMany({
                            where: { id: item.id, stockQuantity: { gte: item.quantity } },
                            data: { stockQuantity: { decrement: item.quantity } }
                        });
                        if (result.count === 0) {
                            throw new Error(`STOCK_INSUFFICIENT:${product.name}`);
                        }
                    }
                }

                return newOrder;
            });
        } catch (txError) {
            const message = txError instanceof Error ? txError.message : '';
            if (message.startsWith('STOCK_INSUFFICIENT:')) {
                return { success: false, error: `Stock insuficiente para ${message.split(':')[1]}` };
            }
            throw txError;
        }

        // 4. Process Payment if Token exists
        if (paymentToken) {
            const { createCharge } = await import("@/lib/culqi"); // Dynamic import to avoid cycles if any
            const chargeResult = await createCharge(paymentToken, total, customerEmail);

            if (chargeResult.success) {
                await prisma.order.update({
                    where: { id: order.id },
                    data: { paymentStatus: 'PAID', status: 'PROCESSING' } // Auto-advance status if paid
                });
            } else {
                // Payment failed: release the stock that was reserved above so it
                // isn't permanently lost on a declined card.
                await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
                    await tx.order.update({
                        where: { id: order.id },
                        data: { paymentStatus: 'FAILED' }
                    });
                    for (const item of items) {
                        const product = products.find((p: any) => p.id === item.id);
                        if (product && product.manageInventory) {
                            await tx.product.update({
                                where: { id: item.id },
                                data: { stockQuantity: { increment: item.quantity } }
                            });
                        }
                    }
                });
                return { success: false, error: `Error en el pago: ${chargeResult.error}`, orderId: order.id };
            }
        }

        revalidatePath('/admin/pedidos');

        // 5. Send Email Notifications (Don't await to avoid slowing down the response)
        // Note: For critical systems, consider a background job or at least catching errors
        const fullOrder = await prisma.order.findUnique({
            where: { id: order.id },
            include: { items: true }
        });

        if (fullOrder) {
            sendOrderConfirmationEmail(
                fullOrder.customerEmail,
                fullOrder.customerName,
                fullOrder.orderNumber,
                Number(fullOrder.total),
                fullOrder.items
            ).catch(err => console.error("Error in background email confirmation:", err));

            sendAdminOrderNotification(
                fullOrder.orderNumber,
                fullOrder.customerName,
                Number(fullOrder.total)
            ).catch(err => console.error("Error in background admin notification:", err));
        }

        return { success: true, orderId: order.id, orderNumber: order.orderNumber };

    } catch (error) {
        console.error("Error creating order:", error);
        return { success: false, error: "Error al procesar el pedido" };
    }
}

export async function getOrders(limit = 10, offset = 0) {
    const auth = await requireAdmin();
    if (!auth.authorized) return { success: false, error: auth.error };

    try {
        const orders = await prisma.order.findMany({
            take: limit,
            skip: offset,
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { items: true }
                }
            }
        });

        const serializedOrders = orders.map((order: any) => ({
            ...order,
            total: Number(order.total),
            subtotal: Number(order.subtotal),
            shippingCost: Number(order.shippingCost),
            discount: Number(order.discount)
        }));

        return { success: true, orders: serializedOrders };
    } catch (error) {
        console.error("Error fetching orders:", error);
        return { success: false, error: "Error al obtener pedidos" };
    }
}

// Public — no auth (the customer just placed the order and has no account).
// Only select what the public confirmation page actually shows: phone,
// shipping address and internal order fields stay out of this response.
export async function getCustomerOrderById(id: string) {
    try {
        const order = await prisma.order.findUnique({
            where: { id },
            select: {
                orderNumber: true,
                customerName: true,
                customerEmail: true,
                createdAt: true,
                total: true,
                items: {
                    select: {
                        id: true,
                        quantity: true,
                        subtotal: true,
                        productSnapshot: true,
                    }
                }
            }
        });

        if (!order) return { success: false, error: "Pedido no encontrado" };

        const serializedOrder = {
            ...order,
            total: Number(order.total),
            items: order.items.map((item) => ({
                ...item,
                subtotal: Number(item.subtotal),
            }))
        };

        return { success: true, order: serializedOrder };
    } catch (error) {
        console.error("Error fetching customer order:", error);
        return { success: false, error: "Error al obtener el pedido" };
    }
}

export async function getOrderById(id: string) {
    const auth = await requireAdmin();
    if (!auth.authorized) return { success: false, error: auth.error };

    try {
        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: {
                            include: {
                                images: true
                            }
                        }
                    }
                }
            }
        });

        if (!order) return { success: false, error: "Pedido no encontrado" };

        const serializedOrder = {
            ...order,
            total: Number(order.total),
            subtotal: Number(order.subtotal),
            shippingCost: Number(order.shippingCost),
            discount: Number(order.discount),
            items: order.items.map((item: any) => ({
                ...item,
                price: Number(item.price),
                subtotal: Number(item.subtotal),
                product: item.product ? {
                    ...item.product,
                    price: Number(item.product.price),
                    compareAtPrice: item.product.compareAtPrice ? Number(item.product.compareAtPrice) : null
                } : null
            }))
        };

        return { success: true, order: serializedOrder };
    } catch (error) {
        console.error("Error fetching order:", error);
        return { success: false, error: "Error al obtener el pedido" };
    }
}


export async function updateOrderStatus(orderId: string, status: OrderStatus) {
    const auth = await requireAdmin();
    if (!auth.authorized) return { success: false, error: auth.error };

    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { status }
        });
        revalidatePath('/admin/pedidos');
        revalidatePath(`/admin/pedidos/${orderId}`);
        return { success: true };
    } catch (error) {
        console.error("Error updating order status:", error);
        return { success: false, error: "Error al actualizar estado" };
    }
}

export async function updatePaymentStatus(orderId: string, status: PaymentStatus) {
    const auth = await requireAdmin();
    if (!auth.authorized) return { success: false, error: auth.error };

    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { paymentStatus: status }
        });
        revalidatePath('/admin/pedidos');
        revalidatePath(`/admin/pedidos/${orderId}`);
        return { success: true };
    } catch (error) {
        console.error("Error updating payment status:", error);
        return { success: false, error: "Error al actualizar estado de pago" };
    }
}

export async function addTrackingNumber(orderId: string, trackingNumber: string) {
    const auth = await requireAdmin();
    if (!auth.authorized) return { success: false, error: auth.error };

    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { trackingNumber, status: 'SHIPPED' }
        });
        revalidatePath('/admin/pedidos');
        revalidatePath(`/admin/pedidos/${orderId}`);
        return { success: true };
    } catch (error) {
        console.error("Error adding tracking number:", error);
        return { success: false, error: "Error al agregar número de seguimiento" };
    }
}
