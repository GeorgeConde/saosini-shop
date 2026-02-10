import { getPostBySlug } from '@/lib/actions/blog';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Calendar, User, Clock, ChevronLeft } from 'lucide-react';
import { Metadata } from 'next';
import ShareButtons from '../components/ShareButtons';
import { getCustomArticleComponent } from '../components/ContentRegistry';

export const revalidate = 60;

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
            title: post.title,
            description: post.metaDescription || post.excerpt,
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

    // Check if there is a custom React Component for this article
    const CustomArticleContent = getCustomArticleComponent(slug);

    return (
        <article className="bg-neutral-50 min-h-screen font-sans selection:bg-primary/20">
            {/* CINEMATIC HERO SECTION */}
            <div className="relative h-[80vh] w-full overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={post.featuredImage || '/images/placeholder.jpg'}
                        alt={post.title}
                        fill
                        className="object-cover brightness-50"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-20 container mx-auto">
                    <div className="max-w-4xl">
                        <Link
                            href={`/blog?categoria=${post.category.slug}`}
                            className="inline-block px-4 py-1.5 bg-primary/90 text-white rounded-full text-sm font-bold tracking-wide uppercase mb-6 backdrop-blur-sm shadow-lg hover:bg-primary transition-colors"
                        >
                            {post.category.name}
                        </Link>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-8 drop-shadow-lg">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-neutral-200 text-sm md:text-base font-medium">
                            {post.author?.name && (
                                <div className="flex items-center gap-2">
                                    <span className="p-1 bg-white/10 rounded-full"><User size={16} /></span>
                                    <span>{post.author.name}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="p-1 bg-white/10 rounded-full"><Calendar size={16} /></span>
                                <span>
                                    {post.publishedAt
                                        ? new Date(post.publishedAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
                                        : new Date(post.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
                                    }
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="p-1 bg-white/10 rounded-full"><Clock size={16} /></span>
                                <span>5 min de lectura</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-0 relative z-10 -mt-20 mb-20">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* LEFT COLUMN: SHARE & TOC (Sticky) */}
                    <div className="hidden lg:block w-24 shrink-0">
                        <div className="sticky top-24 flex flex-col items-center gap-8">
                            <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest -rotate-90 py-8">Compartir</span>
                            <ShareButtons url={`${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}`} title={post.title} />
                        </div>
                    </div>

                    {/* CENTER COLUMN: MAIN CONTENT */}
                    <div className="flex-1 max-w-4xl">

                        <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors group font-medium bg-black/20 backdrop-blur px-4 py-2 rounded-lg absolute -top-32 left-0 md:static md:bg-transparent md:text-neutral-600 md:hover:text-primary md:mb-8">
                            <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                            Volver al blog
                        </Link>

                        {CustomArticleContent ? (
                            /* CUSTOM REACT CONTENT */
                            <CustomArticleContent post={post} />
                        ) : (
                            /* DEFAULT DYNAMIC CONTENT (Fallback) */
                            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 lg:p-16 ring-1 ring-neutral-100/50">

                                {/* INTRO / EXCERPT */}
                                {post.excerpt && (
                                    <p className="text-xl md:text-2xl font-serif text-neutral-800 leading-relaxed mb-12 first-letter:text-6xl first-letter:font-bold first-letter:text-neutral-900 first-letter:mr-2 first-letter:float-left">
                                        {post.excerpt}
                                    </p>
                                )}

                                {/* MAIN CONTENT - Enhanced Visual Styling */}
                                <div className="prose prose-lg prose-neutral max-w-none blog-content
                                    prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight
                                    
                                    prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b-2 prose-h2:border-primary/20
                                    prose-h2:text-neutral-900 prose-h2:relative
                                    prose-h2:before:content-[''] prose-h2:before:absolute prose-h2:before:left-0 prose-h2:before:-bottom-0.5 
                                    prose-h2:before:w-24 prose-h2:before:h-0.5 prose-h2:before:bg-primary
                                    
                                    prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6 prose-h3:text-neutral-900
                                    prose-h3:bg-gradient-to-r prose-h3:from-neutral-50 prose-h3:to-transparent
                                    prose-h3:py-3 prose-h3:px-6 prose-h3:-mx-6 prose-h3:rounded-lg
                                    prose-h3:border-l-4 prose-h3:border-primary
                                    
                                    prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-4 prose-h4:text-neutral-900 prose-h4:font-semibold
                                    
                                    prose-p:text-neutral-900 prose-p:leading-relaxed prose-p:text-lg prose-p:my-6
                                    
                                    prose-ul:my-8 prose-ul:space-y-3
                                    prose-li:text-neutral-900 prose-li:text-lg prose-li:leading-relaxed
                                    prose-li:pl-2 prose-li:relative
                                    marker:text-primary marker:text-xl marker:font-bold
                                    
                                    prose-ol:my-8 prose-ol:space-y-3
                                    
                                    prose-strong:text-neutral-950 prose-strong:font-bold prose-strong:bg-yellow-50 
                                    prose-strong:px-1 prose-strong:py-0.5 prose-strong:rounded
                                    
                                    prose-em:italic prose-em:text-neutral-700
                                    
                                    prose-a:text-primary prose-a:font-semibold prose-a:no-underline 
                                    prose-a:border-b-2 prose-a:border-primary/30
                                    hover:prose-a:border-primary hover:prose-a:bg-primary/5
                                    prose-a:transition-all prose-a:px-1 prose-a:py-0.5
                                    
                                    prose-blockquote:border-l-4 prose-blockquote:border-primary 
                                    prose-blockquote:bg-gradient-to-r prose-blockquote:from-primary/5 prose-blockquote:to-transparent
                                    prose-blockquote:py-6 prose-blockquote:px-8 prose-blockquote:my-8
                                    prose-blockquote:rounded-r-xl prose-blockquote:not-italic
                                    prose-blockquote:shadow-sm
                                    prose-blockquote:text-neutral-900 prose-blockquote:text-xl
                                    
                                    prose-code:text-primary prose-code:bg-neutral-100 
                                    prose-code:px-2 prose-code:py-1 prose-code:rounded 
                                    prose-code:font-mono prose-code:text-base prose-code:font-semibold
                                    prose-code:border prose-code:border-neutral-200
                                    
                                    prose-pre:bg-neutral-900 prose-pre:text-neutral-100 prose-pre:p-6 
                                    prose-pre:rounded-xl prose-pre:my-8 prose-pre:shadow-lg
                                    prose-pre:border prose-pre:border-neutral-700
                                    
                                    prose-img:rounded-2xl prose-img:shadow-2xl prose-img:my-12
                                    prose-img:ring-1 prose-img:ring-neutral-200
                                    
                                    prose-hr:border-neutral-200 prose-hr:my-16 prose-hr:border-t-2
                                    
                                    prose-table:my-8 prose-table:border-collapse 
                                    prose-thead:bg-neutral-100 prose-thead:text-neutral-900
                                    prose-th:p-4 prose-th:text-left prose-th:font-bold
                                    prose-td:p-4 prose-td:border-t prose-td:border-neutral-200
                                    prose-tr:hover:bg-neutral-50
                                ">
                                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                                </div>

                                {/* Share Section */}
                                <div className="mt-12 pt-8 border-t border-neutral-200 lg:hidden">
                                    <h4 className="text-sm font-bold text-neutral-600 uppercase tracking-wider mb-4">Compartir artículo</h4>
                                    <ShareButtons title={post.title} url={`${process.env.NEXT_PUBLIC_APP_URL || 'https://saosinishop.com'}/blog/${post.slug}`} />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* CTA FOOTER */}
            <div className="bg-neutral-900 text-white py-20 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">¿Listo para profesionalizar tu granja?</h2>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
                        Tenemos los mejores reproductores y asesoría personalizada para ayudarte a empezar con el pie derecho.
                    </p>
                    <Link
                        href="/catalogo"
                        className="inline-flex items-center gap-3 bg-primary hover:bg-primary-light text-white text-lg font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-2xl shadow-primary/25"
                    >
                        Ver Catálogo de Reproductores
                    </Link>
                </div>
            </div>
        </article>
    );
}
