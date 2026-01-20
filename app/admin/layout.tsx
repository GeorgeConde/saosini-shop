"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Tag,
    FileText,
    Settings,
    LogOut,
    ChevronRight,
    Wheat
} from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const menuItems = [
        { name: 'Resumen', icon: <LayoutDashboard className="w-5 h-5" />, href: '/admin' },
        { name: 'Productos', icon: <Package className="w-5 h-5" />, href: '/admin/productos' },
        { name: 'Categorías', icon: <Tag className="w-5 h-5" />, href: '/admin/categorias' },
        { name: 'Pedidos', icon: <ShoppingCart className="w-5 h-5" />, href: '/admin/pedidos' },
        { name: 'Clientes', icon: <Users className="w-5 h-5" />, href: '/admin/clientes' },
        { name: 'Blog', icon: <FileText className="w-5 h-5" />, href: '/admin/blog' },
    ];

    return (
        <div className="flex h-screen bg-neutral-100 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-neutral-900 text-neutral-400 flex flex-col shrink-0">
                <div className="p-6 border-b border-neutral-800">
                    <Link href="/" className="flex items-center space-x-2 text-white">
                        <Wheat className="w-6 h-6 text-accent" />
                        <span className="font-display font-bold text-lg tracking-tight">Granja Cuyes</span>
                    </Link>
                    <div className="mt-4 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-center text-accent/80">
                        Panel de Control
                    </div>
                </div>

                <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${isActive
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                    : 'hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    {item.icon}
                                    <span className="text-sm font-medium">{item.name}</span>
                                </div>
                                {isActive && <ChevronRight className="w-4 h-4" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-neutral-800 space-y-2">
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-white/5 hover:text-white transition-all text-sm">
                        <Settings className="w-5 h-5" />
                        <span>Configuración</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-500 transition-all text-sm text-neutral-500">
                        <LogOut className="w-5 h-5" />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow overflow-y-auto p-10">
                <div className="max-w-6xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
