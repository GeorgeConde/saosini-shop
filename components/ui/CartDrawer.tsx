"use client";

import { useCartStore } from '@/lib/store/cart-store';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration issues
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                    <div className="flex items-center space-x-2">
                        <ShoppingBag className="w-6 h-6 text-primary" />
                        <h2 className="text-xl font-display font-bold">Tu Carrito</h2>
                        <span className="bg-neutral-100 text-neutral-500 text-xs font-bold px-2 py-0.5 rounded-full">
                            {getTotalItems()}
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-neutral-400" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                    {items.length > 0 ? (
                        items.map((item) => (
                            <div key={item.id} className="flex space-x-4">
                                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-neutral-100 ring-1 ring-neutral-200 shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                </div>
                                <div className="flex-grow flex flex-col justify-between py-1">
                                    <div>
                                        <h3 className="font-bold text-neutral-900 line-clamp-1">{item.name}</h3>
                                        <p className="text-primary font-bold">S/ {item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3 bg-neutral-100 p-1 rounded-lg">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 hover:bg-white rounded-md transition-all shadow-sm disabled:opacity-50"
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 hover:bg-white rounded-md transition-all shadow-sm"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-neutral-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4 pt-20">
                            <div className="bg-neutral-100 p-6 rounded-full">
                                <ShoppingBag className="w-12 h-12 text-neutral-300" />
                            </div>
                            <p className="text-neutral-500 italic">Tu carrito está vacío</p>
                            <button
                                onClick={onClose}
                                className="text-primary font-bold hover:underline"
                            >
                                Seguir comprando
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 border-t border-neutral-100 bg-neutral-50/50">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-neutral-500">Subtotal</span>
                            <span className="text-2xl font-display font-bold text-primary">
                                S/ {getTotalPrice().toFixed(2)}
                            </span>
                        </div>
                        <Link
                            href="/checkout"
                            onClick={onClose}
                            className="w-full btn-primary flex items-center justify-center space-x-3 py-4 text-lg"
                        >
                            <span>Proceder al Pago</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <p className="text-center text-[10px] text-neutral-400 mt-4 uppercase tracking-[0.2em] font-bold">
                            Envío calculado en el siguiente paso
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
