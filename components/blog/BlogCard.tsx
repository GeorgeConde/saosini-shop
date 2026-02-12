import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowUpRight } from 'lucide-react';

interface BlogCardProps {
    post: {
        title: string;
        slug: string;
        excerpt: string;
        featuredImage: string | null;
        publishedAt: Date | null;
        author: {
            name: string | null;
            image: string | null;
        };
        category: {
            name: string;
            slug: string;
        };
    };
    variant?: 'dark' | 'light';
}

export default function BlogCard({ post, variant = 'light' }: BlogCardProps) {
    const isDark = variant === 'dark';

    return (
        <article className="group relative h-full">
            {/* Glow border effect (dark only) */}
            {isDark && (
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-primary/40 via-transparent to-secondary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-sm" />
            )}

            <Link
                href={`/blog/${post.slug}`}
                className={`relative flex flex-col h-full rounded-3xl overflow-hidden transition-all duration-500 ${isDark
                        ? 'bg-neutral-900/80 backdrop-blur-xl border border-white/[0.08] hover:border-white/[0.15]'
                        : 'bg-white shadow-sm hover:shadow-xl ring-1 ring-neutral-200 hover:ring-primary/20'
                    }`}
            >
                {/* Image section */}
                <div className="relative h-56 w-full overflow-hidden">
                    {post.featuredImage ? (
                        <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className={`object-cover transition-all duration-700 ease-out group-hover:scale-110 ${isDark ? 'group-hover:brightness-110' : ''}`}
                        />
                    ) : (
                        <div className={`w-full h-full flex items-center justify-center ${isDark ? 'bg-neutral-800' : 'bg-neutral-100'}`}>
                            <span className={`text-4xl font-display font-bold ${isDark ? 'text-white/10' : 'opacity-20 text-neutral-300'}`}>Saosini</span>
                        </div>
                    )}

                    {/* Gradient overlay */}
                    {isDark && (
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />
                    )}

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 z-10">
                        {isDark ? (
                            <div className="relative">
                                <div className="absolute inset-0 bg-primary/30 rounded-full blur-md" />
                                <span className="relative bg-primary/20 backdrop-blur-xl text-primary-light px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border border-primary/30 block">
                                    {post.category.name}
                                </span>
                            </div>
                        ) : (
                            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                                {post.category.name}
                            </span>
                        )}
                    </div>

                    {/* Arrow indicator (dark only) */}
                    {isDark && (
                        <div className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                            <ArrowUpRight className="w-4 h-4 text-white" />
                        </div>
                    )}

                    {/* Scan line effect (dark only) */}
                    {isDark && (
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none overflow-hidden">
                            <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-pulse" style={{ top: '30%' }} />
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow relative">
                    {/* Grid background (dark only) */}
                    {isDark && (
                        <div className="absolute inset-0 opacity-[0.03]"
                            style={{
                                backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                                backgroundSize: '20px 20px',
                            }}
                        />
                    )}

                    <div className="relative z-10 flex flex-col flex-grow">
                        {/* Meta info */}
                        <div className={`flex items-center text-xs mb-4 space-x-4 ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>
                            <div className="flex items-center">
                                <Calendar className={`w-3 h-3 mr-1.5 ${isDark ? 'text-primary/70' : ''}`} />
                                <span>
                                    {post.publishedAt
                                        ? new Date(post.publishedAt).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' })
                                        : 'Borrador'
                                    }
                                </span>
                            </div>
                            {post.author.name && (
                                <div className="flex items-center">
                                    <User className={`w-3 h-3 mr-1.5 ${isDark ? 'text-secondary/70' : ''}`} />
                                    <span>{post.author.name}</span>
                                </div>
                            )}
                        </div>

                        {/* Title */}
                        <h3 className={`text-xl font-display font-bold mb-3 leading-snug line-clamp-2 transition-colors duration-500 ${isDark
                                ? 'text-white group-hover:text-primary-light'
                                : 'text-neutral-900 group-hover:text-primary'
                            }`}>
                            {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className={`text-sm line-clamp-3 mb-6 flex-grow leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-700'
                            }`}>
                            {post.excerpt}
                        </p>

                        {/* CTA */}
                        <div className="mt-auto flex items-center justify-between">
                            <span className={`inline-flex items-center text-sm font-bold transition-colors duration-300 ${isDark
                                    ? 'text-primary group-hover:text-primary-light'
                                    : 'text-primary hover:text-primary-dark'
                                }`}>
                                <span className="mr-2">Leer artículo completo</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                            </span>

                            {/* Decorative line (dark only) */}
                            {isDark && (
                                <div className="h-[1px] flex-grow ml-4 bg-gradient-to-r from-white/10 to-transparent" />
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </article>
    );
}
