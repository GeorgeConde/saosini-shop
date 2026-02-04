"use client";

import { useState } from 'react';
import { X, Loader2, Eye, Upload } from 'lucide-react';
import { createPost, updatePost } from '@/lib/actions/blog';
import { CldUploadWidget } from "next-cloudinary";

interface BlogEditorProps {
    onClose: () => void;
    categories: { id: string; name: string }[];
    initialData?: any;
    userId: string;
}

export default function BlogEditor({ onClose, categories, initialData, userId }: BlogEditorProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [preview, setPreview] = useState(false);
    const [featuredImage, setFeaturedImage] = useState<string>(initialData?.featuredImage || "");

    const isEditing = !!initialData;

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>, shouldPublish: boolean) {
        event.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        formData.set("authorId", userId);
        formData.set("shouldPublish", shouldPublish.toString());

        if (featuredImage) {
            formData.set("featuredImage", featuredImage);
        }

        const result = isEditing
            ? await updatePost(initialData.id, formData)
            : await createPost(formData);

        if (result.success) {
            onClose();
        } else {
            setError(result.error || "Ocurrió un error");
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden ring-1 ring-black/5 my-8">
                <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-neutral-900">
                            {isEditing ? `Editar: ${initialData.title}` : 'Nuevo Artículo'}
                        </h2>
                        <p className="text-sm text-neutral-500">
                            Crea contenido educativo para atraer clientes
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-200 rounded-full transition-colors text-neutral-400"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={(e) => handleSubmit(e, false)} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold text-neutral-700 ml-1">Título del Artículo</label>
                            <input
                                name="title"
                                required
                                defaultValue={initialData?.title}
                                placeholder="Ej: Guía Completa para Criar Cuyes en Casa"
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
                                <option value="">Selecciona una categoría</option>
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-neutral-700 ml-1">Imagen Destacada</label>
                            <div className="flex flex-col space-y-3">
                                {featuredImage && (
                                    <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-neutral-200 group">
                                        <img src={featuredImage} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setFeaturedImage("")}
                                            className="absolute top-1 right-1 p-1 bg-white/80 hover:bg-white rounded-full transition-colors"
                                        >
                                            <X className="w-3 h-3 text-red-500" />
                                        </button>
                                    </div>
                                )}
                                <CldUploadWidget
                                    uploadPreset="saosini_shop"
                                    onSuccess={(result: any) => {
                                        if (result.info && typeof result.info !== "string") {
                                            setFeaturedImage(result.info.secure_url);
                                        }
                                    }}
                                    options={{
                                        maxFiles: 1,
                                        resourceType: "image",
                                        folder: "saosini-blog",
                                    }}
                                >
                                    {({ open }) => (
                                        <button
                                            type="button"
                                            onClick={() => open()}
                                            className="w-full px-4 py-2.5 rounded-xl bg-primary/5 border border-dashed border-primary/30 hover:border-primary hover:bg-primary/10 transition-all text-sm font-bold text-primary flex items-center justify-center gap-2"
                                        >
                                            <Upload className="w-4 h-4" />
                                            {featuredImage ? 'Cambiar Imagen' : 'Subir Imagen Destacada'}
                                        </button>
                                    )}
                                </CldUploadWidget>
                                <input type="hidden" name="featuredImage" value={featuredImage} />
                            </div>
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold text-neutral-700 ml-1">Extracto (Resumen corto)</label>
                            <textarea
                                name="excerpt"
                                required
                                defaultValue={initialData?.excerpt}
                                rows={2}
                                placeholder="Breve descripción que aparecerá en el listado..."
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold text-neutral-700 ml-1">Meta Descripción (SEO)</label>
                            <input
                                name="metaDescription"
                                defaultValue={initialData?.metaDescription}
                                placeholder="Descripción para motores de búsqueda (160 caracteres max)"
                                maxLength={160}
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                            />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                            <label className="text-sm font-bold text-neutral-700 ml-1">Contenido (Markdown)</label>
                            <textarea
                                name="content"
                                required
                                defaultValue={initialData?.content}
                                rows={15}
                                placeholder="Escribe el contenido del artículo aquí..."
                                className="w-full px-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition-all resize-none font-mono text-sm"
                            />
                            <p className="text-xs text-neutral-500 ml-1">
                                Puedes usar Markdown: **negrita**, *cursiva*, # Títulos, etc.
                            </p>
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-end space-x-4 border-t border-neutral-100">
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
                            className="px-6 py-3 rounded-xl font-bold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 transition-colors disabled:opacity-50"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin inline mr-2" />}
                            Guardar Borrador
                        </button>
                        <button
                            type="button"
                            onClick={(e) => {
                                const form = e.currentTarget.closest('form');
                                if (form) handleSubmit(new Event('submit') as any, true);
                            }}
                            disabled={loading}
                            className="btn-primary flex items-center space-x-2 py-3 px-8 shadow-lg shadow-primary/20 disabled:opacity-50"
                        >
                            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                            <span>Publicar</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

