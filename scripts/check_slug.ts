import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const posts = await prisma.blogPost.findMany({
        select: { id: true, title: true, slug: true }
    });

    console.log('\n=== ALL BLOG POSTS ===\n');
    posts.forEach(post => {
        console.log(`Title: ${post.title}`);
        console.log(`Slug:  ${post.slug}`);
        console.log('---');
    });

    await prisma.$disconnect();
}

main();
