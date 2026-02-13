"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductShowcaseCard from "./ProductShowcaseCard";

interface CarouselItem {
    image: string;
    imageAlt: string;
    title: string;
    subtitle: string;
    tags: string[];
    href: string;
    ctaLabel: string;
}

interface ProductCarouselProps {
    items: CarouselItem[];
    sectionTitle?: string;
    sectionSubtitle?: string;
}

export default function ProductCarousel({
    items,
    sectionTitle = "Nuestros Productos",
    sectionSubtitle = "Encuentra todo lo que necesitas para una crianza exitosa",
}: ProductCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        loop: false,
        slidesToScroll: 1,
        containScroll: "trimSnaps",
        breakpoints: {
            "(min-width: 1024px)": { slidesToScroll: 2 },
        },
    });

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <section className="py-12 md:py-16 relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary-light/30 to-primary/10">
            {/* Subtle brand-colored decorative blurs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center px-4 py-2 bg-white/60 border border-white/40 rounded-full mb-5 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-primary mr-3 animate-pulse" />
                        <span className="text-primary text-xs font-bold uppercase tracking-[0.2em]">
                            Catálogo
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-neutral-900 mb-3 tracking-tight">
                        {sectionTitle}
                    </h2>
                    <p className="text-neutral-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        {sectionSubtitle}
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative">
                    {/* Prev Arrow */}
                    <button
                        onClick={scrollPrev}
                        disabled={!canScrollPrev}
                        aria-label="Anterior"
                        className={`absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-neutral-100 flex items-center justify-center transition-all duration-300 ${canScrollPrev
                            ? "hover:bg-primary hover:text-white hover:scale-110 cursor-pointer text-neutral-700"
                            : "opacity-30 cursor-not-allowed text-neutral-300"
                            }`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Next Arrow */}
                    <button
                        onClick={scrollNext}
                        disabled={!canScrollNext}
                        aria-label="Siguiente"
                        className={`absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-neutral-100 flex items-center justify-center transition-all duration-300 ${canScrollNext
                            ? "hover:bg-primary hover:text-white hover:scale-110 cursor-pointer text-neutral-700"
                            : "opacity-30 cursor-not-allowed text-neutral-300"
                            }`}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Slides Container — pt-28 gives room for overflow images */}
                    <div className="overflow-hidden mx-4 md:mx-6 pt-16" ref={emblaRef}>
                        <div className="flex gap-5 md:gap-6 -mt-16">
                            {items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex-[0_0_85%] sm:flex-[0_0_48%] md:flex-[0_0_32%] lg:flex-[0_0_24%] min-w-0 pt-16"
                                >
                                    <ProductShowcaseCard {...item} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
