import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Listando productos disponibles...');
    const products = await prisma.product.findMany({
        select: {
            name: true,
            slug: true,
            id: true
        }
    });

    if (products.length === 0) {
        console.log('No se encontraron productos en la base de datos.');
    } else {
        console.table(products);
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
