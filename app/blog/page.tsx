import { getAllCategories, getPublishedPosts } from '@/lib/actions/blog';
import BlogCard from '@/components/blog/BlogCard';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export const revalidate = 60; // Revalidate every minute

export default async function BlogPage({ searchParams }: { searchParams: { categoria?: string } }) {
    const { categoria } = await searchParams;
    const [postsData, categoriesData] = await Promise.all([
        getPublishedPosts(100, categoria), // Fetch all initially for MVP
        getAllCategories()
    ]);

    const posts = postsData.success ? postsData.posts : [];
    const categories = categoriesData.success ? categoriesData.categories : [];

    return (
        <div className="bg-neutral-50 min-h-screen pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
                        <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-neutral-900 mb-4">
                        Centro de Conocimiento
                    </h1>
                    <p className="text-lg text-neutral-500">
                        Aprende todo sobre la crianza de cuyes, tips de alimentación y manejo de tu granja con nuestros expertos.
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    <Link
                        href="/blog"
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${!categoria
                                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                : 'bg-white text-neutral-600 hover:bg-neutral-100 ring-1 ring-neutral-200'
                            }`}
                    >
                        Todos
                    </Link>
                    {categories.map((cat: any) => (
                        <Link
                            key={cat.id}
                            href={`/blog?categoria=${cat.slug}`}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${categoria === cat.slug
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'bg-white text-neutral-600 hover:bg-neutral-100 ring-1 ring-neutral-200'
                                }`}
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>

                {/* Posts Grid */}
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: any) => (
                            <div key={post.id} className="h-full">
                                <BlogCard post={post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl ring-1 ring-neutral-200">
                        <p className="text-neutral-400 text-lg">No encontramos artículos en esta categoría.</p>
                        <Link href="/blog" className="text-primary font-bold mt-4 inline-block hover:underline">
                            Ver todos los artículos
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
