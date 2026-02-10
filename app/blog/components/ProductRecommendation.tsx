'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface ProductRecommendationProps {
    name: string;
    description: string;
    slug: string;
    image: string;
    price: string;
    badge?: string;
}

export default function ProductRecommendation({ name, description, slug, image, price, badge = "Recomendado" }: ProductRecommendationProps) {
    return (
        <div className="my-10 group relative bg-white border border-neutral-200 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row">
            {/* Badge */}
            <div className="absolute top-0 left-0 bg-primary text-white text-xs font-bold px-3 py-1 rounded-br-xl z-20">
                {badge}
            </div>

            {/* Image Section */}
            <div className="w-full md:w-1/3 relative min-h-[200px] md:min-h-0 bg-neutral-100">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-2/3 p-6 md:p-8 flex flex-col justify-center">
                <h4 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                    {name}
                </h4>
                <p className="text-neutral-600 mb-6 text-sm md:text-base leading-relaxed">
                    {description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-neutral-900">
                        S/ {price}
                    </span>
                    <Link
                        href={`/productos/${slug}`}
                        className="inline-flex items-center gap-2 bg-neutral-900 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary transition-colors text-sm"
                    >
                        <ShoppingBag className="w-4 h-4" />
                        Ver Producto
                        <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
