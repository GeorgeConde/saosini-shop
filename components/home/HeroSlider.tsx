"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from "lucide-react";

const slides = [
    {
        id: 1,
        image: "/images/home/granja-cuyes-reproductores-cusco.webp",
        title: "Excelencia en la Crianza de Cuyes",
        subtitle: "Reproductores premium con la mejor genética del mercado para asegurar la rentabilidad de tu inversión.",
        ctaText: "Ver Catálogo",
        ctaLink: "/catalogo",
        secondaryCtaText: "Nuestra Historia",
        secondaryCtaLink: "/nosotros",
        color: "from-primary"
    },
    {
        id: 2,
        image: "/images/home/alimento-balanceado-cuyes-crecimiento.webp",
        title: "Nutrición que Garantiza Resultados",
        subtitle: "Alimento balanceado formulado específicamente para cada etapa de desarrollo de tus cuyes.",
        ctaText: "Ver Alimentos",
        ctaLink: "/catalogo?category=Alimento",
        secondaryCtaText: "Consultar",
        secondaryCtaLink: "/contacto",
        color: "from-secondary"
    },
    {
        id: 3,
        image: "/images/home/Crianza - técnica - Cuyes - Perú.webp",
        title: "Asesoría Técnica Integral",
        subtitle: "Acompañamiento profesional desde el diseño de tu galpón hasta la comercialización.",
        ctaText: "Agendar Visita",
        ctaLink: "/contacto",
        secondaryCtaText: "Ver Servicios",
        secondaryCtaLink: "/servicios",
        color: "from-amber-600"
    }
];

export default function HeroSlider() {
    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = useCallback(() => {
        setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, []);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
        setIsAutoPlaying(false);
    };

    const goToSlide = (index: number) => {
        setCurrent(index);
        setIsAutoPlaying(false);
    };

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                nextSlide();
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    return (
        <div className="relative h-[85vh] w-full overflow-hidden bg-neutral-900 group">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                            priority={index === 0}
                        />
                        <div className={`absolute inset-0 bg-gradient-to-r ${slide.color}/90 to-black/40 mix-blend-multiply`} />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Content */}
                    <div className="relative z-20 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto space-y-8">
                            <div
                                className={`transition-all duration-700 delay-100 transform ${index === current ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                    }`}
                            >
                                <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6 max-w-fit mx-auto">
                                    <span className="w-2 h-2 rounded-full bg-white mr-2 animate-pulse"></span>
                                    <span className="text-white text-xs font-bold uppercase tracking-widest">
                                        Granja Saosini
                                    </span>
                                </div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6 drop-shadow-lg">
                                    {slide.title}
                                </h1>
                                <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                                    {slide.subtitle}
                                </p>
                            </div>

                            <div
                                className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 transform ${index === current ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                                    }`}
                            >
                                <Link
                                    href={slide.ctaLink}
                                    className="btn-primary bg-white text-neutral-900 hover:bg-neutral-100 border-none px-8 py-4 text-lg w-full sm:w-auto min-w-[200px]"
                                >
                                    {slide.ctaText}
                                </Link>
                                <Link
                                    href={slide.secondaryCtaLink}
                                    className="px-8 py-4 rounded-xl font-bold text-white border border-white/30 hover:bg-white/10 backdrop-blur-sm transition-all w-full sm:w-auto min-w-[200px]"
                                >
                                    {slide.secondaryCtaText}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-neutral-900 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={() => {
                    nextSlide();
                    setIsAutoPlaying(false);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-neutral-900 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current
                                ? "bg-white w-8"
                                : "bg-white/40 hover:bg-white/60"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
