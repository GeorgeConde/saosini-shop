import prisma from '@/lib/prisma';
import BlogPageClient from './BlogPageClient';

export const dynamic = 'force-dynamic';

export default async function AdminBlogPage() {
    const [posts, categories] = await Promise.all([
        prisma.blogPost.findMany({
            include: {
                category: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        }),
        prisma.blogCategory.findMany({
            select: { id: true, name: true }
        })
    ]);

    // Obtener el primer usuario como autor por defecto
    const user = await prisma.user.findFirst();

    return (
        <BlogPageClient
            posts={JSON.parse(JSON.stringify(posts))}
            categories={JSON.parse(JSON.stringify(categories))}
            userId={user?.id || ''}
        />
    );
}
