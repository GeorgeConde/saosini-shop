const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Clean DB
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.productImage.deleteMany();
    await prisma.productVideo.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    // Categories
    const catReproductores = await prisma.category.create({
        data: {
            name: 'Reproductores',
            slug: 'reproductores',
            description: 'Cuyes de alta genética para reproducción.',
        },
    });

    const catAlimento = await prisma.category.create({
        data: {
            name: 'Alimento',
            slug: 'alimento',
            description: 'Alimento balanceado para todas las etapas.',
        },
    });

    const catAccesorios = await prisma.category.create({
        data: {
            name: 'Accesorios',
            slug: 'accesorios',
            description: 'Equipamiento para tu granja.',
        },
    });

    const catMedicamentos = await prisma.category.create({
        data: {
            name: 'Medicamentos',
            slug: 'medicamentos',
            description: 'Salud y prevención para tus cuyes.',
        },
    });

    // Products - Reproductor Comercial
    await prisma.product.create({
        data: {
            name: 'Hembra Reproductora - Línea Comercial',
            slug: 'hembra-reproductora-comercial',
            description: 'Hembra de 600g ideal para iniciar producción comercial. Excelente prolificidad.',
            type: 'REPRODUCTOR_COMERCIAL',
            price: 50.00,
            requiresCoordination: true,
            manageInventory: true,
            stockQuantity: 100,
            categoryId: catReproductores.id,
            status: 'active',
            technicalData: {
                peso: '600g',
                edad: '3 meses',
                linea: 'Perú',
            },
            images: {
                create: [
                    { url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=400', isPrimary: true }
                ]
            }
        },
    });

    // Product - Reproductor Premium (Animal Único)
    await prisma.product.create({
        data: {
            name: 'Macho Alfa Premium - Línea Inti',
            slug: 'macho-alfa-premium-inti',
            description: 'Ejemplar sobresaliente con características genéticas superiores. Cabeza ancha y gran profundidad.',
            type: 'REPRODUCTOR_PREMIUM',
            price: 150.00,
            requiresCoordination: true,
            manageInventory: false,
            categoryId: catReproductores.id,
            status: 'active',
            technicalData: {
                peso: '1.2kg',
                edad: '5 meses',
                linea: 'Inti',
                caracteristicas: 'Elite',
            },
            images: {
                create: [
                    { url: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?auto=format&fit=crop&q=80&w=400', isPrimary: true },
                    { url: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=400', isPrimary: false }
                ]
            }
        },
    });

    // Product - Alimento
    await prisma.product.create({
        data: {
            name: 'Saco Alimento Balanceado - Engorde 40kg',
            slug: 'alimento-engorde-40kg',
            description: 'Fórmula optimizada para el crecimiento rápido y saludable.',
            type: 'ALIMENTO',
            price: 85.00,
            requiresCoordination: true,
            manageInventory: true,
            stockQuantity: 50,
            categoryId: catAlimento.id,
            status: 'active',
            images: {
                create: [
                    { url: 'https://images.unsplash.com/photo-1545143333-e8bd3346e9d6?auto=format&fit=crop&q=80&w=400', isPrimary: true }
                ]
            }
        },
    });

    // Product - Accesorio
    await prisma.product.create({
        data: {
            name: 'Comedero Cerámico Pesado',
            slug: 'comedero-ceramico',
            description: 'Evita desperdicios. Fácil de limpiar y muy resistente.',
            type: 'ACCESORIO',
            price: 15.00,
            requiresCoordination: false,
            manageInventory: true,
            stockQuantity: 200,
            categoryId: catAccesorios.id,
            status: 'active',
            images: {
                create: [
                    { url: 'https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=400', isPrimary: true }
                ]
            }
        },
    });

    console.log('Seed completed successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
