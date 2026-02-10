import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('--- V5 CREATION SCRIPT (FIXED MODELS) ---');
    try {
        const user = await prisma.user.findFirst();
        if (!user) throw new Error('No user found');

        // CORRECCIÓN: Usar BlogCategory, no Category
        let blogCategory = await prisma.blogCategory.findFirst({ where: { slug: 'reproduccion' } });

        if (!blogCategory) {
            console.log('Creating BlogCategory: Reproducción...');
            blogCategory = await prisma.blogCategory.create({
                data: {
                    name: 'Reproducción',
                    slug: 'reproduccion',
                    description: 'Todo sobre la genética y el empadre de cuyes.'
                }
            });
        }
        console.log('BlogCategory:', blogCategory.id);

        const finalSlug = 'seleccion-y-empadre-como-mejorar-la-genetica-de-tu-granja';
        console.log('Creating post with slug:', finalSlug);

        const post = await prisma.blogPost.upsert({
            where: { slug: finalSlug },
            update: {
                status: 'PUBLISHED',
                categoryId: blogCategory.id, // ID válido de BlogCategory
                authorId: user.id
            },
            create: {
                title: 'Selección y Empadre: Cómo mejorar la genética de tu granja de cuyes',
                slug: finalSlug,
                content: '<p>Contenido placeholder para componente personalizado...</p>',
                excerpt: 'El éxito de una granja no depende solo de cuántos cuyes nacen, sino de la calidad de esos animales. Aprende a seleccionar los mejores reproductores.',
                categoryId: blogCategory.id,
                authorId: user.id,
                status: 'PUBLISHED',
                publishedAt: new Date(),
                featuredImage: 'https://images.unsplash.com/photo-1589923188900-85dae5233271?auto=format&fit=crop&q=80'
            }
        });
        console.log('SUCCESS! Post created/updated. ID:', post.id);
        console.log('Slug:', post.slug);

    } catch (error: any) {
        console.error('ERROR V5:', error.message);
        console.dir(error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
