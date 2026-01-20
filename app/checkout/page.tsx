"use client";

import { createOrder } from '@/lib/actions/order';
import { useCartStore } from '@/lib/store/cart-store';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, MapPin, Truck, CreditCard, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';

declare global {
    interface Window {
        Culqi: any;
        culqi: () => void;
    }
}

const DEPARTAMENTOS = [
    "Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca",
    "Callao", "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad",
    "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco",
    "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"
];

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.email || !formData.firstName || !formData.address || !formData.department) {
            alert("Por favor completa todos los campos requeridos");
            return;
        }

        setIsSubmitting(true);

        // Open Culqi Payment Modal
        if (culqiLoaded && window.Culqi) {
            initCulqi();
        } else {
            console.error("Culqi not loaded properly");
            alert("Error cargando pasarela de pagos, por favor refresca la página");
            setIsSubmitting(false);
        }
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
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
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
                                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
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
                                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
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
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all appearance-none bg-white"
                                    >
                                        {DEPARTAMENTOS.map(dep => (
                                            <option key={dep} value={dep}>{dep}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Provincia</label>
                                        <input
                                            type="text"
                                            name="province"
                                            value={formData.province}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="Opcional"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Distrito</label>
                                        <input
                                            type="text"
                                            name="district"
                                            value={formData.district}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="Opcional"
                                        />
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
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
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
                                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
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

                            <button
                                type="submit"
                                disabled={isSubmitting || !culqiLoaded}
                                className="w-full btn-primary bg-primary mt-8 py-4 text-lg shadow-xl shadow-primary/20 flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Procesando...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Pagar con Tarjeta</span>
                                        <CreditCard className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            <div className="mt-6 flex items-center justify-center text-xs text-neutral-400 space-x-2">
                                <CreditCard className="w-4 h-4" />
                                <span className="text-center">Pagos seguros con <b>Culqi</b>. Tus datos están protegidos.</span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

