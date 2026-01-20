"use client";

import { Search, Filter, Eye, Download } from 'lucide-react';
import { useState } from 'react';
import { OrderStatusBadge, PaymentStatusBadge } from './OrderStatusBadge';
import OrderDetailModal from './OrderDetailModal';
import { OrderStatus } from '@prisma/client';

interface Order {
    id: string;
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    status: OrderStatus;
    paymentStatus: any;
    paymentMethod: string | null;
    total: number | any;
    createdAt: Date;
    shippingAddress: any;
    shippingMethod: string | null;
    shippingCost: number | any;
    trackingNumber: string | null;
    subtotal: number | any;
    discount: number | any;
    notes: string | null;
    items: any[];
}

interface OrdersTableProps {
    orders: Order[];
}

export default function OrdersTable({ orders }: OrdersTableProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('ALL');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <>
            <div className="space-y-6">
                {/* Filters */}
                <div className="bg-white p-6 rounded-3xl shadow-sm ring-1 ring-neutral-200 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Buscar por número, nombre o correo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors text-sm font-medium text-neutral-600 outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="ALL">Todos los estados</option>
                            <option value="PENDING">Pendientes</option>
                            <option value="PROCESSING">Procesando</option>
                            <option value="SHIPPED">Enviados</option>
                            <option value="DELIVERED">Entregados</option>
                            <option value="CANCELLED">Cancelados</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-3xl shadow-sm ring-1 ring-neutral-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-neutral-50 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
                                    <th className="px-6 py-4">Pedido / Fecha</th>
                                    <th className="px-6 py-4">Cliente</th>
                                    <th className="px-6 py-4">Método</th>
                                    <th className="px-6 py-4">Estado</th>
                                    <th className="px-6 py-4">Pago</th>
                                    <th className="px-6 py-4 text-right">Total</th>
                                    <th className="px-6 py-4 text-right">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-100">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-neutral-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-neutral-900 text-sm">{order.orderNumber}</p>
                                            <p className="text-neutral-400 text-[10px] uppercase font-bold tracking-tight">
                                                {new Date(order.createdAt).toLocaleDateString('es-PE', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-neutral-800 text-sm">{order.customerName}</p>
                                            <p className="text-neutral-400 text-xs truncate max-w-[200px]">{order.customerEmail}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-neutral-600 text-sm font-medium">
                                                {order.paymentMethod || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <OrderStatusBadge status={order.status} />
                                        </td>
                                        <td className="px-6 py-4">
                                            <PaymentStatusBadge status={order.paymentStatus} />
                                        </td>
                                        <td className="px-6 py-4 text-right font-black text-neutral-900 text-sm">
                                            S/ {Number(order.total).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="btn-primary p-2 flex items-center justify-center rounded-lg shadow-lg shadow-primary/10 ml-auto"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {filteredOrders.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-10 text-center text-neutral-500">
                                            No se encontraron pedidos.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-sm text-neutral-500">
                        <p>Mostrando {filteredOrders.length} de {orders.length} pedidos</p>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedOrder && (
                <OrderDetailModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                />
            )}
        </>
    );
}
