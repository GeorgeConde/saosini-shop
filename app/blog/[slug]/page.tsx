import { getPostBySlug } from '@/lib/actions/blog';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, ChevronLeft, Share2 } from 'lucide-react';
import { Metadata } from 'next';

export const revalidate = 60; // Revalidate every minute

interface Props {
    params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const { success, post } = await getPostBySlug(slug);

    if (!success || !post) {
        return { title: 'Artículo no encontrado' };
    }

    return {
        title: `${post.title} | Blog Saosini`,
        description: post.metaDescription || post.excerpt,
        openGraph: {
            images: post.featuredImage ? [post.featuredImage] : []
        }
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const { success, post } = await getPostBySlug(slug);

    if (!success || !post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] min-h-[400px] w-full bg-neutral-900">
                {post.featuredImage && (
                    <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="max-w-4xl mx-auto px-4 text-center text-white">
                        <Link
                            href={`/blog?categoria=${post.category.slug}`}
                            className="inline-block px-4 py-1 rounded-full bg-primary text-white text-sm font-bold mb-6 hover:bg-primary-dark transition-colors"
                        >
                            {post.category.name}
                        </Link>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-center space-x-6 text-sm md:text-base text-neutral-300">
                            {post.author.name && (
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-2">
                                        {post.author.image ? (
                                            <Image src={post.author.image} alt={post.author.name} width={32} height={32} className="rounded-full" />
                                        ) : (
                                            <User className="w-4 h-4" />
                                        )}
                                    </div>
                                    <span>{post.author.name}</span>
                                </div>
                            )}
                            <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                <span>
                                    {post.publishedAt
                                        ? new Date(post.publishedAt).toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })
                                        : 'Borrador'
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Content */}
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10 pb-20">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
                    <Link href="/blog" className="inline-flex items-center text-neutral-500 hover:text-primary mb-8 transition-colors group">
                        <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                        Volver al blog
                    </Link>

                    {/* Excerpt */}
                    <p className="text-xl md:text-2xl text-neutral-600 font-display leading-relaxed mb-8 italic border-l-4 border-primary pl-6">
                        {post.excerpt}
                    </p>

                    <div className="prose prose-lg prose-neutral max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-img:rounded-2xl">
                        {/* 
                            WARNING: In a real app, use a sanitize library like 'dompurify' or 'sanitize-html' 
                            before rendering HTML from DB to prevent XSS. 
                            For MVP/Trusted Admins, this is acceptable but risky.
                        */}
                        <div dangerouslySetInnerHTML={{ __html: post.content }} />
                    </div>

                    {/* Share & Tags footer */}
                    <div className="mt-12 pt-8 border-t border-neutral-100 flex justify-between items-center">
                        <div className="text-neutral-500 text-sm font-bold">
                            Compartir este artículo
                        </div>
                        <div className="flex space-x-2">
                            <button className="p-2 rounded-full bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors">
                                <Share2 className="w-5 h-5" />
                            </button>
                            {/* Add social buttons here */}
                        </div>
                    </div>
                </div>

                {/* Call to Action Banner (Optional) */}
                <div className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center border border-primary/10">
                    <h3 className="text-2xl font-display font-bold text-neural-900 mb-4">
                        ¿Quieres iniciar tu propia granja?
                    </h3>
                    <p className="text-neutral-600 mb-8 max-w-lg mx-auto">
                        Tenemos los mejores reproductores y asesoría personalizada para ayudarte a empezar con el pie derecho.
                    </p>
                    <Link href="/catalogo" className="btn-primary inline-flex">
                        Ver Catálogo de Reproductores
                    </Link>
                </div>
            </div>
        </article>
    );
}
