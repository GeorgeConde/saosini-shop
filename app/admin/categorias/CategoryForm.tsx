"use client";

import { useState } from "react";
import { X, Loader2, Upload } from "lucide-react";
import { createCategory, updateCategory } from "@/lib/actions/category";
import { CldUploadWidget } from "next-cloudinary";

interface CategoryFormProps {
    onClose: () => void;
    initialData?: any;
}

export default function CategoryForm({
    onClose,
    initialData
}: CategoryFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string>(initialData?.image || "");

    const isEditing = !!initialData;

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        if (imageUrl) {
            formData.set("image", imageUrl);
        }

        const result = isEditing
            ? await updateCategory(initialData.id, formData)
            : await createCategory(formData);

        if (result.success) {
            onClose();
        } else {
            setError(result.error || "Ocurrió un error");
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden ring-1 ring-black/5 animate-in fade-in zoom-in duration-200">
                <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-neutral-900">
                            {isEditing ? `Editar: ${initialData.name}` : 'Añadir Nueva Categoría'}
                        </h2>
                        <p className="text-sm text-neutral-500">
                            Gestiona las agrupaciones de tus productos.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-200 rounded-full transition-colors text-neutral-400"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[85vh] overflow-y-auto">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 ml-1">Nombre de la Categoría</label>
                            <input
                                name="name"
                                required
                                defaultValue={initialData?.name}
                                placeholder="Ej: Cuyes de Raza"
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 ml-1">Descripción</label>
                            <textarea
                                name="description"
                                defaultValue={initialData?.description}
                                rows={3}
                                placeholder="Breve descripción para SEO o referencia interna..."
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 ml-1">Imagen de Categoría</label>
                            <div className="flex flex-col space-y-4">
                                {imageUrl && (
                                    <div className="relative w-full h-40 rounded-xl overflow-hidden border border-neutral-200 group">
                                        <img src={imageUrl} alt="Preview" className="w-full h-full object-contain bg-neutral-50" />
                                        <button
                                            type="button"
                                            onClick={() => setImageUrl("")}
                                            className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white rounded-full transition-colors shadow-sm"
                                        >
                                            <X className="w-4 h-4 text-red-500" />
                                        </button>
                                    </div>
                                )}
                                <CldUploadWidget
                                    uploadPreset="saosini_shop"
                                    onSuccess={(result: any) => {
                                        if (result.info && typeof result.info !== "string") {
                                            setImageUrl(result.info.secure_url);
                                        }
                                    }}
                                    options={{
                                        maxFiles: 1,
                                        resourceType: "image",
                                        folder: "saosini-categories",
                                    }}
                                >
                                    {({ open }) => (
                                        <button
                                            type="button"
                                            onClick={() => open()}
                                            className="w-full px-4 py-3 rounded-xl bg-primary/5 border border-dashed border-primary/30 hover:border-primary hover:bg-primary/10 transition-all text-sm font-bold text-primary flex items-center justify-center gap-2"
                                        >
                                            <Upload className="w-4 h-4" />
                                            {imageUrl ? 'Cambiar Imagen' : 'Subir Imagen'}
                                        </button>
                                    )}
                                </CldUploadWidget>
                                <input type="hidden" name="image" value={imageUrl} />
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
                            <span>{isEditing ? 'Guardar Cambios' : 'Guardar Categoría'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

