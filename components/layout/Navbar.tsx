"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, LogOut, Settings, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import CartDrawer from "../ui/CartDrawer";
import CartButton from "../ui/CartButton";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { data: session } = useSession();

    useEffect(() => {
        setMounted(true);
    }, []);

    // Mega Menu Data Structure
    const productsMenu = [
        {
            name: "Reproductores",
            desc: "Genética garantizada",
            href: "/catalogo?category=Reproductores",
            icon: "/icons/cuy.png",
            color: "bg-green-50"
        },
        {
            name: "Alimento",
            desc: "Nutrición balanceada",
            href: "/catalogo?category=Alimento",
            icon: "/icons/saco.png",
            color: "bg-amber-50"
        },
        {
            name: "Accesorios",
            desc: "Equipamiento",
            href: "/catalogo?category=Accesorios",
            icon: "/icons/bebedero.png",
            color: "bg-blue-50"
        },
        {
            name: "Sanidad",
            desc: "Medicamentos",
            href: "/catalogo?category=Medicamentos",
            icon: "/icons/productos.png",
            color: "bg-red-50"
        },
    ];

    // Navigation links — split for left/right of logo
    const leftLinks = [
        { href: "/", label: "Inicio" },
        { href: "/catalogo", label: "Catálogo", hasDropdown: true },
    ];

    const rightLinks = [
        { href: "/blog", label: "Guía del Productor" },
        { href: "/contacto", label: "Contacto" },
    ];

    return (
        <>
            <nav className="sticky top-0 z-50 bg-primary-dark/95 backdrop-blur-lg shadow-lg border-b border-primary/30">
                {/* Subtle gold accent line at top */}
                <div className="h-1 bg-gradient-to-r from-secondary-dark via-secondary to-secondary-dark" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">

                        {/* Left Navigation Links — Desktop */}
                        <div className="hidden lg:flex items-center space-x-6 flex-1 justify-end pr-8 h-full">
                            {leftLinks.map((link) => (
                                link.hasDropdown ? (
                                    /* Mega Menu Trigger — Catálogo */
                                    <div key={link.href} className="group h-full flex items-center">
                                        <button className="flex items-center space-x-1.5 text-white/90 group-hover:text-secondary font-semibold text-base tracking-wide transition-colors px-2 h-full uppercase">
                                            <span>{link.label}</span>
                                            <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                        </button>

                                        {/* Dropdown Panel */}
                                        <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t-2 border-secondary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            <div className="max-w-7xl mx-auto py-8 px-8 grid grid-cols-4 gap-8">
                                                {productsMenu.map((item) => (
                                                    <Link
                                                        key={item.name}
                                                        href={item.href}
                                                        className={`flex items-start space-x-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors group/item ${item.color}`}
                                                    >
                                                        <div className="relative w-12 h-12 shrink-0">
                                                            <Image
                                                                src={item.icon}
                                                                alt={item.name}
                                                                fill
                                                                className="object-contain drop-shadow-sm group-hover/item:scale-110 transition-transform"
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-neutral-900 group-hover/item:text-primary">{item.name}</h3>
                                                            <p className="text-sm text-neutral-500 mt-1">{item.desc}</p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                            <div className="bg-neutral-50 py-3 text-center border-t border-neutral-100">
                                                <Link href="/catalogo" className="text-sm font-medium text-primary hover:text-secondary flex items-center justify-center space-x-1">
                                                    <span>Ver catálogo completo</span>
                                                    <ChevronDown className="w-4 h-4 -rotate-90" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="text-white/90 hover:text-secondary font-semibold text-base tracking-wide transition-colors h-full flex items-center px-2 uppercase"
                                    >
                                        {link.label}
                                    </Link>
                                )
                            ))}
                        </div>

                        {/* Center Logo */}
                        <Link href="/" className="flex items-center group shrink-0 relative z-10">
                            <Image
                                src="/images/logo-saosini.svg"
                                alt="SAOSINI"
                                width={160}
                                height={45}
                                className="group-hover:opacity-80 transition-opacity duration-300"
                                priority
                            />
                        </Link>

                        {/* Right Navigation Links — Desktop */}
                        <div className="hidden lg:flex items-center space-x-6 flex-1 pl-8 h-full">
                            {rightLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-white/90 hover:text-secondary font-semibold text-base tracking-wide transition-colors h-full flex items-center px-2 uppercase"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Spacer pushes actions to far right */}
                            <div className="flex-1" />

                            {/* Desktop Actions */}
                            <div className="flex items-center space-x-3">
                                <CartButton onClick={() => setIsCartOpen(true)} />
                                {session && (
                                    <div className="flex items-center space-x-1">
                                        <Link href="/admin" className="p-2 text-white/70 hover:text-secondary transition-colors">
                                            <Settings className="w-5 h-5" />
                                        </Link>
                                        <button onClick={() => signOut({ callbackUrl: '/' })} className="p-2 text-white/70 hover:text-red-400 transition-colors">
                                            <LogOut className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Actions (cart + hamburger) */}
                        <div className="flex items-center space-x-3 lg:hidden">
                            <CartButton onClick={() => setIsCartOpen(true)} />
                            {session && (
                                <Link href="/admin" className="p-2 text-white/70 hover:text-secondary transition-colors">
                                    <Settings className="w-5 h-5" />
                                </Link>
                            )}
                            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-white hover:text-secondary transition-colors">
                                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden bg-primary-dark/98 backdrop-blur-lg border-t border-primary/20 h-screen overflow-y-auto pb-32">
                        <div className="px-5 pt-6 space-y-5">
                            <Link href="/" className="block text-lg font-bold text-white uppercase tracking-wide" onClick={() => setIsOpen(false)}>
                                Inicio
                            </Link>

                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider">Líneas de Producción</h3>
                                {productsMenu.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center space-x-4 p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                                    >
                                        <div className="relative w-9 h-9">
                                            <Image src={item.icon} alt={item.name} fill className="object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-white">{item.name}</h4>
                                            <p className="text-xs text-white/50">{item.desc}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <Link href="/blog" className="block text-lg font-bold text-white uppercase tracking-wide" onClick={() => setIsOpen(false)}>
                                Guía del Productor
                            </Link>

                            <Link href="/contacto" className="block text-lg font-bold text-white uppercase tracking-wide" onClick={() => setIsOpen(false)}>
                                Contacto
                            </Link>

                            {session && (
                                <button
                                    onClick={() => { signOut({ callbackUrl: '/' }); setIsOpen(false); }}
                                    className="flex items-center space-x-2 text-red-400 font-semibold pt-4 border-t border-white/10"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Cerrar sesión</span>
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </nav>
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
