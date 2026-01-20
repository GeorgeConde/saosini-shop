import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, MapPin, Wheat } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2 text-white">
                            <Wheat className="w-6 h-6 text-accent" />
                            <span className="font-display font-bold text-xl tracking-tight">
                                Granja de Cuyes
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed">
                            Líderes en la crianza y distribución de cuyes reproductores de alta genética en el Perú.
                            Calidad y pasión en cada ejemplar.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-accent transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="hover:text-accent transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Explorar</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/catalogo?categoria=reproductores" className="hover:text-accent transition-colors">Cuyes Reproductores</Link></li>
                            <li><Link href="/catalogo?categoria=alimento" className="hover:text-accent transition-colors">Alimento Balanceado</Link></li>
                            <li><Link href="/catalogo?categoria=accesorios" className="hover:text-accent transition-colors">Accesorios de Granja</Link></li>
                            <li><Link href="/blog" className="hover:text-accent transition-colors">Guías de Crianza</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Soporte</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/contacto" className="hover:text-accent transition-colors">Contacto</Link></li>
                            <li><Link href="/envios" className="hover:text-accent transition-colors">Políticas de Envío</Link></li>
                            <li><Link href="/terminos" className="hover:text-accent transition-colors">Términos y Condiciones</Link></li>
                            <li><Link href="/privacidad" className="hover:text-accent transition-colors">Privacidad</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contacto</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start space-x-3">
                                <Phone className="w-5 h-5 text-accent shrink-0" />
                                <span>+51 987 654 321</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <Mail className="w-5 h-5 text-accent shrink-0" />
                                <span>ventas@granjadecuyes.pe</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-accent shrink-0" />
                                <span>Lima, Perú</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-xs">
                        © {currentYear} Granja de Cuyes. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center space-x-6">
                        <img src="/yape-logo.png" alt="Yape" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-not-allowed" title="Próximamente" />
                        <img src="/plin-logo.png" alt="Plin" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all cursor-not-allowed" title="Próximamente" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
