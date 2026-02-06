"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getShippingZones() {
    try {
        const zones = await prisma.shippingZone.findMany({
            orderBy: { name: 'asc' }
        });
        return { success: true, zones };
    } catch (error) {
        console.error("Error fetching shipping zones:", error);
        return { success: false, error: "Error al obtener zonas de envío" };
    }
}

export async function getShippingCost(department: string) {
    try {
        // En un sistema real, buscaríamos el departamento dentro del JSON 'regions' de ShippingZone
        // Para PostgreSQL con Prisma, podemos usar filter o consultas específicas de JSON

        const zones = await prisma.shippingZone.findMany();
        const matchingZone = zones.find((zone: any) => {
            const regions = zone.regions as string[];
            return regions.includes(department);
        });

        if (matchingZone) {
            return Number(matchingZone.cost);
        }

        // Valores por defecto si no se encuentra zona
        const isLima = department === 'Lima' || department === 'Callao';
        return isLima ? 15.00 : 25.00;

    } catch (error) {
        console.error("Error calculating shipping cost:", error);
        return 25.00; // Fallback
    }
}
