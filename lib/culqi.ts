
export const createCharge = async (
    token: string,
    amount: number,
    email: string,
    currency_code: string = 'PEN'
) => {
    try {
        const response = await fetch('https://api.culqi.com/v2/charges', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.CULQI_PRIVATE_KEY}`
            },
            body: JSON.stringify({
                amount: Math.round(amount * 100), // Culqi expects amount in cents
                currency_code,
                email,
                source_id: token,
                capture: true,
                description: 'Compra en Saosini Shop',
                antifraud_details: {
                    // Optional: Add antifraud data if needed
                }
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Culqi Error:', data);
            return {
                success: false,
                error: data.user_message || data.merchant_message || 'Error al procesar el pago'
            };
        }

        return {
            success: true,
            data
        };
    } catch (error) {
        console.error('Culqi Integration Error:', error);
        return {
            success: false,
            error: 'Error de conexión con la pasarela de pagos'
        };
    }
};
