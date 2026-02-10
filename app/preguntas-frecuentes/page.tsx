import { HelpCircle, Truck, ShieldCheck, CreditCard, ChevronDown } from "lucide-react";

export default function FAQPage() {
    return (
        <div className="bg-neutral-50 min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-secondary/20 rounded-2xl mb-6">
                        <HelpCircle className="w-8 h-8 text-secondary-dark" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
                        Preguntas Frecuentes
                    </h1>
                    <p className="text-xl text-neutral-500">
                        Resolvemos tus dudas sobre envíos, garantía genética y métodos de pago.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Section: Envíos */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                        <div className="flex items-center space-x-3 mb-6">
                            <Truck className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-bold text-neutral-900">Envíos y Entregas</h2>
                        </div>
                        <div className="space-y-4">
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-neutral-50 p-4 text-neutral-900 transition hover:bg-neutral-100">
                                    <h3 className="font-medium">¿Hacen envíos a todo el Perú?</h3>
                                    <ChevronDown className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" />
                                </summary>
                                <p className="mt-4 px-4 leading-relaxed text-neutral-700">
                                    Sí, realizamos envíos a nivel nacional. Para cuyes vivos, coordinamos transporte especializado que garantice el bienestar animal. Para productos (alimento, accesorios), usamos agencias de carga confiables.
                                </p>
                            </details>

                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-neutral-50 p-4 text-neutral-900 transition hover:bg-neutral-100">
                                    <h3 className="font-medium">¿Cuánto tarda en llegar mi pedido?</h3>
                                    <ChevronDown className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" />
                                </summary>
                                <p className="mt-4 px-4 leading-relaxed text-neutral-700">
                                    Los envíos a Lima y ciudades principales suelen demorar entre 24 a 48 horas. A provincias más alejadas, puede tomar hasta 3 o 4 días hábiles dependiendo de la accesibilidad.
                                </p>
                            </details>
                        </div>
                    </div>

                    {/* Section: Garantía */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                        <div className="flex items-center space-x-3 mb-6">
                            <ShieldCheck className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-bold text-neutral-900">Garantía y Genética</h2>
                        </div>
                        <div className="space-y-4">
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-neutral-50 p-4 text-neutral-900 transition hover:bg-neutral-100">
                                    <h3 className="font-medium">¿Qué garantía tienen los reproductores?</h3>
                                    <ChevronDown className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" />
                                </summary>
                                <p className="mt-4 px-4 leading-relaxed text-neutral-700">
                                    Garantizamos la pureza racial y la salud de nuestros animales al momento de la entrega. Todos nuestros reproductores pasan por un control veterinario riguroso antes del viaje.
                                </p>
                            </details>

                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-neutral-50 p-4 text-neutral-900 transition hover:bg-neutral-100">
                                    <h3 className="font-medium">¿Brindan asesoría post-venta?</h3>
                                    <ChevronDown className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" />
                                </summary>
                                <p className="mt-4 px-4 leading-relaxed text-neutral-700">
                                    ¡Por supuesto! Al adquirir nuestros reproductores, obtienes acceso a nuestra comunidad de Agroaventuras Saosini donde compartimos tips y respondemos consultas básicas sobre adaptación y manejo.
                                </p>
                            </details>
                        </div>
                    </div>

                    {/* Section: Pagos */}
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                        <div className="flex items-center space-x-3 mb-6">
                            <CreditCard className="w-6 h-6 text-primary" />
                            <h2 className="text-2xl font-bold text-neutral-900">Pagos</h2>
                        </div>
                        <div className="space-y-4">
                            <details className="group [&_summary::-webkit-details-marker]:hidden">
                                <summary className="flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-neutral-50 p-4 text-neutral-900 transition hover:bg-neutral-100">
                                    <h3 className="font-medium">¿Aceptan Yape o Plin?</h3>
                                    <ChevronDown className="h-5 w-5 shrink-0 transition duration-300 group-open:-rotate-180" />
                                </summary>
                                <p className="mt-4 px-4 leading-relaxed text-neutral-700">
                                    Sí, aceptamos transferencias bancarias (BCP, Interbank), Yape y Plin. Para montos mayores, recomendamos transferencia directa.
                                </p>
                            </details>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
