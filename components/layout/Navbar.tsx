"use client";

import Link from "next/link";
import { User, Menu, X, Wheat } from "lucide-react";
import { useState, useEffect } from "react";
import CartDrawer from "../ui/CartDrawer";
import CartButton from "../ui/CartButton";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [mounted, setMounted] = useState(false);


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
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="bg-primary p-1.5 rounded-lg">
                                <Wheat className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-display font-bold text-xl text-primary tracking-tight">
                                Granja de Cuyes
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
                            <Link href="/login" className="p-2 text-neutral-600 hover:text-primary transition-colors">
                                <User className="w-6 h-6" />
                            </Link>

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
