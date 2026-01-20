"use client";

import { useState } from 'react';
import { Plus } from 'lucide-react';
import BlogTable from './BlogTable';
import BlogEditor from './BlogEditor';

interface BlogPageClientProps {
    posts: any[];
    categories: { id: string; name: string }[];
    userId: string;
}

export default function BlogPageClient({ posts, categories, userId }: BlogPageClientProps) {
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [postToEdit, setPostToEdit] = useState<any | null>(null);

    const handleEdit = (post: any) => {
        setPostToEdit(post);
        setIsEditorOpen(true);
    };

    const handleClose = () => {
        setIsEditorOpen(false);
        setPostToEdit(null);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-neutral-900">Blog</h1>
                    <p className="text-neutral-500 mt-1">Gestiona el contenido educativo de tu granja.</p>
                </div>
                <button
                    onClick={() => {
                        setPostToEdit(null);
                        setIsEditorOpen(true);
                    }}
                    className="btn-primary flex items-center space-x-2 py-3 px-6 shadow-xl shadow-primary/20"
                >
                    <Plus className="w-5 h-5" />
                    <span>Nuevo Artículo</span>
                </button>
            </div>

            <BlogTable posts={posts} onEdit={handleEdit} />

            {isEditorOpen && (
                <BlogEditor
                    onClose={handleClose}
                    categories={categories}
                    initialData={postToEdit}
                    userId={userId}
                />
            )}
        </div>
    );
}
