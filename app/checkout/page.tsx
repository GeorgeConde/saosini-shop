"use client";

import { createOrder } from '@/lib/actions/order';
import { useCartStore } from '@/lib/store/cart-store';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, MapPin, Truck, CreditCard, Loader2, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

declare global {
    interface Window {
        Culqi: any;
        culqi: () => void;
    }
}

import { departamentos, provincias, distritos } from '@/lib/data/ubigeo';

export default function CheckoutPage() {
    const { items, getTotalPrice, clearCart } = useCartStore();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [culqiLoaded, setCulqiLoaded] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        department: 'Lima', // Default to Lima
        province: '', // Optional for now
        district: '', // Optional for now
        phone: ''
    });

    useEffect(() => {
        setMounted(true);

        // Define culqi function globally to handle token
        window.culqi = async () => {
            if (window.Culqi.token) {
                const token = window.Culqi.token.id;
                await processOrder(token);
            } else {
                console.error(window.Culqi.error);
                setIsSubmitting(false);
                alert(window.Culqi.error?.user_message || "Error al generar token de pago");
            }
        };

        return () => {
            // Cleanup if needed
        };
    }, [items, formData]);

    // Dynamic Location Logic
    const availableProvinces = formData.department ? provincias[formData.department] || [] : [];
    const availableDistricts = formData.province ? distritos[formData.province] || [] : [];

    // Effect to reset child fields when parent changes
    useEffect(() => {
        if (formData.department && !availableProvinces.includes(formData.province) && formData.province !== '') {
            setFormData(prev => ({ ...prev, province: '', district: '' }));
        }
    }, [formData.department, availableProvinces, formData.province]);

    useEffect(() => {
        if (formData.province && !availableDistricts.includes(formData.district) && formData.district !== '') {
            setFormData(prev => ({ ...prev, district: '' }));
        }
    }, [formData.province, availableDistricts, formData.district]);

    const subtotal = getTotalPrice();

    // Dynamic Shipping Logic
    const isLima = formData.department === 'Lima' || formData.department === 'Callao';
    const shipping = isLima ? 15.00 : 25.00;

    const total = subtotal + shipping;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const initCulqi = () => {
        if (window.Culqi) {
            window.Culqi.publicKey = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY;
            window.Culqi.settings({
                title: 'Saosini Shop',
                currency: 'PEN',
                description: 'Compra en Saosini Shop',
                amount: Math.round(total * 100)
            });
            window.Culqi.options({
                style: {
                    logo: 'https://cdn-icons-png.flaticon.com/512/3081/3081986.png', // Temporary logo
                    maincolor: '#e24a4a',
                }
            });
            window.Culqi.open();
        }
    };

    const processOrder = async (token?: string) => {
        setIsSubmitting(true);
        try {
            const orderData = {
                customerName: `${formData.firstName} ${formData.lastName}`,
                customerEmail: formData.email,
                customerPhone: formData.phone,
                shippingAddress: {
                    address: formData.address,
                    department: formData.department,
                    province: formData.province,
                    district: formData.district
                },
                items: items.map(item => ({
                    id: item.id,
                    quantity: item.quantity
                })),
                total: total,
                paymentToken: token
            };

            const result = await createOrder(orderData);

            if (result.success && result.orderId) {
                clearCart();
                router.push(`/checkout/success/${result.orderId}`);
            } else {
                alert(result.error || "Error al crear el pedido");
                setIsSubmitting(false);
            }
        } catch (error) {
            console.error(error);
            alert("Error inesperado en checkout");
            setIsSubmitting(false);
        }
    };

    const handleWhatsAppCheckout = () => {
        // Construct message
        let message = `*¡Hola! Quiero realizar un pedido en Saosini Shop:*\n\n`;
        items.forEach(item => {
            message += `• ${item.quantity}x ${item.name} - S/ ${(item.price * item.quantity).toFixed(2)}\n`;
        });
        message += `\n*Envío:* ${isLima ? 'Local' : 'Nacional'} - S/ ${shipping.toFixed(2)}`;
        message += `\n*TOTAL:* S/ ${total.toFixed(2)}\n\n`;
        message += `*Mis Datos:*\n`;
        message += `Nombre: ${formData.firstName} ${formData.lastName}\n`;
        message += `Email: ${formData.email}\n`;
        message += `Teléfono: ${formData.phone}\n`;
        message += `Dirección: ${formData.address}\n`;
        message += `Departamento: ${formData.department}\n`;
        if (formData.province) message += `Provincia: ${formData.province}\n`;
        if (formData.district) message += `Distrito: ${formData.district}\n`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/51926069493?text=${encodedMessage}`, '_blank');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.email || !formData.firstName || !formData.address || !formData.department) {
            alert("Por favor completa todos los campos requeridos");
            return;
        }

        // For now, redirect to WhatsApp as payment gateway is pending
        handleWhatsAppCheckout();
    };

    if (!mounted) return null;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-neutral-50 pt-32 pb-20 px-4 flex flex-col items-center justify-center text-center">
                <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full">
                    <h2 className="text-2xl font-bold font-display mb-4">Tu carrito está vacío</h2>
                    <p className="text-neutral-500 mb-8">Agrega algunos productos antes de proceder al pago.</p>
                    <Link href="/catalogo" className="btn-primary w-full block">
                        Volver al Catálogo
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-neutral-50 min-h-screen pt-24 pb-20">
            <Script
                src="https://checkout.culqi.com/js/v4"
                onLoad={() => setCulqiLoaded(true)}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <Link href="/catalogo" className="inline-flex items-center text-neutral-500 hover:text-primary mb-8 transition-colors group">
                    <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
                    Seguir comprando
                </Link>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Forms */}
                    <div>
                        {/* Steps Indicator - Visual Only for MVP */}
                        <div className="flex items-center space-x-4 mb-8 text-sm font-bold text-neutral-400">
                            <span className="flex items-center text-primary">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 border-2 border-primary bg-primary text-white">1</div>
                                Información y Envío
                            </span>
                            <div className="h-0.5 w-8 bg-neutral-200" />
                            <span className="flex items-center text-primary">
                                <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 border-2 border-primary bg-primary text-white">2</div>
                                Pago
                            </span>
                        </div>

                        {/* Contact Info Form */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm ring-1 ring-neutral-200 mb-8">
                            <h2 className="text-xl font-bold font-display mb-6 flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-primary" />
                                Información de Envio
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-neutral-900"
                                        placeholder="tu@email.com"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Nombres</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            required
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-neutral-900"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Apellidos</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            required
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-neutral-900"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Departamento</label>
                                    <select
                                        name="department"
                                        required
                                        value={formData.department}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none bg-white text-neutral-900 font-medium"
                                    >
                                        <option value="" disabled>Seleccionar</option>
                                        {departamentos.map(dep => (
                                            <option key={dep} value={dep}>{dep}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Provincia</label>
                                        <select
                                            name="province"
                                            required
                                            value={formData.province}
                                            onChange={handleInputChange}
                                            disabled={!formData.department}
                                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none bg-white text-neutral-900 font-medium disabled:bg-neutral-100 disabled:text-neutral-400"
                                        >
                                            <option value="">Seleccionar</option>
                                            {availableProvinces.map(prov => (
                                                <option key={prov} value={prov}>{prov}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Distrito</label>
                                        <select
                                            name="district"
                                            required
                                            value={formData.district}
                                            onChange={handleInputChange}
                                            disabled={!formData.province}
                                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none bg-white text-neutral-900 font-medium disabled:bg-neutral-100 disabled:text-neutral-400"
                                        >
                                            <option value="">Seleccionar</option>
                                            {(availableDistricts.length > 0 ? availableDistricts : ['Otro']).map(dist => (
                                                <option key={dist} value={dist}>{dist}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Dirección Exacta</label>
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-neutral-900"
                                        placeholder="Av. Principal 123, Urb..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-neutral-700 mb-1">Teléfono / Celular</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-neutral-900"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Shipping Method (Preview) */}
                        <div className="bg-white p-8 rounded-3xl shadow-sm ring-1 ring-neutral-200 mb-8">
                            <h2 className="text-xl font-bold font-display mb-6 flex items-center">
                                <Truck className="w-5 h-5 mr-2 text-primary" />
                                Método de Envío
                            </h2>
                            <div className="p-4 border border-primary bg-primary/5 rounded-xl flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-primary">
                                        {isLima ? 'Envío Local (Lima/Callao)' : 'Envío Nacional (Shalom)'}
                                    </p>
                                    <p className="text-sm text-neutral-500">
                                        {isLima ? '24-48 horas' : '2-5 días hábiles'}
                                    </p>
                                </div>
                                <span className="font-bold text-primary">S/ {shipping.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:sticky lg:top-24 h-fit">
                        <div className="bg-white p-8 rounded-3xl shadow-xl ring-1 ring-neutral-200">
                            <h2 className="text-xl font-bold font-display mb-6">Resumen del Pedido</h2>

                            <div className="space-y-4 mb-8 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex space-x-4 py-2">
                                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                                            {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
                                            <div className="absolute -top-1 -right-1 bg-neutral-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                                {item.quantity}
                                            </div>
                                        </div>
                                        <div className="flex-grow">
                                            <h4 className="text-sm font-bold text-neutral-900 line-clamp-2">{item.name}</h4>
                                            <p className="text-neutral-500 text-xs">{item.type?.replace('_', ' ')}</p>
                                        </div>
                                        <div className="text-sm font-bold text-neutral-900">
                                            S/ {(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-neutral-100 text-sm">
                                <div className="flex justify-between text-neutral-600">
                                    <span>Subtotal</span>
                                    <span>S/ {subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-neutral-600">
                                    <span>Envío ({formData.department})</span>
                                    <span>S/ {shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-neutral-100">
                                    <span className="font-bold text-xl text-neutral-900">Total</span>
                                    <span className="font-bold text-2xl text-primary">S/ {total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="space-y-3 mt-8">
                                <button
                                    type="submit"
                                    className="w-full btn-primary bg-[#25D366] hover:bg-[#1fb854] py-4 text-lg shadow-xl shadow-green-900/10 flex items-center justify-center space-x-2"
                                >
                                    <MessageCircle className="w-6 h-6" />
                                    <span>Completar Pedido por WhatsApp</span>
                                </button>

                                <div className="relative group">
                                    <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="bg-neutral-900 text-white text-xs px-2 py-1 rounded font-bold">Próximamente</span>
                                    </div>
                                    <button
                                        type="button"
                                        disabled={true}
                                        className="w-full bg-neutral-100 text-neutral-400 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 cursor-not-allowed border border-neutral-200"
                                    >
                                        <CreditCard className="w-5 h-5" />
                                        <span>Pagar con Tarjeta (En Mantenimiento)</span>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-center text-xs text-neutral-400 space-x-2">
                                <CreditCard className="w-4 h-4" />
                                <span className="text-center">Estamos actualizando nuestra pasarela de pagos. <b>Coordina tu compra directamente.</b></span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

