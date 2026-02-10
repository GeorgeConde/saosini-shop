import ProductCard from '@/components/ui/ProductCard';
import CatalogFilters from '@/components/catalogo/CatalogFilters';
import { SlidersHorizontal } from 'lucide-react';
import { getProducts } from '@/lib/actions/product';
import Image from 'next/image';

export default async function CatalogPage({
    searchParams,
}: {
    searchParams: { q?: string; category?: string };
}) {
    const { q, category } = await searchParams;
    const { products = [] } = await getProducts(q, category);

    // Dynamic Header Data Config
    const headerConfig: Record<string, { title: string; desc: string; icon?: string }> = {
        reproductores: {
            title: "Cuyes Reproductores",
            desc: "Genética superior seleccionada para mejorar la productividad de tu granja.",
            icon: "/icons/cuy.png"
        },
        alimento: {
            title: "Nutrición Especializada",
            desc: "Alimento balanceado formulado científicamente para cada etapa de crecimiento.",
            icon: "/icons/saco.png"
        },
        accesorios: {
            title: "Equipamiento Técnico",
            desc: "Comederos, bebederos y jaulas diseñados para el bienestar y eficiencia.",
            icon: "/icons/bebedero.png"
        },
        medicamentos: {
            title: "Sanidad Proactiva",
            desc: "Vitaminas, antibióticos y suplementos para mantener tu crianza sana.",
            icon: "/icons/productos.png"
        },
        default: {
            title: "Catálogo General",
            desc: "Explora nuestra selección completa de productos para tu granja de cuyes.",
            icon: undefined
        }
    };

    const currentConfig = category && headerConfig[category.toLowerCase()] ? headerConfig[category.toLowerCase()] : headerConfig.default;

    return (
        <div className="bg-neutral-50 min-h-screen pt-12 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Dynamic Header */}
                <div className="mb-12 flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-6 md:space-y-0 md:space-x-8 bg-white p-8 rounded-3xl shadow-sm border border-neutral-100">
                    {currentConfig.icon && (
                        <div className="relative w-32 h-32 shrink-0">
                            <Image
                                src={currentConfig.icon}
                                alt={currentConfig.title}
                                fill
                                className="object-contain drop-shadow-md p-2"
                            />
                        </div>
                    )}
                    <div className="flex-1">
                        <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 leading-tight">
                            {currentConfig.title}
                        </h1>
                        <p className="text-neutral-500 mt-4 text-xl max-w-2xl leading-relaxed">
                            {currentConfig.desc}
                        </p>
                    </div>
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
