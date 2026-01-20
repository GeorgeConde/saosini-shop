"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import ProductsTable from './ProductsTable';
import ProductForm from './ProductForm';

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

interface Category {
    id: string;
    name: string;
}

export default function AdminProductsPageClient({
    initialProducts,
    categories
}: {
    initialProducts: Product[],
    categories: Category[]
}) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | null>(null);

    const handleEdit = (product: Product) => {
        setProductToEdit(product);
        setIsFormOpen(true);
    };

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setProductToEdit(null);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-neutral-900">Productos</h1>
                    <p className="text-neutral-500 mt-1">Gestiona tu inventario de cuyes, alimento y accesorios.</p>
                </div>
                <button
                    onClick={() => {
                        setProductToEdit(null);
                        setIsFormOpen(true);
                    }}
                    className="btn-primary flex items-center space-x-2 py-3 px-6 shadow-xl shadow-primary/20"
                >
                    <Plus className="w-5 h-5" />
                    <span>Añadir Producto</span>
                </button>
            </div>

            {/* Products Table & Interactive UI */}
            <ProductsTable
                initialProducts={initialProducts}
                onEdit={handleEdit}
            />

            {/* Form Modal (Create or Edit) */}
            {isFormOpen && (
                <ProductForm
                    categories={categories}
                    onClose={handleCloseForm}
                    initialData={productToEdit}
                />
            )}
        </div>
    );
}
