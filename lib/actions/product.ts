"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ProductType } from "@prisma/client";

export async function createProduct(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = parseFloat(formData.get("price") as string);
        const stockQuantity = parseInt(formData.get("stockQuantity") as string);
        const categoryId = formData.get("categoryId") as string;
        const type = formData.get("type") as ProductType;
        const imagesJson = formData.get("imageUrls") as string;
        const imageUrls: string[] = imagesJson ? JSON.parse(imagesJson) : [];
        const status = formData.get("status") as string || "active";


        // Generar slug simple
        const slug = name.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const product = await prisma.product.create({
            data: {
                name,
                slug,
                description,
                price,
                stockQuantity,
                categoryId,
                type,
                status,
                images: {
                    create: imageUrls.map((url, index) => ({
                        url,
                        isPrimary: index === 0
                    }))
                }

            }
        });

        revalidatePath("/admin/productos");
        return {
            success: true,
            product: {
                ...product,
                price: Number(product.price),
                compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null
            }
        };
    } catch (error) {
        console.error("Error creating product:", error);
        return { success: false, error: "Error al crear el producto" };
    }
}

export async function updateProduct(id: string, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const price = parseFloat(formData.get("price") as string);
        const stockQuantity = parseInt(formData.get("stockQuantity") as string);
        const categoryId = formData.get("categoryId") as string;
        const type = formData.get("type") as ProductType;
        const imagesJson = formData.get("imageUrls") as string;
        const imageUrls: string[] = imagesJson ? JSON.parse(imagesJson) : [];
        const status = formData.get("status") as string || "active";


        // Generar slug simple
        const slug = name.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                slug,
                description,
                price,
                stockQuantity,
                categoryId,
                type,
                status,
                images: {
                    deleteMany: {}, // Delete all old images and replace with new ones
                    create: imageUrls.map((url, index) => ({
                        url,
                        isPrimary: index === 0
                    }))
                }

            }
        });

        revalidatePath("/admin/productos");
        return {
            success: true,
            product: {
                ...product,
                price: Number(product.price),
                compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null
            }
        };
    } catch (error) {
        console.error("Error updating product:", error);
        return { success: false, error: "Error al actualizar el producto" };
    }
}


export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id }
        });

        revalidatePath("/admin/productos");
        return { success: true };
    } catch (error) {
        console.error("Error deleting product:", error);
        return { success: false, error: "Error al eliminar el producto" };
    }
}

export async function getProductBySlug(slug: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { slug },
            include: {
                images: {
                    orderBy: {
                        isPrimary: 'desc'
                    }
                },
                videos: true,
                category: true
            }
        });

        if (!product) {
            return { success: false, error: "Producto no encontrado" };
        }


        return {
            success: true,
            product: {
                ...product,
                price: Number(product.price),
                compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null
            }
        };
    } catch (error) {
        console.error("Error fetching product:", error);
        return { success: false, error: "Error al obtener el producto" };
    }
}

export async function getProducts(searchQuery?: string, category?: string) {
    try {
        const where: any = {
            status: "active"
        };

        if (searchQuery) {
            where.OR = [
                { name: { contains: searchQuery, mode: 'insensitive' } },
                { description: { contains: searchQuery, mode: 'insensitive' } }
            ];
        }

        if (category && category !== 'Todos') {
            where.category = {
                name: category
            };
        }

        const products = await prisma.product.findMany({
            where,
            include: {
                category: true,
                images: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const serializedProducts = products.map(product => ({
            ...product,
            price: Number(product.price),
            compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null
        }));

        return { success: true, products: serializedProducts };
    } catch (error) {
        console.error("Error fetching products:", error);
        return { success: false, error: "Error al obtener los productos" };
    }
}
