import { Mail, Phone, MapPin, Youtube, Facebook, Instagram } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="bg-neutral-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
                        Contáctanos
                    </h1>
                    <p className="text-xl text-neutral-500 max-w-2xl mx-auto">
                        ¿Tienes dudas sobre crianza o nuestros productos? Estamos aquí para asesorarte.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Contact Info */}
                    <div className="space-y-12">
                        <section>
                            <h3 className="text-2xl font-bold text-neutral-900 mb-6">Información de Contacto</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start space-x-4">
                                    <div className="bg-primary/10 p-3 rounded-xl text-primary">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-neutral-900">Llámanos</p>
                                        <p className="text-neutral-600">+51 926 069 493</p>
                                    </div>
                                </li>
                                <li className="flex items-start space-x-4">
                                    <div className="bg-primary/10 p-3 rounded-xl text-primary">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-neutral-900">Escríbenos</p>
                                        <p className="text-neutral-600">ventas@saosini.pe</p>
                                    </div>
                                </li>
                                <li className="flex items-start space-x-4">
                                    <div className="bg-primary/10 p-3 rounded-xl text-primary">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-neutral-900">Visítanos</p>
                                        <p className="text-neutral-600">Cusco, Perú</p>
                                    </div>
                                </li>
                            </ul>
                        </section>

                        <section>
                            <h3 className="text-2xl font-bold text-neutral-900 mb-6">Síguenos en Redes</h3>
                            <p className="text-neutral-600 mb-6">
                                Únete a nuestra comunidad en **Agroaventuras Saosini** para consejos de crianza y más.
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href="https://www.youtube.com/@AgroAventurasSaosini"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition w-full justify-center"
                                >
                                    <Youtube className="w-5 h-5" />
                                    <span>YouTube</span>
                                </a>
                                <a
                                    href="https://www.facebook.com/saosinicuyes"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition w-full justify-center"
                                >
                                    <Facebook className="w-5 h-5" />
                                    <span>Facebook</span>
                                </a>
                            </div>
                        </section>
                    </div>

                    {/* Contact Form Details */}
                    <div className="bg-white p-8 rounded-3xl shadow-lg border border-neutral-100">
                        <h3 className="text-2xl font-bold text-neutral-900 mb-6">Envíanos un mensaje</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">Nombre</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition" placeholder="Tu nombre" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-2">Teléfono</label>
                                    <input type="tel" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition" placeholder="+51..." />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Correo Electrónico</label>
                                <input type="email" className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition" placeholder="ejemplo@correo.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-2">Mensaje</label>
                                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition" placeholder="¿En qué podemos ayudarte?"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition shadow-xl shadow-primary/20">
                                Enviar Mensaje
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
