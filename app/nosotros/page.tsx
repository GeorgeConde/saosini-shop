import { Award, Users, Heart, Sprout, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "Sobre Nosotros | Granja Saosini",
    description: "Conoce la historia de Granja Saosini, especialistas en crianza de cuyes de alta calidad genética en Cusco, Perú."
};

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                <img
                    src="https://images.unsplash.com/photo-1591871963053-7619c45b7041?q=80&w=2670&auto=format&fit=crop"
                    alt="Granja de Cuyes"
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-30"
                />
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
                            Nuestra Historia
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">
                            Dedicados a la crianza responsable y sostenible de cuyes de alta calidad genética,
                            brindando productos saludables y apoyo a nuestra comunidad.
                        </p>
                    </div>
                </div>
            </div>

            {/* Quiénes Somos */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-neutral-900 font-display mb-6">
                            ¿Quiénes Somos?
                        </h2>
                        <div className="space-y-4 text-neutral-600 leading-relaxed">
                            <p>
                                <strong>Granja Saosini</strong> nació en Cusco con el objetivo de transformar la crianza de cuyes
                                en una actividad rentable e innovadora. Con más de 10 años de experiencia, hemos perfeccionado
                                nuestras técnicas de selección genética y alimentación para ofrecer reproductores de alto
                                rendimiento.
                            </p>
                            <p>
                                Nuestro canal <strong>Agroaventuras Saosini</strong> en YouTube se ha convertido en referencia
                                para productores de todo el Perú, compartiendo conocimiento técnico sobre crianza, empadre,
                                nutrición y manejo sanitario.
                            </p>
                            <p>
                                Hoy ofrecemos no solo cuyes reproductores, sino una línea completa de productos: alimento
                                balanceado formulado especialmente para cuyes, accesorios de granja y productos de sanidad animal.
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { icon: Award, number: "10+", label: "Años de experiencia" },
                            { icon: Users, number: "500+", label: "Productores asesorados" },
                            { icon: Heart, number: "100%", label: "Garantía de salud" },
                            { icon: Sprout, number: "365", label: "Días de producción/año" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-neutral-50 rounded-2xl p-6 text-center border border-neutral-100">
                                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                                <div className="text-3xl font-bold text-neutral-900 font-display">{stat.number}</div>
                                <div className="text-sm text-neutral-500 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Valores */}
            <div className="bg-neutral-50 py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-neutral-900 font-display text-center mb-12">
                        Nuestros Valores
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Excelencia Genética",
                                desc: "Seleccionamos rigurosamente nuestros reproductores por su precocidad, prolificidad y conversión alimenticia para garantizar animales de alto rendimiento.",
                            },
                            {
                                title: "Compromiso con el Productor",
                                desc: "Brindamos asesoría técnica integral, desde la instalación del galpón hasta la comercialización. Tu éxito es nuestro éxito.",
                            },
                            {
                                title: "Bioseguridad",
                                desc: "Mantenemos protocolos estrictos de sanidad y bienestar animal. Todos nuestros cuyes pasan por control veterinario antes de la entrega.",
                            },
                        ].map((value, i) => (
                            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-neutral-100">
                                <h3 className="text-xl font-bold text-neutral-900 mb-3">{value.title}</h3>
                                <p className="text-neutral-600 leading-relaxed">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Ubicación y CTA */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
                <div className="bg-primary/5 rounded-3xl p-8 md:p-12 border border-primary/10 text-center">
                    <div className="flex items-center justify-center space-x-2 text-primary mb-4">
                        <MapPin className="w-5 h-5" />
                        <span className="font-bold">Cusco, Perú</span>
                    </div>
                    <h2 className="text-3xl font-bold text-neutral-900 font-display mb-4">
                        ¿Listo para visitar nuestra granja?
                    </h2>
                    <p className="text-neutral-600 max-w-xl mx-auto mb-8">
                        Agenda una visita para conocer nuestras instalaciones, ejemplares y procesos de crianza.
                        Estaremos encantados de recibirte.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/contacto"
                            className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary/90 transition shadow-xl shadow-primary/20"
                        >
                            Contáctanos
                        </Link>
                        <a
                            href="https://wa.me/51926069493"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-600 transition"
                        >
                            <Phone className="w-5 h-5" />
                            <span>+51 926 069 493</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
