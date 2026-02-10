import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- V3 CREATION SCRIPT ---');
    try {
        const user = await prisma.user.findFirst();
        if (!user) throw new Error('No user found');

        const category = await prisma.category.findFirst({ where: { slug: 'reproduccion' } });
        if (!category) throw new Error('Category not found');

        const finalSlug = 'seleccion-y-empadre-como-mejorar-la-genetica-de-tu-granja';
        console.log('Creating post with slug:', finalSlug);

        // Borramos si existe para evitar problemas de upsert raros con foreign keys
        try {
            await prisma.blogPost.delete({ where: { slug: finalSlug } });
            console.log('Deleted existing post to ensure clean slate.');
        } catch (e) {
            // Ignore if not found
        }

        const post = await prisma.blogPost.create({
            data: {
                title: 'Selección y Empadre: Cómo mejorar la genética de tu granja de cuyes',
                slug: finalSlug,
                content: '<p>Contenido placeholder para componente personalizado...</p>',
                excerpt: 'El éxito de una granja no depende solo de cuántos cuyes nacen, sino de la calidad de esos animales. Aprende a seleccionar los mejores reproductores.',
                status: 'PUBLISHED',
                publishedAt: new Date(),
                featuredImage: 'https://images.unsplash.com/photo-1589923188900-85dae5233271?auto=format&fit=crop&q=80',

                // Usamos connect
                category: {
                    connect: { id: category.id }
                },
                author: {
                    connect: { id: user.id }
                }
            }
        });
        console.log('SUCCESS! Post created. ID:', post.id);
        console.log('Slug:', post.slug);

    } catch (error: any) {
        console.error('ERROR V3:', error.message);
        console.dir(error, { depth: null });
    } finally {
        await prisma.$disconnect();
    }
}

main();
