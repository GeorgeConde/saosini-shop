"use client";

import { Facebook, Youtube, Video } from "lucide-react";
import Link from "next/link";

const socialLinks = [
    {
        name: "Facebook",
        icon: <Facebook className="w-6 h-6" />,
        href: "https://www.facebook.com/saosinicuyes",
        color: "hover:bg-[#1877F2]",
    },
    {
        name: "TikTok",
        icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>, // Lucide doesn't have TikTok exactly like brand sometimes, but let's use a custom SVG or similar. Actually Lucide might not have Video as TikTok. Let's use a custom path for TikTok or just 'Video' as placeholder if needed? No, standard SVG path for TikTok is better.
        href: "https://www.tiktok.com/@agroaventuras.saosini",
        color: "hover:bg-black",
    },
    {
        name: "YouTube",
        icon: <Youtube className="w-6 h-6" />,
        href: "https://www.youtube.com/@Saosini",
        color: "hover:bg-[#FF0000]",
    },
];

export default function SocialSidebar() {
    return (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col">
            {socialLinks.map((social, index) => (
                <Link
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-primary text-white p-3 transition-all duration-300 ease-in-out hover:pl-6 hover:pr-4 flex items-center justify-center ${social.color} first:rounded-tr-lg last:rounded-br-lg shadow-lg hover:shadow-xl`}
                    aria-label={social.name}
                >
                    <div className="transform transition-transform duration-300 hover:scale-110">
                        {social.icon}
                    </div>
                </Link>
            ))}
        </div>
    );
}
