"use client";

import { useState } from 'react';
import { useCartStore } from '@/lib/store/cart-store';
import { ShoppingBag, Check, Plus, Minus, CreditCard, Heart, GitCompare } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    type: string;
    images: { url: string; isPrimary: boolean }[];
}

export default function AddToCart({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const router = useRouter();

    const primaryImage = product.images?.find((img) => img.isPrimary)?.url || product.images?.[0]?.url || '/placeholder.png';

    const handleAddToCart = (redirect = false) => {
        addItem({
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: Number(product.price),
            image: primaryImage,
            quantity: quantity,
            type: product.type,
        });

        if (redirect) {
            router.push('/checkout');
        } else {
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center bg-neutral-100 rounded-lg p-1 border border-neutral-200">
                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="p-2 hover:bg-white rounded-md transition-all disabled:opacity-30"
                            disabled={quantity <= 1}
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-bold w-10 text-center">{quantity}</span>
                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="p-2 hover:bg-white rounded-md transition-all"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        onClick={() => handleAddToCart(false)}
                        disabled={added}
                        className={`flex-grow py-3.5 px-6 rounded-lg font-bold text-sm flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95 ${added
                                ? 'bg-green-500 text-white shadow-green-100'
                                : 'bg-primary text-white hover:bg-primary-dark shadow-primary/10'
                            }`}
                    >
                        {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                        <span>{added ? '¡Agregado!' : 'AÑADIR AL CARRITO'}</span>
                    </button>

                    <button
                        onClick={() => handleAddToCart(true)}
                        className="hidden md:flex py-3.5 px-6 rounded-lg font-bold text-sm bg-neutral-100 text-neutral-800 hover:bg-neutral-200 transition-all active:scale-95"
                    >
                        COMPRAR AHORA
                    </button>
                </div>

                <div className="flex items-center space-x-6 text-sm font-medium text-neutral-600">
                    <button className="flex items-center space-x-2 hover:text-primary transition-colors">
                        <Heart className="w-4 h-4" />
                        <span>Añadir a la lista de deseos</span>
                    </button>
                    <button className="flex items-center space-x-2 hover:text-primary transition-colors">
                        <GitCompare className="w-4 h-4" />
                        <span>Comparar</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
