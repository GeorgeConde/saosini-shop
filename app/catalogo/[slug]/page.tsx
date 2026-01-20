import Link from 'next/link';
import { ChevronLeft, MessageCircle, ShieldCheck, HeartPulse, Info, AlertCircle, ShoppingCart, Share2, Facebook, Twitter, Instagram, ChevronRight, Grid } from 'lucide-react';
import { getProductBySlug } from '@/lib/actions/product';
import ProductGallery from '@/components/ui/ProductGallery';
import AddToCart from '@/components/ui/AddToCart';
import { notFound } from 'next/navigation';

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const { success, product, error } = await getProductBySlug(slug);

    if (!success || !product) {
        if (error === "Producto no encontrado") {
            notFound();
        }
        return (
            <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold text-neutral-900 mb-2">Error al cargar el producto</h1>
                <p className="text-neutral-500 mb-6">{error || "Ocurrió un error inesperado."}</p>
                <Link href="/catalogo" className="btn-primary">Volver al catálogo</Link>
            </div>
        );
    }

    const isPremium = product.type === 'REPRODUCTOR_PREMIUM';

    // Parse technical data safely
    let technicalData = {};
    if (product.technicalData && typeof product.technicalData === 'object') {
        technicalData = product.technicalData as any;
    }

    return (
        <div className="bg-white min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Navigation */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-100">
                    <nav className="flex items-center space-x-2 text-xs font-medium text-neutral-400">
                        <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href="/catalogo" className="hover:text-primary transition-colors">Catálogo</Link>
                        <ChevronRight className="w-3 h-3" />
                        <Link href={`/catalogo?categoria=${product.category?.slug}`} className="hover:text-primary transition-colors">
                            {product.category?.name || 'Producto'}
                        </Link>
                        <ChevronRight className="w-3 h-3 text-neutral-300" />
                        <span className="text-neutral-900 font-bold truncate max-w-[200px]">{product.name}</span>
                    </nav>
                    <div className="flex items-center space-x-3 text-neutral-400">
                        <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-primary transition-colors" />
                        <Grid className="w-4 h-4 cursor-pointer hover:text-primary transition-colors" />
                        <ChevronRight className="w-4 h-4 cursor-pointer hover:text-primary transition-colors" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Gallery */}
                    <ProductGallery
                        images={product.images as any}
                        productName={product.name}
                        isPremium={isPremium}
                    />

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-6">
                            <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 leading-tight">
                                {product.name}
                            </h1>
                            <div className="mt-4 flex flex-col space-y-2">
                                <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                                    SKU: <span className="text-neutral-600">70701000{product.id.slice(-2)}</span>
                                </span>
                                <div className="flex items-center space-x-4">
                                    <span className="text-3xl font-bold text-primary">S/ {Number(product.price).toFixed(2)}</span>
                                    {product.compareAtPrice && (
                                        <span className="text-xl text-neutral-400 line-through">S/ {Number(product.compareAtPrice).toFixed(2)}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Urgency Indicator */}
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center space-x-3 mb-8 border border-red-100 animate-pulse">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            <p className="text-sm font-medium">¡19 personas están viendo este producto ahora!</p>
                        </div>

                        {/* Actions */}
                        <div className="mb-10">
                            {product.requiresCoordination ? (
                                <a
                                    href={`https://wa.me/51987654321?text=Hola, estoy interesado en: ${product.name}`}
                                    target="_blank"
                                    className="w-full bg-green-500 hover:bg-green-600 text-white px-8 py-5 rounded-2xl font-bold text-lg flex items-center justify-center space-x-4 transition-all shadow-xl shadow-green-900/10 active:scale-95 mb-4"
                                >
                                    <MessageCircle className="w-6 h-6" />
                                    <span>Consultar por WhatsApp</span>
                                </a>
                            ) : (
                                <AddToCart product={{ ...product, price: Number(product.price) }} />
                            )}
                        </div>

                        {/* Meta */}
                        <div className="space-y-4 pt-8 border-t border-neutral-100">
                            <div className="flex items-center text-sm">
                                <span className="font-bold text-neutral-900 w-24">Categoría:</span>
                                <span className="text-neutral-500">{product.category?.name || 'Producto'}</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <span className="font-bold text-neutral-900 w-24">Etiquetas:</span>
                                <div className="flex flex-wrap gap-2 text-neutral-500 underline decoration-neutral-300">
                                    <span>granja</span>, <span>cuyes</span>, <span>{product.category?.name.toLowerCase()}</span>
                                </div>
                            </div>
                            <div className="flex items-center text-sm">
                                <span className="font-bold text-neutral-900 w-24">Compartir:</span>
                                <div className="flex items-center space-x-4 text-neutral-400">
                                    <Facebook className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
                                    <Twitter className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
                                    <Instagram className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
                                    <Share2 className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 py-8 border-y border-neutral-100">
                            {[
                                { icon: ShieldCheck, title: "Envío a todo", subtitle: "Lima y Provincia" },
                                { icon: HeartPulse, title: "Calidad", subtitle: "Garantizada" },
                                { icon: MessageCircle, title: "Soporte", subtitle: "Permanente" },
                                { icon: Info, title: "Garantía", subtitle: "100% Original" },
                            ].map((badge, i) => (
                                <div key={i} className="flex flex-col items-center text-center space-y-2">
                                    <badge.icon className="w-8 h-8 text-neutral-300" strokeWidth={1.5} />
                                    <div className="text-[10px] uppercase tracking-tighter">
                                        <span className="block font-bold text-neutral-900">{badge.title}</span>
                                        <span className="text-neutral-400">{badge.subtitle}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Description & Technical Data */}
                <div className="mt-20">
                    <div className="border-b border-neutral-200 mb-8 flex space-x-12">
                        <button className="pb-4 text-sm font-bold border-b-2 border-primary text-primary">Descripción</button>
                        <button className="pb-4 text-sm font-bold text-neutral-400 hover:text-neutral-600 transition-colors">Información Adicional</button>
                        <button className="pb-4 text-sm font-bold text-neutral-400 hover:text-neutral-600 transition-colors">Valoraciones (0)</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="prose prose-neutral max-w-none">
                            <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                                {product.description || "No hay una descripción detallada para este producto."}
                            </p>
                        </div>
                        {Object.keys(technicalData).length > 0 ? (
                            <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200">
                                <h3 className="font-bold text-lg mb-6">Especificaciones Técnicas</h3>
                                <div className="space-y-4">
                                    {Object.entries(technicalData).map(([key, value]) => (
                                        <div key={key} className="flex justify-between items-center py-2 border-b border-neutral-200 last:border-0">
                                            <span className="text-neutral-500 text-sm font-medium">{key}</span>
                                            <span className="text-neutral-900 font-bold text-sm">{String(value)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-neutral-50 rounded-3xl p-8 border border-neutral-200">
                                <h3 className="font-bold text-lg mb-6">Especificaciones</h3>
                                <ul className="space-y-4 text-sm text-neutral-600">
                                    <li className="flex items-center space-x-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        <span>Material: Alta resistencia</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        <span>Garantía: 12 meses</span>
                                    </li>
                                    <li className="flex items-center space-x-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                        <span>Origen: Nacional</span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Cleanup: removing previously thought helper
