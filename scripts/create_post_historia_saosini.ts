import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando creación del artículo "Sobre Nosotros" con diseño mejorado...');

    // 1. Obtener o crear categoría 'Historia'
    let category = await prisma.blogCategory.findFirst({
        where: { slug: 'historia' }
    });

    if (!category) {
        console.log('Creando categoría: Historia...');
        category = await prisma.blogCategory.create({
            data: {
                name: 'Historia',
                slug: 'historia',
                description: 'La historia y filosofía de Granja Saosini.'
            }
        });
    }

    // 2. Obtener autor (Admin)
    let author = await prisma.user.findFirst({
        where: { email: 'admin@saosini.com' }
    });

    if (!author) {
        author = await prisma.user.findFirst();
        if (!author) {
            console.error('No se encontró ningún usuario para asignar como autor.');
            return;
        }
    }

    // 3. Definir contenido HTML con DISEÑO MEJORADO (Tailwind)
    // Nota: El contenedor padre ya tiene 'prose', por lo que usamos 'not-prose' o estilos en línea fuertes para romper el flujo donde sea necesario.
    // Sin embargo, para mayor compatibilidad con el componente de blog existente, usaremos una mezcla de etiquetas semánticas y divs utilitarios.

    const contentHtml = `
    <div class="lead text-xl text-neutral-600 font-medium mb-10 border-l-4 border-green-500 pl-6 italic">
        "En el corazón de los Andes, donde el frío de la altura desafía cualquier emprendimiento, nació Granja Saosini. Lo que comenzó hace 8 años como una pequeña inversión en un cuarto vacío, hoy es un modelo de crianza tecnificada."
    </div>

    <!-- SECCIÓN HISTORIA -->
    <div class="mb-12">
        <h2>Nuestra Historia: De un establo a una granja tecnológica</h2>
        <p>Nuestro fundador, George, inició este camino con un objetivo claro: crear empresa y no depender de nadie. Tras ver cómo sus primeros 100 cuyes se multiplicaban rápidamente, transformó un antiguo establo de vacas en un hábitat especializado.</p>
        <p>Sin embargo, el verdadero cambio llegó tras la pandemia. Decidimos reformularlo todo: desde la infraestructura hasta la nutrición, implementando tecnología que hoy hace que la granja sea eficiente, saludable y fácil de administrar.</p>
    </div>

    <!-- VIDEO HERO -->
    <div class="my-12 relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/50 transform hover:scale-[1.01] transition-transform duration-500">
        <div class="aspect-video w-full bg-neutral-900">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/ZCbpl2IVBqM" title="Historia Granja Saosini" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>

    <!-- INFRAESTRUCTURA GRID -->
    <div class="my-16">
        <h2 class="text-center mb-8 !mt-0">Infraestructura Inteligente para el Clima Extremo</h2>
        <p class="text-center text-neutral-500 max-w-2xl mx-auto mb-10">Crianza a 4,000 metros de altura exige soluciones técnicas. En nuestro galpón de reproductores, cada detalle cuenta para la supervivencia y confort.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
            <!-- Card 1 -->
            <div class="bg-white p-6 rounded-2xl shadow-lg border border-neutral-100 hover:shadow-xl transition-shadow">
                <div class="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 text-2xl">❄️</div>
                <h3 class="text-lg font-bold text-neutral-900 mb-2">Control Térmico</h3>
                <p class="text-neutral-600 text-sm leading-relaxed">Utilizamos un sistema de arpilleras estratégico para equilibrar la temperatura interior durante las fuertes heladas de junio y julio.</p>
            </div>
            
            <!-- Card 2 -->
            <div class="bg-white p-6 rounded-2xl shadow-lg border border-neutral-100 hover:shadow-xl transition-shadow">
                <div class="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-4 text-2xl">🏠</div>
                <h3 class="text-lg font-bold text-neutral-900 mb-2">Pozas Optimizadas</h3>
                <p class="text-neutral-600 text-sm leading-relaxed">Espacios de 1.25m x 1.60m para un harén de 8 hembras y 1 macho, garantizando crías fuertes y un macho vigoroso.</p>
            </div>

            <!-- Card 3 -->
            <div class="bg-white p-6 rounded-2xl shadow-lg border border-neutral-100 hover:shadow-xl transition-shadow cursor-pointer group" onclick="window.location.href='/products/bebedero-para-cuyes-chupon-jebe-negro'">
                <div class="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform">💧</div>
                <h3 class="text-lg font-bold text-neutral-900 mb-2 group-hover:text-green-700">Sistema de Hidratación</h3>
                <p class="text-neutral-600 text-sm leading-relaxed">Bebederos automáticos con desagüe integrado para evitar el encharcamiento y enfermedades.</p>
                <div class="mt-4 text-xs font-bold text-green-600 uppercase tracking-wider flex items-center gap-1">Ver Producto -></div>
            </div>
        </div>
    </div>

    <!-- NUTRICIÓN -->
    <div class="bg-neutral-900 text-neutral-300 -mx-6 md:-mx-12 px-6 md:px-12 py-16 my-16 rounded-3xl relative overflow-hidden not-prose">
        <div class="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        <div class="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
        
        <div class="relative z-10 max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Nutrición Estratégica</h2>
            <p class="text-center text-neutral-400 mb-10">En Cusco, la sequía entre mayo y septiembre suele detener la producción. En Granja Saosini, producimos los 365 días del año con este régimen:</p>
            
            <div class="space-y-4">
                <div class="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <span className="text-2xl mt-1">☀️</span>
                    <div>
                        <h4 class="text-white font-bold text-lg">Mañanas de Concentrado</h4>
                        <p class="text-sm opacity-80">Alimento balanceado suplementado para un crecimiento óptimo.</p>
                        <a href="/products/alimento-balanceado-saosini-super-premiun" class="inline-block mt-2 text-xs font-bold text-green-400 hover:text-green-300 border-b border-green-400/30">Ver nuestro alimento recomendado</a>
                    </div>
                </div>
                
                <div class="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <span className="text-2xl mt-1">🌾</span>
                    <div>
                        <h4 class="text-white font-bold text-lg">Tardes de Forraje</h4>
                        <p class="text-sm opacity-80">Combinamos paca de avena y heno con cebada verde según la temporada.</p>
                    </div>
                </div>
                
                <div class="flex items-start gap-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <span className="text-2xl mt-1">💨</span>
                    <div>
                        <h4 class="text-white font-bold text-lg">Técnica del Oreado</h4>
                        <p class="text-sm opacity-80">El pasto reposa por 24 horas antes de servirse para eliminar el exceso de humedad (timpanismo).</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- MEJORA GENÉTICA -->
    <div class="flex flex-col md:flex-row gap-8 items-center bg-green-50 p-8 rounded-3xl border border-green-100 my-16">
        <div class="flex-1">
            <h2 class="text-green-900 !mt-0">Mejora Genética: Compromiso con el Mercado</h2>
            <p class="text-green-800/80 mb-6">No criamos por cantidad, sino por rendimiento cárnico de calidad superior.</p>
            
            <ul class="space-y-3 mb-6">
                <li class="flex items-center gap-3">
                    <span class="w-2 h-2 rounded-full bg-green-500"></span>
                    <span class="text-green-900 font-medium">Selección del 20% mejor de hembras</span>
                </li>
                <li class="flex items-center gap-3">
                    <span class="w-2 h-2 rounded-full bg-green-500"></span>
                    <span class="text-green-900 font-medium">Solo 1% de machos seleccionados</span>
                </li>
            </ul>

            <a href="/products/hembra-reproductora-linea-comercial" class="inline-flex bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition-shadow shadow-lg shadow-green-600/20 no-underline">
                Adquirir Genética Saosini
            </a>
        </div>
        
        <div class="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-green-100 rotate-1 md:rotate-2">
            <div class="text-sm uppercase tracking-widest text-neutral-400 font-bold mb-2">El Problema Común</div>
            <p class="text-neutral-500 mb-6 text-sm">¿Por qué elegir genética Saosini? Un cuy sin trabajo genético se "chupa" al cocinarlo (puro hueso y piel).</p>
            
            <div class="text-sm uppercase tracking-widest text-green-600 font-bold mb-2">La Solución Saosini</div>
            <p class="text-neutral-800 font-medium">Un cuy de Granja Saosini garantiza una carcasa ancha y carnosa que destaca en cualquier horno o sartén.</p>
        </div>
    </div>

    <!-- CTA FINAL -->
    <div class="text-center my-16">
        <h3>Agroaventura Saosini: Compartiendo el Conocimiento</h3>
        <p class="max-w-2xl mx-auto">Nuestra filosofía es abierta. Visitamos granjas, asesoramos a nuevos emprendedores y estamos en constante aprendizaje.</p>
        <p class="text-lg font-bold text-green-700 mt-4">¿Quieres asesoría técnica o visitar la granja?</p>
        <div class="mt-8">
            <a href="/contacto" class="inline-block border-2 border-neutral-900 text-neutral-900 px-8 py-3 rounded-full font-bold hover:bg-neutral-900 hover:text-white transition-colors no-underline">
                Contáctanos en Cusco
            </a>
        </div>
    </div>
    `;

    // 4. Upsert Post
    const postData = {
        title: 'Sobre Nosotros | Granja Saosini - Especialistas en Cuyes Mejorados',
        slug: 'sobre-nosotros-historia-saosini',
        content: contentHtml,
        excerpt: 'De un pequeño cuarto vacío a un modelo de tecnificación a 4,000 msnm. Descubre cómo Granja Saosini revolucionó la crianza de cuyes en Cusco.',
        metaDescription: 'Historia de Granja Saosini: Crianza tecnificada de cuyes en Cusco a 4,000 msnm, genética mejorada y agroaventura.',
        status: 'PUBLISHED' as const,
        publishedAt: new Date(),
        featuredImage: 'https://img.youtube.com/vi/ZCbpl2IVBqM/maxresdefault.jpg',
        featuredImageAlt: 'Granja Saosini - Crianza técnica de cuyes',
        categoryId: category.id,
        authorId: author.id,
    };

    const existing = await prisma.blogPost.findUnique({
        where: { slug: postData.slug }
    });

    if (existing) {
        console.log('Actualizando artículo con nuevo diseño...');
        await prisma.blogPost.update({
            where: { slug: postData.slug },
            data: postData
        });
    } else {
        await prisma.blogPost.create({
            data: postData
        });
    }

    console.log(`ÉXITO. Artículo actualizado: ${postData.title}`);
}

main()
    .catch(e => console.error('ERROR FATAL:', e))
    .finally(async () => await prisma.$disconnect());
