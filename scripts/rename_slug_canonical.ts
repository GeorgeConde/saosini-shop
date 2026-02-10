import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const idToUpdate = 'cmlflr9y2000gvy0b8eh61va5'; // The post with long slug
    const newSlug = 'alimentacion-cuyes-zonas-altura-granja-saosini'; // Canonical short slug

    console.log(`Renaming post ${idToUpdate} to slug: ${newSlug}...`);

    try {
        const result = await prisma.blogPost.update({
            where: { id: idToUpdate },
            data: { slug: newSlug }
        });
        console.log(`Success! New slug: ${result.slug}`);
    } catch (error) {
        console.error('Error updating slug:', error);
    }

    await prisma.$disconnect();
}

main();
