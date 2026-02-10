"use client";

import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonsProps {
    title: string;
    url: string;
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const shareLinks = [
        {
            name: 'Facebook',
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            color: 'hover:text-blue-600'
        },
        {
            name: 'Twitter',
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            color: 'hover:text-sky-500'
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
            color: 'hover:text-blue-700'
        }
    ];

    return (
        <div className="flex flex-col space-y-4">
            <h4 className="font-bold text-neutral-900 border-b border-neutral-100 pb-2">Compartir</h4>
            <div className="flex flex-wrap gap-2">
                {shareLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg bg-neutral-100 text-neutral-500 transition-colors ${link.color}`}
                        aria-label={`Compartir en ${link.name}`}
                    >
                        <link.icon className="w-5 h-5" />
                    </a>
                ))}
                <button
                    onClick={handleCopy}
                    className={`p-2 rounded-lg bg-neutral-100 transition-colors relative group ${copied ? 'text-green-600' : 'text-neutral-500 hover:text-neutral-900'}`}
                    aria-label="Copiar enlace"
                >
                    <LinkIcon className="w-5 h-5" />
                    {copied && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            ¡Copiado!
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
}
