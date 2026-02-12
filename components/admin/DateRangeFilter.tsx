"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar, Search } from 'lucide-react';

export default function DateRangeFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Default to existing params or empty strings
    const [from, setFrom] = useState(searchParams.get('from') || '');
    const [to, setTo] = useState(searchParams.get('to') || '');

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());

        if (from) params.set('from', from);
        else params.delete('from');

        if (to) params.set('to', to);
        else params.delete('to');

        router.push(`?${params.toString()}`);
    };

    const handleClear = () => {
        setFrom('');
        setTo('');
        router.push('/admin');
    };

    return (
        <form onSubmit={handleApply} className="bg-white p-4 rounded-2xl shadow-sm ring-1 ring-neutral-200 flex flex-wrap items-end gap-4">
            <div className="flex flex-col space-y-1">
                <label htmlFor="from" className="text-xs font-bold text-neutral-500 uppercase">Desde</label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                        type="date"
                        id="from"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>
            </div>

            <div className="flex flex-col space-y-1">
                <label htmlFor="to" className="text-xs font-bold text-neutral-500 uppercase">Hasta</label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                    <input
                        type="date"
                        id="to"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    type="submit"
                    className="bg-primary hover:bg-primary-light text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
                >
                    <Search className="w-4 h-4" />
                    Filtrar
                </button>
                {(from || to) && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="text-neutral-500 hover:text-red-500 px-4 py-2 text-sm font-medium transition-colors"
                    >
                        Limpiar
                    </button>
                )}
            </div>
        </form>
    );
}
