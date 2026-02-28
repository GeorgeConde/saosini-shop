import { getAllCategories, getPublishedPosts } from '@/lib/actions/blog';

import Link from 'next/link';
import { BookOpen, Search, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Metadata } from 'next';

export const revalidate = 60; // Revalidate every minute

export const metadata: Metadata = {
    title: 'Blog de Crianza de Cuyes | Centro de Conocimiento Saosini',
    description: 'Aprende los mejores consejos, guías y estrategias para la crianza técnica de cuyes. Domina la genética, alimentación y manejo de tu granja de cuyes.',
    keywords: ["crianza de cuyes", "como criar cuyes", "granja de cuyes", "alimentación para cuyes", "cuyes reproductores", "guía de crianza de cuyes peru"],
    openGraph: {
        title: 'Blog de Crianza de Cuyes | Centro de Conocimiento Saosini',
        description: 'Domina la crianza de cuyes con nuestras guías especializadas y consejos de expertos.',
        type: 'website',
    }
};

export default async function BlogPage({ searchParams }: { searchParams: { categoria?: string } }) {
    const { categoria } = await searchParams;
    const [postsData, categoriesData] = await Promise.all([
        getPublishedPosts(100, categoria),
        getAllCategories()
    ]);

    const posts = postsData.success ? postsData.posts : [];
    const categories = categoriesData.success ? categoriesData.categories : [];

    return (
        <div className="dark bg-[#f6f8f7] dark:bg-[#0a120e] font-sans text-slate-900 dark:text-slate-100 min-h-screen">
            {/* HERO SECTION */}
            <section className="relative">
                <div
                    className="flex min-h-[440px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-6 text-center"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(10, 18, 14, 0.4) 0%, rgba(10, 18, 14, 0.9) 100%), url("https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2689&auto=format&fit=crop")',
                    }}
                >
                    <div className="flex flex-col gap-3 animate-fade-in relative z-10">
                        <span className="text-[#13ec6d] text-xs font-bold tracking-[0.2em] uppercase">Premium Breeding Platform</span>
                        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black leading-none tracking-tight drop-shadow-[0_0_20px_rgba(19,236,109,0.4)]">
                            Centro de<br /><span className="text-[#13ec6d]">Conocimiento</span>
                        </h1>
                        <p className="text-slate-300 text-sm md:text-base max-w-lg mx-auto mt-2">
                            Domina el arte de la crianza técnica de cuyes con guías de expertos, consejos prácticos y estrategias rentables.
                        </p>
                    </div>

                    <div className="w-full max-w-xl mt-4 relative z-10">
                        <div className="flex w-full items-stretch rounded-2xl overflow-hidden bg-[#162a1e]/80 border border-[#13ec6d]/20 shadow-[0_0_20px_rgba(19,236,109,0.15)] backdrop-blur-md">
                            <div className="flex items-center justify-center pl-4 pr-2 text-[#13ec6d]">
                                <Search className="w-5 h-5" />
                            </div>
                            <input
                                className="flex-1 bg-transparent border-none text-white focus:ring-0 placeholder:text-slate-500 text-sm md:text-base py-4 outline-none"
                                placeholder="Buscar guías técnicas..."
                            />
                            <div className="p-1.5">
                                <button className="bg-[#13ec6d] text-[#0a120e] px-6 md:px-8 rounded-xl font-bold text-sm md:text-base h-full transition-transform active:scale-95 hover:bg-[#13ec6d]/90">
                                    IR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {/* STICKY FILTERS BAR */}
                <nav className="sticky top-[73px] z-40 bg-[#0a120e]/95 backdrop-blur-sm py-4 mb-8 border-b border-[#13ec6d]/5 -mx-4 px-4 sm:mx-0 sm:px-0">
                    <div className="flex gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                        <Link
                            href="/blog"
                            className={`flex h-10 shrink-0 items-center justify-center rounded-full px-6 text-sm transition-all ${!categoria
                                ? 'bg-[#13ec6d] text-[#0a120e] font-bold shadow-[0_0_15px_rgba(19,236,109,0.3)]'
                                : 'bg-[#162a1e] text-slate-300 font-medium border border-[#13ec6d]/10 hover:border-[#13ec6d]/30'
                                }`}
                        >
                            Todos
                        </Link>
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                href={`/blog?categoria=${cat.slug}`}
                                className={`flex h-10 shrink-0 items-center justify-center rounded-full px-6 text-sm transition-all ${categoria === cat.slug
                                    ? 'bg-[#13ec6d] text-[#0a120e] font-bold shadow-[0_0_15px_rgba(19,236,109,0.3)]'
                                    : 'bg-[#162a1e] text-slate-300 font-medium border border-[#13ec6d]/10 hover:border-[#13ec6d]/30'
                                    }`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </nav>

                <main className="space-y-6">
                    <div className="flex items-baseline justify-between mb-8">
                        <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight">Artículos Destacados</h2>
                        {!categoria && <span className="text-[#13ec6d] text-xs md:text-sm font-bold uppercase tracking-wider hidden sm:inline-block">Últimas Guías</span>}
                    </div>

                    {/* POSTS GRID */}
                    {posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {posts.map((post) => (
                                <Link href={`/blog/${post.slug}`} key={post.id} className="block group h-full">
                                    <article className="h-full bg-[rgba(22,42,30,0.6)] backdrop-blur-[12px] border border-[rgba(19,236,109,0.1)] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-[rgba(19,236,109,0.3)] hover:shadow-[0_10px_30px_-10px_rgba(19,236,109,0.15)] hover:-translate-y-1">
                                        <div className="relative h-56 w-full overflow-hidden">
                                            <Image
                                                src={post.featuredImage || '/images/placeholder.jpg'}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />
                                            <div className="absolute top-4 left-4 flex gap-2 z-10">
                                                <span className="bg-[#13ec6d] text-[#0a120e] px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-lg">
                                                    {post.category?.name || 'Guía'}
                                                </span>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#162a1e] via-transparent to-transparent opacity-80"></div>
                                        </div>

                                        <div className="flex-1 p-5 md:p-6 flex flex-col space-y-4">
                                            <div className="flex items-center justify-between text-slate-400 text-xs">
                                                <div className="flex items-center gap-1.5">
                                                    <BookOpen className="w-3.5 h-3.5" />
                                                    <span>5 min</span>
                                                </div>
                                                <span>
                                                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                                                </span>
                                            </div>

                                            <h3 className="text-white text-xl md:text-2xl font-bold leading-tight group-hover:text-[#13ec6d] transition-colors line-clamp-2 md:line-clamp-3">
                                                {post.title}
                                            </h3>

                                            <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 flex-1">
                                                {post.excerpt}
                                            </p>

                                            <div className="pt-4 mt-auto border-t border-[rgba(19,236,109,0.1)] flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="size-8 rounded-full border border-[#13ec6d]/30 overflow-hidden bg-neutral-800 flex items-center justify-center">
                                                        <span className="text-white text-xs font-bold">{post.author?.name?.charAt(0) || 'S'}</span>
                                                    </div>
                                                    <span className="text-slate-200 text-xs font-semibold">{post.author?.name || 'Eduardo Valer'}</span>
                                                </div>
                                                <div className="w-8 h-8 rounded-full bg-[#13ec6d]/10 flex items-center justify-center text-[#13ec6d] group-hover:bg-[#13ec6d] group-hover:text-[#0a120e] transition-colors">
                                                    <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-[rgba(22,42,30,0.4)] backdrop-blur-sm rounded-3xl border border-[rgba(19,236,109,0.1)] border-dashed">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#162a1e] rounded-full mb-4 shadow-[0_0_15px_rgba(19,236,109,0.2)] text-[#13ec6d]">
                                <Search className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">No encontramos artículos</h3>
                            <p className="text-slate-400 mb-8">Intenta seleccionar otra categor&iacute;a o cambiar tu b&uacute;squeda.</p>
                            <Link href="/blog" className="px-6 py-3 bg-[#13ec6d] text-[#0a120e] font-bold rounded-xl shadow-lg hover:bg-[#13ec6d]/90 transition-colors">
                                Ver todos los art&iacute;culos
                            </Link>
                        </div>
                    )}

                    {/* CTA SECTION */}
                    <div className="relative mt-16 lg:mt-24 rounded-[2rem] overflow-hidden p-8 md:p-12 lg:p-16">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#13ec6d] via-emerald-700 to-[#0a120e] opacity-90"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 hidden md:block"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
                            <div className="flex-1 text-center md:text-left">
                                <h3 className="text-[#0a120e] text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 drop-shadow-sm">¿Buscas mejorar<br className="hidden lg:block" /> tu galpón?</h3>
                                <p className="text-[#0a120e]/80 text-base md:text-lg font-medium max-w-lg mx-auto md:mx-0">
                                    Adquiere los mejores reproductores certificados de nuestra granja experimental y obtén asesoría continua.
                                </p>
                            </div>
                            <Link href="/catalogo" className="shrink-0">
                                <button className="bg-[#0a120e] text-[#13ec6d] px-8 md:px-10 py-4 rounded-full font-black text-sm md:text-base uppercase tracking-widest shadow-2xl transition-transform hover:scale-105 active:scale-95 group flex items-center gap-3">
                                    Ver Catálogo
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
