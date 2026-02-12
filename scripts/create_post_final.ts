import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- FINAL CREATION SCRIPT ---');
    try {
        const user = await prisma.user.findFirst();
        if (!user) throw new Error('No user found');
        console.log('User:', user.id);

        const category = await prisma.category.findFirst({ where: { slug: 'reproduccion' } });
        if (!category) throw new Error('Category not found');
        console.log('Category:', category.id);

        // Intento crear con slug CORTO primero para asegurar
        const slug = 'seleccion-y-empadre-v1';

        console.log('Creating post with slug:', slug);

        const post = await prisma.blogPost.upsert({
            where: { slug: slug },
            update: {},
            create: {
                title: 'Selección y Empadre: Cómo mejorar la genética de tu granja de cuyes',
                slug: slug,
                content: '<p>Contenido placeholder...</p>',
                excerpt: 'Guía completa sobre selección y empadre.',
                categoryId: category.id,
                authorId: user.id,
                status: 'PUBLISHED' as const, // Cast to const
                publishedAt: new Date(),
                featuredImage: 'https://images.unsplash.com/photo-1589923188900-85dae5233271?auto=format&fit=crop&q=80'
            }
        });
        console.log('SUCCESS! Post ID:', post.id);

        // Ahora intentamos renombrar al slug largo CORRECTO
        const finalSlug = 'seleccion-y-empadre-como-mejorar-la-genetica-de-tu-granja';
        console.log('Renaming to final slug:', finalSlug);

        const updated = await prisma.blogPost.update({
            where: { id: post.id },
            data: { slug: finalSlug }
        });
        console.log('RENAMED SUCCESS:', updated.slug);

    } catch (error: any) {
        console.error('ERROR:', error.message);
        if (error.code) console.error('CODE:', error.code);
        if (error.meta) console.error('META:', error.meta);
    } finally {
        await prisma.$disconnect();
    }
}

main();
