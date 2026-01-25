const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding blog data...');

    // 1. Create Blog Categories
    const catCrianza = await prisma.blogCategory.upsert({
        where: { slug: 'crianza-tecnica' },
        update: {},
        create: {
            name: 'Crianza Técnica',
            slug: 'crianza-tecnica',
            description: 'Guías paso a paso para mejorar la producción de cuyes.'
        }
    });

    const catAlimentacion = await prisma.blogCategory.upsert({
        where: { slug: 'alimentacion-nutricion' },
        update: {},
        create: {
            name: 'Alimentación y Nutrición',
            slug: 'alimentacion-nutricion',
            description: 'Todo sobre forraje, concentrados y requerimientos nutricionales.'
        }
    });

    // 2. Get or Create an Author (Admin user)
    let author = await prisma.user.findFirst({
        where: { role: 'ADMIN' }
    });

    if (!author) {
        console.log('No admin user found. Creating a default admin...');
        const hashedPassword = await bcrypt.hash('admin123', 10);
        author = await prisma.user.create({
            data: {
                name: 'Administrador Saosini',
                email: 'admin@saosini.com',
                password: hashedPassword,
                role: 'ADMIN',
            }
        });
    }

    // 3. Create sample posts
    const posts = [
        {
            title: 'Guía de Alimentación en Etapa de Crecimiento',
            slug: 'guia-alimentacion-crecimiento',
            excerpt: 'Aprende cómo optimizar el peso de tus cuyes en sus primeras semanas.',
            content: 'La alimentación es el pilar fundamental... [Contenido de ejemplo]',
            status: 'PUBLISHED',
            publishedAt: new Date(),
            categoryId: catAlimentacion.id,
            authorId: author.id
        },
        {
            title: 'Manejo de Recría y Selección de Reproductores',
            slug: 'manejo-recria-seleccion',
            excerpt: 'Cómo seleccionar los mejores ejemplares para mejorar la genética de tu granja.',
            content: 'La selección genética es clave... [Contenido de ejemplo]',
            status: 'PUBLISHED',
            publishedAt: new Date(),
            categoryId: catCrianza.id,
            authorId: author.id
        }
    ];

    for (const post of posts) {
        await prisma.blogPost.upsert({
            where: { slug: post.slug },
            update: post,
            create: post
        });
    }

    console.log('Seeding completed!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
