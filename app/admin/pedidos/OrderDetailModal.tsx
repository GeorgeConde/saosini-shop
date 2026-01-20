"use client";

import { useState } from "react";
import { X, MapPin, Phone, Mail, Package, Truck, CreditCard, MessageCircle } from "lucide-react";
import Image from "next/image";
import { OrderStatusBadge, PaymentStatusBadge } from "./OrderStatusBadge";
import { OrderStatus, PaymentStatus } from "@prisma/client";
import { updateOrderStatus, updatePaymentStatus, addTrackingNumber } from "@/lib/actions/order";

interface OrderDetailModalProps {
    order: any;
    onClose: () => void;
}

export default function OrderDetailModal({ order, onClose }: OrderDetailModalProps) {
    const [updating, setUpdating] = useState(false);
    const [trackingInput, setTrackingInput] = useState(order.trackingNumber || "");

    const handleStatusChange = async (newStatus: OrderStatus) => {
        setUpdating(true);
        const result = await updateOrderStatus(order.id, newStatus);
        if (result.success) {
            window.location.reload();
        } else {
            alert(result.error);
            setUpdating(false);
        }
    };

    const handlePaymentStatusChange = async (newStatus: PaymentStatus) => {
        setUpdating(true);
        const result = await updatePaymentStatus(order.id, newStatus);
        if (result.success) {
            window.location.reload();
        } else {
            alert(result.error);
            setUpdating(false);
        }
    };

    const handleAddTracking = async () => {
        if (!trackingInput.trim()) {
            alert("Ingresa un número de seguimiento");
            return;
        }
        setUpdating(true);
        const result = await addTrackingNumber(order.id, trackingInput);
        if (result.success) {
            window.location.reload();
        } else {
            alert(result.error);
            setUpdating(false);
        }
    };

    const shippingAddress = typeof order.shippingAddress === 'string'
        ? JSON.parse(order.shippingAddress)
        : order.shippingAddress;

    const whatsappMessage = encodeURIComponent(
        `Hola ${order.customerName}, te contacto sobre tu pedido ${order.orderNumber}. `
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden ring-1 ring-black/5 my-8">
                {/* Header */}
                <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
                    <div>
                        <h2 className="text-xl font-bold text-neutral-900">Pedido {order.orderNumber}</h2>
                        <p className="text-sm text-neutral-500">
                            {new Date(order.createdAt).toLocaleDateString('es-PE', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-200 rounded-full transition-colors text-neutral-400"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                    {/* Estados */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase">Estado del Pedido</label>
                            <div className="flex items-center space-x-2">
                                <OrderStatusBadge status={order.status} />
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                                    disabled={updating}
                                    className="text-xs px-3 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary outline-none"
                                >
                                    <option value="PENDING">Pendiente</option>
                                    <option value="PROCESSING">Procesando</option>
                                    <option value="SHIPPED">Enviado</option>
                                    <option value="DELIVERED">Entregado</option>
                                    <option value="CANCELLED">Cancelado</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-500 uppercase">Estado de Pago</label>
                            <div className="flex items-center space-x-2">
                                <PaymentStatusBadge status={order.paymentStatus} />
                                <select
                                    value={order.paymentStatus}
                                    onChange={(e) => handlePaymentStatusChange(e.target.value as PaymentStatus)}
                                    disabled={updating}
                                    className="text-xs px-3 py-2 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-primary outline-none"
                                >
                                    <option value="PENDING">Pendiente</option>
                                    <option value="PAID">Pagado</option>
                                    <option value="FAILED">Fallido</option>
                                    <option value="REFUNDED">Reembolsado</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Cliente */}
                    <div className="bg-neutral-50 p-4 rounded-2xl space-y-3">
                        <h3 className="font-bold text-neutral-900 flex items-center space-x-2">
                            <Package className="w-4 h-4" />
                            <span>Información del Cliente</span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center space-x-2 text-neutral-600">
                                <Mail className="w-4 h-4" />
                                <span>{order.customerEmail}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-neutral-600">
                                <Phone className="w-4 h-4" />
                                <span>{order.customerPhone}</span>
                            </div>
                        </div>
                        <a
                            href={`https://wa.me/51${order.customerPhone.replace(/\D/g, '')}?text=${whatsappMessage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary inline-flex items-center space-x-2 px-4 py-2 text-sm"
                        >
                            <MessageCircle className="w-4 h-4" />
                            <span>Contactar por WhatsApp</span>
                        </a>
                    </div>

                    {/* Dirección */}
                    <div className="bg-neutral-50 p-4 rounded-2xl space-y-3">
                        <h3 className="font-bold text-neutral-900 flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>Dirección de Envío</span>
                        </h3>
                        <p className="text-sm text-neutral-600">
                            {shippingAddress.street}, {shippingAddress.city}<br />
                            {shippingAddress.district}, {shippingAddress.province}<br />
                            {shippingAddress.postalCode && `CP: ${shippingAddress.postalCode}`}
                        </p>
                        <div className="flex items-center space-x-2 text-sm">
                            <Truck className="w-4 h-4 text-neutral-500" />
                            <span className="font-medium">{order.shippingMethod || 'No especificado'}</span>
                            <span className="text-neutral-400">•</span>
                            <span className="font-bold text-primary">S/ {Number(order.shippingCost).toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Tracking */}
                    <div className="bg-blue-50 p-4 rounded-2xl space-y-3">
                        <h3 className="font-bold text-neutral-900">Número de Seguimiento</h3>
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                value={trackingInput}
                                onChange={(e) => setTrackingInput(e.target.value)}
                                placeholder="Ej: TRACK123456"
                                className="flex-1 px-4 py-2 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary outline-none"
                            />
                            <button
                                onClick={handleAddTracking}
                                disabled={updating}
                                className="btn-primary px-6 disabled:opacity-50"
                            >
                                {order.trackingNumber ? 'Actualizar' : 'Añadir'}
                            </button>
                        </div>
                    </div>

                    {/* Productos */}
                    <div className="space-y-3">
                        <h3 className="font-bold text-neutral-900">Productos</h3>
                        <div className="space-y-2">
                            {order.items.map((item: any) => {
                                const snapshot = typeof item.productSnapshot === 'string'
                                    ? JSON.parse(item.productSnapshot)
                                    : item.productSnapshot;

                                return (
                                    <div key={item.id} className="flex items-center space-x-4 p-3 bg-neutral-50 rounded-xl">
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-200 shrink-0">
                                            <Image
                                                src={snapshot.image || 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=100'}
                                                alt={snapshot.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-sm text-neutral-900">{snapshot.name}</p>
                                            <p className="text-xs text-neutral-500">Cantidad: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-neutral-900">S/ {Number(item.subtotal).toFixed(2)}</p>
                                            <p className="text-xs text-neutral-500">S/ {Number(item.price).toFixed(2)} c/u</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Resumen */}
                    <div className="border-t border-neutral-200 pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-600">Subtotal</span>
                            <span className="font-medium">S/ {Number(order.subtotal).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-neutral-600">Envío</span>
                            <span className="font-medium">S/ {Number(order.shippingCost).toFixed(2)}</span>
                        </div>
                        {Number(order.discount) > 0 && (
                            <div className="flex justify-between text-sm text-green-600">
                                <span>Descuento</span>
                                <span className="font-medium">- S/ {Number(order.discount).toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-lg font-bold border-t border-neutral-200 pt-2">
                            <span>Total</span>
                            <span className="text-primary">S/ {Number(order.total).toFixed(2)}</span>
                        </div>
                    </div>

                    {order.notes && (
                        <div className="bg-amber-50 p-4 rounded-2xl">
                            <h3 className="font-bold text-neutral-900 mb-2">Notas</h3>
                            <p className="text-sm text-neutral-600">{order.notes}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
