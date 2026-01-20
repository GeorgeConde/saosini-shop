"use client";

import { AlertTriangle, Package } from 'lucide-react';
import Link from 'next/link';

interface LowStockProduct {
    id: string;
    name: string;
    stockQuantity: number;
    category: string;
}

interface LowStockAlertProps {
    products: LowStockProduct[];
}

export default function LowStockAlert({ products }: LowStockAlertProps) {
    return (
        <div className="bg-white rounded-3xl shadow-sm ring-1 ring-neutral-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-display font-bold text-neutral-900 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" />
                        Alertas de Stock
                    </h2>
                    <p className="text-sm text-neutral-500 mt-1">Productos con inventario bajo</p>
                </div>
            </div>

            <div className="space-y-3">
                {products.map((product) => {
                    const isOutOfStock = product.stockQuantity === 0;
                    const isCritical = product.stockQuantity > 0 && product.stockQuantity <= 5;
                    const isLow = product.stockQuantity > 5 && product.stockQuantity <= 10;

                    return (
                        <div
                            key={product.id}
                            className={`flex items-center justify-between p-3 rounded-2xl border ${isOutOfStock
                                    ? 'bg-red-50 border-red-200'
                                    : isCritical
                                        ? 'bg-amber-50 border-amber-200'
                                        : 'bg-yellow-50 border-yellow-200'
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <Package className={`w-4 h-4 ${isOutOfStock ? 'text-red-600' : isCritical ? 'text-amber-600' : 'text-yellow-600'
                                    }`} />
                                <div>
                                    <p className={`text-sm font-bold ${isOutOfStock ? 'text-red-800' : isCritical ? 'text-amber-800' : 'text-yellow-800'
                                        }`}>
                                        {product.name}
                                    </p>
                                    <p className="text-xs text-neutral-500">{product.category}</p>
                                </div>
                            </div>
                            <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase ${isOutOfStock
                                    ? 'bg-red-200 text-red-900'
                                    : isCritical
                                        ? 'bg-amber-200 text-amber-900'
                                        : 'bg-yellow-200 text-yellow-900'
                                }`}>
                                {isOutOfStock ? 'Sin Stock' : `Quedan ${product.stockQuantity}`}
                            </span>
                        </div>
                    );
                })}

                {products.length === 0 && (
                    <div className="text-center py-8 text-neutral-400">
                        <Package className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Todo el inventario está en buen estado</p>
                    </div>
                )}

                {products.length > 0 && (
                    <Link
                        href="/admin/productos"
                        className="block text-center text-sm font-bold text-primary hover:underline mt-4"
                    >
                        Ver todos los productos →
                    </Link>
                )}
            </div>
        </div>
    );
}
