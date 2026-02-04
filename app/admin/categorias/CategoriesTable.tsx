"use client";

import { Edit, Trash2, Loader2, Search } from 'lucide-react';
import { useState } from 'react';
import { deleteCategory } from '@/lib/actions/category';

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    _count: {
        products: number;
    };
}

interface CategoriesTableProps {
    categories: Category[];
    onEdit: (category: Category) => void;
}

export default function CategoriesTable({ categories, onEdit }: CategoriesTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const filteredCategories = categories.filter(cat =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar esta categoría? Si tiene productos, no se podrá borrar.')) return;

        setDeletingId(id);
        const result = await deleteCategory(id);
        if (!result.success) {
            alert(result.error);
        }
        setDeletingId(null);
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm ring-1 ring-neutral-200">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Buscar categorías..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm ring-1 ring-neutral-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-neutral-50 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
                                <th className="px-6 py-4">Imagen</th>
                                <th className="px-6 py-4">Categoría</th>
                                <th className="px-6 py-4">Descripción</th>
                                <th className="px-6 py-4 text-center">Productos</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {filteredCategories.map((cat) => (
                                <tr key={cat.id} className={`hover:bg-neutral-50 transition-colors group ${deletingId === cat.id ? 'opacity-50' : ''}`}>
                                    <td className="px-6 py-4">
                                        <div className="w-12 h-12 rounded-xl bg-neutral-100 overflow-hidden border border-neutral-200">
                                            {cat.image ? (
                                                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-neutral-300">
                                                    N/A
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-neutral-900">{cat.name}</td>
                                    <td className="px-6 py-4 text-sm text-neutral-500 max-w-xs truncate">
                                        {cat.description || '-'}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="bg-neutral-100 px-3 py-1 rounded-full text-xs font-bold text-neutral-600">
                                            {cat._count.products} pza.
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            <button
                                                onClick={() => onEdit(cat)}
                                                className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-primary transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(cat.id)}
                                                disabled={deletingId === cat.id}
                                                className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-red-500 transition-colors"
                                            >
                                                {deletingId === cat.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

