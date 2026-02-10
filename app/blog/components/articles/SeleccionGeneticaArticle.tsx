'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Clock, CheckCircle2, ChevronRight, Droplets, Wheat, Shield, PlayCircle, Ruler, Scale, Heart } from 'lucide-react';
import ShareButtons from '../ShareButtons';
import ProductRecommendation from '../ProductRecommendation';

export default function SeleccionGeneticaArticle({ post }: { post: any }) {
    return (
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 lg:p-16 ring-1 ring-neutral-100/50">
            {/* INTRO */}
            <p className="text-xl md:text-2xl font-serif text-neutral-800 leading-relaxed mb-12 drop-cap">
                El éxito de una granja no depende solo de cuántos cuyes nacen, sino de la calidad de esos animales.
                <span className="text-neutral-900 font-semibold bg-primary/10 px-1 rounded"> En Granja Saosini, aplicamos un proceso de selección riguroso </span>
                antes del empadre para asegurar que cada nueva generación sea más productiva, más cárnica y más resistente.
            </p>

            {/* VIDEO EMBED */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl mb-16 border border-neutral-200 bg-neutral-900">
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/PXUuRxOK4nI"
                    title="Selección y Empadre de Cuyes - Granja Saosini"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0"
                ></iframe>
            </div>

            {/* CONTENT SECTIONS */}
            <div className="space-y-20">

                {/* SECTION 1: VELOCIDAD DE CRECIMIENTO */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-600 font-bold text-xl shadow-sm border border-green-200">1</span>
                        <h2 className="text-3xl font-display font-bold text-neutral-900">El Primer Filtro: Velocidad de Crecimiento</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                                En una granja grande, pesar uno por uno puede ser difícil. Nuestra técnica consiste en comparar contemporáneos (cuyes de la misma edad).
                            </p>
                            <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500 mb-6">
                                <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
                                    <Scale className="w-5 h-5" /> Peso Ideal Objetivo
                                </h4>
                                <p className="text-green-700">Buscamos hembras que a los <strong>42-45 días</strong> ya ronden los <strong>800 a 900 gramos</strong>.</p>
                            </div>
                        </div>
                        <div className="bg-neutral-900 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                            <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5" /> El Criterio de Descarte
                            </h3>
                            <p className="text-neutral-300 leading-relaxed relative z-10">
                                Aquellos ejemplares que, teniendo la misma edad, están retrasados en peso o se sienten "delgados" al tacto, se descartan para la reproducción. Solo nos quedamos con los líderes de la camada.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: FENOTIPO (LADRILLO) */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 text-orange-600 font-bold text-xl shadow-sm border border-orange-200">2</span>
                        <h2 className="text-3xl font-display font-bold text-neutral-900">El Fenotipo: La forma de "Ladrillo"</h2>
                    </div>

                    <p className="text-lg text-neutral-700 mb-8">
                        No basta con que el cuy sea pesado; debe tener una buena conformación muscular. Buscamos lo que técnicamente llamamos una forma simétrica.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* CARD 1 */}
                        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                <Ruler className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-2">Amplitud de Pecho</h3>
                            <p className="text-neutral-600 text-sm">Debe tener gran apertura en los brazos, indicando capacidad torácica y fuerza.</p>
                        </div>
                        {/* CARD 2 */}
                        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                <span className="text-2xl font-black text-orange-600">-</span>
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-2">Línea Superior Recta</h3>
                            <p className="text-neutral-600 text-sm">Una espalda fuerte evita que la hembra "arrastre la panza", reduciendo el riesgo de abortos.</p>
                        </div>
                        {/* CARD 3 */}
                        <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow hover:shadow-lg transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                                <div className="w-6 h-6 rounded-full border-2 border-orange-600/50"></div>
                            </div>
                            <h3 className="text-lg font-bold text-neutral-900 mb-2">Grupa Redondeada</h3>
                            <p className="text-neutral-600 text-sm">Forma de "mitad de pelota". Facilita el parto y reduce drásticamente las muertes maternas.</p>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: MITOS Y VERDADES */}
                <section className="bg-neutral-50 p-8 rounded-3xl border border-neutral-100">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 font-bold text-xl shadow-sm border border-blue-200">3</span>
                        <h2 className="text-3xl font-display font-bold text-neutral-900">Mitos y Verdades</h2>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-1 h-auto bg-neutral-300 rounded-full"></div>
                            <div>
                                <h3 className="text-xl font-bold text-neutral-900 mb-2">¿Importan las uñas y orejas?</h3>
                                <p className="text-neutral-700">
                                    Como productores comerciales, priorizamos la <strong>productividad</strong>. La polidactilia (dedos extra) no afecta la calidad de carne y es fácil de corregir.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-1 h-auto bg-primary rounded-full"></div>
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-2">Temperamento y Docilidad (CLAVE)</h3>
                                <p className="text-neutral-700">
                                    Esto sí es vital. Un cuy dócil genera un galpón tranquilo. Un cuy "salvaje" estresa a toda la poza y reduce la producción. Preferimos <strong>ojos negros</strong> por ser menos ariscos.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: PREPARACIÓN Y MANEJO */}
                <section>
                    <div className="flex items-center gap-4 mb-8">
                        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600 font-bold text-xl shadow-sm border border-purple-200">4</span>
                        <h2 className="text-3xl font-display font-bold text-neutral-900">Preparación y Manejo del Empadre</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 mb-12">
                        {/* MACHO */}
                        <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">El Macho</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-blue-800"><CheckCircle2 className="w-5 h-5 text-blue-500" /> El mejor de la camada</li>
                                <li className="flex items-center gap-3 text-blue-800"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Peso &gt; 1,100 - 1,300g</li>
                                <li className="flex items-center gap-3 text-blue-800"><CheckCircle2 className="w-5 h-5 text-blue-500" /> Excelente desarrollo testicular</li>
                            </ul>
                        </div>
                        {/* HEMBRA */}
                        <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl border border-pink-100">
                            <h3 className="text-2xl font-bold text-pink-900 mb-4">La Hembra</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-pink-800"><CheckCircle2 className="w-5 h-5 text-pink-500" /> Empadre al 2do celo</li>
                                <li className="flex items-center gap-3 text-pink-800"><CheckCircle2 className="w-5 h-5 text-pink-500" /> Edad aprox: 42-45 días</li>
                                <li className="flex items-center gap-3 text-pink-800"><CheckCircle2 className="w-5 h-5 text-pink-500" /> Desarrollo corporal completo</li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-neutral-900 text-white p-8 md:p-10 rounded-3xl text-center">
                        <h3 className="text-2xl font-bold text-white mb-6">Sistema de Empadre Continuo Saosini</h3>
                        <div className="grid md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
                            <div>
                                <span className="block text-primary font-bold text-sm uppercase tracking-wider mb-2">Densidad</span>
                                <p className="text-lg">1 Macho con 7 Hembras (pozasa 1.0 x 1.5m)</p>
                            </div>
                            <div>
                                <span className="block text-primary font-bold text-sm uppercase tracking-wider mb-2">Permanencia</span>
                                <p className="text-lg">Macho vive permanentemente con ellas.</p>
                            </div>
                            <div>
                                <span className="block text-primary font-bold text-sm uppercase tracking-wider mb-2">Descanso</span>
                                <p className="text-lg">Hasta el 3er parto. Al 4to, se retira para descanso.</p>
                            </div>
                        </div>
                    </div>

                    <ProductRecommendation
                        name="Hembra Reproductora - Línea Comercial"
                        description="Ejemplares seleccionados genéticamente con alta prolificidad y docilidad. Listas para entrar en empadre y mejorar tu granja."
                        slug="hembra-reproductora-linea-comercial"
                        image="https://res.cloudinary.com/dpuyoreeb/image/upload/v1769655970/saosini-products/jcvkhzcx3pgtzma4ki2b.jpg"
                        price="50.00"
                        badge="Garantía Genética"
                    />
                </section>

                {/* SHARE FOOTER FOR MOBILE */}
                <div className="pt-8 border-t border-neutral-200 lg:hidden">
                    <h4 className="text-sm font-bold text-neutral-600 uppercase tracking-wider mb-4">Compartir artículo</h4>
                    <ShareButtons title={post.title} url={`${process.env.NEXT_PUBLIC_APP_URL || 'https://saosinishop.com'}/blog/${post.slug}`} />
                </div>
            </div>
        </div>
    );
}
