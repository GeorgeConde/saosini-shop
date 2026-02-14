import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const product = await prisma.product.findUnique({
        where: { slug: 'bebedero-para-cuyes-chupon-jebe-negro' }
    });
    console.log(product);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
