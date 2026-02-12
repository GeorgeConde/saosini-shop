import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
    let output = '=== BLOG POSTS AUDIT ===\n\n';

    // Fetch all posts ordered by creation date
    const posts = await prisma.blogPost.findMany({
        orderBy: { createdAt: 'asc' },
        select: {
            id: true,
            title: true,
            slug: true,
            createdAt: true,
            featuredImage: true
        }
    });

    if (posts.length === 0) {
        output += 'No posts found.';
    } else {
        posts.forEach((post, index) => {
            output += `[#${index + 1}]Created: ${post.createdAt.toISOString()} \n`;
            output += `Title: ${post.title} \n`;
            output += `Slug:  ${post.slug} \n`;
            output += `ID:    ${post.id} \n`;
            output += `Image: ${post.featuredImage || 'None'} \n`;
            output += '-----------------------------------\n';
        });
    }

    fs.writeFileSync('posts_audit.txt', output);
    console.log('Audit written to posts_audit.txt');

    await prisma.$disconnect();
}

main();
