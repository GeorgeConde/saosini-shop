import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log('\n=== SEARCHING FOR ALIMENTACIÓN POST ===\n');

        // Search for the post with "Alimentación" in the title
        const posts = await prisma.blogPost.findMany({
            where: {
                title: {
                    contains: 'Alimentación'
                }
            }
        });

        console.log(`Found ${posts.length} post(s) with "Alimentación" in the title:\n`);

        posts.forEach((post, index) => {
            console.log(`Post ${index + 1}:`);
            console.log(`  ID: ${post.id}`);
            console.log(`  Title: ${post.title}`);
            console.log(`  Slug: ${post.slug}`);
            console.log('---');
        });

        if (posts.length === 0) {
            console.error('\n❌ No post found!');
            return;
        }

        const correctSlug = 'alimentacion-cuyes-zonas-altura-granja-saosini';

        // Update the first matching post
        const postToUpdate = posts[0];

        if (postToUpdate.slug === correctSlug) {
            console.log(`\n✅ Slug is already correct: "${correctSlug}"`);
        } else {
            console.log(`\n🔄 Updating slug from "${postToUpdate.slug}" to "${correctSlug}"...`);

            await prisma.blogPost.update({
                where: { id: postToUpdate.id },
                data: { slug: correctSlug }
            });

            console.log('✅ Slug updated successfully!');
        }

    } catch (e) {
        console.error('\n❌ Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
