'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Leaf, Droplets, Wheat, Sun, Clock, ChevronRight, PlayCircle, CheckCircle2 } from 'lucide-react';
import ShareButtons from '../ShareButtons';
import ProductRecommendation from '../ProductRecommendation';


export default function AlimentacionArticle({ post }: { post: any }) {
    return (
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 lg:p-16 ring-1 ring-neutral-100/50">
            {/* INTRO */}
            <p className="text-xl md:text-2xl font-serif text-neutral-800 leading-relaxed mb-12 drop-cap">
                En la crianza de cuyes, la alimentación representa el mayor costo de producción.
                <span className="text-neutral-900 font-semibold bg-primary/10 px-1 rounded"> No se trata solo de qué comen, sino de cómo y cuándo lo hacen. </span>
                En Granja Saosini, a más de 4,000 m.s.n.m., hemos validado un sistema que desafía el clima y garantiza cuyes listos todos los días.
            </p>

            {/* VIDEO HIGHLIGHT */}
            <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl mb-16 group cursor-pointer bg-neutral-900 border border-neutral-200">
                <Image
                    src="https://images.unsplash.com/photo-1628146931580-g5756778f653?q=80&w=2670&auto=format&fit=crop"
                    alt="Alimentación de cuyes"
                    fill
                    className="object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <PlayCircle size={64} className="mb-4 text-primary animate-pulse" />
                    <span className="font-bold text-lg tracking-wider uppercase">Ver Masterclass de Alimentación</span>
                    <span className="text-sm opacity-80 mt-2">Duración: 12:45 min</span>
                </div>
            </div>

            {/* CONTENT SECTIONS */}
            <div className="space-y-16">

                {/* SECTION 1 */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 text-orange-600 font-bold text-xl shadow-sm border border-orange-200">1</span>
                        <h2 className="text-3xl font-display font-bold text-neutral-900">El Horario Sagrado</h2>
                    </div>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-8">
                        El cuy es un animal de costumbres. La inconstancia genera estrés alimenticio, debilitando su sistema inmune.
                    </p>

                    <div className="bg-gradient-to-br from-neutral-50 to-white p-8 rounded-2xl border border-neutral-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <h3 className="text-lg font-bold text-neutral-900 mb-6 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-orange-500" />
                            Nuestra Rutina Inquebrantable
                        </h3>
                        <div className="grid md:grid-cols-2 gap-8 relative z-10">
                            <div className="space-y-2">
                                <span className="text-4xl font-black text-orange-500 block">9:00 AM</span>
                                <span className="text-lg font-medium text-neutral-900 uppercase tracking-wide">Concentrado (Balanceado)</span>
                                <p className="text-neutral-500 text-sm">Aporte energético para iniciar el día</p>
                            </div>
                            <div className="space-y-2 border-t md:border-t-0 md:border-l border-neutral-200 pt-4 md:pt-0 md:pl-8">
                                <span className="text-4xl font-black text-orange-500 block">4:00 PM</span>
                                <span className="text-lg font-medium text-neutral-900 uppercase tracking-wide">Forraje / Heno</span>
                                <p className="text-neutral-500 text-sm">Fibra necesaria para la digestión nocturna</p>
                            </div>
                        </div>
                        <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
                            <p className="text-neutral-500 italic text-sm">
                                *Si tus cuyes hacen mucho ruido al verte, es señal de estrés por hambre. Un galpón silencioso es un galpón productivo.
                            </p>
                        </div>
                    </div>

                    <ProductRecommendation
                        name="Comedero de Arcilla para Cuyes"
                        description="Diseño pesado y estable. Fundamental para mantener el horario sagrado sin desperdicios ni volteos."
                        slug="comedero-cuy-conejo"
                        image="https://www.jersimport.com/wp-content/uploads/2019/10/280.jpg"
                        price="3.00"
                        badge="Accesorio Básico"
                    />
                </section>

                {/* SECTION 2 */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 text-green-600 font-bold text-xl shadow-sm border border-green-200">2</span>
                        <h2 className="text-3xl font-display font-bold text-neutral-900">Alimentación Mixta</h2>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-lg relative">
                            <Wheat className="absolute top-6 right-6 text-green-100 w-24 h-24 -rotate-12" />
                            <h3 className="text-xl font-bold text-green-700 mb-6 relative z-10">Fórmula Balanceada</h3>
                            <ul className="space-y-4 relative z-10">
                                {['Torta de soya integral', 'Afrecho de trigo', 'Harina de maíz', 'Aminoácidos y Vitamina C'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-neutral-700">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-neutral-900 p-8 rounded-2xl text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-green-600/10 pattern-dots"></div>
                            <h3 className="text-xl font-bold text-white mb-4 relative z-10">¿Seco o Húmedo?</h3>
                            <p className="text-neutral-300 mb-6 relative z-10">
                                En Saosini recomendamos 100% seco. La humedad genera fermentación, toxinas y enfermedades rápidas.
                            </p>
                            <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2 text-sm font-bold tracking-wider relative z-10">
                                RECOMENDACIÓN PRO
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <ProductRecommendation
                            name="Alimento Balanceado Saosini Super Premium"
                            description="Nuestra fórmula exclusiva diseñada para maximizar la ganancia de peso y fortalecer el sistema inmunológico. El complemento perfecto para la alimentación mixta."
                            slug="alimento-balanceado-saosini-super-premiun"
                            image="https://res.cloudinary.com/dpuyoreeb/image/upload/v1770259821/saosini-products/wjjueyxjtv0le5mmcqbv.png"
                            price="90.00"
                            badge="Lo que usamos en Granja Saosini"
                        />
                    </div>
                </section>

                {/* SECTION 3 */}
                <section>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 font-bold text-xl shadow-sm border border-blue-200">3</span>
                        <h2 className="text-3xl font-display font-bold text-neutral-900">Agua: El Nutriente Olvidado</h2>
                    </div>
                    <p className="text-lg text-neutral-700 leading-relaxed mb-6 bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                        Muchos creen que el pasto basta. <strong className="text-blue-900">Falso.</strong> El agua potable debe estar disponible <strong>24/7/365</strong>. Una hidratación correcta aumenta drásticamente la conversión alimenticia y reduce el estrés.
                    </p>
                </section>

                {/* SECTION 4 */}
                <section>
                    <h2 className="text-2xl font-display font-bold text-neutral-900 mb-8 border-b border-neutral-200 pb-4">Estrategia por Etapa</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="relative pl-8 border-l-2 border-green-500">
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">Recría</h3>
                            <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded uppercase tracking-wider mb-3 inline-block">Ad Libitum</span>
                            <p className="text-neutral-600">Comida a libre discreción. Objetivo: Máxima musculatura en mínimo tiempo.</p>
                        </div>
                        <div className="relative pl-8 border-l-2 border-red-500">
                            <h3 className="text-xl font-bold text-neutral-900 mb-2">Reproductoras</h3>
                            <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded uppercase tracking-wider mb-3 inline-block">Controlado</span>
                            <p className="text-neutral-600">Ración medida. Evitar sobrepeso para prevenir distocia (partos difíciles).</p>
                        </div>
                    </div>
                </section>

                {/* QUOTE */}
                <blockquote className="relative p-10 bg-neutral-50 rounded-3xl text-center border border-neutral-100 shadow-inner">
                    <div className="text-4xl text-primary/20 absolute top-4 left-6 font-serif">"</div>
                    <p className="text-xl md:text-2xl font-serif text-neutral-800 italic mb-6 relative z-10">
                        No hay mayor éxito que cerrar el galpón sabiendo que tus animales están gorditos y tranquilos. Apagar la luz es dejar que crezcan en paz.
                    </p>
                    <cite className="font-bold text-neutral-900 not-italic block uppercase tracking-widest text-sm">— La Mística del Criador</cite>
                </blockquote>

                {/* SHARE FOOTER FOR MOBILE */}
                <div className="pt-8 border-t border-neutral-200 lg:hidden">
                    <h4 className="text-sm font-bold text-neutral-600 uppercase tracking-wider mb-4">Compartir artículo</h4>
                    <ShareButtons title={post.title} url={`${process.env.NEXT_PUBLIC_APP_URL || 'https://saosinishop.com'}/blog/${post.slug}`} />
                </div>
            </div>
        </div>
    );
}
