"use client";

import { DollarSign, ShoppingBag, Package, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Stat {
    name: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: React.ReactNode;
    color: string;
}

interface StatsCardsProps {
    stats: Stat[];
}

export default function StatsCards({ stats }: StatsCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <div key={stat.name} className="bg-white p-6 rounded-3xl shadow-sm ring-1 ring-neutral-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className={`${stat.color} p-3 rounded-2xl text-white shadow-lg`}>
                            {stat.icon}
                        </div>
                        <div className={`flex items-center space-x-1 text-sm font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                            }`}>
                            <span>{stat.change}</span>
                            {stat.trend === 'up' ? (
                                <ArrowUpRight className="w-4 h-4" />
                            ) : (
                                <ArrowDownRight className="w-4 h-4" />
                            )}
                        </div>
                    </div>
                    <div>
                        <p className="text-neutral-500 text-sm font-medium">{stat.name}</p>
                        <p className="text-2xl font-bold text-neutral-900 mt-1">{stat.value}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function getDefaultIcons() {
    return {
        sales: <DollarSign className="w-6 h-6" />,
        orders: <ShoppingBag className="w-6 h-6" />,
        products: <Package className="w-6 h-6" />,
        conversion: <TrendingUp className="w-6 h-6" />
    };
}
