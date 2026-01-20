"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import CategoriesTable from './CategoriesTable';
import CategoryForm from './CategoryForm';

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    _count: {
        products: number;
    };
}

export default function AdminCategoriesPageClient({ categories }: { categories: Category[] }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [categoryToEdit, setCategoryToEdit] = useState<Category | null>(null);

    const handleEdit = (cat: Category) => {
        setCategoryToEdit(cat);
        setIsFormOpen(true);
    };

    const handleClose = () => {
        setIsFormOpen(false);
        setCategoryToEdit(null);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-neutral-900">Categorías</h1>
                    <p className="text-neutral-500 mt-1">Organiza tu catálogo de forma estructurada.</p>
                </div>
                <button
                    onClick={() => {
                        setCategoryToEdit(null);
                        setIsFormOpen(true);
                    }}
                    className="btn-primary flex items-center space-x-2 py-3 px-6 shadow-xl shadow-primary/20"
                >
                    <Plus className="w-5 h-5" />
                    <span>Añadir Categoría</span>
                </button>
            </div>

            <CategoriesTable categories={categories} onEdit={handleEdit} />

            {isFormOpen && (
                <CategoryForm
                    onClose={handleClose}
                    initialData={categoryToEdit}
                />
            )}
        </div>
    );
}
