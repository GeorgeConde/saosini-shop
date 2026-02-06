"use client";

import Link from "next/link";
import { User, Menu, X, LogOut, Settings } from "lucide-react";
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

    const navLinks = [
        { name: "Inicio", href: "/" },
        { name: "Reproductores", href: "/catalogo?categoria=reproductores" },
        { name: "Alimento", href: "/catalogo?categoria=alimento" },
        { name: "Accesorios", href: "/catalogo?categoria=accesorios" },
        { name: "Medicamentos", href: "/catalogo?categoria=medicamentos" },
        { name: "Centro de Conocimiento", href: "/blog" },
    ];

    return (
        <>
            <nav className="sticky top-0 z-50 glass shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo Official Saosini: SA (Symbol) SINI */}
                        <Link href="/" className="flex items-center space-x-1 group">
                            <span className="font-display font-bold text-3xl text-[#00473e] tracking-tighter uppercase transition-colors group-hover:text-[#b68a00]">
                                SA
                            </span>
                            <div className="relative w-12 h-12 flex items-center justify-center">
                                {/* Official Symbol acting as 'O' */}
                                <div className="absolute inset-0 border-2 border-[#b68a00] rounded-full group-hover:scale-110 transition-transform duration-300 shadow-sm" />
                                <svg
                                    viewBox="0 0 100 100"
                                    className="w-8 h-8 text-[#00473e] relative z-10"
                                    fill="currentColor"
                                >
                                    {/* Left Guinea Pig Head */}
                                    <path d="M48,42 C48,32 38,27 28,32 C18,37 18,52 28,57 C38,62 48,57 48,52 L48,72 C48,82 50,85 52,82" />
                                    {/* Right Guinea Pig Head - Mirrored */}
                                    <path d="M52,42 C52,32 62,27 72,32 C82,37 82,52 72,57 C62,62 52,57 52,52 L52,72 C52,82 50,85 48,82" />
                                    {/* Eyes (Refined detail) */}
                                    <circle cx="33" cy="42" r="4" fill="white" />
                                    <circle cx="67" cy="42" r="4" fill="white" />
                                    <circle cx="33" cy="42" r="2" fill="#00473e" />
                                    <circle cx="67" cy="42" r="2" fill="#00473e" />
                                    {/* Nose Detail */}
                                    <circle cx="45" cy="48" r="1.5" />
                                    <circle cx="55" cy="48" r="1.5" />
                                </svg>
                            </div>
                            <span className="font-display font-bold text-3xl text-[#00473e] tracking-tighter uppercase transition-colors group-hover:text-[#b68a00]">
                                SINI
                            </span>
                        </Link>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-neutral-600 hover:text-primary font-medium transition-colors text-sm"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4">
                            <CartButton onClick={() => setIsCartOpen(true)} />

                            {session ? (
                                <div className="flex items-center space-x-2">
                                    <Link
                                        href="/admin"
                                        className="p-2 text-neutral-600 hover:text-primary transition-colors flex items-center"
                                        title="Panel de Admin"
                                    >
                                        <Settings className="w-5 h-5" />
                                    </Link>
                                    <button
                                        onClick={() => signOut({ callbackUrl: '/' })}
                                        className="p-2 text-neutral-600 hover:text-red-500 transition-colors"
                                        title="Cerrar sesión"
                                    >
                                        <LogOut className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <Link href="/login" className="p-2 text-neutral-600 hover:text-primary transition-colors">
                                    <User className="w-6 h-6" />
                                </Link>
                            )}

                            {/* Mobile menu button */}
                            <div className="md:hidden flex items-center">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="p-2 text-neutral-600 hover:text-primary focus:outline-none"
                                >
                                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Links */}
                {isOpen && (
                    <div className="md:hidden glass border-t border-neutral-200 animate-in slide-in-from-top duration-300">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 text-neutral-600 hover:text-primary font-medium transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </nav>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
