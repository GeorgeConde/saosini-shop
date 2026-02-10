import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
    const products = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            images: {
                take: 1
            }
        }
    });

    fs.writeFileSync('products.json', JSON.stringify(products, null, 2));
    console.log(`Exported ${products.length} products to products.json`);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
