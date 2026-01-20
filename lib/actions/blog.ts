"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { PostStatus } from "@prisma/client";

// ===== BLOG POSTS =====

export async function createPost(formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const excerpt = formData.get("excerpt") as string;
        const content = formData.get("content") as string;
        const featuredImage = formData.get("featuredImage") as string;
        const metaDescription = formData.get("metaDescription") as string;
        const categoryId = formData.get("categoryId") as string;
        const authorId = formData.get("authorId") as string;
        const shouldPublish = formData.get("shouldPublish") === "true";

        // Generar slug desde el título
        const slug = title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Eliminar acentos
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');

        const post = await prisma.blogPost.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                featuredImage: featuredImage || null,
                metaDescription: metaDescription || null,
                categoryId,
                authorId,
                status: shouldPublish ? PostStatus.PUBLISHED : PostStatus.DRAFT,
                publishedAt: shouldPublish ? new Date() : null
            }
        });

        revalidatePath("/admin/blog");
        revalidatePath("/blog");
        return { success: true, post };
    } catch (error) {
        console.error("Error creating post:", error);
        return { success: false, error: "Error al crear el artículo" };
    }
}

export async function updatePost(id: string, formData: FormData) {
    try {
        const title = formData.get("title") as string;
        const excerpt = formData.get("excerpt") as string;
        const content = formData.get("content") as string;
        const featuredImage = formData.get("featuredImage") as string;
        const metaDescription = formData.get("metaDescription") as string;
        const categoryId = formData.get("categoryId") as string;
        const shouldPublish = formData.get("shouldPublish") === "true";

        // Generar slug desde el título
        const slug = title
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');

        const currentPost = await prisma.blogPost.findUnique({ where: { id } });

        const post = await prisma.blogPost.update({
            where: { id },
            data: {
                title,
                slug,
                excerpt,
                content,
                featuredImage: featuredImage || null,
                metaDescription: metaDescription || null,
                categoryId,
                status: shouldPublish ? PostStatus.PUBLISHED : PostStatus.DRAFT,
                publishedAt: shouldPublish && !currentPost?.publishedAt ? new Date() : currentPost?.publishedAt
            }
        });

        revalidatePath("/admin/blog");
        revalidatePath("/blog");
        revalidatePath(`/blog/${slug}`);
        return { success: true, post };
    } catch (error) {
        console.error("Error updating post:", error);
        return { success: false, error: "Error al actualizar el artículo" };
    }
}

export async function deletePost(id: string) {
    try {
        await prisma.blogPost.delete({
            where: { id }
        });

        revalidatePath("/admin/blog");
        revalidatePath("/blog");
        return { success: true };
    } catch (error) {
        console.error("Error deleting post:", error);
        return { success: false, error: "Error al eliminar el artículo" };
    }
}

export async function publishPost(id: string) {
    try {
        const post = await prisma.blogPost.update({
            where: { id },
            data: {
                status: PostStatus.PUBLISHED,
                publishedAt: new Date()
            }
        });

        revalidatePath("/admin/blog");
        revalidatePath("/blog");
        return { success: true, post };
    } catch (error) {
        console.error("Error publishing post:", error);
        return { success: false, error: "Error al publicar el artículo" };
    }
}

// ===== BLOG CATEGORIES =====

export async function createBlogCategory(formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;

        const slug = name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');

        const category = await prisma.blogCategory.create({
            data: {
                name,
                slug,
                description: description || null
            }
        });

        revalidatePath("/admin/blog/categorias");
        return { success: true, category };
    } catch (error) {
        console.error("Error creating blog category:", error);
        return { success: false, error: "Error al crear la categoría" };
    }
}

export async function updateBlogCategory(id: string, formData: FormData) {
    try {
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;

        const slug = name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '');

        const category = await prisma.blogCategory.update({
            where: { id },
            data: {
                name,
                slug,
                description: description || null
            }
        });

        revalidatePath("/admin/blog/categorias");
        return { success: true, category };
    } catch (error) {
        console.error("Error updating blog category:", error);
        return { success: false, error: "Error al actualizar la categoría" };
    }
}

export async function deleteBlogCategory(id: string) {
    try {
        // Verificar que no tenga posts
        const category = await prisma.blogCategory.findUnique({
            where: { id },
            include: { _count: { select: { posts: true } } }
        });

        if (category && category._count.posts > 0) {
            return { success: false, error: "No se puede eliminar una categoría con artículos asociados" };
        }

        await prisma.blogCategory.delete({
            where: { id }
        });

        revalidatePath("/admin/blog/categorias");
        return { success: true };
    } catch (error) {
        console.error("Error deleting blog category:", error);
        return { success: false, error: "Error al eliminar la categoría" };
    }
}

// ===== PUBLIC DATA FETCHING =====

export async function getPublishedPosts(limit = 9, categorySlug?: string) {
    try {
        const where: any = {
            status: PostStatus.PUBLISHED,
        };

        if (categorySlug) {
            where.category = {
                slug: categorySlug
            };
        }

        const posts = await prisma.blogPost.findMany({
            where,
            take: limit,
            orderBy: { publishedAt: 'desc' },
            include: {
                author: {
                    select: { name: true, image: true }
                },
                category: {
                    select: { name: true, slug: true }
                }
            }
        });

        return { success: true, posts };
    } catch (error) {
        console.error("Error fetching published posts:", error);
        return { success: false, error: "Error al obtener artículos", posts: [] };
    }
}

export async function getPostBySlug(slug: string) {
    try {
        const post = await prisma.blogPost.findUnique({
            where: { slug },
            include: {
                author: {
                    select: { name: true, image: true }
                },
                category: {
                    select: { name: true, slug: true }
                }
            }
        });

        if (!post || post.status !== PostStatus.PUBLISHED) {
            return { success: false, error: "Artículo no encontrado" };
        }

        return { success: true, post };
    } catch (error) {
        console.error("Error fetching post by slug:", error);
        return { success: false, error: "Error al obtener el artículo" };
    }
}

export async function getAllCategories() {
    try {
        const categories = await prisma.blogCategory.findMany({
            orderBy: { name: 'asc' },
            include: {
                _count: {
                    select: {
                        posts: {
                            where: { status: PostStatus.PUBLISHED }
                        }
                    }
                }
            }
        });

        // Filter categories with at least 1 published post
        const activeCategories = categories.filter(c => c._count.posts > 0);

        return { success: true, categories: activeCategories };
    } catch (error) {
        console.error("Error fetching categories:", error);
        return { success: false, error: "Error al obtener categorías", categories: [] };
    }
}
