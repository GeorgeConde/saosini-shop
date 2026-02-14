import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando creación del artículo "Ciclo Reproductivo"...');

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

    // 3. Definir contenido HTML con DISEÑO MEJORADO (Light Theme Safe)
    const contentHtml = `
    <div class="lead text-xl text-neutral-600 font-medium mb-10 border-l-4 border-green-500 pl-6 italic">
        "Lograr cuyes de 1 kilo a los 55 días no es suerte, es ciencia. Todo empieza con un buen empadre y un ciclo reproductivo estricto."
    </div>

    <!-- VIDEO HERO -->
    <div class="my-12 relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-neutral-900/10 transform hover:scale-[1.005] transition-transform duration-500">
        <div class="aspect-video w-full bg-neutral-900">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/qIy2wiPRqN8" title="Ciclo Reproductivo del Cuy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>

    <!-- VISUAL CYCLE TIMELINE -->
    <div class="bg-neutral-50 p-8 rounded-3xl border border-neutral-200 my-16 overflow-hidden">
        <h2 class="text-center mb-10 !mt-0">El Ciclo Saosini: Paso a Paso</h2>
        
        <div class="relative">
            <!-- Connecting Line -->
            <div class="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-green-200 to-green-600 md:left-1/2 md:-ml-0.5"></div>

            <!-- Step 1: Empadre -->
            <div class="relative flex flex-col md:flex-row gap-8 mb-12 items-center">
                <div class="flex-1 md:text-right order-2 md:order-1">
                    <h3 class="font-bold text-green-900 text-xl m-0">1. El Empadre</h3>
                    <p class="text-neutral-600 text-sm">Formamos "familias" con genética seleccionada.</p>
                </div>
                <div class="w-8 h-8 bg-green-600 rounded-full border-4 border-white shadow flex-shrink-0 z-10 order-1 md:order-2"></div>
                <div class="flex-1 order-3 bg-white p-4 rounded-xl shadow-sm border border-green-100">
                    <strong class="block text-green-700 mb-1">Proporción Ideal:</strong>
                    7-8 Hembras x 1 Macho
                </div>
            </div>

            <!-- Step 2: Gestación -->
            <div class="relative flex flex-col md:flex-row gap-8 mb-12 items-center">
                <div class="flex-1 md:text-right order-2 md:order-1 bg-white p-4 rounded-xl shadow-sm border border-purple-100">
                    <strong class="block text-purple-700 mb-1">Duración:</strong>
                    67 días (aprox.)
                    <div class="text-xs text-neutral-400 mt-1">Cero estrés + Fibra Alta</div>
                </div>
                <div class="w-8 h-8 bg-purple-600 rounded-full border-4 border-white shadow flex-shrink-0 z-10 order-1 md:order-2"></div>
                <div class="flex-1 order-3">
                    <h3 class="font-bold text-purple-900 text-xl m-0">2. Gestación</h3>
                    <p class="text-neutral-600 text-sm">Alimentación rica en energía para desarrollo fetal.</p>
                </div>
            </div>

            <!-- Step 3: Destete -->
            <div class="relative flex flex-col md:flex-row gap-8 mb-12 items-center">
                <div class="flex-1 md:text-right order-2 md:order-1">
                    <h3 class="font-bold text-orange-900 text-xl m-0">3. Destete y Sexaje</h3>
                    <p class="text-neutral-600 text-sm">Separación de crías y clasificación por sexo.</p>
                </div>
                <div class="w-8 h-8 bg-orange-600 rounded-full border-4 border-white shadow flex-shrink-0 z-10 order-1 md:order-2"></div>
                <div class="flex-1 order-3 bg-white p-4 rounded-xl shadow-sm border border-orange-100">
                    <strong class="block text-orange-700 mb-1">Momento Clave:</strong>
                    14 días de vida
                </div>
            </div>

            <!-- Step 4: Engorde -->
            <div class="relative flex flex-col md:flex-row gap-8 items-center">
                <div class="flex-1 md:text-right order-2 md:order-1 bg-white p-4 rounded-xl shadow-sm border border-red-100">
                    <strong class="block text-red-700 mb-1">Meta Saosini:</strong>
                    1 Kg en 55 días
                </div>
                <div class="w-8 h-8 bg-red-600 rounded-full border-4 border-white shadow flex-shrink-0 z-10 order-1 md:order-2"></div>
                <div class="flex-1 order-3">
                    <h3 class="font-bold text-red-900 text-xl m-0">4. Engorde</h3>
                    <p class="text-neutral-600 text-sm">Alimentación intensiva para salida al mercado.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- SELECCIÓN NUMBERS GRID -->
    <div class="my-16">
        <h2 class="text-center mb-8 !mt-0">Criterios de Selección (Empadre)</h2>
        <div class="grid md:grid-cols-2 gap-8 not-prose">
            <!-- Hembras -->
            <div class="bg-pink-50 p-6 rounded-2xl border border-pink-100 text-center">
                <h3 class="text-pink-900 font-bold mb-4">🚺 Hembras</h3>
                <div class="flex justify-around items-center">
                    <div>
                        <div class="text-3xl font-bold text-pink-600">750g</div>
                        <div class="text-xs text-pink-800 uppercase tracking-widest">Peso Mínimo</div>
                    </div>
                    <div class="h-8 w-px bg-pink-200"></div>
                    <div>
                        <div class="text-3xl font-bold text-pink-600">35-40</div>
                        <div class="text-xs text-pink-800 uppercase tracking-widest">Días Edad</div>
                    </div>
                </div>
            </div>

            <!-- Machos -->
            <div class="bg-blue-50 p-6 rounded-2xl border border-blue-100 text-center">
                <h3 class="text-blue-900 font-bold mb-4">🚹 Machos</h3>
                <div class="flex justify-around items-center">
                    <div>
                        <div class="text-3xl font-bold text-blue-600">1.1kg</div>
                        <div class="text-xs text-blue-800 uppercase tracking-widest">Peso Mínimo</div>
                    </div>
                    <div class="h-8 w-px bg-blue-200"></div>
                    <div>
                        <div class="text-3xl font-bold text-blue-600">60+</div>
                        <div class="text-xs text-blue-800 uppercase tracking-widest">Días Edad</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- RESUMEN SAOSINI CARD -->
    <div class="bg-green-50 text-green-900 rounded-3xl p-8 md:p-10 my-16 border border-green-100 shadow-sm not-prose">
        <h3 class="font-bold text-xl mb-4 flex items-center gap-2">
            <span>🚀</span> Récord Saosini
        </h3>
        <p class="mb-6 text-green-800/80">
            Gracias a la genética y alimentación, logramos sacar cuyes al mercado en tiempo récord. El clima de Cusco es un reto, pero el manejo lo supera.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="font-bold text-green-700">67 Días</div>
                <div class="text-[10px] text-green-600 uppercase">Gestación</div>
            </div>
            <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="font-bold text-green-700">14 Días</div>
                <div class="text-[10px] text-green-600 uppercase">Lactancia</div>
            </div>
            <div class="bg-white p-3 rounded-lg shadow-sm">
                <div class="font-bold text-green-700">40 Días</div>
                <div class="text-[10px] text-green-600 uppercase">Engorde</div>
            </div>
            <div class="bg-green-600 p-3 rounded-lg shadow-sm">
                <div class="font-bold text-white">55 Días</div>
                <div class="text-[10px] text-green-100 uppercase">Venta (1kg)</div>
            </div>
        </div>
    </div>

    <!-- CTA VENTAS -->
    <div class="text-center my-16 bg-white border border-neutral-100 p-8 rounded-3xl shadow-sm">
        <h3 class="text-neutral-900 font-bold text-2xl mb-4">¿Quieres estos mismos resultados?</h3>
        <p class="text-neutral-600 mb-8 max-w-2xl mx-auto">
            La clave no es "suerte", es <strong>Genética</strong>. No todas las hembras sirven para cría. Empieza con pies de cría seleccionados por nosotros.
        </p>
        
        <a href="/catalogo/hembra-reproductora-linea-comercial" class="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-green-600/30 no-underline transform hover:-translate-y-1 text-lg">
            <span>🧬</span> Comprar Reproductores Saosini
        </a>
    </div>

    <div class="text-center text-sm text-neutral-400 mt-12 bg-neutral-50 py-4 rounded-xl border border-neutral-100">
        ¿Tienes dudas sobre el sexaje? Déjanos tu pregunta abajo.
    </div>
    `;

    // 4. Upsert Post
    const postData = {
        title: 'El Ciclo Reproductivo del Cuy: Guía Paso a Paso en Granja Saosini',
        slug: 'ciclo-reproductivo-cuy-guia-paso-a-paso-saosini',
        content: contentHtml,
        excerpt: 'Desde el empadre hasta la venta en 55 días. Descubre los tiempos exactos, pesos de selección y el manejo reproductivo que usamos en Cusco.',
        metaDescription: 'Ciclo reproductivo del cuy explicado paso a paso. Empadre, gestación de 67 días, destete a los 14 días y engorde rápido con el método Saosini.',
        status: 'PUBLISHED' as const,
        publishedAt: new Date(),
        featuredImage: 'https://img.youtube.com/vi/qIy2wiPRqN8/maxresdefault.jpg',
        featuredImageAlt: 'Ciclo Reproductivo del Cuy - Granja Saosini',
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
