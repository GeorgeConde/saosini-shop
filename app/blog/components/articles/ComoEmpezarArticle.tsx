'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Youtube, Target, Hammer, Users, BookOpen, ShoppingBag } from 'lucide-react';
import ShareButtons from '../ShareButtons';
import ProductRecommendation from '../ProductRecommendation';

export default function ComoEmpezarArticle({ post }: { post: any }) {
    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden ring-1 ring-neutral-100/50">
            {/* Hero Section Personalizado */}
            <section className="relative bg-neutral-900 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('/patterns/grid-lg.svg')]"></div>
                <div className="max-w-4xl mx-auto px-8 relative z-10 text-center">
                    <span className="inline-block px-4 py-1 rounded-full bg-primary text-white font-bold text-sm mb-6 uppercase tracking-wider">
                        Guía para Emprendedores
                    </span>
                    <h1 className="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
                        Cómo empezar una crianza de cuyes
                        <span className="block text-primary-light mt-2">4 pilares para un negocio rentable</span>
                    </h1>
                    <p className="text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
                        Domina la técnica y transforma tu pasión en una actividad altamente rentable con el respaldo de Granja Saosini.
                    </p>
                </div>
            </section>

            <div className="p-8 md:p-12 lg:p-16 space-y-16">

                {/* Intro */}
                <div className="prose prose-lg mx-auto text-neutral-600">
                    <p className="lead text-2xl font-serif text-neutral-800">
                        ¿Estás pensando en emprender en el mundo de la crianza de cuyes o quieres tecnificar tu producción actual?
                    </p>
                    <p>
                        La crianza de estos animales es una actividad altamente rentable, pero solo si se basa en el manejo técnico y la experiencia. En Granja Saosini, compartimos contigo los cuatro pilares fundamentales que todo productor debe dominar.
                    </p>
                </div>

                {/* LOS 4 PILARES */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Pilar 1 */}
                    <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 text-green-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">1. Mercado y Comercialización</h3>
                        <p className="text-neutral-600">Antes de criar, debes saber a quién vender. Identifica tu nicho: carne, reproductores o mascotas.</p>
                    </div>
                    {/* Pilar 2 */}
                    <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200">
                        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 text-orange-600">
                            <Hammer className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">2. Infraestructura</h3>
                        <p className="text-neutral-600">Tus instalaciones deben garantizar ventilación, temperatura y protección contra depredadores. Pozas o jaulas bien diseñadas.</p>
                    </div>
                    {/* Pilar 3 */}
                    <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                            <Target className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">3. Genética</h3>
                        <p className="text-neutral-600">Inicia con reproductores de calidad comprobada. No gastes pólvora en gallinazos.</p>
                    </div>
                    {/* Pilar 4 */}
                    <div className="bg-neutral-50 p-8 rounded-2xl border border-neutral-200">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 text-purple-600">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">4. Manejo y Alimentación</h3>
                        <p className="text-neutral-600">La sanidad preventiva y una nutrición balanceada son la clave para evitar mortalidad.</p>
                    </div>
                </div>

                {/* KIT DE INICIO RECOMENDADO (Menos invasivo) */}
                <div className="border-t border-neutral-200 pt-16">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center justify-center gap-2">
                            <ShoppingBag className="w-6 h-6 text-primary" />
                            Tu Kit de Inicio
                        </h2>
                        <p className="text-neutral-600">
                            Hemos seleccionado las herramientas esenciales para que comiences con el pie derecho. Sin gastos innecesarios.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <ProductRecommendation
                            name="Comedero de Arcilla - Modelo Saosini"
                            description="Evita el desperdicio de alimento desde el primer día."
                            slug="comedero-cuy-conejo"
                            image="https://www.jersimport.com/wp-content/uploads/2019/10/280.jpg"
                            price="3.00"
                            badge="Básico"
                        />
                        <ProductRecommendation
                            name="Hembra Reproductora - Línea Comercial"
                            description="Tu primer plantel de madres genéticamente seleccionadas."
                            slug="hembra-reproductora-linea-comercial"
                            image="https://res.cloudinary.com/dpuyoreeb/image/upload/v1769655970/saosini-products/jcvkhzcx3pgtzma4ki2b.jpg"
                            price="50.00"
                            badge="Pie de Cría"
                        />
                    </div>
                </div>

                {/* Share */}
                <div className="pt-8 border-t border-neutral-200 lg:hidden text-center">
                    <ShareButtons title={post.title} url={`${process.env.NEXT_PUBLIC_APP_URL || 'https://saosinishop.com'}/blog/${post.slug}`} />
                </div>
            </div>
        </div>
    );
}
