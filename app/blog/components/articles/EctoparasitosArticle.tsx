'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AlertTriangle, ShieldCheck, CheckCircle2, Bug, SprayCan, Repeat, Eye, AlertCircle } from 'lucide-react';
import ShareButtons from '../ShareButtons';

export default function EctoparasitosArticle({ post }: { post: any }) {
    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden ring-1 ring-neutral-100/50">
            {/* Header Personalizado */}
            <header className="bg-neutral-900 text-white py-16 px-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/patterns/grid.svg')] z-0"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 text-sm font-bold uppercase tracking-wider mb-4 border border-red-600/30">
                        <AlertTriangle className="w-4 h-4" /> Sanidad Animal
                    </div>
                    <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-6">
                        Control de Ectoparásitos en Cuyes
                        <span className="block text-neutral-400 text-2xl mt-2 font-normal">Cómo eliminar la pulga y el ácaro de tu granja</span>
                    </h1>
                </div>
            </header>

            <div className="p-8 md:p-12 lg:p-16">
                {/* Intro */}
                <p className="text-xl text-neutral-700 leading-relaxed mb-8 drop-cap">
                    Uno de los mayores obstáculos en la crianza de cuyes es la presencia de ectoparásitos (parásitos externos). La "hita" o pulga y los ácaros no solo maltratan al animal, sino que generan pérdidas económicas significativas al retrasar el crecimiento y reducir la productividad.
                </p>
                <p className="text-lg text-neutral-600 mb-12">
                    En este artículo, basado en nuestra asistencia técnica en granjas aliadas, te mostramos el protocolo paso a paso para limpiar tu galpón y proteger a tus animales.
                </p>

                {/* Video Embed */}
                <div className="aspect-video w-full rounded-2xl shadow-2xl overflow-hidden bg-neutral-800 border-4 border-white mb-16 relative">
                    <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/-QCj_6qGE0M"
                        title="Control de Ectoparásitos en Cuyes"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    ></iframe>
                </div>

                <div className="space-y-16">

                    {/* El peligro invisible */}
                    <section className="bg-orange-50 p-8 rounded-2xl border-l-4 border-orange-500">
                        <h2 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                            <Eye className="w-6 h-6" /> El peligro invisible en las paredes
                        </h2>
                        <p className="text-orange-900/80 mb-0">
                            Los ectoparásitos no solo viven sobre el cuy; se esconden en las grietas de las paredes, en los ladrillos sueltos y en el forraje seco. <strong className="font-semibold">Si ves manchas de sangre en las paredes de las pozas</strong>, es una señal clara de que los parásitos se están alimentando de tus animales durante la noche.
                        </p>
                    </section>

                    {/* Paso 1 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-green-600" />
                            Paso 1: Limpieza profunda y eliminación de "nidos"
                        </h2>
                        <p className="text-neutral-700 mb-6 font-medium">
                            Antes de aplicar cualquier químico, es obligatorio realizar una limpieza física:
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                <div>
                                    <span className="font-bold text-neutral-900">Barrer al ras del suelo:</span>
                                    <span className="text-neutral-700 block">Elimina toda la materia orgánica y humedad donde se alojan las larvas.</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                                <div>
                                    <span className="font-bold text-neutral-900">Eliminar escondites:</span>
                                    <span className="text-neutral-700 block">Evita usar ladrillos sueltos para sujetar mallas, ya que son el nido perfecto para la pulga. Recomendamos usar grapas comerciales para fijar las instalaciones y eliminar esos refugios.</span>
                                </div>
                            </li>
                        </ul>
                    </section>

                    {/* Paso 2 */}
                    <section>
                        <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-3">
                            <Bug className="w-8 h-8 text-red-600" />
                            Paso 2: Tratamiento preventivo y curativo
                        </h2>
                        <p className="text-neutral-700 mb-6">
                            Para un control efectivo, combinamos dos tipos de acción: una para el animal y otra para el ambiente.
                        </p>

                        <div className="bg-red-50 p-4 rounded-lg mb-8 flex gap-3 items-start">
                            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                            <p className="text-red-800 text-sm font-bold mt-1">¡Seguridad ante todo! Estos productos son tóxicos. Es obligatorio el uso de mascarilla y guantes durante todo el proceso.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Tratamiento A */}
                            <div className="border border-neutral-200 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-neutral-900 mb-4 bg-neutral-100 px-3 py-1 inline-block rounded-md">A. Tratamiento al cuy (Espolvoreo)</h3>
                                <p className="text-neutral-600 mb-4 text-sm">Utilizamos <strong className="text-neutral-800">Carbadín al 5%</strong> (u otro recomendado por tu veterinario).</p>
                                <ul className="space-y-3 text-sm text-neutral-700">
                                    <li><strong>Protección:</strong> Cubre siempre los ojos y la boca del cuy con la mano antes de aplicar.</li>
                                    <li><strong>Aplicación:</strong> Espolvorea todo el cuerpo, asegurándote de que el polvo llegue a la base del pelo.</li>
                                    <li className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                        <strong className="text-blue-900">El método del saco:</strong> Coloca a los cuyes tratados en un saco durante 1 a 1.5 minutos. Esto evita que el parásito salte de regreso y asegura que muera en contacto con el producto.
                                    </li>
                                </ul>
                            </div>

                            {/* Tratamiento B */}
                            <div className="border border-neutral-200 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-neutral-900 mb-4 bg-neutral-100 px-3 py-1 inline-block rounded-md">B. Tratamiento del ambiente</h3>
                                <p className="text-neutral-600 mb-4 text-sm">Una vez que las pozas están vacías y limpias, fumigamos con <strong className="text-neutral-800">Cipermetrina al 20%</strong>.</p>
                                <p className="text-sm text-neutral-700">
                                    Debes cubrir paredes, pisos, rincones y rejillas para eliminar los parásitos que no están sobre el animal.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Paso 3 */}
                    <section className="bg-green-900 text-white p-8 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Repeat className="w-32 h-32" />
                        </div>
                        <div className="relative z-10">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                <Repeat className="w-8 h-8 text-green-400" />
                                Paso 3: El secreto del éxito (Repetición)
                            </h2>
                            <p className="text-green-100 mb-6 text-lg">
                                Este es el error más común del productor: aplicar el tratamiento una sola vez. El primer tratamiento mata a los adultos, pero NO elimina los huevos.
                            </p>
                            <div className="bg-white/10 p-6 rounded-xl border border-white/20">
                                <h4 className="text-green-400 font-bold uppercase tracking-wider text-sm mb-2">Recomendación de Granja Saosini</h4>
                                <p className="text-2xl font-bold text-white">Debes repetir el proceso cada 8 días.</p>
                                <p className="text-green-200 mt-2 text-sm">Objetivo: Cortar el ciclo reproductivo. Al aplicar a los 8 días, matas a los nuevos parásitos antes de que pongan más huevos.</p>
                            </div>
                        </div>
                    </section>

                    {/* Resultados */}
                    <div className="text-center max-w-2xl mx-auto pt-8">
                        <h3 className="text-xl font-bold text-neutral-900 mb-4">Resultados visibles</h3>
                        <p className="text-neutral-600 mb-8 element-p">
                            Al realizar este manejo, notarás que tus cuyes están más tranquilos, dejan de rascarse y empiezan a ganar peso de manera más eficiente. Un galpón libre de parásitos es sinónimo de una granja rentable.
                        </p>
                        <div className="bg-primary/5 p-6 rounded-2xl">
                            <p className="text-neutral-700 italic mb-4">
                                "En Granja Saosini, estamos comprometidos con la mejora de la crianza técnica. Si tienes problemas de sanidad o necesitas asesoría, no dudes en contactarnos."
                            </p>
                            <Link href="/contacto" className="btn-primary inline-flex">
                                Contactar Asesoría Técnica
                            </Link>
                        </div>
                    </div>

                    {/* Share */}
                    <div className="pt-8 border-t border-neutral-200 lg:hidden text-center">
                        <ShareButtons title={post.title} url={`${process.env.NEXT_PUBLIC_APP_URL || 'https://saosinishop.com'}/blog/${post.slug}`} />
                    </div>
                </div>
            </div>
        </div>
    );
}
