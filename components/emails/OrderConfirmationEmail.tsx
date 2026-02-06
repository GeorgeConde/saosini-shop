import * as React from 'react';

interface OrderConfirmationEmailProps {
    orderNumber: string;
    customerName: string;
    total: number;
    items: any[];
}

export const OrderConfirmationEmail: React.FC<Readonly<OrderConfirmationEmailProps>> = ({
    orderNumber,
    customerName,
    total,
    items,
}) => (
    <div style={{
        fontFamily: 'sans-serif',
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '16px',
        border: '1px solid #eee'
    }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ color: '#e24a4a', margin: '0' }}>Saosini Shop</h1>
            <p style={{ color: '#666' }}>¡Gracias por tu compra!</p>
        </div>

        <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px' }}>
            <h2 style={{ fontSize: '18px', marginBottom: '20px' }}>Hola {customerName},</h2>
            <p>Hemos recibido tu pedido <strong>#{orderNumber}</strong> y lo estamos procesando.</p>

            <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                <h3 style={{ fontSize: '16px', color: '#444' }}>Resumen del Pedido</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left', fontSize: '12px', color: '#999', paddingBottom: '10px' }}>Producto</th>
                            <th style={{ textAlign: 'center', fontSize: '12px', color: '#999', paddingBottom: '10px' }}>Cant.</th>
                            <th style={{ textAlign: 'right', fontSize: '12px', color: '#999', paddingBottom: '10px' }}>Precio</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td style={{ padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>{item.productSnapshot.name}</td>
                                <td style={{ textAlign: 'center', padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>{item.quantity}</td>
                                <td style={{ textAlign: 'right', padding: '8px 0', borderBottom: '1px solid #f5f5f5' }}>S/ {item.price.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#e24a4a' }}>
                    Total: S/ {total.toFixed(2)}
                </p>
            </div>
        </div>

        <div style={{ marginTop: '30px', textAlign: 'center', color: '#999', fontSize: '12px' }}>
            <p>Saosini Shop - Excelencia Genética</p>
            <p>Si tienes alguna duda, contáctanos por WhatsApp.</p>
        </div>
    </div>
);
