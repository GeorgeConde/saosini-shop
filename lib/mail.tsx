import { Resend } from 'resend';
import { OrderConfirmationEmail } from '@/components/emails/OrderConfirmationEmail';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOrderConfirmationEmail = async (
    email: string,
    customerName: string,
    orderNumber: string,
    total: number,
    items: any[]
) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Saosini Shop <onboarding@resend.dev>',
            to: [email],
            subject: `Confirmación de pedido #${orderNumber} - Saosini Shop`,
            react: (
                <OrderConfirmationEmail
                    orderNumber={orderNumber}
                    customerName={customerName}
                    total={total}
                    items={items}
                />
            ),
        });

        if (error) {
            console.error('Error sending email:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Unexpected email error:', err);
        return { success: false, error: err };
    }
};

export const sendAdminOrderNotification = async (
    orderNumber: string,
    customerName: string,
    total: number
) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Saosini Shop <onboarding@resend.dev>',
            to: ['gacp_@hotmail.com'],
            subject: `NUEVO PEDIDO #${orderNumber} - Saosini Shop`,
            html: `
        <h1>Nuevo pedido recibido</h1>
        <p><strong>Pedido:</strong> #${orderNumber}</p>
        <p><strong>Cliente:</strong> ${customerName}</p>
        <p><strong>Total:</strong> S/ ${total.toFixed(2)}</p>
        <p><a href="${process.env.NEXTAUTH_URL}/admin/pedidos">Ver en el panel de administración</a></p>
      `,
        });

        if (error) {
            console.error('Error sending admin email:', error);
            return { success: false, error };
        }

        return { success: true, data };
    } catch (err) {
        console.error('Unexpected admin email error:', err);
        return { success: false, error: err };
    }
};
