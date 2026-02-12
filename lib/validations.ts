"use strict";

import { z } from "zod";

// ===== ORDER VALIDATION =====

export const createOrderSchema = z.object({
    customerName: z.string().min(2, "El nombre es obligatorio").max(200),
    customerEmail: z.string().email("Email inválido").max(254),
    customerPhone: z
        .string()
        .min(6, "Teléfono inválido")
        .max(20)
        .regex(/^[\d\s\-+()]+$/, "Formato de teléfono inválido"),
    shippingAddress: z.object({
        address: z.string().min(5, "Dirección muy corta").max(500),
        department: z.string().min(1, "Departamento es obligatorio").max(100),
        province: z.string().max(100).optional(),
        district: z.string().max(100).optional(),
    }),
    items: z
        .array(
            z.object({
                id: z.string().min(1, "ID de producto requerido"),
                quantity: z.number().int().positive("Cantidad debe ser positiva").max(100),
            })
        )
        .min(1, "Debe tener al menos un producto"),
    total: z.number().nonnegative(),
    paymentToken: z.string().optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

// ===== PRODUCT VALIDATION =====

export const createProductSchema = z.object({
    name: z.string().min(1, "Nombre obligatorio").max(300),
    description: z.string().min(1, "Descripción obligatoria").max(10000),
    price: z.number().positive("Precio debe ser positivo").max(999999.99),
    stockQuantity: z.number().int().nonnegative("Stock no puede ser negativo").max(99999),
    categoryId: z.string().min(1, "Categoría obligatoria"),
    type: z.enum([
        "REPRODUCTOR_COMERCIAL",
        "REPRODUCTOR_PREMIUM",
        "ALIMENTO",
        "ACCESORIO",
        "MEDICAMENTO",
    ]),
    status: z.enum(["active", "inactive", "draft"]).default("active"),
    images: z.array(
        z.object({
            url: z.string().url("URL de imagen inválida"),
            altText: z.string().max(300).nullable().optional(),
        })
    ).default([]),
});
