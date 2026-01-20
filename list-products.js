const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const products = await prisma.product.findMany({
        include: {
            images: true,
            category: true
        }
    })

    console.log('--- PRODUCT LIST ---')
    products.forEach(p => {
        console.log(`- ${p.name} (${p.category?.name})`)
        p.images.forEach(img => {
            console.log(`  * ${img.url}`)
        })
    })
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect())
