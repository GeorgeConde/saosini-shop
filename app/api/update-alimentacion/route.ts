import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const slug = 'alimentacion-cuyes-zonas-altura-granja-saosini';

        const newContent = `
            <div class="prose-content">
                <p class="text-xl md:text-2xl font-medium text-neutral-800 leading-relaxed mb-6">En la crianza de cuyes, la alimentación representa el costo más alto de producción. Sin embargo, no solo se trata de qué les damos de comer, sino de cómo y cuándo lo hacemos. En Granja Saosini, ubicada a más de 4,000 metros de altura, hemos validado un sistema que nos permite tener cuyes listos para el mercado todos los días del año, superando los retos del clima y la escasez de forraje.</p>

                <p>Aquí te compartimos los secretos de nuestra rutina nutricional:</p>

                <h2>1. El Horario: El mejor antídoto contra el estrés</h2>
                <p>El cuy es un animal de costumbres. Cambiarle el horario o el tipo de alimento constantemente le genera estrés alimenticio, lo que debilita su sistema inmunológico y lo hace propenso a enfermedades.</p>
                
                <p><strong>Nuestra rutina:</strong> Alimentamos dos veces al día. A las 9:00 a.m. entregamos el concentrado (alimento balanceado) y a las 4:00 p.m. el forraje o heno.</p>

                <div class="bg-yellow-50 p-6 border-l-4 border-yellow-400 my-6 rounded-r-lg">
                    <p class="text-neutral-900 m-0"><strong>La regla de oro:</strong> Mantener la misma hora y las mismas cantidades. Un galpón en silencio, con cuyes durmiendo tranquilos, es señal de una buena alimentación. Si tus cuyes hacen mucha bulla al verte, es una "huelga de hambre" que indica altos niveles de estrés.</p>
                </div>

                <h2>2. Alimentación Mixta: Balanceado y Fibra</h2>
                <p>Para lograr una genética de rápido crecimiento, utilizamos un alimento balanceado formulado específicamente para nuestra zona, que incluye:</p>
                <ul>
                    <li>Torta de soya y soya integral.</li>
                    <li>Afrecho de trigo y harina de maíz.</li>
                    <li>Suplementos de aminoácidos, sales minerales y Vitamina C.</li>
                </ul>

                <p><strong>¿Seco o húmedo?</strong> En Granja Saosini recomendamos el alimento seco. El alimento humedecido se fermenta rápido, genera toxinas y puede enfermar a tus cuyes si no se consume al instante.</p>

                <h2>3. El manejo del Agua: El nutriente olvidado</h2>
                <p>Muchos criadores creen que el forraje verde es suficiente, pero en nuestra experiencia, el agua potable debe estar disponible las 24 horas del día, los 365 días del año.</p>
                <ul>
                    <li>Una hidratación adecuada aumenta drásticamente la productividad.</li>
                    <li>Evita el estrés por sed, especialmente cuando se alimenta con concentrado seco o heno.</li>
                </ul>

                <h2>4. Producción en épocas de seca y helada</h2>
                <p>En el Cusco, muchas granjas solo producen cuando hay lluvia y pasto verde. Esto satura el mercado en mayo y junio, bajando los precios. En Granja Saosini rompemos este ciclo:</p>
                <ul>
                    <li><strong>Uso de Heno de Avena:</strong> Es nuestra fuente principal de fibra. Nos permite reducir la dependencia del pasto verde.</li>
                    <li><strong>Vitamina C Protegida:</strong> Cuando no hay forraje verde, suplimos la Vitamina C directamente en el balanceado.</li>
                    <li><strong>Eficiencia de Mano de Obra:</strong> Al usar heno y balanceado, una sola persona puede manejar todo el galpón, reduciendo el esfuerzo físico de cargar pasto pesado y húmedo todos los días.</li>
                </ul>

                <h2>5. Alimentación según la etapa (Recría vs. Reproductores)</h2>
                <p><strong>En Recría:</strong> El alimento debe ser a libre disponibilidad (sistema ad libitum). Necesitamos que desarrollen musculatura rápido para que salgan al mercado pronto.</p>
                <p><strong>En Reproductoras:</strong> El alimento debe ser controlado. Una madre sobreengrasada tendrá problemas en el parto y una menor vida productiva. Usamos platos sencillos y económicos que cumplen la misma función que una tolva costosa.</p>

                <h2>Conclusión: La satisfacción del criador</h2>
                <p>No hay mayor éxito que cerrar el galpón al final del día sabiendo que tus animales están "gorditos y tranquilos". Al apagar las luces y cerrar las ventanas, les permitimos descansar y alimentarse en paz durante la noche, que es cuando los roedores están más activos.</p>

                <div class="video-container my-10 relative w-full pt-[56.25%] rounded-2xl overflow-hidden shadow-xl ring-1 ring-neutral-200">
                    <iframe class="absolute top-0 left-0 w-full h-full" src="https://www.youtube.com/embed/kHhpAVgcyng" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>

                <div class="cta-block bg-neutral-900 text-white p-8 rounded-2xl text-center mt-12 shadow-2xl relative overflow-hidden group">
                     <div class="absolute inset-0 bg-primary/20 group-hover:bg-primary/30 transition-colors"></div>
                     <div class="relative z-10">
                        <h3 class="text-2xl font-bold mb-4 font-display">Inicia tu proyecto con Granja Saosini</h3>
                        <p class="mb-6 text-neutral-200">Si quieres aprender más sobre nuestra fórmula de balanceado o cómo implementar este sistema en zonas de altura, ¡contáctanos! Estamos para ayudarte a profesionalizar tu crianza.</p>
                        <a href="/catalogo" class="inline-block bg-primary hover:bg-primary-light text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg">
                            Ver Catálogo de Productos
                        </a>
                    </div>
                </div>
            </div>
        `;

        const updatedPost = await prisma.blogPost.update({
            where: { slug },
            data: {
                content: newContent
            }
        });

        return NextResponse.json({ success: true, post: updatedPost.title });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
