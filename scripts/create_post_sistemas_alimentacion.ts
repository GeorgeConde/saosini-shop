import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando creación del artículo "Sistemas de Alimentación"...');

    // 1. Obtener o crear categoría 'Alimentación y Nutrición'
    let category = await prisma.blogCategory.findFirst({
        where: { slug: 'alimentacion-nutricion' }
    });

    if (!category) {
        // Fallback
        category = await prisma.blogCategory.create({
            data: {
                name: 'Alimentación y Nutrición',
                slug: 'alimentacion-nutricion',
                description: 'Todo sobre forraje, concentrados y requerimientos nutricionales.'
            }
        });
    }

    // 2. Obtener autor
    const author = await prisma.user.findFirst();

    // 3. Definir contenido HTML con DISEÑO MEJORADO
    const contentHtml = `
    <div class="lead text-xl text-neutral-600 font-medium mb-10 border-l-4 border-blue-500 pl-6 italic">
        "En la crianza técnica de cuyes, la forma en que alimentamos a nuestros animales determina no solo su crecimiento, sino también nuestra carga de trabajo y la rentabilidad final."
    </div>

    <!-- VIDEO HERO -->
    <div class="my-12 relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-neutral-900/10 transform hover:scale-[1.005] transition-transform duration-500">
        <div class="aspect-video w-full bg-neutral-900">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/46YZDt-rNZI" title="Sistemas de Alimentación en Cuyes" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>

    <!-- SISTEMAS COMPARATIVA GRID -->
    <div class="my-16">
        <h2 class="text-center mb-8 !mt-0">Los 3 Sistemas Clásicos: Ventajas y Desventajas</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
            
            <!-- Card 1: Puro Forraje -->
            <div class="bg-green-50 p-6 rounded-2xl border border-green-200 hover:shadow-xl transition-all flex flex-col">
                <div class="text-4xl mb-4 text-center">🌿</div>
                <h3 class="font-bold text-green-900 text-center mb-4 text-lg">Puro Forraje Verde</h3>
                <div class="flex-grow space-y-4 text-sm">
                    <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-500">
                        <span class="font-bold text-green-700 block mb-1">Ventaja:</span>
                        Aparentemente "gratis" o de bajo costo inicial.
                    </div>
                    <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 border-red-500 opacity-80">
                        <span class="font-bold text-red-700 block mb-1">Desventaja:</span>
                        Nutrición incompleta, mucho trabajo físico y riesgo sanitario (parásitos).
                    </div>
                </div>
            </div>

            <!-- Card 2: Puro Balanceado -->
            <div class="bg-blue-50 p-6 rounded-2xl border border-blue-200 hover:shadow-xl transition-all flex flex-col">
                <div class="text-4xl mb-4 text-center">🥣</div>
                <h3 class="font-bold text-blue-900 text-center mb-4 text-lg">Puro Balanceado</h3>
                <div class="flex-grow space-y-4 text-sm">
                    <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-500">
                        <span class="font-bold text-green-700 block mb-1">Ventaja:</span>
                        Crecimiento acelerado, fácil manejo y menor mano de obra.
                    </div>
                    <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 border-red-500 opacity-80">
                        <span class="font-bold text-red-700 block mb-1">Desventaja:</span>
                        Costo elevado y exigencia de agua potable las 24 horas.
                    </div>
                </div>
            </div>

            <!-- Card 3: Mixto -->
            <div class="bg-orange-50 p-6 rounded-2xl border border-orange-200 hover:shadow-xl transition-all flex flex-col ring-2 ring-orange-300 transform md:-translate-y-2">
                <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">MÁS COMÚN</div>
                <div class="text-4xl mb-4 text-center">⚖️</div>
                <h3 class="font-bold text-orange-900 text-center mb-4 text-lg">Alimentación Mixta</h3>
                <div class="flex-grow space-y-4 text-sm">
                    <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-500">
                        <span class="font-bold text-green-700 block mb-1">Ventaja:</span>
                        Equilibrio ideal. Nutrición del balanceado + Fibra y gusto del forraje.
                    </div>
                    <div class="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-500">
                        <span class="font-bold text-green-700 block mb-1">Ahorro:</span>
                        Menor necesidad de Vitamina C extra si el forraje es bueno.
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- MÉTODO SAOSINI HERO -->
    <div class="bg-green-50 text-green-900 rounded-3xl p-8 md:p-12 my-16 shadow-lg border border-green-100 relative overflow-hidden not-prose">
        
        <div class="relative z-10">
            <h2 class="text-green-900 mb-2 !mt-0 flex items-center gap-3">
                <span class="text-3xl">🚀</span> El "Método Saosini"
            </h2>
            <div class="text-green-600 font-bold uppercase tracking-widest text-sm mb-8">Eficiencia a 4,000 m.s.n.m.</div>
            
            <p class="text-lg text-green-800 font-medium mb-8 max-w-3xl leading-relaxed">
                En nuestra zona el pasto es escaso en temporada de secas. Hemos perfeccionado un sistema de élite: <strong class="bg-green-200 text-green-900 px-2 py-1 rounded">Balanceado + Heno de Avena + Agua.</strong>
            </p>

            <div class="grid md:grid-cols-2 gap-8">
                <div>
                    <h4 class="text-green-900 font-bold mb-2">💧 Manejo del Agua</h4>
                    <p class="text-sm text-green-800/80">Llenamos los barriles en el momento de mayor calor para que el agua tome temperatura ambiente y no llegue helada al cuy.</p>
                </div>
                <div>
                    <h4 class="text-green-900 font-bold mb-2">👶 Atención a Crías</h4>
                    <p class="text-sm text-green-800/80">En partos y destetes (hasta 2 semanas) priorizamos forraje verde para estimular el apetito y evitar desnutrición.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- RUTINA DIARIA TIMELINE -->
    <div class="my-16 max-w-2xl mx-auto">
        <h2 class="text-center mb-10 !mt-0">Nuestra Rutina Diaria</h2>
        <div class="relative border-l-4 border-neutral-200 ml-6 space-y-10 not-prose">
            
            <!-- Item 1 -->
            <div class="relative pl-8">
                <div class="absolute -left-[14px] top-0 w-6 h-6 bg-yellow-400 rounded-full border-4 border-white shadow-sm"></div>
                <div class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">9:00 AM</div>
                <h4 class="text-lg font-bold text-neutral-900">Alimento Balanceado Seco</h4>
                <p class="text-neutral-600 text-sm">Suministro de la ración rica en proteínas y energía para iniciar el día con fuerza.</p>
            </div>

            <!-- Item 2 -->
            <div class="relative pl-8">
                <div class="absolute -left-[14px] top-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-sm"></div>
                <div class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">4:00 PM - 5:00 PM</div>
                <h4 class="text-lg font-bold text-neutral-900">Heno de Avena (Fibra)</h4>
                <p class="text-neutral-600 text-sm">Cantidad suficiente para que les dure toda la noche, asegurando la digestión.</p>
            </div>

            <!-- Item 3 -->
            <div class="relative pl-8">
                <div class="absolute -left-[14px] top-0 w-6 h-6 bg-blue-500 rounded-full border-4 border-white shadow-sm"></div>
                <div class="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Todo el Día</div>
                <h4 class="text-lg font-bold text-neutral-900">Agua Limpia y Potable</h4>
                <p class="text-neutral-600 text-sm">El nutriente más barato y vital. A temperatura ambiente para evitar choques térmicos.</p>
            </div>

        </div>
    </div>

    <!-- CTA FINAL -->
    <!-- CTA FINAL -->
    <div class="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl border border-green-200 text-center my-16 shadow-lg">
        <h3 class="font-bold text-2xl text-green-900 mb-4">¿Quieres resultados garantizados sin complicaciones?</h3>
        <p class="text-green-800/80 mb-8 max-w-xl mx-auto">
            No pierdas tiempo formulando. Nuestro alimento balanceado ya tiene la fórmula exacta que usamos en la granja para un crecimiento explosivo.
        </p>
        
        <a href="/catalogo/alimento-balanceado-saosini-super-premiun" class="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-4 rounded-full font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-green-600/30 no-underline transform hover:-translate-y-1 text-lg">
            <span>🛒</span> Comprar Alimento Balanceado Saosini
        </a>
        <p class="mt-4 text-xs text-green-700 font-medium">Disponible en presentaciones de 1kg, 10kg y 50kg.</p>
    </div>

    <div class="text-center text-sm text-neutral-400 mt-12">
        ¿Qué sistema usas actualmente? <strong>Cuéntanos en los comentarios</strong> cuál ha sido tu mayor reto.
    </div>
    `;

    // 4. Upsert Post
    const postData = {
        title: 'Sistemas de Alimentación en Cuyes: ¿Cuál es el mejor para tu granja?',
        slug: 'sistemas-alimentacion-cuyes-mejor-opcion',
        content: contentHtml,
        excerpt: 'Descubre las ventajas y desventajas de los 3 sistemas de alimentación (Forraje, Balanceado, Mixto) y conoce el "Método Saosini" para eficiencia en altura.',
        metaDescription: 'Comparativa de sistemas de alimentación para cuyes: Forraje vs Balanceado vs Mixto. Aprende el método de Granja Saosini con heno de avena y agua a 4,000 msnm.',
        status: 'PUBLISHED' as const,
        publishedAt: new Date(),
        featuredImage: 'https://img.youtube.com/vi/46YZDt-rNZI/maxresdefault.jpg',
        featuredImageAlt: 'Sistemas de Alimentación en Cuyes - Granja Saosini',
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
