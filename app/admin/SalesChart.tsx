"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

interface SalesChartProps {
    data: {
        date: string;
        sales: number;
    }[];
}

export default function SalesChart({ data }: SalesChartProps) {
    const [period, setPeriod] = useState<'7d' | '30d'>('7d');

    const displayData = period === '7d' ? data.slice(-7) : data;

    return (
        <div className="bg-white rounded-3xl shadow-sm ring-1 ring-neutral-200 p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-display font-bold text-neutral-900">Ventas Diarias</h2>
                    <p className="text-sm text-neutral-500 mt-1">Evolución de tus ingresos</p>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => setPeriod('7d')}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${period === '7d'
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                            }`}
                    >
                        7 días
                    </button>
                    <button
                        onClick={() => setPeriod('30d')}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${period === '30d'
                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                            }`}
                    >
                        30 días
                    </button>
                </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={displayData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                        dataKey="date"
                        stroke="#999"
                        style={{ fontSize: '12px' }}
                    />
                    <YAxis
                        stroke="#999"
                        style={{ fontSize: '12px' }}
                        tickFormatter={(value) => `S/ ${value}`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e5e5',
                            borderRadius: '12px',
                            padding: '12px'
                        }}
                        formatter={(value: any) => [`S/ ${value.toFixed(2)}`, 'Ventas']}
                    />
                    <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#FF6B35"
                        strokeWidth={3}
                        dot={{ fill: '#FF6B35', r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
