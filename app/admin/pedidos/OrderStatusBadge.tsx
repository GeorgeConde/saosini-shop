import { OrderStatus, PaymentStatus } from "@prisma/client";
import { Clock, CheckCircle2, Truck, Package, XCircle } from "lucide-react";

interface OrderStatusBadgeProps {
    status: OrderStatus;
}

interface PaymentStatusBadgeProps {
    status: PaymentStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
    const config = {
        PENDING: {
            color: "bg-amber-100 text-amber-700",
            icon: <Clock className="w-3.5 h-3.5" />,
            label: "Pendiente"
        },
        PROCESSING: {
            color: "bg-blue-100 text-blue-700",
            icon: <Package className="w-3.5 h-3.5" />,
            label: "Procesando"
        },
        SHIPPED: {
            color: "bg-purple-100 text-purple-700",
            icon: <Truck className="w-3.5 h-3.5" />,
            label: "Enviado"
        },
        DELIVERED: {
            color: "bg-green-100 text-green-700",
            icon: <CheckCircle2 className="w-3.5 h-3.5" />,
            label: "Entregado"
        },
        CANCELLED: {
            color: "bg-red-100 text-red-700",
            icon: <XCircle className="w-3.5 h-3.5" />,
            label: "Cancelado"
        }
    };

    const { color, icon, label } = config[status];

    return (
        <div className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold text-xs uppercase ${color}`}>
            {icon}
            <span>{label}</span>
        </div>
    );
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
    const config = {
        PENDING: {
            color: "bg-amber-50 text-amber-600 border border-amber-200",
            label: "Pendiente"
        },
        PAID: {
            color: "bg-green-50 text-green-600 border border-green-200",
            label: "Pagado"
        },
        FAILED: {
            color: "bg-red-50 text-red-600 border border-red-200",
            label: "Fallido"
        },
        REFUNDED: {
            color: "bg-neutral-50 text-neutral-600 border border-neutral-200",
            label: "Reembolsado"
        }
    };

    const { color, label } = config[status];

    return (
        <span className={`inline-block px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${color}`}>
            {label}
        </span>
    );
}
