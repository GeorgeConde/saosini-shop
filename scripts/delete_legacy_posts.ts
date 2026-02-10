import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const idsToDelete = [
        'cmkrqftp6000411pj8ep9lckq', // Guía de Alimentación (Old)
        'cmkrqftzz000611pj5a28zmff'  // Manejo de Recría (Old)
    ];

    console.log(`Deleting ${idsToDelete.length} posts...`);

    const result = await prisma.blogPost.deleteMany({
        where: {
            id: {
                in: idsToDelete
            }
        }
    });

    console.log(`Deleted ${result.count} posts.`);
    await prisma.$disconnect();
}

main();
