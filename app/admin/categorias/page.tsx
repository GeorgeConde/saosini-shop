import prisma from '@/lib/prisma';
import AdminCategoriesPageClient from './CategoriesPageClient';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
    const categories = await prisma.category.findMany({
        include: {
            _count: {
                select: { products: true }
            }
        },
        orderBy: {
            name: 'asc'
        }
    });

    return (
        <AdminCategoriesPageClient categories={JSON.parse(JSON.stringify(categories))} />
    );
}
