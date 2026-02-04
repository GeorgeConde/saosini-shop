"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { createProduct, updateProduct } from "@/lib/actions/product";
import { ProductType } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";

interface Category {
    id: string;
    name: string;
}

interface ProductFormProps {
    categories: Category[];
    onClose: () => void;
    initialData?: any;
}

export default function ProductForm({
    categories,
    onClose,
    initialData
}: ProductFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageUrls, setImageUrls] = useState<string[]>(initialData?.images?.map((img: any) => img.url) || []);

    const isEditing = !!initialData;

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        // Ensure the uploaded image URLs are included as JSON
        formData.set("imageUrls", JSON.stringify(imageUrls));

        const result = isEditing
            ? await updateProduct(initialData.id, formData)
            : await createProduct(formData);

        if (result.success) {
            onClose();
        } else {
            setError(result.error || "Ocurrió un error");
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden ring-1 ring-black/5 animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-neutral-900">
                            {isEditing ? `Editar: ${initialData.name}` : 'Añadir Nuevo Producto'}
                        </h2>
                        <p className="text-sm text-neutral-500">
                            {isEditing ? 'Actualiza la información del producto.' : 'Completa los datos para registrarlo en el catálogo.'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-200 rounded-full transition-colors text-neutral-400"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-neutral-700 ml-1">Nombre del Producto</label>
                            <input
                                name="name"
                                required
                                defaultValue={initialData?.name}
                                placeholder="Ej: Cuy Reproductor Macho - Línea Perú"
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-neutral-700 ml-1">Descripción</label>
                            <textarea
                                name="description"
                                required
                                defaultValue={initialData?.description}
                                rows={3}
                                placeholder="Detalles genéticos, edad, peso, etc..."
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 ml-1">Precio (S/)</label>
                            <input
                                name="price"
                                type="number"
                                step="0.01"
                                required
                                defaultValue={initialData?.price}
                                placeholder="0.00"
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 ml-1">Stock</label>
                            <input
                                name="stockQuantity"
                                type="number"
                                required
                                defaultValue={initialData?.stockQuantity}
                                placeholder="0"
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 ml-1">Categoría</label>
                            <select
                                name="categoryId"
                                required
                                defaultValue={initialData?.categoryId}
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                            >
                                <option value="">Seleccionar...</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 ml-1">Tipo de Producto</label>
                            <select
                                name="type"
                                required
                                defaultValue={initialData?.type}
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                            >
                                {Object.values(ProductType).map(type => (
                                    <option key={type} value={type}>{type.replace(/_/g, ' ')}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-neutral-700 ml-1">Imágenes del Producto</label>
                            <div className="flex flex-col space-y-4">
                                {imageUrls.length > 0 && (
                                    <div className="grid grid-cols-4 gap-4">
                                        {imageUrls.map((url, index) => (
                                            <div key={url} className="relative aspect-square rounded-xl overflow-hidden border border-neutral-200 group">
                                                <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => setImageUrls(prev => prev.filter(u => u !== url))}
                                                    className="absolute top-1 right-1 p-1 bg-white/80 hover:bg-white rounded-full transition-colors shadow-sm"
                                                >
                                                    <X className="w-3 h-3 text-red-500" />
                                                </button>
                                                {index === 0 && (
                                                    <div className="absolute bottom-0 left-0 right-0 bg-primary/80 text-white text-[8px] font-bold text-center py-0.5">
                                                        PRINCIPAL
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <CldUploadWidget
                                    uploadPreset="saosini_shop"
                                    onSuccess={(result: any) => {
                                        if (result.info && typeof result.info !== "string") {
                                            setImageUrls(prev => [...prev, result.info.secure_url]);
                                        }
                                    }}
                                    options={{
                                        maxFiles: 10,
                                        resourceType: "image",
                                        clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
                                        maxFileSize: 5000000,
                                        folder: "saosini-products",
                                    }}
                                >
                                    {({ open }) => (
                                        <button
                                            type="button"
                                            onClick={() => open()}
                                            className="w-full px-4 py-3 rounded-xl bg-primary/10 border border-dashed border-primary/30 hover:border-primary hover:bg-primary/20 transition-all text-sm font-bold text-primary flex items-center justify-center gap-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            Subir Imágenes ({imageUrls.length}/10)
                                        </button>
                                    )}
                                </CldUploadWidget>
                                <p className="text-xs text-neutral-500 ml-1">
                                    📸 Sube hasta 10 imágenes. La primera será la principal. Máximo 5MB c/u.
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="pt-4 flex items-center justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 rounded-xl font-bold text-neutral-500 hover:bg-neutral-100 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary flex items-center space-x-2 py-3 px-8 shadow-lg shadow-primary/20 disabled:opacity-50"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            <span>{isEditing ? 'Guardar Cambios' : 'Guardar Producto'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
