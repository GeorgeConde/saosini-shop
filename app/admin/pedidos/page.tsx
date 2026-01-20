import { Download, TrendingUp } from 'lucide-react';
import prisma from '@/lib/prisma';
import OrdersTable from './OrdersTable';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        include: {
            items: {
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
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    // Calcular estadísticas
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayOrders = orders.filter(o => new Date(o.createdAt) >= today);
    const todayTotal = todayOrders.reduce((sum, o) => sum + Number(o.total), 0);

    const pendingOrders = orders.filter(o => o.status === 'PENDING').length;
    const shippingOrders = orders.filter(o => o.status === 'SHIPPED').length;

    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);
    const monthOrders = orders.filter(o => new Date(o.createdAt) >= thisMonth && o.status === 'DELIVERED').length;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-neutral-900">Pedidos</h1>
                    <p className="text-neutral-500 mt-1">Gestiona las ventas asistidas y automáticas de tu granja.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors text-sm font-bold text-neutral-600">
                        <Download className="w-5 h-5" />
                        <span>Exportar CSV</span>
                    </button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-3xl shadow-sm ring-1 ring-neutral-200">
                    <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-2">Hoy</p>
                    <p className="text-2xl font-bold text-neutral-900">S/ {todayTotal.toFixed(2)}</p>
                    <p className="text-green-600 text-xs font-medium mt-1 flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>{todayOrders.length} pedidos</span>
                    </p>
                </div>
                <div className="bg-white p-5 rounded-3xl shadow-sm ring-1 ring-neutral-200">
                    <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-2">Pendientes</p>
                    <p className="text-2xl font-bold text-amber-500">{pendingOrders}</p>
                    <p className="text-neutral-400 text-xs font-medium mt-1">Requieren acción</p>
                </div>
                <div className="bg-white p-5 rounded-3xl shadow-sm ring-1 ring-neutral-200">
                    <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-2">Por Enviar</p>
                    <p className="text-2xl font-bold text-blue-500">{shippingOrders}</p>
                    <p className="text-neutral-400 text-xs font-medium mt-1">En tránsito</p>
                </div>
                <div className="bg-white p-5 rounded-3xl shadow-sm ring-1 ring-neutral-200">
                    <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-2">Exitosos</p>
                    <p className="text-2xl font-bold text-neutral-900">{monthOrders}</p>
                    <p className="text-green-600 text-xs font-medium mt-1">Este mes</p>
                </div>
            </div>

            {/* Orders Table */}
            <OrdersTable orders={JSON.parse(JSON.stringify(orders))} />
        </div>
    );
}
