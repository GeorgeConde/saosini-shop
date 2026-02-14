import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando creación del artículo "Formulación de Alimento Balanceado"...');

    // 1. Obtener o crear categoría 'Alimentación y Nutrición'
    let category = await prisma.blogCategory.findFirst({
        where: { slug: 'alimentacion-nutricion' }
    });

    if (!category) {
        // Fallback si no existe (aunque debería por el script anterior)
        console.log('Creando categoría: Alimentación y Nutrición...');
        category = await prisma.blogCategory.create({
            data: {
                name: 'Alimentación y Nutrición',
                slug: 'alimentacion-nutricion',
                description: 'Todo sobre forraje, concentrados y requerimientos nutricionales.'
            }
        });
    }

    // 2. Obtener autor (Admin)
    const author = await prisma.user.findFirst();

    // 3. Definir contenido HTML con DISEÑO MEJORADO (Tailwind)
    const contentHtml = `
    <div class="lead text-xl text-neutral-600 font-medium mb-10 border-l-4 border-yellow-500 pl-6 italic">
        "Fabricar tu propio balanceado no solo reduce los costos a casi 2.15 soles por kilo, sino que garantiza que tus cuyes reciban exactamente lo que necesitan para crecer rápido y sanos."
    </div>

    <!-- VIDEO HERO -->
    <div class="my-12 relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-neutral-900/10 transform hover:scale-[1.005] transition-transform duration-500">
        <div class="aspect-video w-full bg-neutral-900">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/_iBuN9Nk33g" title="Formulación de Alimento Balanceado para Cuyes" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>

    <!-- NECESIDADES NUTRICIONALES -->
    <div class="bg-neutral-900 text-white rounded-3xl p-8 md:p-12 my-16 shadow-2xl relative overflow-hidden not-prose">
        <div class="absolute top-0 right-0 w-96 h-96 bg-green-600 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
        <div class="relative z-10">
            <h2 class="text-white text-center mb-10 !mt-0">Los Números Mágicos: Requerimientos del Cuy</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div class="text-5xl font-bold text-green-400 mb-2">18-20%</div>
                    <div class="text-sm uppercase tracking-widest font-bold text-neutral-400">Proteína</div>
                    <p class="text-xs text-neutral-500 mt-2">Para crecimiento rápido</p>
                </div>
                
                <div class="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div class="text-5xl font-bold text-yellow-400 mb-2">2,900</div>
                    <div class="text-sm uppercase tracking-widest font-bold text-neutral-400">Kcal/kg</div>
                    <p class="text-xs text-neutral-500 mt-2">Energía Digestible</p>
                </div>

                <div class="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div class="text-5xl font-bold text-orange-400 mb-2">12%</div>
                    <div class="text-sm uppercase tracking-widest font-bold text-neutral-400">Fibra</div>
                    <p class="text-xs text-neutral-500 mt-2">Salud Digestiva</p>
                </div>
            </div>
            
            <div class="mt-8 text-center text-sm text-neutral-400 bg-black/20 p-4 rounded-xl">
                ⚠️ Si tu fórmula no llega a estos niveles, tus cuyes comerán mucho pero no ganarán peso.
            </div>
        </div>
    </div>

    <!-- INSUMOS CLAVE GRID -->
    <div class="my-16">
        <h2 class="text-center mb-8 !mt-0">Insumos Clave y sus Aportes</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 not-prose">
            
            <div class="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 hover:shadow-lg transition-all text-center">
                <div class="text-4xl mb-3">🌽</div>
                <h3 class="font-bold text-neutral-900 mb-2 text-lg">Harina de Maíz</h3>
                <p class="text-sm text-neutral-600">Principal fuente de <strong>energía</strong>.</p>
            </div>

            <div class="bg-amber-50 p-6 rounded-2xl border border-amber-100 hover:shadow-lg transition-all text-center">
                <div class="text-4xl mb-3">🫘</div>
                <h3 class="font-bold text-neutral-900 mb-2 text-lg">Torta de Soya</h3>
                <p class="text-sm text-neutral-600">Aporta la <strong>proteína</strong>. ¡Cuidado con el exceso! (Diarreas).</p>
            </div>

            <div class="bg-orange-50 p-6 rounded-2xl border border-orange-100 hover:shadow-lg transition-all text-center">
                <div class="text-4xl mb-3">🌾</div>
                <h3 class="font-bold text-neutral-900 mb-2 text-lg">Afrecho de Trigo</h3>
                <p class="text-sm text-neutral-600">Fuente barata de <strong>fibra</strong> (hasta 30%).</p>
            </div>

            <div class="bg-green-50 p-6 rounded-2xl border border-green-100 hover:shadow-lg transition-all text-center">
                <div class="text-4xl mb-3">🌿</div>
                <h3 class="font-bold text-neutral-900 mb-2 text-lg">Harina de Alfalfa</h3>
                <p class="text-sm text-neutral-600">Proteína natural y fibra de <strong>alta calidad</strong>.</p>
            </div>
        </div>
        
        <div class="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h4 class="font-bold text-blue-900 !mt-0 mb-2 flex items-center gap-2">🧪 Micro-ingredientes (El toque secreto)</h4>
            <ul class="grid md:grid-cols-3 gap-4 text-sm text-blue-800 m-0">
                <li class="flex items-center gap-2">✅ <strong>Vitamina C:</strong> Vital, el cuy no la produce.</li>
                <li class="flex items-center gap-2">✅ <strong>Sales Minerales:</strong> Huesos fuertes.</li>
                <li class="flex items-center gap-2">✅ <strong>Eco-H (Batilana):</strong> Salud intestinal.</li>
            </ul>
        </div>
    </div>

    <!-- COMPARATIVA PRECIOS -->
    <div class="flex flex-col md:flex-row gap-8 items-stretch my-16 not-prose">
        <div class="flex-1 bg-neutral-100 p-8 rounded-3xl opacity-70 grayscale hover:grayscale-0 transition-all">
            <h3 class="text-neutral-500 font-bold uppercase tracking-wider text-sm mb-4">Alimento Comercial</h3>
            <div class="text-4xl font-bold text-neutral-900 mb-2">S/ 2.40</div>
            <div class="text-sm text-neutral-500 mb-6">por kilo (aprox.)</div>
            <div class="flex items-center gap-2 text-red-500 font-bold">
                <span>📉</span> Solo 14% Proteína
            </div>
        </div>

        <div class="flex-1 bg-green-600 text-white p-8 rounded-3xl shadow-xl transform md:-translate-y-4 md:scale-105 z-10">
            <h3 class="text-green-200 font-bold uppercase tracking-wider text-sm mb-4">Fórmula Saosini</h3>
            <div class="text-5xl font-bold text-white mb-2">S/ 2.15</div>
            <div class="text-sm text-green-100 mb-6">por kilo</div>
            <div class="flex items-center gap-2 text-white font-bold bg-white/20 p-2 rounded-lg inline-block">
                <span>📈</span> 19% Proteína Real
            </div>
            <p class="mt-4 text-sm text-green-100 border-t border-green-500 pt-4">
                Más nutrición por menos dinero. El ahorro mensual en una granja mediana es enorme.
            </p>
        </div>
    </div>

    <!-- SOFTWARE DOWNLOAD REPLACED BY PRODUCT CTA -->
    <div class="my-16 text-center bg-green-50 p-10 rounded-3xl border border-green-100">
        <h2 class="!mt-0 text-green-900">¿Hacerlo tú mismo o asegurar resultados?</h2>
        <p class="max-w-2xl mx-auto mb-10 text-green-800/80">
            Formular puede ser complicado y riesgoso. Si buscas crecimiento acelerado sin complicaciones, usa la misma fórmula que nos ha funcionado por años.
        </p>
        
        <a href="/catalogo/alimento-balanceado-saosini-super-premiun" class="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-green-600 font-lg rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 hover:shadow-lg hover:shadow-green-600/30 no-underline hover:-translate-y-1">
            <span class="mr-3 text-2xl">🥣</span>
            COMPRAR ALIMENTO BALANCEADO SAOSINI
            <div class="absolute -top-3 -right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce">
                ¡OFERTA!
            </div>
        </a>
        
        <p class="mt-6 text-sm text-green-700">
            Envíos a todo el Perú. Presentaciones de 1kg, 10kg y 50kg.
        </p>
    </div>

    <!-- CTA PRODUCTO -->
    <!-- CTA PRODUCTO SECUNDARIO -->
    <div class="bg-neutral-50 p-8 rounded-2xl border border-neutral-200 text-center">
        <p class="mb-4 font-medium text-neutral-800">¿Tienes dudas sobre la alimentación?</p>
        <a href="/catalogo" class="text-green-600 font-bold hover:underline">
            Ver todos nuestros productos ->
        </a>
    </div>
    `;

    // 4. Upsert Post
    const postData = {
        title: 'Cómo hacer alimento balanceado para cuyes | Software Excel Gratis',
        slug: 'como-hacer-alimento-balanceado-cuyes-excel-gratis',
        content: contentHtml,
        excerpt: 'Aprende a formular tu propio alimento balanceado y reduce costos a S/ 2.15 el kilo. Descarga gratis nuestra hoja de cálculo en Excel.',
        metaDescription: 'Guía de formulación de alimento para cuyes. Requerimientos de proteína, insumos clave y software Excel gratuito para calcular tus mezclas.',
        status: 'PUBLISHED' as const,
        publishedAt: new Date(),
        featuredImage: 'https://img.youtube.com/vi/_iBuN9Nk33g/maxresdefault.jpg',
        featuredImageAlt: 'Formulación de Alimento para Cuyes - Granja Saosini',
        categoryId: category.id,
        authorId: author?.id || '', // Fallback handle handled above but types might complain
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
