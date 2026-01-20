import { Plus } from 'lucide-react';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import AdminProductsPageClient from './ProductsPageClient';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
    const products = await prisma.product.findMany({
        include: {
            category: true,
            images: {
                where: { isPrimary: true },
                take: 1
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const categories = await prisma.category.findMany({
        select: { id: true, name: true }
    });

    return (
        <AdminProductsPageClient
            initialProducts={JSON.parse(JSON.stringify(products))}
            categories={JSON.parse(JSON.stringify(categories))}
        />
    );
}
