import Image from "next/image";
import Link from "next/link";

interface ProductShowcaseCardProps {
    image: string;
    imageAlt: string;
    title: string;
    subtitle: string;
    tags: string[];
    href: string;
    ctaLabel: string;
}

export default function ProductShowcaseCard({
    image,
    imageAlt,
    title,
    subtitle,
    tags,
    href,
    ctaLabel,
}: ProductShowcaseCardProps) {
    return (
        <div className="group relative flex flex-col items-center text-center pt-2 select-none">
            {/* Floating product image — overflows above the card */}
            <div className="relative w-24 h-24 md:w-28 md:h-28 z-10 -mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2">
                <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    className="object-contain drop-shadow-xl"
                    sizes="(max-width: 768px) 144px, 176px"
                />
            </div>

            {/* Card body */}
            <div className="bg-white rounded-3xl pt-12 pb-5 px-5 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center w-full min-h-[220px]">
                <h3 className="text-lg md:text-xl font-display font-bold text-neutral-900 mb-1">
                    {title}
                </h3>
                <p className="text-neutral-500 text-sm mb-4 leading-relaxed">
                    {subtitle}
                </p>

                {/* Tags / Benefit badges */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs font-semibold px-3 py-1 rounded-full border border-primary/40 text-primary bg-primary/5 whitespace-nowrap"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* CTA Button */}
                <Link
                    href={href}
                    className="mt-auto inline-flex items-center justify-center bg-primary hover:bg-primary-light text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                    {ctaLabel}
                </Link>
            </div>
        </div>
    );
}
