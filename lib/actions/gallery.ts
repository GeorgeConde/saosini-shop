"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";

export async function getGalleryItems() {
    try {
        const items = await prisma.galleryItem.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return { success: true, items };
    } catch (error) {
        console.error("Error fetching gallery items:", error);
        return { success: false, error: "Error fetching gallery items" };
    }
}

export async function createGalleryItem(data: {
    title?: string;
    type: string;
    url: string;
}) {
    const auth = await requireAdmin();
    if (!auth.authorized) return { success: false, error: auth.error };
    try {
        const item = await prisma.galleryItem.create({
            data: {
                title: data.title,
                type: data.type,
                url: data.url,
            },
        });
        revalidatePath("/");
        revalidatePath("/admin/gallery");
        return { success: true, item };
    } catch (error) {
        console.error("Error creating gallery item:", error);
        return { success: false, error: "Error creating gallery item" };
    }
}

export async function deleteGalleryItem(id: string) {
    const auth = await requireAdmin();
    if (!auth.authorized) return { success: false, error: auth.error };

    try {
        await prisma.galleryItem.delete({
            where: { id },
        });
        revalidatePath("/");
        revalidatePath("/admin/gallery");
        return { success: true };
    } catch (error) {
        console.error("Error deleting gallery item:", error);
        return { success: false, error: "Error deleting gallery item" };
    }
}
