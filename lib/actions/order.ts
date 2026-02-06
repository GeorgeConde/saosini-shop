'use server';

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { sendOrderConfirmationEmail, sendAdminOrderNotification } from "@/lib/mail";
import { getShippingCost } from "./shipping";

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

interface CreateOrderInput {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: any;
    items: {
        id: string; // product id
        quantity: number;
    }[];
    total: number; // Client side total, for verification
}

export async function createOrder(data: CreateOrderInput & { paymentToken?: string }) {
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
        const order = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
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

            // Update Stock
            for (const item of items) {
                const product = products.find((p: any) => p.id === item.id);
                if (product && product.manageInventory) {
                    await tx.product.update({
                        where: { id: item.id },
                        data: {
                            stockQuantity: {
                                decrement: item.quantity
                            }
                        }
                    });
                }
            }

            return newOrder;
        });

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
                await prisma.order.update({
                    where: { id: order.id },
                    data: { paymentStatus: 'FAILED' }
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

        return { success: true, orderId: order.id };

    } catch (error) {
        console.error("Error creating order:", error);
        return { success: false, error: "Error al procesar el pedido" };
    }
}

export async function getOrders(limit = 10, offset = 0) {
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

export async function getOrderById(id: string) {
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

export async function updatePaymentStatus(orderId: string, status: any) {
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
