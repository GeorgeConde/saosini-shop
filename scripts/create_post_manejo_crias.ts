import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando creación del artículo "Manejo de Crías"...');

    // 1. Obtener o crear categoría 'Reproducción y Genética'
    let category = await prisma.blogCategory.findFirst({
        where: { slug: 'reproduccion-genetica' }
    });

    if (!category) {
        console.log('Creando categoría: Reproducción y Genética...');
        category = await prisma.blogCategory.create({
            data: {
                name: 'Reproducción y Genética',
                slug: 'reproduccion-genetica',
                description: 'Mejora genética, empadre, partos y manejo de crías.'
            }
        });
    }

    // 2. Obtener autor
    const author = await prisma.user.findFirst();

    // 3. Definir contenido HTML con DISEÑO MEJORADO
    const contentHtml = `
    <div class="lead text-xl text-neutral-600 font-medium mb-10 border-l-4 border-red-500 pl-6 italic">
        "En la crianza de cuyes, cada cría que se pierde es una pérdida directa de dinero y tiempo. El periodo más crítico son las primeras dos semanas de vida."
    </div>

    <!-- VIDEO HERO -->
    <div class="my-12 relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-neutral-900/10 transform hover:scale-[1.005] transition-transform duration-500">
        <div class="aspect-video w-full bg-neutral-900">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/ovo5Jj6JNTU" title="Manejo de Crías en Cuyes" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>

    <!-- CONFORT Y SANIDAD GRID -->
    <div class="my-16">
        <h2 class="text-center mb-8 !mt-0">1. Confort y Sanidad al Momento del Parto</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
            
            <div class="bg-amber-50 p-6 rounded-2xl border border-amber-200 hover:shadow-lg transition-all text-center">
                <div class="text-4xl mb-3">🛏️</div>
                <h3 class="font-bold text-amber-900 mb-2 text-lg">La Cama es Vital</h3>
                <p class="text-sm text-neutral-600">Usar residuo de avena o paja. Evita el contacto directo con el frío del suelo y la humedad.</p>
            </div>

            <div class="bg-blue-50 p-6 rounded-2xl border border-blue-200 hover:shadow-lg transition-all text-center">
                <div class="text-4xl mb-3">🫁</div>
                <h3 class="font-bold text-blue-900 mb-2 text-lg">Prevención de Neumonía</h3>
                <p class="text-sm text-neutral-600">El polvo de guano es mortal. Una cama limpia garantiza aire puro en su primera respiración.</p>
            </div>

            <div class="bg-red-50 p-6 rounded-2xl border border-red-200 hover:shadow-lg transition-all text-center">
                <div class="text-4xl mb-3">🌡️</div>
                <h3 class="font-bold text-red-900 mb-2 text-lg">Temperatura Ideal</h3>
                <p class="text-sm text-neutral-600">Mantener entre <strong>15°C y 25°C</strong>. El frío extremo es el enemigo #1 de las crías.</p>
            </div>
        </div>
    </div>

    <!-- CELO POST-PARTO (SAOSINI METHOD) - LIGHT THEME -->
    <div class="bg-green-50 text-green-900 rounded-3xl p-8 md:p-12 my-16 shadow-lg border border-green-100 relative overflow-hidden not-prose">
        <div class="relative z-10">
            <h2 class="text-green-900 mb-4 !mt-0 flex items-center gap-3">
                <span class="text-3xl">⚡</span> El Celo Post-Parto: Método Saosini
            </h2>
            <p class="text-lg text-green-800 font-medium mb-8 max-w-3xl leading-relaxed">
                No perdemos tiempo. La hembra entra en celo apenas <strong class="bg-green-200 text-green-900 px-2 py-1 rounded">2 horas después del parto</strong>.
            </p>

            <div class="space-y-4">
                <div class="flex gap-4 items-start">
                    <div class="bg-green-200 text-green-900 font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">1</div>
                    <div>
                        <h4 class="font-bold text-green-900 m-0">Monta Inmediata</h4>
                        <p class="text-sm text-green-800/80 m-0">Mantenemos al macho en la poza para asegurar la monta post-parto.</p>
                    </div>
                </div>
                <div class="flex gap-4 items-start">
                    <div class="bg-green-200 text-green-900 font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">2</div>
                    <div>
                        <h4 class="font-bold text-green-900 m-0">Separación Estratégica</h4>
                        <p class="text-sm text-green-800/80 m-0">Una vez cubierta, movemos a la madre a maternidad para que críe tranquila.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- MANEJO DE CAMADAS -->
    <div class="bg-neutral-50 px-6 py-12 rounded-3xl border border-neutral-200 my-16">
        <h2 class="text-center mb-10 !mt-0">Manejo de Camadas Numerosas (5-6 crías)</h2>
        <div class="grid md:grid-cols-2 gap-8 not-prose">
            <div class="bg-white p-6 rounded-xl shadow-sm">
                <h3 class="font-bold text-neutral-900 mb-3 text-lg flex items-center gap-2">🛡️ Uso de Gazaperas</h3>
                <p class="text-neutral-600 text-sm">Estructuras que protegen a las crías de ser aplastadas y les permiten comer alimento tierno sin competencia de adultos.</p>
            </div>
            
            <div class="bg-white p-6 rounded-xl shadow-sm">
                <h3 class="font-bold text-neutral-900 mb-3 text-lg flex items-center gap-2">⏳ Destete a los 14 Días</h3>
                <p class="text-neutral-600 text-sm">A las dos semanas la cría ya come sola. La madre debe regresar a su poza para descansar antes del siguiente parto.</p>
            </div>
        </div>
    </div>

    <!-- SELECCIÓN MATERNA -->
    <div class="my-16">
        <h2 class="!mt-0">Selección Implacable</h2>
        <p>En Saosini somos estrictos: si una hembra no logra criar bien en su 2do parto o aborta, se descarta. <strong>La rentabilidad no admite sentimientos.</strong></p>
    </div>

    <!-- CTA VENTAS -->
    <div class="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl border border-green-200 text-center my-16 shadow-lg">
        <h3 class="font-bold text-2xl text-green-900 mb-4">Empieza con Genética Superior</h3>
        <p class="text-green-800/80 mb-8 max-w-xl mx-auto">
            No pierdas años seleccionando. Nuestros reproductores ya tienen fijada la alta precocidad y habilidad materna.
        </p>
        
        <a href="/catalogo/hembra-reproductora-linea-comercial" class="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-green-600/30 no-underline transform hover:-translate-y-1 text-lg">
            <span>🐹</span> Comprar Hembras Reproductoras
        </a>
        <p class="mt-4 text-xs text-green-700 font-medium">Envíos garantizados a nivel nacional.</p>
    </div>

    <div class="text-center text-sm text-neutral-400 mt-12 bg-neutral-50 py-4 rounded-xl border border-neutral-100">
        ¿Te interesa aprender en vivo? <strong>Pregunta por nuestras Pasantías en Cusco</strong> en los comentarios.
    </div>
    `;

    // 4. Upsert Post
    const postData = {
        title: 'Cómo cuidar crías de cuyes recién nacidas | Guía de Manejo Saosini',
        slug: 'como-cuidar-crias-cuyes-recien-nacidas-guia-saosini',
        content: contentHtml,
        excerpt: 'Reduce la mortalidad de tus crías con este protocolo. Aprende sobre el confort al parto, el celo post-parto y el manejo de camadas numerosas.',
        metaDescription: 'Guía de manejo de crías de cuyes recién nacidas. Evita neumonía, aprovecha el celo post-parto y asegura el crecimiento de camadas numerosas.',
        status: 'PUBLISHED' as const,
        publishedAt: new Date(),
        featuredImage: 'https://img.youtube.com/vi/ovo5Jj6JNTU/maxresdefault.jpg',
        featuredImageAlt: 'Manejo de Crías en Cuyes - Granja Saosini',
        categoryId: category.id,
        authorId: author?.id || '',
    };

    if (!author) {
        console.error('No se encontró autor.');
        return;
    }

    const existing = await prisma.blogPost.findUnique({
        where: { slug: postData.slug }
    });

    if (existing) {
        console.log('Actualizando artículo...');
        await prisma.blogPost.update({
            where: { slug: postData.slug },
            data: postData
        });
    } else {
        console.log('Creando nuevo artículo...');
        await prisma.blogPost.create({
            data: postData
        });
    }

    console.log(`ÉXITO. Artículo creado/actualizado: ${postData.title}`);
}

main()
    .catch(e => console.error('ERROR FATAL:', e))
    .finally(async () => await prisma.$disconnect());
