import Link from 'next/link';
import Image from 'next/image';
import { User, ChevronRight, Tag } from 'lucide-react';
import ShareButtons from './ShareButtons';

interface BlogSidebarProps {
    author?: {
        name: string;
        image: string | null;
    } | null;
    categories: { name: string; slug: string; _count?: { posts: number } }[];
    recentPosts: any[];
    currentPostUrl: string;
    postTitle: string;
    className?: string;
}

export default function BlogSidebar({
    author,
    categories,
    recentPosts,
    currentPostUrl,
    postTitle,
    className = ''
}: BlogSidebarProps) {
    return (
        <aside className={`space-y-8 ${className}`}>
            {/* Author Profile */}
            {author && (
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
                    <h3 className="font-bold text-neutral-900 mb-4 border-b border-neutral-100 pb-2">Autor</h3>
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center overflow-hidden shrink-0">
                            {author.image ? (
                                <Image
                                    src={author.image}
                                    alt={author.name}
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <User className="w-8 h-8 text-neutral-400" />
                            )}
                        </div>
                        <div>
                            <p className="font-bold text-neutral-900">{author.name}</p>
                            <p className="text-sm text-neutral-500">Editor en Granja Saosini</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Share Buttons */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
                <ShareButtons title={postTitle} url={currentPostUrl} />
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white text-center shadow-lg shadow-primary/20">
                <h3 className="font-display font-bold text-xl mb-2">¿Buscas cuyes mejorados?</h3>
                <p className="text-white/90 text-sm mb-4">
                    Visita nuestro catálogo y conoce nuestros ejemplares de alta calidad genética.
                </p>
                <Link
                    href="/catalogo"
                    className="inline-block bg-white text-primary font-bold py-2 px-6 rounded-lg hover:bg-neutral-50 transition-colors w-full"
                >
                    Ver Catálogo
                </Link>
            </div>

            {/* Recent Posts */}
            {recentPosts.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
                    <h3 className="font-bold text-neutral-900 mb-4 border-b border-neutral-100 pb-2">Recientes</h3>
                    <div className="space-y-4">
                        {recentPosts.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group flex gap-3 items-start"
                            >
                                <div className="w-20 h-16 rounded-lg bg-neutral-100 shrink-0 overflow-hidden relative">
                                    {post.featuredImage ? (
                                        <Image
                                            src={post.featuredImage}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-neutral-200">
                                            <Tag className="w-6 h-6 text-neutral-400" />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-neutral-800 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h4>
                                    <span className="text-xs text-neutral-400 block mt-1">
                                        {new Date(post.publishedAt).toLocaleDateString('es-PE', { month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
                <h3 className="font-bold text-neutral-900 mb-4 border-b border-neutral-100 pb-2">Categorías</h3>
                <div className="space-y-2">
                    {categories.map((cat) => (
                        <Link
                            key={cat.slug}
                            href={`/blog?categoria=${cat.slug}`}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-neutral-50 text-neutral-600 hover:text-primary transition-colors"
                        >
                            <span className="text-sm font-medium">{cat.name}</span>
                            {cat._count && <span className="text-xs bg-neutral-100 px-2 py-0.5 rounded-full text-neutral-500">{cat._count.posts}</span>}
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
}
