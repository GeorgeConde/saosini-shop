"use client";

import Link from "next/link";
import Image from "next/image";
import { User, Menu, X, LogOut, Settings, ChevronDown } from "lucide-react";
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

    return (
        <>
            <nav className="sticky top-0 z-50 glass shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-1 group shrink-0">
                            <span className="font-display font-bold text-3xl text-primary tracking-tighter uppercase transition-colors group-hover:text-secondary">
                                SA
                            </span>
                            <div className="relative w-12 h-12 flex items-center justify-center">
                                <div className="absolute inset-0 border-2 border-[#A67D03] rounded-full group-hover:scale-110 transition-transform duration-300 shadow-sm" />
                                <svg viewBox="0 0 100 100" className="w-8 h-8 text-[#02733E] relative z-10" fill="currentColor">
                                    <path d="M48,42 C48,32 38,27 28,32 C18,37 18,52 28,57 C38,62 48,57 48,52 L48,72 C48,82 50,85 52,82" />
                                    <path d="M52,42 C52,32 62,27 72,32 C82,37 82,52 72,57 C62,62 52,57 52,52 L52,72 C52,82 50,85 48,82" />
                                    <circle cx="33" cy="42" r="4" fill="white" />
                                    <circle cx="67" cy="42" r="4" fill="white" />
                                    <circle cx="33" cy="42" r="2" fill="#02733E" />
                                    <circle cx="67" cy="42" r="2" fill="#02733E" />
                                </svg>
                            </div>
                            <span className="font-display font-bold text-3xl text-neutral-800 tracking-tighter uppercase transition-colors group-hover:text-primary">
                                SINI
                            </span>
                        </Link>

                        {/* Desktop Mega Menu */}
                        <div className="hidden md:flex items-center space-x-8 h-full">
                            <Link href="/" className="text-neutral-700 hover:text-primary font-medium text-sm transition-colors h-full flex items-center px-2">
                                Inicio
                            </Link>

                            {/* Mega Menu Trigger */}
                            <div className="group h-full flex items-center">
                                <button className="flex items-center space-x-1 text-neutral-700 group-hover:text-primary font-medium text-sm transition-colors px-2 h-full">
                                    <span>Nuestros Productos</span>
                                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                </button>

                                {/* Dropdown Panel */}
                                <div className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-neutral-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
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

                            <Link href="/blog" className="text-neutral-700 hover:text-primary font-medium text-sm transition-colors h-full flex items-center px-2">
                                Guía del Productor
                            </Link>

                            <Link href="/contacto" className="text-neutral-700 hover:text-primary font-medium text-sm transition-colors h-full flex items-center px-2">
                                Contacto
                            </Link>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4">
                            <CartButton onClick={() => setIsCartOpen(true)} />
                            {session && (
                                <div className="flex items-center space-x-2">
                                    <Link href="/admin" className="p-2 text-neutral-700 hover:text-primary transition-colors">
                                        <Settings className="w-5 h-5" />
                                    </Link>
                                    <button onClick={() => signOut({ callbackUrl: '/' })} className="p-2 text-neutral-700 hover:text-red-500 transition-colors">
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                            <div className="md:hidden flex items-center">
                                <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-neutral-700 hover:text-primary">
                                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden glass border-t border-neutral-200 h-screen overflow-y-auto pb-32">
                        <div className="px-4 pt-6 space-y-6">
                            <Link href="/" className="block text-lg font-bold text-neutral-900" onClick={() => setIsOpen(false)}>
                                Inicio
                            </Link>

                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Líneas de Producción</h3>
                                {productsMenu.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center space-x-4 p-3 rounded-lg border border-neutral-100 bg-white"
                                    >
                                        <div className="relative w-8 h-8">
                                            <Image src={item.icon} alt={item.name} fill className="object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-neutral-900">{item.name}</h4>
                                            <p className="text-xs text-neutral-500">{item.desc}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <Link href="/blog" className="block text-lg font-bold text-neutral-900" onClick={() => setIsOpen(false)}>
                                Guía del Productor
                            </Link>

                            <Link href="/contacto" className="block text-lg font-bold text-neutral-900" onClick={() => setIsOpen(false)}>
                                Contacto
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
