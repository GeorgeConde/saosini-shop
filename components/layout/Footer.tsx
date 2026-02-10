import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, MapPin, Youtube } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-neutral-900 text-neutral-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2 text-white">
                            <div className="bg-secondary p-1 rounded-full">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                                    <path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10,10-4.48,10-10S17.52,2,12,2Zm0,18c-4.41,0-8-3.59-8-8s3.59-8,8-8,8,3.59,8,8-3.59,8-8,8Zm-1-11c0-1.1,.9-2,2-2s2,.9,2,2-.9,2-2,2-2-.9-2-2Zm-3,5c0-1.66,1.34-3,3-3s3,1.34,3,3-1.34,3-3,3-3-1.34-3-3Z" />
                                </svg>
                            </div>
                            <span className="font-display font-bold text-xl tracking-tighter uppercase">
                                SAOSINI<span className="text-secondary ml-1">Shop</span>
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed italic">
                            "La nutrición que tus cuyes merecen."
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.youtube.com/@AgroAventurasSaosini"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-red-500 transition-colors"
                                title="Agroaventuras Saosini en YouTube"
                            >
                                <Youtube className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.facebook.com/saosinicuyes"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-500 transition-colors"
                                title="Saosini Cuyes en Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="hover:text-pink-500 transition-colors"
                                title="Instagram"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Explorar</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/catalogo?category=Reproductores" className="hover:text-accent transition-colors">Cuyes Reproductores</Link></li>
                            <li><Link href="/catalogo?category=Alimento" className="hover:text-accent transition-colors">Alimento Balanceado</Link></li>
                            <li><Link href="/catalogo?category=Accesorios" className="hover:text-accent transition-colors">Accesorios de Granja</Link></li>
                            <li><Link href="/blog" className="hover:text-accent transition-colors">Guías de Crianza</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Soporte</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/contacto" className="hover:text-accent transition-colors">Contacto</Link></li>
                            <li><Link href="/preguntas-frecuentes" className="hover:text-accent transition-colors">Preguntas Frecuentes</Link></li>
                            <li><Link href="/envios" className="hover:text-accent transition-colors">Políticas de Envío</Link></li>
                            <li><Link href="/terminos" className="hover:text-accent transition-colors">Términos y Condiciones</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Contacto</h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start space-x-3 text-secondary font-bold">
                                <Phone className="w-5 h-5 shrink-0" />
                                <span>+51 926 069 493</span>
                            </li>
                            <li className="flex items-start space-x-3 hover:text-white transition-colors">
                                <Mail className="w-5 h-5 shrink-0" />
                                <span>ventas@saosini.pe</span>
                            </li>
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 shrink-0" />
                                <span>Cusco, Perú</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-xs">
                        © {currentYear} SAOSINI Shop. Todos los derechos reservados.
                    </p>
                    <div className="flex items-center space-x-6">
                        <span className="text-xs text-neutral-500">Pagos Seguros con:</span>
                        <div className="flex space-x-2">
                            {/* Placeholders for payment icons if images are missing */}
                            <div className="bg-white/10 px-2 py-1 rounded text-xs font-bold text-white/50">YAPE</div>
                            <div className="bg-white/10 px-2 py-1 rounded text-xs font-bold text-white/50">PLIN</div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
