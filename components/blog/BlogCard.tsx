import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';

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
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <article className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all ring-1 ring-neutral-200 group flex flex-col h-full">
            <Link href={`/blog/${post.slug}`} className="relative h-56 w-full bg-neutral-100 overflow-hidden block">
                {post.featuredImage ? (
                    <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-100 text-neutral-300">
                        <span className="text-4xl font-display font-bold opacity-20">Saosini</span>
                    </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm">
                    {post.category.name}
                </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-neutral-400 mb-4 space-x-4">
                    <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>
                            {post.publishedAt
                                ? new Date(post.publishedAt).toLocaleDateString('es-PE', { day: 'numeric', month: 'short', year: 'numeric' })
                                : 'Borrador'
                            }
                        </span>
                    </div>
                    {post.author.name && (
                        <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            <span>{post.author.name}</span>
                        </div>
                    )}
                </div>

                <Link href={`/blog/${post.slug}`} className="block mb-3">
                    <h3 className="text-xl font-display font-bold text-neutral-900 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                    </h3>
                </Link>

                <p className="text-neutral-500 text-sm line-clamp-3 mb-6 flex-grow">
                    {post.excerpt}
                </p>

                <Link
                    href={`/blog/${post.slug}`}
                    className="mt-auto inline-flex font-bold text-sm text-primary hover:text-primary-dark transition-colors"
                >
                    Leer artículo completo &rarr;
                </Link>
            </div>
        </article>
    );
}
