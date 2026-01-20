import { getOrderById } from '@/lib/actions/order';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Package } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function SuccessPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const { success, order } = await getOrderById(id);

    if (!success || !order) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-neutral-50 pt-24 pb-20 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="bg-primary/10 p-12 text-center">
                        <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-display font-bold text-neutral-900 mb-4">
                            ¡Pedido Recibido!
                        </h1>
                        <p className="text-neutral-600 text-lg max-w-lg mx-auto">
                            Gracias por tu compra, <span className="font-bold text-primary">{order.customerName}</span>.
                            Hemos enviado un correo de confirmación a {order.customerEmail}.
                        </p>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-neutral-100">
                            <div>
                                <p className="text-neutral-500 text-sm mb-1">Número de Orden</p>
                                <p className="text-xl font-bold text-neutral-900 font-mono tracking-wider">{order.orderNumber}</p>
                            </div>
                            <div className="mt-4 md:mt-0 text-right">
                                <p className="text-neutral-500 text-sm mb-1">Fecha</p>
                                <p className="font-medium text-neutral-900">
                                    {new Date(order.createdAt).toLocaleDateString('es-PE', {
                                        year: 'numeric', month: 'long', day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h3 className="font-bold text-lg mb-4 flex items-center">
                                <Package className="w-5 h-5 mr-2 text-primary" />
                                Detalle del Pedido
                            </h3>
                            <div className="bg-neutral-50 rounded-2xl p-6 space-y-4">
                                {order.items.map((item: any) => (
                                    <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-xl border border-neutral-100 shadow-sm">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-8 h-8 bg-neutral-100 rounded-lg flex items-center justify-center text-sm font-bold text-neutral-600">
                                                x{item.quantity}
                                            </div>
                                            <span className="font-medium text-neutral-900 max-w-[200px] md:max-w-xs truncate">
                                                {item.productSnapshot?.name || "Producto"}
                                            </span>
                                        </div>
                                        <span className="font-bold text-neutral-900">
                                            S/ {item.subtotal.toFixed(2)}
                                        </span>
                                    </div>
                                ))}

                                <div className="pt-4 mt-4 border-t border-neutral-200 flex justify-between items-center">
                                    <span className="font-bold text-lg">Total Pagado</span>
                                    <span className="font-bold text-2xl text-primary">S/ {order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/catalogo"
                                className="btn-primary flex items-center justify-center space-x-2 py-4 px-8"
                            >
                                <span>Seguir Comprando</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <Link
                                href="/"
                                className="px-8 py-4 rounded-full font-bold text-neutral-600 hover:bg-neutral-100 transition-colors text-center"
                            >
                                Volver al Inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
