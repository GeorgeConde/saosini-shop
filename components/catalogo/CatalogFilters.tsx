"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Filter } from 'lucide-react';


const CATEGORIES = ['Todos', 'Reproductores', 'Alimento', 'Accesorios', 'Medicamentos'];

export default function CatalogFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'Todos');

    // Debounce search update
    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (searchQuery) {
                params.set('q', searchQuery);
            } else {
                params.delete('q');
            }

            if (selectedCategory && selectedCategory !== 'Todos') {
                params.set('category', selectedCategory);
            } else {
                params.delete('category');
            }

            router.push(`/catalogo?${params.toString()}`, { scroll: false });
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, selectedCategory, router, searchParams]);

    return (
        <div className="flex flex-col lg:flex-row gap-6 mb-12">
            {/* Search bar */}
            <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-neutral-900"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Category Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
                <div className="p-2 bg-white rounded-xl border border-neutral-200 lg:hidden">
                    <Filter className="w-5 h-5 text-neutral-500" />
                </div>
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-6 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${selectedCategory === category
                            ? 'bg-primary text-white shadow-lg shadow-primary/20'
                            : 'bg-white text-neutral-600 border border-neutral-200 hover:border-primary/50'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}
