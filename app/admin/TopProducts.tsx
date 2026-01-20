"use client";

import Image from 'next/image';
import { TrendingUp } from 'lucide-react';

interface TopProduct {
    id: string;
    name: string;
    image: string;
    quantitySold: number;
    revenue: number;
}

interface TopProductsProps {
    products: TopProduct[];
}

export default function TopProducts({ products }: TopProductsProps) {
    return (
        <div className="bg-white rounded-3xl shadow-sm ring-1 ring-neutral-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-display font-bold text-neutral-900">Productos Más Vendidos</h2>
                    <p className="text-sm text-neutral-500 mt-1">Top 5 del mes</p>
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
            </div>

            <div className="space-y-4">
                {products.map((product, index) => (
                    <div key={product.id} className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-neutral-50 transition-colors">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm shrink-0">
                            {index + 1}
                        </div>
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-neutral-900 truncate">{product.name}</p>
                            <p className="text-xs text-neutral-500">{product.quantitySold} vendidos</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-sm text-primary">S/ {product.revenue.toFixed(2)}</p>
                        </div>
                    </div>
                ))}

                {products.length === 0 && (
                    <div className="text-center py-8 text-neutral-400">
                        <p className="text-sm">No hay ventas registradas aún</p>
                    </div>
                )}
            </div>
        </div>
    );
}
