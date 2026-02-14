import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando creación del artículo "Bebederos Automáticos"...');

    // 1. Obtener o crear categoría 'Infraestructura y Equipamiento'
    let category = await prisma.blogCategory.findFirst({
        where: { slug: 'infraestructura-equipamiento' }
    });

    if (!category) {
        console.log('Creando categoría: Infraestructura y Equipamiento...');
        category = await prisma.blogCategory.create({
            data: {
                name: 'Infraestructura y Equipamiento',
                slug: 'infraestructura-equipamiento',
                description: 'Jaulas, sistemas de agua, comederos y tecnología para tu granja.'
            }
        });
    }

    // 2. Obtener autor
    const author = await prisma.user.findFirst();

    // 3. Definir contenido HTML con DISEÑO MEJORADO (Light Theme Safe)
    const contentHtml = `
    <div class="lead text-xl text-neutral-600 font-medium mb-10 border-l-4 border-blue-500 pl-6 italic">
        "El agua es el nutriente más barato, pero el más difícil de gestionar. Un mal sistema de bebederos te costará horas de limpieza y la salud de tus cuyes."
    </div>

    <!-- VIDEO HERO -->
    <div class="my-12 relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-neutral-900/10 transform hover:scale-[1.005] transition-transform duration-500">
        <div class="aspect-video w-full bg-neutral-900">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/IWymO8Us6Ao" title="Instalación de Bebederos Automáticos para Cuyes" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>

    <!-- PROBLEM VS SOLUTION GRID -->
    <div class="my-16">
        <h2 class="text-center mb-10 !mt-0">¿Por qué fallan los sistemas comunes?</h2>
        
        <div class="grid md:grid-cols-2 gap-8 not-prose">
            <!-- Problemas (Red) -->
            <div class="bg-red-50 p-8 rounded-3xl border border-red-100">
                <h3 class="text-red-900 font-bold text-xl mb-6 flex items-center gap-2">
                    <span>❌</span> Lo que debes evitar
                </h3>
                <ul class="space-y-4">
                    <li class="flex gap-3">
                        <div class="w-2 h-2 mt-2 bg-red-400 rounded-full flex-shrink-0"></div>
                        <div>
                            <strong class="text-red-900">Desgaste Prematuro:</strong>
                            <p class="text-sm text-red-800/80 m-0">Chupones económicos que gotean en menos de 6 meses.</p>
                        </div>
                    </li>
                    <li class="flex gap-3">
                        <div class="w-2 h-2 mt-2 bg-red-400 rounded-full flex-shrink-0"></div>
                        <div>
                            <strong class="text-red-900">Mangueras Transparentes:</strong>
                            <p class="text-sm text-red-800/80 m-0">Permiten luz = Algas y bacterias en el agua.</p>
                        </div>
                    </li>
                    <li class="flex gap-3">
                        <div class="w-2 h-2 mt-2 bg-red-400 rounded-full flex-shrink-0"></div>
                        <div>
                            <strong class="text-red-900">Uniones Frágiles:</strong>
                            <p class="text-sm text-red-800/80 m-0">Las "T" de plástico se rajan y causan inundaciones.</p>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Solución Saosini (Green) -->
            <div class="bg-green-50 p-8 rounded-3xl border border-green-100 shadow-lg">
                <h3 class="text-green-900 font-bold text-xl mb-6 flex items-center gap-2">
                    <span>✅</span> El "Sistema Saosini"
                </h3>
                <ul class="space-y-4">
                    <li class="flex gap-3">
                        <div class="w-2 h-2 mt-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <div>
                            <strong class="text-green-900">Acero Inoxidable 304:</strong>
                            <p class="text-sm text-green-800/80 m-0">Durabilidad de más de 5 años. Sin óxido.</p>
                        </div>
                    </li>
                    <li class="flex gap-3">
                        <div class="w-2 h-2 mt-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <div>
                            <strong class="text-green-900">Cero Algas (Tubo PVC):</strong>
                            <p class="text-sm text-green-800/80 m-0">Al ser opaco, la luz no entra y el agua se mantiene cristalina.</p>
                        </div>
                    </li>
                    <li class="flex gap-3">
                        <div class="w-2 h-2 mt-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <div>
                            <strong class="text-green-900">Sin Atascos:</strong>
                            <p class="text-sm text-green-800/80 m-0">Instalación rígida que resiste la presión y evita fugas.</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <!-- TUTORIAL STEP BY STEP -->
    <div class="bg-white border border-neutral-200 p-8 rounded-3xl my-16 shadow-sm">
        <h2 class="text-center mb-10 !mt-0">Tutorial de Instalación en PVC</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 not-prose text-center">
            <div>
                <div class="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">🛠️</div>
                <h4 class="font-bold text-neutral-900 mb-2">1. Herramientas</h4>
                <p class="text-sm text-neutral-600">Taladro con broca de 3/8".</p>
            </div>
            <div>
                <div class="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">📐</div>
                <h4 class="font-bold text-neutral-900 mb-2">2. Perforación</h4>
                <p class="text-sm text-neutral-600">Agujero a 90° exactos en el tubo.</p>
            </div>
            <div>
                <div class="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">🔄</div>
                <h4 class="font-bold text-neutral-900 mb-2">3. Sellado</h4>
                <p class="text-sm text-neutral-600">Cinta teflón en la rosca del chupón.</p>
            </div>
            <div>
                <div class="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">🔧</div>
                <h4 class="font-bold text-neutral-900 mb-2">4. Ajuste</h4>
                <p class="text-sm text-neutral-600">Enroscar firme con el tubo ya fijado.</p>
            </div>
        </div>
    </div>

    <!-- MEDICACIÓN SECTION -->
    <div class="bg-blue-50 text-blue-900 rounded-3xl p-8 md:p-10 my-16 border border-blue-100 not-prose">
        <div class="flex flex-col md:flex-row gap-8 items-center">
            <div class="flex-1">
                <h3 class="font-bold text-2xl mb-4 flex items-center gap-2">
                    <span>💊</span> El Truco de la Medicación
                </h3>
                <p class="text-blue-800/80 text-lg leading-relaxed">
                    Nuestro sistema es híbrido. Usualmente usamos el tanque principal, pero tenemos un <strong>tanque auxiliar</strong> conectado.
                    <br/><br/>
                    Cuando necesitamos dar <strong>Complejo B</strong> o antibióticos, cerramos la llave principal y abrimos el auxiliar con la dosis exacta. ¡Cero desperdicio!
                </p>
            </div>
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-blue-200 w-full md:w-auto min-w-[250px] text-center">
                <div class="text-4xl mb-2">💧</div>
                <div class="font-bold text-blue-800">Sistema Limpio</div>
                <div class="text-xs text-blue-600 mt-2">Llaves de desfogue al final de cada línea para limpieza rápida.</div>
            </div>
        </div>
    </div>

    <!-- CTA VENTAS -->
    <div class="text-center my-16 bg-gradient-to-br from-neutral-800 to-neutral-900 text-white p-10 rounded-3xl shadow-2xl">
        <h3 class="font-bold text-2xl mb-4">Profesionaliza tu Granja Hoy</h3>
        <p class="text-neutral-300 mb-8 max-w-2xl mx-auto">
            Olvídate de lavar platos y de las fugas constantes. Invierte en componentes de acero inoxidable que duran años.
        </p>
        
        <a href="/catalogo/bebedero-para-cuyes-chupon-jebe-negro" class="inline-flex items-center gap-2 bg-green-500 text-green-950 px-8 py-4 rounded-full font-bold hover:bg-green-400 transition-all shadow-lg shadow-green-900/50 no-underline transform hover:-translate-y-1 text-lg">
            <span>💧</span> Comprar Chupones Inoxidables
        </a>
    </div>

    <div class="text-center text-sm text-neutral-400 mt-12 bg-neutral-50 py-4 rounded-xl border border-neutral-100">
        ¿Dudas sobre la instalación? Escríbenos al WhatsApp para asesorarte con los componentes.
    </div>
    `;

    // 4. Upsert Post
    const postData = {
        title: 'Cómo instalar bebederos automáticos para cuyes | Sistema de PVC Duradero',
        slug: 'como-instalar-bebederos-automaticos-cuyes-sistema-pvc-duradero',
        content: contentHtml,
        excerpt: 'Olvídate de las fugas y el agua sucia. Tutorial paso a paso para instalar chupones de acero inoxidable en tubería PVC. Sistema Saosini garantizado.',
        metaDescription: 'Guía de instalación de bebederos automáticos para cuyes. Evita algas y fugas con nuestro sistema de PVC y chupones de acero inoxidable.',
        status: 'PUBLISHED' as const,
        publishedAt: new Date(),
        featuredImage: 'https://img.youtube.com/vi/IWymO8Us6Ao/maxresdefault.jpg',
        featuredImageAlt: 'Instalación de Bebederos Automáticos - Granja Saosini',
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
