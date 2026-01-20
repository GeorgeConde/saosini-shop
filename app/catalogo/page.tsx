import ProductCard from '@/components/ui/ProductCard';
import CatalogFilters from '@/components/catalogo/CatalogFilters';
import { SlidersHorizontal } from 'lucide-react';
import { getProducts } from '@/lib/actions/product';

export default async function CatalogPage({
    searchParams,
}: {
    searchParams: { q?: string; category?: string };
}) {
    const { q, category } = await searchParams;
    const { products = [] } = await getProducts(q, category);

    return (
        <div className="bg-neutral-50 min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900">Nuestro Catálogo</h1>
                    <p className="text-neutral-500 mt-4 text-lg max-w-2xl">
                        Explora nuestra selección de cuyes reproductores de alta genética y productos especializados para tu granja.
                    </p>
                </div>

                {/* Filters and Search */}
                <CatalogFilters />

                {/* Products Grid */}
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-neutral-300">
                        <SlidersHorizontal className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-neutral-900">No encontramos productos</h3>
                        <p className="text-neutral-500">Prueba ajustando tus filtros o término de búsqueda.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
