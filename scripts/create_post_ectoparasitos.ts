import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando creación del artículo "Control de Ectoparásitos"...');

    // 1. Obtener o crear categoría 'Sanidad'
    let category = await prisma.blogCategory.findFirst({
        where: { slug: 'sanidad' }
    });

    if (!category) {
        console.log('Creando categoría: Sanidad...');
        category = await prisma.blogCategory.create({
            data: {
                name: 'Sanidad',
                slug: 'sanidad',
                description: 'Guías y protocolos para mantener a tus cuyes sanos y libres de enfermedades.'
            }
        });
    }

    // 2. Obtener autor (Admin)
    const author = await prisma.user.findFirst();
    if (!author) {
        console.error('No se encontró ningún usuario para asignar como autor.');
        return;
    }

    // 3. Definir contenido HTML con DISEÑO MEJORADO (Tailwind)
    const contentHtml = `
    <div class="lead text-xl text-neutral-600 font-medium mb-10 border-l-4 border-red-500 pl-6 italic">
        "La presencia de pulgas, ácaros o piojos en un galpón puede arruinar meses de trabajo genético. No se trata solo de aplicar químicos, sino de saber qué producto usar y cuándo hacerlo."
    </div>

    <div class="my-12 relative rounded-2xl overflow-hidden shadow-2xl ring-4 ring-neutral-900/10 transform hover:scale-[1.005] transition-transform duration-500">
        <div class="aspect-video w-full bg-neutral-900">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/PxhSWwWTKvk" title="Control de Ectoparásitos en Cuyes" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>

    <!-- BOTIQUÍN GRID -->
    <div class="my-16">
        <h2 class="text-center mb-4 !mt-0">El Botiquín de Control: Conoce tus Herramientas</h2>
        <p class="text-center text-neutral-500 max-w-2xl mx-auto mb-10">Es fundamental entender el principio activo de lo que aplicas para evitar resistencias y asegurar la inocuidad de la carne.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose">
            <!-- Card 1: Fipronil (Caution) -->
            <div class="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-red-500 hover:shadow-xl transition-all">
                <div class="flex items-center gap-3 mb-4">
                    <span class="bg-red-100 text-red-600 p-2 rounded-lg text-xl">⚠️</span>
                    <h3 class="text-lg font-bold text-neutral-900 m-0">Fipronil 1%</h3>
                </div>
                <div class="bg-red-50 text-red-800 text-xs font-bold px-2 py-1 rounded inline-block mb-3">Vaca Peruana / Similares</div>
                <p class="text-neutral-600 text-sm leading-relaxed mb-4">Aplicación tópica (una gota en el lomo). <strong>SOLO en reproductores.</strong></p>
                <div class="text-xs bg-neutral-100 p-2 rounded border border-neutral-200">
                    <strong>Periodo de retiro:</strong> 100 días. NUNCA en cuyes de engorde/venta cercana.
                </div>
            </div>
            
            <!-- Card 2: Cipermetrina (Ambiental) -->
            <div class="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-blue-500 hover:shadow-xl transition-all">
                <div class="flex items-center gap-3 mb-4">
                    <span class="bg-blue-100 text-blue-600 p-2 rounded-lg text-xl">🏠</span>
                    <h3 class="text-lg font-bold text-neutral-900 m-0">Cipermetrina 20%</h3>
                </div>
                <div class="bg-blue-50 text-blue-800 text-xs font-bold px-2 py-1 rounded inline-block mb-3">Desinfección Total</div>
                <p class="text-neutral-600 text-sm leading-relaxed mb-4">El aliado ideal para fumigar instalaciones (paredes, techos, pisos).</p>
                <div class="text-xs bg-neutral-100 p-2 rounded border border-neutral-200">
                    <strong>Dosis:</strong> 1 ml por litro de agua.
                </div>
            </div>

            <!-- Card 3: Carbadín (Polvo) -->
            <div class="bg-white p-6 rounded-2xl shadow-lg border-t-4 border-orange-500 hover:shadow-xl transition-all">
                <div class="flex items-center gap-3 mb-4">
                    <span class="bg-orange-100 text-orange-600 p-2 rounded-lg text-xl">💨</span>
                    <h3 class="text-lg font-bold text-neutral-900 m-0">Carbadín</h3>
                </div>
                <div class="bg-orange-50 text-orange-800 text-xs font-bold px-2 py-1 rounded inline-block mb-3">Tratamiento Individual</div>
                <p class="text-neutral-600 text-sm leading-relaxed mb-4">Ideal para espolvorear al cuy y reforzar grietas donde el líquido no llega.</p>
                <div class="text-xs bg-neutral-100 p-2 rounded border border-neutral-200">
                    <strong>Uso:</strong> Proteger ojos y nariz al aplicar.
                </div>
            </div>
        </div>
    </div>

    <!-- PROTOCOLO PASO A PASO -->
    <div class="bg-neutral-50 px-6 py-12 rounded-3xl border border-neutral-200 my-16">
        <h2 class="text-center mb-10 !mt-0">El Protocolo de Eliminación Total</h2>
        <div class="space-y-6 not-prose max-w-3xl mx-auto">
            
            <div class="flex gap-4">
                <div class="flex-shrink-0 w-10 h-10 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">1</div>
                <div>
                    <h4 class="text-lg font-bold text-neutral-900 mb-1">Limpieza General</h4>
                    <p class="text-neutral-600 text-sm">Retirar todo el guano, camas sucias y restos de comida fuera del galpón antes de aplicar cualquier producto.</p>
                </div>
            </div>

            <div class="flex gap-4">
                <div class="flex-shrink-0 w-10 h-10 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">2</div>
                <div>
                    <h4 class="text-lg font-bold text-neutral-900 mb-1">Fumigación Ambiental</h4>
                    <p class="text-neutral-600 text-sm">Aplicar Cipermetrina al 20% en todo el galpón vacío (paredes y suelos).</p>
                </div>
            </div>

            <div class="flex gap-4">
                <div class="flex-shrink-0 w-10 h-10 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">3</div>
                <div>
                    <h4 class="text-lg font-bold text-neutral-900 mb-1">Tratamiento Individual</h4>
                    <p class="text-neutral-600 text-sm">Espolvorear cuy por cuy con Carbadín. Es vital proteger ojos, nariz y boca del animal.</p>
                </div>
            </div>

            <div class="flex gap-4">
                <div class="flex-shrink-0 w-10 h-10 bg-neutral-900 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">4</div>
                <div>
                    <h4 class="text-lg font-bold text-neutral-900 mb-1">Refuerzo y Repetición</h4>
                    <p class="text-neutral-600 text-sm">Aplicar polvo en grietas. <strong>OBLIGATORIO:</strong> Repetir todo el proceso a la semana siguiente para romper el ciclo biológico (huevos).</p>
                </div>
            </div>
            
        </div>
    </div>

    <!-- FLAMEADOR SECTION -->
    <div class="bg-gradient-to-br from-orange-900 to-red-900 text-white p-8 md:p-12 rounded-3xl relative overflow-hidden my-16 shadow-2xl shadow-orange-900/30 not-prose">
        <div class="absolute top-0 right-0 w-64 h-64 bg-yellow-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        <div class="relative z-10">
            <h2 class="text-white !mt-0 text-3xl font-bold flex items-center gap-3">
                <span class="text-4xl">🔥</span> ¿Qué hacer si hay resistencia?
            </h2>
            <h3 class="text-orange-200 text-xl font-medium mb-6 uppercase tracking-wider">El Método del Flameador</h3>
            <p class="text-orange-50 text-lg mb-6 leading-relaxed">
                Si los químicos ya no hacen efecto por uso excesivo, recurrimos al método definitivo: <strong>El Flameador a Gas.</strong>
            </p>
            <div class="bg-black/30 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                <p class="text-white m-0">
                    "Después de la limpieza, pasamos fuego por todas las superficies del galpón. El calor extremo elimina instantáneamente adultos, larvas y huevos. Combinado con fumigación posterior, garantiza un galpón 100% libre."
                </p>
            </div>
        </div>
    </div>

    <!-- CTA FINAL -->
    <div class="text-center my-16 bg-white border border-neutral-100 p-8 rounded-3xl shadow-sm">
        <h3 class="text-neutral-900 font-bold text-2xl mb-4">El Consejo de Oro de Granja Saosini</h3>
        <p class="text-neutral-600 mb-8 max-w-2xl mx-auto">
            La sanidad es un compromiso compartido. Un manejo responsable protege tus cuyes, tu reputación y la salud del consumidor.
            <br/><br/>
            <strong>¡Protege tu inversión genética!</strong> No arriesgues tus mejores reproductores por falta de prevención.
        </p>
        
        <a href="/catalogo/hembra-reproductora-linea-comercial" class="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-green-600/30 no-underline transform hover:-translate-y-1">
            Ver Genética Saosini
        </a>
    </div>

    <div class="text-center text-sm text-neutral-400 mt-12 bg-neutral-50 py-4 rounded-xl border border-neutral-100">
        ¿Has notado resistencia a algún producto en tu zona? <strong>Cuéntanos en los comentarios</strong> qué método te funciona mejor.
    </div>
    `;

    // 4. Upsert Post
    const postData = {
        title: 'Control Maestro de Ectoparásitos: Productos, Dosis y el Método Saosini',
        slug: 'control-maestro-ectoparasitos-cuyes',
        content: contentHtml,
        excerpt: 'Aprende a eliminar pulgas, ácaros y piojos de tu galpón. Descubre el protocolo estricto de Granja Saosini, los productos correctos y el método definitivo del flameador.',
        metaDescription: 'Guía completa para el control de ectoparásitos en cuyes. Aprende sobre Fipronil, Cipermetrina, dosis correctas y el método del flameador para eliminar plagas resistentes.',
        status: 'PUBLISHED' as const,
        publishedAt: new Date(),
        featuredImage: 'https://img.youtube.com/vi/PxhSWwWTKvk/maxresdefault.jpg',
        featuredImageAlt: 'Control de Ectoparásitos en Cuyes - Granja Saosini',
        categoryId: category.id,
        authorId: author.id,
    };

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
