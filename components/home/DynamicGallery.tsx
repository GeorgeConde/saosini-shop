import { getGalleryItems } from "@/lib/actions/gallery";
import GalleryMarquee from "./GalleryMarquee";

interface GalleryItem {
    id: string;
    title: string | null;
    type: string;
    url: string;
    createdAt: Date;
}

export default async function DynamicGallery() {
    const { items } = await getGalleryItems();

    if (!items || items.length === 0) {
        return null;
    }

    // Filter only images
    const images = (items as GalleryItem[])
        .filter((item) => item.type === "IMAGE")
        .map((item) => ({
            id: item.id,
            title: item.title,
            url: item.url,
        }));

    if (images.length === 0) {
        return null;
    }

    return (
        <section className="py-12 md:py-16 bg-neutral-950 relative overflow-hidden" id="galeria">
            {/* Ambient background effects */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/6 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/4 rounded-full blur-[160px] pointer-events-none" />

            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-10 relative z-10">
                <div className="text-center">
                    <div className="inline-flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-primary mr-3 animate-pulse" />
                        <span className="text-primary-light text-xs font-bold uppercase tracking-[0.2em]">
                            Nuestros Momentos
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-5 tracking-tight">
                        Galería{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-secondary">
                            Saosini
                        </span>
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
                        Un vistazo a nuestro día a día, nuestros ejemplares y la pasión que
                        ponemos en cada etapa de la crianza.
                    </p>
                </div>
            </div>

            {/* Gallery Marquee */}
            <div className="relative z-10">
                <GalleryMarquee images={images} />
            </div>

            {/* Bottom fade into next section */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent pointer-events-none z-20" />
        </section>
    );
}
