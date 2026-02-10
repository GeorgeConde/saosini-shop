import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- FIXED CREATION SCRIPT ---');
    try {
        const user = await prisma.user.findFirst();
        if (!user) throw new Error('No user found');

        const category = await prisma.category.findFirst({ where: { slug: 'reproduccion' } });
        if (!category) throw new Error('Category not found');

        const finalSlug = 'seleccion-y-empadre-como-mejorar-la-genetica-de-tu-granja';
        console.log('Creating post with slug:', finalSlug);

        // Remove 'published' boolean. Use status enum (as string) and publishedAt.
        const post = await prisma.blogPost.upsert({
            where: { slug: finalSlug },
            update: {
                status: 'PUBLISHED',
                publishedAt: new Date(),
                categoryId: category.id,
                authorId: user.id
            },
            create: {
                title: 'Selección y Empadre: Cómo mejorar la genética de tu granja de cuyes',
                slug: finalSlug,
                content: '<p>Contenido placeholder para componente personalizado...</p>',
                excerpt: 'El éxito de una granja no depende solo de cuántos cuyes nacen, sino de la calidad de esos animales. Aprende a seleccionar los mejores reproductores.',
                categoryId: category.id,
                authorId: user.id,
                // published: true, // REMOVED - Caused error
                status: 'PUBLISHED',
                publishedAt: new Date(),
                featuredImage: 'https://images.unsplash.com/photo-1589923188900-85dae5233271?auto=format&fit=crop&q=80'
            }
        });
        console.log('SUCCESS! Post created/updated. ID:', post.id);
        console.log('Slug:', post.slug);

    } catch (error: any) {
        console.error('ERROR:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
