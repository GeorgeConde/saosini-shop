"use client";

import { Search, Filter, Edit, Trash2, MoreHorizontal, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { deleteProduct } from '@/lib/actions/product';

interface Product {
    id: string;
    name: string;
    slug: string;
    price: number | any;
    stockQuantity: number;
    status: string;
    type: string;
    categoryId: string;
    description: string;
    category: {
        name: string;
    };
    images: {
        url: string;
    }[];
}

interface ProductsTableProps {
    initialProducts: Product[];
    onEdit: (product: Product) => void;
}

export default function ProductsTable({ initialProducts, onEdit }: ProductsTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const filteredProducts = initialProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.slug.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;

        setDeletingId(id);
        try {
            const result = await deleteProduct(id);
            if (result.success) {
                // Forzar recarga completa de la página para reflejar los cambios
                window.location.reload();
            } else {
                alert(result.error || 'Error al eliminar el producto');
                setDeletingId(null);
            }
        } catch (error) {
            console.error('Error al eliminar:', error);
            alert('Error inesperado al eliminar el producto');
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Filters & Search */}
            <div className="bg-white p-6 rounded-3xl shadow-sm ring-1 ring-neutral-200 flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o slug..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-2 px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors text-sm font-medium text-neutral-600">
                        <Filter className="w-4 h-4" />
                        <span>Categorías</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-3xl shadow-sm ring-1 ring-neutral-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-neutral-50 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
                                <th className="px-6 py-4">Producto</th>
                                <th className="px-6 py-4">Categoría</th>
                                <th className="px-6 py-4">Precio</th>
                                <th className="px-6 py-4">Stock</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className={`hover:bg-neutral-50 transition-colors group ${deletingId === product.id ? 'opacity-50 grayscale' : ''}`}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-neutral-100 border border-neutral-200">
                                                <Image
                                                    src={product.images[0]?.url || 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=100'}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-bold text-neutral-900 text-sm">{product.name}</p>
                                                <p className="text-neutral-400 text-xs">{product.type}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-bold uppercase tracking-widest leading-none">
                                            {product.category.name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-neutral-900 text-sm">S/ {Number(product.price).toFixed(2)}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <span className={`font-bold ${product.stockQuantity < 10 ? 'text-red-500' : 'text-neutral-700'}`}>{product.stockQuantity}</span>
                                            <span className="text-neutral-400 text-xs">uds.</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-1.5 text-green-600 font-bold text-xs uppercase">
                                            <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                            <span>{product.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => onEdit(product)}
                                                className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-primary transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                disabled={deletingId === product.id}
                                                className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-red-500 transition-colors disabled:opacity-50"
                                            >
                                                {deletingId === product.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                            </button>
                                            <button className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-10 text-center text-neutral-500">
                                        No se encontraron productos con ese nombre.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-sm text-neutral-500">
                    <p>Mostrando {filteredProducts.length} de {initialProducts.length} productos</p>
                </div>
            </div>
        </div>
    );
}
