
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Searching for 'Alimentación' post...");
        const post = await prisma.blogPost.findFirst({
            where: {
                title: {
                    contains: 'Alimentación'
                }
            }
        });

        if (!post) {
            console.error("ERROR: Post not found!");
            return;
        }

        console.log(`Found post: "${post.title}"`);
        console.log(`Current slug: "${post.slug}"`);

        const correctSlug = 'alimentacion-cuyes-zonas-altura-granja-saosini';

        if (post.slug === correctSlug) {
            console.log("Slug is already correct.");
        } else {
            console.log(`Updating slug to: "${correctSlug}"...`);
            await prisma.blogPost.update({
                where: { id: post.id },
                data: { slug: correctSlug }
            });
            console.log("Slug updated successfully!");
        }

    } catch (e) {
        console.error("Error:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
