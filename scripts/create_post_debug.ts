import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- DEBUG CREATION SCRIPT START ---');
    try {
        const user = await prisma.user.findFirst();
        if (!user) throw new Error('No user found');
        console.log('User found:', user.id);

        const category = await prisma.category.findFirst({ where: { slug: 'reproduccion' } });
        if (!category) throw new Error('Category not found');
        console.log('Category found:', category.id);

        const slug = 'seleccion-y-empadre-debug';
        console.log('Attempting to create post with slug:', slug);

        const post = await prisma.blogPost.create({
            data: {
                title: 'Selección y Empadre DEBUG',
                slug: slug,
                content: '<p>Debug content</p>',
                excerpt: 'Debug excerpt',
                categoryId: category.id,
                authorId: user.id,
                status: 'PUBLISHED', // Enum string
                publishedAt: new Date(),
            }
        });
        console.log('SUCCESS: Post created with ID:', post.id);
    } catch (error) {
        console.error('FAILURE:', error);
    } finally {
        await prisma.$disconnect();
    }
    console.log('--- DEBUG CREATION SCRIPT END ---');
}

main();
