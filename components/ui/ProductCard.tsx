"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, MessageCircle, Info, Check } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart-store';
import { useState } from 'react';

interface ProductCardProps {
    product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);
    const [added, setAdded] = useState(false);
    const primaryImage = product.images?.find((img: any) => img.isPrimary)?.url || product.images?.[0]?.url || 'https://via.placeholder.com/400';

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: primaryImage,
            quantity: 1,
            type: product.type,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ring-neutral-200 flex flex-col h-full">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-neutral-100">
                <Image
                    src={primaryImage}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.type === 'REPRODUCTOR_PREMIUM' && (
                    <div className="absolute top-3 left-3 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg uppercase tracking-wider">
                        Premium
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-2">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                        {product.category?.name || 'Producto'}
                    </span>
                    <h3 className="text-lg font-bold text-neutral-900 line-clamp-1 group-hover:text-primary transition-colors">
                        {product.name}
                    </h3>
                </div>

                <p className="text-neutral-500 text-sm line-clamp-2 mb-4 flex-grow">
                    {product.description}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-100">
                    <div className="flex flex-col">
                        <span className="text-sm text-neutral-400 line-through">
                            {product.compareAtPrice && `S/ ${Number(product.compareAtPrice).toFixed(2)}`}
                        </span>
                        <span className="text-xl font-bold text-primary">
                            S/ {Number(product.price).toFixed(2)}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        {product.requiresCoordination ? (
                            <a
                                href={`https://wa.me/51987654321?text=Hola, me interesa el producto: ${product.name}`}
                                target="_blank"
                                className="p-2.5 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-200"
                                title="Consultar por WhatsApp"
                            >
                                <MessageCircle className="w-5 h-5" />
                            </a>
                        ) : (
                            <button
                                onClick={handleAddToCart}
                                className={`p-2.5 rounded-xl transition-all shadow-lg active:scale-95 ${added ? 'bg-secondary text-white shadow-secondary-200' : 'bg-primary text-white shadow-primary-200 hover:bg-primary-light'
                                    }`}
                                title={added ? "Añadido" : "Añadir al carrito"}
                            >
                                {added ? <Check className="w-5 h-5" /> : <ShoppingCart className="w-5 h-5" />}
                            </button>
                        )}
                        <Link
                            href={`/catalogo/${product.slug}`}
                            className="p-2.5 bg-neutral-100 text-neutral-600 rounded-xl hover:bg-neutral-200 transition-colors"
                            title="Ver detalles"
                        >
                            <Info className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
