import { Truck, Package, Clock, MapPin, AlertCircle, CheckCircle } from "lucide-react";

export const metadata = {
    title: "Políticas de Envío | Granja Saosini",
    description: "Conoce nuestras políticas de envío para cuyes reproductores, alimento balanceado y accesorios a todo el Perú."
};

export default function EnviosPage() {
    return (
        <div className="bg-neutral-50 min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
                        Políticas de Envío
                    </h1>
                    <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
                        Entregamos a nivel nacional con el cuidado que tus animales y productos merecen.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Cobertura */}
                    <section className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                        <div className="flex items-start space-x-4 mb-6">
                            <div className="bg-primary/10 p-3 rounded-xl text-primary">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-900">Cobertura Nacional</h2>
                                <p className="text-neutral-500 mt-1">Realizamos envíos a todo el Perú</p>
                            </div>
                        </div>
                        <ul className="space-y-3 text-neutral-600">
                            <li className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span><strong>Lima Metropolitana:</strong> Entrega en 24-48 horas hábiles.</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span><strong>Provincias principales:</strong> Entrega en 2-3 días hábiles por agencia de carga.</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span><strong>Zonas alejadas:</strong> Entrega en 3-5 días hábiles dependiendo de la accesibilidad.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Cuyes vivos */}
                    <section className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                        <div className="flex items-start space-x-4 mb-6">
                            <div className="bg-green-50 p-3 rounded-xl text-green-600">
                                <Truck className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-900">Envío de Cuyes Reproductores</h2>
                                <p className="text-neutral-500 mt-1">Transporte especializado para garantizar bienestar animal</p>
                            </div>
                        </div>
                        <ul className="space-y-3 text-neutral-600">
                            <li className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span>Los cuyes viajan en jaulas ventiladas con alimento y agua para el trayecto.</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span>Coordinamos el envío directamente contigo por WhatsApp para asegurar la mejor ruta.</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span>Garantizamos la salud del animal al momento de la entrega.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Productos */}
                    <section className="bg-white rounded-3xl p-8 shadow-sm border border-neutral-100">
                        <div className="flex items-start space-x-4 mb-6">
                            <div className="bg-amber-50 p-3 rounded-xl text-amber-600">
                                <Package className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-neutral-900">Envío de Productos</h2>
                                <p className="text-neutral-500 mt-1">Alimento balanceado, accesorios y medicamentos</p>
                            </div>
                        </div>
                        <ul className="space-y-3 text-neutral-600">
                            <li className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span>Enviamos por agencias de carga confiables (Shalom, Marvisur, Olva Courier).</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span>El costo de envío varía según el peso y destino. Se calcula al momento de la compra.</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                <span>Empaque seguro para proteger el producto durante el transporte.</span>
                            </li>
                        </ul>
                    </section>

                    {/* Nota importante */}
                    <section className="bg-amber-50 rounded-3xl p-8 border border-amber-100">
                        <div className="flex items-start space-x-4">
                            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                            <div>
                                <h3 className="font-bold text-neutral-900 mb-2">Importante</h3>
                                <ul className="space-y-2 text-neutral-600 text-sm">
                                    <li>• Los tiempos de entrega son aproximados y pueden variar según la zona.</li>
                                    <li>• Para envíos de cuyes vivos, es necesario coordinar previamente por WhatsApp.</li>
                                    <li>• El cliente asume el costo del flete a su localidad.</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
