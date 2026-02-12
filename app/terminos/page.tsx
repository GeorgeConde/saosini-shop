import { Shield, FileText, AlertCircle } from "lucide-react";

export const metadata = {
    title: "Términos y Condiciones | Granja Saosini",
    description: "Términos y condiciones de uso de la tienda en línea de Granja Saosini."
};

export default function TerminosPage() {
    return (
        <div className="bg-neutral-50 min-h-screen py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
                        Términos y Condiciones
                    </h1>
                    <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
                        Última actualización: Febrero 2026
                    </p>
                </div>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-neutral-100 space-y-10">
                    <section>
                        <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-primary" />
                            <span>1. Información General</span>
                        </h2>
                        <p className="text-neutral-600 leading-relaxed">
                            Granja Saosini es una empresa dedicada a la crianza y comercialización de cuyes reproductores,
                            alimento balanceado, accesorios y productos de sanidad animal. Al utilizar nuestra tienda en línea,
                            aceptas los presentes términos y condiciones.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center space-x-3">
                            <Shield className="w-5 h-5 text-primary" />
                            <span>2. Productos y Precios</span>
                        </h2>
                        <ul className="space-y-3 text-neutral-600">
                            <li>• Los precios publicados están expresados en Soles (S/) e incluyen IGV cuando corresponde.</li>
                            <li>• Las imágenes de los productos son referenciales. En el caso de cuyes reproductores, cada animal es único.</li>
                            <li>• Nos reservamos el derecho de modificar precios sin previo aviso.</li>
                            <li>• La disponibilidad de productos está sujeta a stock.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center space-x-3">
                            <Shield className="w-5 h-5 text-primary" />
                            <span>3. Pedidos y Pagos</span>
                        </h2>
                        <ul className="space-y-3 text-neutral-600">
                            <li>• Los pedidos se confirman una vez verificado el pago.</li>
                            <li>• Aceptamos transferencias bancarias (BCP, Interbank), Yape y Plin.</li>
                            <li>• Para pedidos de cuyes reproductores, se requiere un adelanto del 50% para reservar.</li>
                            <li>• El comprador recibirá una confirmación por correo electrónico o WhatsApp.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center space-x-3">
                            <Shield className="w-5 h-5 text-primary" />
                            <span>4. Garantía en Animales Vivos</span>
                        </h2>
                        <ul className="space-y-3 text-neutral-600">
                            <li>• Garantizamos la salud y pureza racial de nuestros reproductores al momento de la entrega.</li>
                            <li>• Brindamos asesoría técnica post-venta para la adaptación del animal.</li>
                            <li>• No se aceptan devoluciones de animales vivos una vez entregados, salvo vicios ocultos comprobables.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center space-x-3">
                            <Shield className="w-5 h-5 text-primary" />
                            <span>5. Devoluciones y Cambios</span>
                        </h2>
                        <ul className="space-y-3 text-neutral-600">
                            <li>• Para productos (alimento, accesorios), se aceptan devoluciones dentro de las 48 horas posteriores a la entrega si el producto presenta defectos de fábrica.</li>
                            <li>• El producto debe estar sin uso y en su empaque original.</li>
                            <li>• Los costos de envío por devolución corren por cuenta del comprador.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-neutral-900 mb-4 flex items-center space-x-3">
                            <Shield className="w-5 h-5 text-primary" />
                            <span>6. Privacidad</span>
                        </h2>
                        <p className="text-neutral-600 leading-relaxed">
                            La información personal proporcionada por el cliente será utilizada exclusivamente para
                            procesar pedidos y mejorar nuestro servicio. No compartimos datos personales con terceros.
                        </p>
                    </section>

                    <section className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
                        <div className="flex items-start space-x-3">
                            <AlertCircle className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
                            <p className="text-sm text-neutral-500">
                                Para consultas sobre estos términos, contáctanos al <strong>+51 926 069 493</strong> o
                                escríbenos a <strong>ventas@saosini.pe</strong>.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
