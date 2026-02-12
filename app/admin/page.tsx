import prisma from '@/lib/prisma';
import StatsCards from './StatsCards';
import SalesChart from './SalesChart';
import TopProducts from './TopProducts';
import LowStockAlert from './LowStockAlert';
import DateRangeFilter from '@/components/admin/DateRangeFilter';
import Link from 'next/link';
import { ChevronRight, DollarSign, ShoppingBag, Package, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface AdminDashboardProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function AdminDashboard({ searchParams }: AdminDashboardProps) {

    const resolvedSearchParams = await searchParams;
    const from = typeof resolvedSearchParams.from === 'string' ? resolvedSearchParams.from : undefined;
    const to = typeof resolvedSearchParams.to === 'string' ? resolvedSearchParams.to : undefined;

    // Defines date range
    const endDate = to ? new Date(to) : new Date();
    endDate.setHours(23, 59, 59, 999);

    const startDate = from ? new Date(from) : new Date();
    if (!from) {
        startDate.setDate(endDate.getDate() - 30); // Default to last 30 days
    }
    startDate.setHours(0, 0, 0, 0);

    const dateFilter = {
        createdAt: {
            gte: startDate,
            lte: endDate
        }
    };

    // Load data from database with filters
    const [orders, products, orderItems] = await Promise.all([
        prisma.order.findMany({
            where: dateFilter,
            include: {
                items: true
            },
            orderBy: { createdAt: 'desc' }
        }),
        prisma.product.findMany({
            include: {
                category: true,
                images: {
                    where: { isPrimary: true },
                    take: 1
                }
            }
        }),
        prisma.orderItem.findMany({
            where: {
                order: dateFilter
            },
            include: {
                product: {
                    include: {
                        images: {
                            where: { isPrimary: true },
                            take: 1
                        }
                    }
                }
            }
        })
    ]);

    // Calculate metrics
    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total), 0);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
    const activeProducts = products.filter(p => p.status === 'active').length;

    // Previous period for comparison (same length as current period)
    const periodLength = endDate.getTime() - startDate.getTime();
    const prevEndDate = new Date(startDate.getTime() - 1);
    const prevStartDate = new Date(prevEndDate.getTime() - periodLength);

    const prevOrders = await prisma.order.findMany({
        where: {
            createdAt: {
                gte: prevStartDate,
                lte: prevEndDate
            }
        }
    });

    const prevRevenue = prevOrders.reduce((sum, o) => sum + Number(o.total), 0);
    const revenueChange = prevRevenue > 0
        ? (((totalRevenue - prevRevenue) / prevRevenue) * 100).toFixed(1)
        : '100';

    const ordersChange = prevOrders.length > 0
        ? (((totalOrders - prevOrders.length) / prevOrders.length) * 100).toFixed(1)
        : '100';


    // Low stock products (< 10 units)
    const lowStockProducts = products
        .filter(p => p.stockQuantity < 10 && p.status === 'active')
        .map(p => ({
            id: p.id,
            name: p.name,
            stockQuantity: p.stockQuantity,
            category: p.category.name
        }))
        .sort((a, b) => a.stockQuantity - b.stockQuantity);

    // Top 5 best selling products
    const productSales = orderItems.reduce((acc, item) => {
        if (!acc[item.productId]) {
            acc[item.productId] = {
                id: item.productId,
                name: item.product.name,
                image: item.product.images[0]?.url || 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=100',
                quantitySold: 0,
                revenue: 0
            };
        }
        acc[item.productId].quantitySold += item.quantity;
        acc[item.productId].revenue += Number(item.subtotal);
        return acc;
    }, {} as Record<string, any>);

    const topProducts = Object.values(productSales)
        .sort((a: any, b: any) => b.quantitySold - a.quantitySold)
        .slice(0, 5);

    // Data for sales chart
    const salesData = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        const nextDay = new Date(currentDate);
        nextDay.setDate(nextDay.getDate() + 1);

        const dayOrders = orders.filter(o => {
            const orderDate = new Date(o.createdAt);
            return orderDate >= currentDate && orderDate < nextDay;
        });

        const dayTotal = dayOrders.reduce((sum, o) => sum + Number(o.total), 0);

        salesData.push({
            date: currentDate.toLocaleDateString('es-PE', { day: 'numeric', month: 'short' }),
            sales: dayTotal
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }

    // Recent orders (last 4)
    const recentOrders = orders.slice(0, 4);

    const stats = [
        {
            name: 'Ventas Totales',
            value: `S/ ${totalRevenue.toFixed(2)}`,
            change: `${revenueChange}%`,
            trend: Number(revenueChange) >= 0 ? 'up' as const : 'down' as const,
            icon: <DollarSign className="w-6 h-6" />,
            color: 'bg-green-500'
        },
        {
            name: 'Pedidos',
            value: totalOrders.toString(),
            change: `${ordersChange}%`,
            trend: Number(ordersChange) >= 0 ? 'up' as const : 'down' as const,
            icon: <ShoppingBag className="w-6 h-6" />,
            color: 'bg-blue-500'
        },
        {
            name: 'Productos Activos',
            value: activeProducts.toString(),
            change: '+0.0%', // Product change not calculated over period for now
            trend: 'up' as const,
            icon: <Package className="w-6 h-6" />,
            color: 'bg-purple-500'
        },
        {
            name: 'Pendientes',
            value: pendingOrders.toString(),
            change: '-',
            trend: 'up' as const,
            icon: <TrendingUp className="w-6 h-6" />,
            color: 'bg-amber-500'
        }
    ];

    return (
        <div className="space-y-8">
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-neutral-900">Panel de Control</h1>
                    <p className="text-neutral-500 mt-1">Resumen de ventas y actividad reciente.</p>
                </div>
                <DateRangeFilter />
            </div>

            {/* Stats Cards */}
            <StatsCards stats={stats} />

            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <SalesChart data={salesData} />
                <TopProducts products={topProducts} />
            </div>

            {/* Recent Orders and Low Stock */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm ring-1 ring-neutral-200 overflow-hidden">
                    <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                        <h2 className="text-xl font-display font-bold text-neutral-900">Pedidos Recientes</h2>
                        <Link href="/admin/pedidos" className="text-primary text-sm font-bold hover:underline">
                            Ver todos
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-neutral-50 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
                                    <th className="px-6 py-4">Pedido</th>
                                    <th className="px-6 py-4">Cliente</th>
                                    <th className="px-6 py-4">Estado</th>
                                    <th className="px-6 py-4 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-neutral-900 text-sm">{order.orderNumber}</p>
                                            <p className="text-neutral-400 text-xs">
                                                {new Date(order.createdAt).toLocaleDateString('es-PE')}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-600 text-sm">{order.customerName}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-bold ${order.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                                                order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                                                    'bg-blue-100 text-blue-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right font-bold text-neutral-900 text-sm">
                                            S/ {Number(order.total).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                                {recentOrders.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-10 text-center text-neutral-500">
                                            No hay pedidos en este rango de fechas.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Low Stock Alert */}
                <LowStockAlert products={lowStockProducts} />
            </div>

            {/* Quick Actions */}
            <div className="bg-neutral-900 rounded-3xl p-8 text-white shadow-xl shadow-neutral-900/20 relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-xl font-display font-bold mb-2">Acciones Rápidas</h3>
                    <p className="text-neutral-400 text-sm mb-6">Gestiona tu tienda en segundos.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Link
                            href="/admin/productos"
                            className="bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl flex items-center justify-between text-sm transition-all border border-white/5 group"
                        >
                            <span>Añadir Producto</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/admin/pedidos"
                            className="bg-white/10 hover:bg-white/20 px-4 py-3 rounded-xl flex items-center justify-between text-sm transition-all border border-white/5 group"
                        >
                            <span>Ver Pedidos</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/admin/categorias"
                            className="bg-primary hover:bg-primary-light px-4 py-3 rounded-xl flex items-center justify-between text-sm font-bold transition-all shadow-lg shadow-primary/20 group"
                        >
                            <span>Gestionar Categorías</span>
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
            </div>
        </div>
    );
}
