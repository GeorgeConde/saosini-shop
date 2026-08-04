import { Users, TrendingUp } from 'lucide-react';
import { getCustomers } from '@/lib/actions/customer';
import ClientsTable from './ClientsTable';

export const dynamic = 'force-dynamic';

export default async function AdminClientsPage() {
    const result = await getCustomers();
    const customers = result.success ? result.customers : [];

    const totalSpent = customers.reduce((sum, c) => sum + c.totalSpent, 0);
    const repeatCustomers = customers.filter(c => c.orderCount > 1).length;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-display font-bold text-neutral-900">Clientes</h1>
                <p className="text-neutral-500 mt-1">Clientes derivados de tus pedidos — el checkout no requiere cuenta.</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-3xl shadow-sm ring-1 ring-neutral-200">
                    <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-2">Clientes</p>
                    <p className="text-2xl font-bold text-neutral-900">{customers.length}</p>
                    <p className="text-neutral-400 text-xs font-medium mt-1 flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>Únicos por email</span>
                    </p>
                </div>
                <div className="bg-white p-5 rounded-3xl shadow-sm ring-1 ring-neutral-200">
                    <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-2">Recurrentes</p>
                    <p className="text-2xl font-bold text-primary">{repeatCustomers}</p>
                    <p className="text-neutral-400 text-xs font-medium mt-1">Más de 1 pedido</p>
                </div>
                <div className="bg-white p-5 rounded-3xl shadow-sm ring-1 ring-neutral-200 col-span-2 lg:col-span-2">
                    <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider mb-2">Total Histórico</p>
                    <p className="text-2xl font-bold text-neutral-900">S/ {totalSpent.toFixed(2)}</p>
                    <p className="text-green-600 text-xs font-medium mt-1 flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3" />
                        <span>Sumado de todos los pedidos</span>
                    </p>
                </div>
            </div>

            <ClientsTable customers={customers} />
        </div>
    );
}
