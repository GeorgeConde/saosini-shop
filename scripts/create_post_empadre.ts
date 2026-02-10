import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
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

    // 2. Create Post
    const postData = {
        title: 'Selección y Empadre: Cómo mejorar la genética de tu granja de cuyes',
        slug: 'seleccion-y-empadre-como-mejorar-la-genetica-de-tu-granja', // SEO friendly
        content: '<p>Contenido cargado desde componente personalizado...</p>',
        excerpt: 'El éxito de una granja no depende solo de cuántos cuyes nacen, sino de la calidad de esos animales. Aprende a seleccionar los mejores reproductores.',
        published: true,
        publishedAt: new Date(),
        featuredImage: 'https://images.unsplash.com/photo-1589923188900-85dae5233271?auto=format&fit=crop&q=80', // Guinea pig / Farm placeholder
        categoryId: category.id,
        authorId: 'user_id_placeholder', // Needs a valid user ID, will try to find first user
        // Metadata fields if schema supports them (assuming standard schema)
    };

    // Find a user to assign as author
    const author = await prisma.user.findFirst();
    if (author) {
        postData.authorId = author.id;
    } else {
        console.log('No user found to assign as author. Creating without author if allowed or creating dummy user.');
        // For now, let's assume there is at least one user or author is optional/handled
    }

    // Check if post exists
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

    console.log(`Post created/updated with slug: ${postData.slug}`);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
