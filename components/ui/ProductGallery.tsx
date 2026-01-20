"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Star, ChevronUp, ChevronDown, Maximize2 } from 'lucide-react';

interface ProductImage {
    url: string;
    altText?: string | null;
    isPrimary: boolean;
}

interface ProductGalleryProps {
    images: ProductImage[];
    productName: string;
    isPremium: boolean;
}

export default function ProductGallery({ images, productName, isPremium }: ProductGalleryProps) {
    const sortedImages = [...images].sort((a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0));
    const [selectedImage, setSelectedImage] = useState(sortedImages[0]?.url || '/placeholder.png');
    const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoomPos({ x, y });
    };

    return (
        <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Vertical Thumbnails */}
            {sortedImages.length > 1 && (
                <div className="relative flex md:flex-col gap-3 md:w-20 shrink-0">
                    <div className="flex md:flex-col gap-3 overflow-y-auto max-h-[500px] no-scrollbar">
                        {sortedImages.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedImage(img.url)}
                                className={`relative aspect-square w-16 md:w-20 rounded-xl overflow-hidden shadow-sm ring-1 transition-all ${selectedImage === img.url
                                    ? 'ring-primary ring-2'
                                    : 'ring-neutral-200 hover:ring-primary/50'
                                    }`}
                            >
                                <Image
                                    src={img.url}
                                    alt={`${productName} ${i + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Image with Zoom */}
            <div className="relative flex-grow">
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    className="relative aspect-square rounded-3xl overflow-hidden shadow-sm ring-1 ring-neutral-200 bg-white cursor-crosshair"
                >
                    <Image
                        src={selectedImage}
                        alt={productName}
                        fill
                        className={`object-contain transition-transform duration-200 ${isHovering ? 'scale-[2.5]' : 'scale-100'}`}
                        style={isHovering ? {
                            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`
                        } : undefined}
                        priority
                    />

                    {isPremium && (
                        <div className="absolute top-4 left-4 bg-accent text-white font-bold px-3 py-1 rounded-full shadow-lg flex items-center space-x-1 text-xs">
                            <Star className="w-3 h-3 fill-white" />
                            <span>PREMIUM</span>
                        </div>
                    )}

                    <button className="absolute bottom-4 right-4 p-2 bg-white/80 backdrop-blur-md rounded-full text-neutral-600 hover:text-primary transition-colors shadow-sm">
                        <Maximize2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
