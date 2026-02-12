"use client";

import ProductCard from "../ui/ProductCard";

interface RelatedProductsProps {
    products: any[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
    if (!products || products.length === 0) return null;

    return (
        <div className="mt-24 border-t border-neutral-100 pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-display font-bold text-neutral-900 mb-12 text-center">
                    Productos Relacionados
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {products.map((related) => (
                        <ProductCard key={related.id} product={related} />
                    ))}
                </div>
            </div>
        </div>
    );
}
