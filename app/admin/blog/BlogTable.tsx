"use client";

import { Edit, Trash2, Loader2, Search, Eye } from 'lucide-react';
import { useState } from 'react';
import { deletePost, publishPost } from '@/lib/actions/blog';
import Link from 'next/link';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    status: string;
    publishedAt: Date | null;
    createdAt: Date;
    category: {
        name: string;
    };
}

interface BlogTableProps {
    posts: BlogPost[];
    onEdit: (post: BlogPost) => void;
}

export default function BlogTable({ posts, onEdit }: BlogTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este artículo?')) return;

        setDeletingId(id);
        const result = await deletePost(id);
        if (result.success) {
            window.location.reload();
        } else {
            alert(result.error);
            setDeletingId(null);
        }
    };

    const handlePublish = async (id: string) => {
        const result = await publishPost(id);
        if (result.success) {
            window.location.reload();
        } else {
            alert(result.error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm ring-1 ring-neutral-200">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Buscar artículos..."
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
                                <th className="px-6 py-4">Título</th>
                                <th className="px-6 py-4">Categoría</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Fecha</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {filteredPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-neutral-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-neutral-900 text-sm">{post.title}</p>
                                        <p className="text-neutral-400 text-xs truncate max-w-md">{post.excerpt}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm text-neutral-600">{post.category.name}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-block px-2 py-1 rounded-lg text-xs font-bold ${post.status === 'PUBLISHED'
                                            ? 'bg-green-100 text-green-700'
                                            : post.status === 'DRAFT'
                                                ? 'bg-amber-100 text-amber-700'
                                                : 'bg-neutral-100 text-neutral-600'
                                            }`}>
                                            {post.status === 'PUBLISHED' ? 'Publicado' : post.status === 'DRAFT' ? 'Borrador' : 'Archivado'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-neutral-500">
                                        {post.publishedAt
                                            ? new Date(post.publishedAt).toLocaleDateString('es-PE')
                                            : new Date(post.createdAt).toLocaleDateString('es-PE')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end space-x-2">
                                            {post.status === 'PUBLISHED' && (
                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    target="_blank"
                                                    className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-blue-500 transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                            )}
                                            {post.status === 'DRAFT' && (
                                                <button
                                                    onClick={() => handlePublish(post.id)}
                                                    className="px-3 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                                                >
                                                    Publicar
                                                </button>
                                            )}
                                            <button
                                                onClick={() => onEdit(post)}
                                                className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-primary transition-colors"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                disabled={deletingId === post.id}
                                                className="p-2 hover:bg-neutral-100 rounded-lg text-neutral-400 hover:text-red-500 transition-colors"
                                            >
                                                {deletingId === post.id ? (
                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredPosts.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-neutral-500">
                                        No se encontraron artículos.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
