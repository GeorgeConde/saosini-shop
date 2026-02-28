import { MetadataRoute } from 'next';
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXTAUTH_URL || 'https://saosinicuyes.com';

    // Fetch all products
    const products = await prisma.product.findMany({
        where: { status: 'active' },
        select: { slug: true, updatedAt: true }
    });

    // Fetch all categories
    const categories = await prisma.category.findMany({
        select: { slug: true, updatedAt: true }
    });

    // Fetch all published blog posts
    const blogPosts = await prisma.blogPost.findMany({
        where: { status: 'PUBLISHED' },
        select: { slug: true, updatedAt: true }
    });

    // Fetch all blog categories
    const blogCategories = await prisma.blogCategory.findMany({
        select: { slug: true, updatedAt: true }
    });

    const productEntries = products.map((product) => ({
        url: `${baseUrl}/catalogo/${product.slug}`,
        lastModified: product.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    const categoryEntries = categories.map((category) => ({
        url: `${baseUrl}/catalogo?categoria=${category.slug}`,
        lastModified: category.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    const blogPostEntries = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'weekly' as const,
        priority: 0.8, // High priority for content indexing
    }));

    const blogCategoryEntries = blogCategories.map((category) => ({
        url: `${baseUrl}/blog?categoria=${category.slug}`,
        lastModified: category.updatedAt,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/catalogo`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/nosotros`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        ...productEntries,
        ...categoryEntries,
        ...blogPostEntries,
        ...blogCategoryEntries,
    ];
}
