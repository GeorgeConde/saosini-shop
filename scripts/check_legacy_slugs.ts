import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const posts = await prisma.blogPost.findMany({
        where: {
            OR: [
                { title: { contains: 'Ectoparásitos' } },
                { title: { contains: 'Cómo empezar' } }
            ]
        },
        select: { id: true, title: true, slug: true }
    });

    console.log('Legacy Posts found:', posts);

    // Target slugs from legacy folders
    const targetSlugs = {
        'Ectoparásitos': 'control-ectoparasitos-cuyes',
        'Cómo empezar': 'como-empezar-crianza-cuyes'
    };

    for (const post of posts) {
        let target = '';
        if (post.title.includes('Ectoparásitos')) target = targetSlugs['Ectoparásitos'];
        if (post.title.includes('Cómo empezar')) target = targetSlugs['Cómo empezar'];

        if (target && post.slug !== target) {
            console.log(`Renaming ${post.slug} -> ${target}`);
            await prisma.blogPost.update({
                where: { id: post.id },
                data: { slug: target }
            });
        }
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
