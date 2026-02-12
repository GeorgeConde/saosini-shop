import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting script...');

    // 1. Ensure Category Exists
    let category = await prisma.category.findFirst({
        where: { slug: 'reproduccion' }
    });

    if (!category) {
        console.log('Creating category: Reproducción...');
        category = await prisma.category.create({
            data: {
                name: 'Reproducción',
                slug: 'reproduccion',
                description: 'Todo sobre la genética y el empadre de cuyes.'
            }
        });
    }

    // 2. Ensure Author Exists
    let author = await prisma.user.findFirst();
    if (!author) {
        console.log('No users found. Creating dummy author...');
        try {
            author = await prisma.user.create({
                data: {
                    email: 'admin@saosini.com',
                    name: 'Admin Saosini',
                    password: 'dummy_hash_password', // Assuming password field exists and is string
                    // Add other required fields if any. Usually email/name are enough for basic setup
                }
            });
        } catch (e) {
            console.error('Error creating dummy user:', e);
            // Fallback: try to find ANY user again or just fail gracefully with clearer message
            return;
        }
    }

    console.log(`Using author ID: ${author.id}`);

    // 3. Create/Update Post
    const postData = {
        title: 'Selección y Empadre: Cómo mejorar la genética de tu granja de cuyes',
        slug: 'seleccion-y-empadre-como-mejorar-la-genetica-de-tu-granja', // SEO friendly
        content: '<p>Contenido cargado desde componente personalizado...</p>',
        excerpt: 'El éxito de una granja no depende solo de cuántos cuyes nacen, sino de la calidad de esos animales. Aprende a seleccionar los mejores reproductores.',
        status: 'PUBLISHED' as const, // Cast to const to satisfy enum type if using string
        publishedAt: new Date(),
        featuredImage: 'https://images.unsplash.com/photo-1589923188900-85dae5233271?auto=format&fit=crop&q=80',
        categoryId: category.id,
        authorId: author.id,
    };

    const existing = await prisma.blogPost.findUnique({
        where: { slug: postData.slug }
    });

    if (existing) {
        console.log('Post already exists. Updating...');
        await prisma.blogPost.update({
            where: { slug: postData.slug },
            data: postData
        });
    } else {
        console.log('Creating new post...');
        await prisma.blogPost.create({
            data: postData
        });
    }

    console.log(`SUCCESS. Post created/updated with slug: ${postData.slug}`);
}

main()
    .catch(e => console.error('FATAL ERROR:', e))
    .finally(async () => await prisma.$disconnect());
