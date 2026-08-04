"use client";

import { Search } from 'lucide-react';
import { useState } from 'react';
import type { CustomerSummary } from '@/lib/actions/customer';

interface ClientsTableProps {
    customers: CustomerSummary[];
}

export default function ClientsTable({ customers }: ClientsTableProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = customers.filter(c => {
        const term = searchTerm.toLowerCase();
        return (
            c.name.toLowerCase().includes(term) ||
            c.email.toLowerCase().includes(term) ||
            c.phone.toLowerCase().includes(term)
        );
    });

    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm ring-1 ring-neutral-200">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, correo o teléfono..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-neutral-50 border border-neutral-200 focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm ring-1 ring-neutral-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-neutral-50 text-neutral-400 text-[10px] font-bold uppercase tracking-wider">
                                <th className="px-6 py-4">Cliente</th>
                                <th className="px-6 py-4">Teléfono</th>
                                <th className="px-6 py-4 text-right">Pedidos</th>
                                <th className="px-6 py-4 text-right">Total Gastado</th>
                                <th className="px-6 py-4 text-right">Último Pedido</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {filtered.map((customer) => (
                                <tr key={customer.email} className="hover:bg-neutral-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <p className="font-bold text-neutral-800 text-sm">{customer.name}</p>
                                        <p className="text-neutral-400 text-xs truncate max-w-[220px]">{customer.email}</p>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-600 text-sm">{customer.phone}</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`text-sm font-bold ${customer.orderCount > 1 ? 'text-primary' : 'text-neutral-600'}`}>
                                            {customer.orderCount}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-black text-neutral-900 text-sm">
                                        S/ {customer.totalSpent.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-4 text-right text-neutral-400 text-xs uppercase font-bold tracking-tight">
                                        {new Date(customer.lastOrderAt).toLocaleDateString('es-PE', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric'
                                        })}
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-neutral-500">
                                        {customers.length === 0 ? 'Aún no hay pedidos registrados.' : 'No se encontraron clientes.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="p-6 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-sm text-neutral-500">
                    <p>Mostrando {filtered.length} de {customers.length} clientes</p>
                </div>
            </div>
        </div>
    );
}
