import { getAllCategories, getPublishedPosts } from '@/lib/actions/blog';
import BlogCard from '@/components/blog/BlogCard';
import Link from 'next/link';
import { BookOpen, Search, Tag, Filter } from 'lucide-react';
import Image from 'next/image';

export const revalidate = 60; // Revalidate every minute

export default async function BlogPage({ searchParams }: { searchParams: { categoria?: string } }) {
    const { categoria } = await searchParams;
    const [postsData, categoriesData] = await Promise.all([
        getPublishedPosts(100, categoria),
        getAllCategories()
    ]);

    const posts = postsData.success ? postsData.posts : [];
    const categories = categoriesData.success ? categoriesData.categories : [];

    return (
        <div className="bg-neutral-50 min-h-screen">
            {/* HERO SECTION */}
            <div className="relative bg-neutral-900 text-white overflow-hidden py-24 lg:py-32">
                <div className="absolute inset-0 opacity-20">
                    <Image
                        src="https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2689&auto=format&fit=crop"
                        alt="Centro de Conocimiento Saosini"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-transparent"></div>

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-6 shadow-xl border border-white/10">
                        <BookOpen className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
                        Centro de Conocimiento
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
                        Domina la crianza de cuyes con nuestras guías especializadas, consejos de expertos y estrategias probadas en altura.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-20">
                {/* FILTERS BAR */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-12 border border-neutral-100">
                    <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
                        <div className="flex items-center gap-2 text-neutral-500 font-medium">
                            <Filter className="w-5 h-5 text-primary" />
                            <span>Filtrar por tema:</span>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-end gap-3 flex-1">
                            <Link
                                href="/blog"
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${!categoria
                                    ? 'bg-neutral-900 text-white shadow-lg'
                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                    }`}
                            >
                                <Tag className="w-3 h-3" />
                                Todos
                            </Link>
                            {categories.map((cat: any) => (
                                <Link
                                    key={cat.id}
                                    href={`/blog?categoria=${cat.slug}`}
                                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${categoria === cat.slug
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                        : 'bg-white border border-neutral-200 text-neutral-600 hover:border-primary/50 hover:text-primary'
                                        }`}
                                >
                                    {cat.icon && <span className="text-lg">{cat.icon}</span>}
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* POSTS GRID */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: any) => (
                            <div key={post.id} className="h-full transform hover:-translate-y-1 transition-transform duration-300">
                                <BlogCard post={post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-white rounded-3xl border border-neutral-200 border-dashed">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-4">
                            <Search className="w-8 h-8 text-neutral-400" />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">No encontramos artículos</h3>
                        <p className="text-neutral-500 text-lg mb-8">Intenta seleccionar otra categoría o ver todos los artículos.</p>
                        <Link href="/blog" className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-light transition-colors">
                            Ver todos los artículos
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
