"use client";
import { useState, useEffect } from 'react';
import { useCartStore } from '@/lib/store/cart-store';
import { ShoppingBag } from 'lucide-react';

interface CartButtonProps {
    onClick: () => void;
}

export default function CartButton({ onClick }: CartButtonProps) {
    const { getTotalItems } = useCartStore();
    const totalItems = getTotalItems();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <button
            onClick={onClick}
            className="relative p-2 text-white/80 hover:text-secondary rounded-full transition-colors group"
            aria-label="Abrir carrito"
        >
            <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-all" />
            {isMounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md animate-in zoom-in duration-300">
                    {totalItems}
                </span>
            )}
        </button>
    );
}
