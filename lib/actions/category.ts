"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;

        const slug = name.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const category = await prisma.category.create({
            data: {
                name,
                slug,
                description
            }
        });

        revalidatePath("/admin/categorias");
        revalidatePath("/admin/productos");
        return { success: true, category };
    } catch (error) {
        console.error("Error creating category:", error);
        return { success: false, error: "Error al crear la categoría" };
    }
}

export async function updateCategory(id: string, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;

        const slug = name.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const category = await prisma.category.update({
            where: { id },
            data: {
                name,
                slug,
                description
            }
        });

        revalidatePath("/admin/categorias");
        revalidatePath("/admin/productos");
        return { success: true, category };
    } catch (error) {
        console.error("Error updating category:", error);
        return { success: false, error: "Error al actualizar la categoría" };
    }
}

export async function deleteCategory(id: string) {
    try {
        await prisma.category.delete({
            where: { id }
        });

        revalidatePath("/admin/categorias");
        revalidatePath("/admin/productos");
        return { success: true };
    } catch (error) {
        console.error("Error deleting category:", error);
        return {
            success: false,
            error: "No se puede eliminar la categoría porque tiene productos asociados o ya no existe."
        };
    }
}
