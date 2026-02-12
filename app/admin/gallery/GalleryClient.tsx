"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Video, Image as ImageIcon, X, Loader2 } from "lucide-react";
import { createGalleryItem, deleteGalleryItem } from "@/lib/actions/gallery";
import { CldUploadWidget } from "next-cloudinary";

interface GalleryItem {
    id: string;
    title: string | null;
    type: string;
    url: string;
    createdAt: Date;
}

export default function GalleryClient({ initialItems }: { initialItems: GalleryItem[] }) {
    const [items, setItems] = useState<GalleryItem[]>(initialItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [title, setTitle] = useState("");
    const [type, setType] = useState<"IMAGE" | "VIDEO">("IMAGE");
    const [url, setUrl] = useState("");
    const [uploadUrl, setUploadUrl] = useState("");

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const finalUrl = type === "IMAGE" ? uploadUrl : url;

        if (!finalUrl) {
            alert("Por favor ingrese una URL o suba una imagen");
            setLoading(false);
            return;
        }

        const res = await createGalleryItem({ title, type, url: finalUrl });

        if (res.success && res.item) {
            setItems([res.item, ...items]);
            setIsModalOpen(false);
            resetForm();
        } else {
            alert("Error al crear el item");
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de eliminar este item?")) return;

        // Optimistic update
        setItems(items.filter(i => i.id !== id));

        const res = await deleteGalleryItem(id);
        if (!res.success) {
            alert("Error al eliminar");
            // Revert if error (would need to re-fetch or keep previous state, simplistic here)
        }
    };

    const resetForm = () => {
        setTitle("");
        setType("IMAGE");
        setUrl("");
        setUploadUrl("");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-display font-bold text-neutral-900">Galería de Momentos</h1>
                    <p className="text-neutral-500">Administra las fotos y videos que aparecen en la página principal.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary flex items-center space-x-2 px-4 py-2"
                >
                    <Plus className="w-5 h-5" />
                    <span>Nuevo Item</span>
                </button>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {items.map((item) => (
                    <div key={item.id} className="group relative break-inside-avoid rounded-xl overflow-hidden shadow-sm bg-white border border-neutral-200">
                        <div className="aspect-[3/4] relative">
                            {item.type === "IMAGE" ? (
                                <Image
                                    src={item.url}
                                    alt={item.title || "Gallery Item"}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full bg-black flex items-center justify-center">
                                    {/* Thumbnail logic for video is complex without external API, plain placeholder for now */}
                                    <Video className="w-12 h-12 text-white opacity-50" />
                                    <div className="absolute inset-0 flex items-center justify-center text-xs text-white/70 font-mono break-all p-2 text-center pointer-events-none">
                                        {item.url.substring(0, 30)}...
                                    </div>
                                </div>
                            )}

                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                    title="Eliminar"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="absolute bottom-2 right-2 bg-black/60 text-white p-1 rounded-full text-xs">
                                {item.type === "IMAGE" ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold">Agregar a Galería</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-neutral-600">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Tipo</label>
                                <div className="flex space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setType("IMAGE")}
                                        className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg border ${type === "IMAGE" ? 'bg-primary/10 border-primary text-primary' : 'border-neutral-200 text-neutral-500'}`}
                                    >
                                        <ImageIcon className="w-4 h-4" />
                                        <span>Imagen</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setType("VIDEO")}
                                        className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg border ${type === "VIDEO" ? 'bg-primary/10 border-primary text-primary' : 'border-neutral-200 text-neutral-500'}`}
                                    >
                                        <Video className="w-4 h-4" />
                                        <span>Video (URL)</span>
                                    </button>
                                </div>
                            </div>

                            {type === "IMAGE" ? (
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Imagen</label>
                                    {uploadUrl ? (
                                        <div className="relative aspect-video rounded-lg overflow-hidden border border-neutral-200 mb-2">
                                            <img src={uploadUrl} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setUploadUrl("")}
                                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <CldUploadWidget
                                            uploadPreset="saosini_shop"
                                            onSuccess={(result: any) => {
                                                if (result.info && typeof result.info !== "string") {
                                                    setUploadUrl(result.info.secure_url);
                                                }
                                            }}
                                            options={{
                                                maxFiles: 1,
                                                resourceType: "image",
                                                clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
                                                maxFileSize: 10000000, // 10MB
                                            }}
                                        >
                                            {({ open }) => (
                                                <button
                                                    type="button"
                                                    onClick={() => open()}
                                                    className="w-full py-8 border-2 border-dashed border-neutral-300 rounded-xl hover:border-primary hover:bg-primary/5 transition-colors text-neutral-500 flex flex-col items-center"
                                                >
                                                    <ImageIcon className="w-8 h-8 mb-2" />
                                                    <span>Click para subir imagen</span>
                                                </button>
                                            )}
                                        </CldUploadWidget>
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">URL del Video</label>
                                    <input
                                        type="url"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary outline-none"
                                        required={type === "VIDEO"}
                                    />
                                    <p className="text-xs text-neutral-500 mt-1">Soporta YouTube, TikTok, Vimeo.</p>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Título (Opcional)</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Ej: Cosecha 2024"
                                    className="w-full px-4 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary outline-none"
                                />
                            </div>

                            <div className="pt-4 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-neutral-500 hover:bg-neutral-100 rounded-lg"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary px-6 py-2 flex items-center space-x-2"
                                >
                                    {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                    <span>Guardar</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
