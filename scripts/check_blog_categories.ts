import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Checking BlogCategories...');
    const categories = await prisma.blogCategory.findMany();
    console.log('Categories:', categories);

    console.log('Checking Products...');
    const products = await prisma.product.findMany({
        take: 10,
        select: { id: true, name: true, slug: true }
    });
    console.log('Products:', products);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
