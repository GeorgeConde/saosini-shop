"use server";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export interface CustomerSummary {
    email: string;
    name: string;
    phone: string;
    orderCount: number;
    totalSpent: number;
    lastOrderAt: Date;
}

// Checkout is guest-only (no customer accounts), so "customers" are derived
// from Order records grouped by email rather than a separate table.
export async function getCustomers(): Promise<{ success: true; customers: CustomerSummary[] } | { success: false; error: string }> {
    const auth = await requireAdmin();
    if (!auth.authorized) return { success: false, error: auth.error };

    try {
        const orders = await prisma.order.findMany({
            select: {
                customerName: true,
                customerEmail: true,
                customerPhone: true,
                total: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
        });

        const byEmail = new Map<string, CustomerSummary>();

        for (const order of orders) {
            const key = order.customerEmail.toLowerCase();
            const existing = byEmail.get(key);

            if (existing) {
                existing.orderCount += 1;
                existing.totalSpent += Number(order.total);
            } else {
                // Orders are sorted newest-first, so the first time we see an
                // email its name/phone/date are this customer's most recent.
                byEmail.set(key, {
                    email: order.customerEmail,
                    name: order.customerName,
                    phone: order.customerPhone,
                    orderCount: 1,
                    totalSpent: Number(order.total),
                    lastOrderAt: order.createdAt,
                });
            }
        }

        const customers = Array.from(byEmail.values()).sort((a, b) => b.totalSpent - a.totalSpent);

        return { success: true, customers };
    } catch (error) {
        console.error("Error fetching customers:", error);
        return { success: false, error: "Error al obtener los clientes" };
    }
}
