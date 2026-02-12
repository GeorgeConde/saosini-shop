"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface GalleryImage {
    id: string;
    title: string | null;
    url: string;
}

interface GalleryMarqueeProps {
    images: GalleryImage[];
}

export default function GalleryMarquee({ images }: GalleryMarqueeProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Close lightbox on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightboxImage(null);
        };
        if (lightboxImage) {
            document.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [lightboxImage]);

    if (images.length === 0) return null;

    // Split images into two rows for the marquee
    const mid = Math.ceil(images.length / 2);
    const row1 = images.slice(0, mid);
    const row2 = images.slice(mid);

    // Duplicate items for seamless infinite scroll
    const renderMarqueeRow = (
        items: GalleryImage[],
        direction: "left" | "right",
        speed: string
    ) => {
        // We need at least enough items to fill the viewport, duplicate as needed
        const duplicated = [...items, ...items, ...items];

        return (
            <div
                className="gallery-marquee-track overflow-hidden relative"
                style={{
                    maskImage:
                        "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
                }}
            >
                <div
                    className={`flex gap-4 md:gap-6 ${hoveredId ? "gallery-marquee-paused" : ""
                        }`}
                    style={{
                        animation: `${direction === "left" ? "marquee-scroll" : "marquee-scroll-reverse"
                            } ${speed} linear infinite`,
                        width: "max-content",
                    }}
                >
                    {duplicated.map((img, idx) => (
                        <div
                            key={`${img.id}-${idx}`}
                            className={`gallery-marquee-item relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer
                transition-all duration-500 ease-out
                ${hoveredId === `${img.id}-${idx}` ? "scale-105 z-20 shadow-2xl" : "scale-100 shadow-lg"}
                ${hoveredId && hoveredId !== `${img.id}-${idx}` ? "opacity-60 blur-[1px]" : "opacity-100"}
              `}
                            style={{
                                width: "clamp(200px, 22vw, 340px)",
                                height: "clamp(160px, 18vw, 260px)",
                            }}
                            onMouseEnter={() => setHoveredId(`${img.id}-${idx}`)}
                            onMouseLeave={() => setHoveredId(null)}
                            onClick={() => setLightboxImage(img)}
                        >
                            <Image
                                src={img.url}
                                alt={img.title || "Galería Saosini"}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                style={{
                                    transform:
                                        hoveredId === `${img.id}-${idx}`
                                            ? "scale(1.12)"
                                            : "scale(1)",
                                }}
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 30vw, 22vw"
                                unoptimized
                            />

                            {/* Glass overlay on hover */}
                            <div
                                className={`absolute inset-0 transition-all duration-500 ease-out flex items-end
                  ${hoveredId === `${img.id}-${idx}`
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }
                `}
                                style={{
                                    background:
                                        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
                                }}
                            >
                                {/* Glass card at bottom */}
                                <div
                                    className={`w-full p-4 transition-all duration-500 ease-out
                    ${hoveredId === `${img.id}-${idx}`
                                            ? "translate-y-0 opacity-100"
                                            : "translate-y-4 opacity-0"
                                        }
                  `}
                                >
                                    <div className="backdrop-blur-md bg-white/15 rounded-xl px-4 py-3 border border-white/20">
                                        <p className="text-white text-sm font-medium truncate">
                                            {img.title || "Saosini"}
                                        </p>
                                        <p className="text-white/60 text-xs mt-0.5">
                                            Click para ampliar
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Shine effect */}
                            <div
                                className={`absolute inset-0 transition-opacity duration-700 pointer-events-none
                  ${hoveredId === `${img.id}-${idx}` ? "opacity-100" : "opacity-0"}
                `}
                                style={{
                                    background:
                                        "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, transparent 50%)",
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <>
            <div
                ref={sectionRef}
                className={`space-y-4 md:space-y-6 transition-all duration-1000 ease-out
          ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}
        `}
            >
                {renderMarqueeRow(row1, "left", "60s")}
                {row2.length > 0 && renderMarqueeRow(row2, "right", "75s")}
            </div>

            {/* Lightbox */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8"
                    onClick={() => setLightboxImage(null)}
                >
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/90 backdrop-blur-xl"
                        style={{ animation: "gallery-fade-in 0.3s ease-out" }}
                    />

                    {/* Image container */}
                    <div
                        className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
                        style={{ animation: "gallery-zoom-in 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={lightboxImage.url}
                            alt={lightboxImage.title || "Galería Saosini"}
                            width={1200}
                            height={900}
                            className="object-contain max-h-[85vh] rounded-2xl shadow-2xl"
                            unoptimized
                        />

                        {/* Title bar */}
                        {lightboxImage.title && (
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <div className="backdrop-blur-xl bg-black/40 rounded-2xl px-6 py-4 border border-white/10 max-w-lg mx-auto text-center">
                                    <p className="text-white font-semibold text-lg">
                                        {lightboxImage.title}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Close button */}
                        <button
                            onClick={() => setLightboxImage(null)}
                            className="absolute -top-2 -right-2 md:top-4 md:right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-110"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
