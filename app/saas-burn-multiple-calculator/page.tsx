'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';
import { ChevronRight, RotateCcw } from 'lucide-react';

export default function BurnMultipleCalculatorPage() {
  const defaultNiche = SUB_NICHES[0];

  const [netBurn, setNetBurn] = useState<number>(300000);
  const [netNewArr, setNetNewArr] = useState<number>(250000);

  const burnMultiple = netNewArr > 0 ? Number((netBurn / netNewArr).toFixed(2)) : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav selectedNiche={defaultNiche} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#4F46E5] font-bold">Burn Multiple Calculator</span>
        </nav>

        <div className="space-y-2 border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            SaaS Burn Multiple Calculator (David Sacks / Craft Ventures)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            The Burn Multiple measures capital efficiency: how much cash does a startup burn to generate every $1.00 of Net New ARR?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Inputs</h2>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="net-burn">Net Cash Burn in Period ($)</label>
                <span className="font-mono text-[#4F46E5]">${netBurn.toLocaleString()}</span>
              </div>
              <input
                id="net-burn"
                type="range"
                min={20000}
                max={2000000}
                step={10000}
                value={netBurn}
                onChange={(e) => setNetBurn(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4F46E5]"
              />
              <p className="text-[11px] text-slate-500">Cash burned over the quarter or year (Cash In minus Cash Out).</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="net-new-arr">Net New ARR Generated ($)</label>
                <span className="font-mono text-[#4F46E5]">${netNewArr.toLocaleString()}</span>
              </div>
              <input
                id="net-new-arr"
                type="range"
                min={10000}
                max={2000000}
                step={10000}
                value={netNewArr}
                onChange={(e) => setNetNewArr(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4F46E5]"
              />
              <p className="text-[11px] text-slate-500">Net new ARR added in the same period (New ARR + Expansion - Churn).</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className={`border rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs ${
              burnMultiple <= 1.0 ? 'bg-[#EEF2FF] border-[#E0E7FF]' : burnMultiple <= 1.5 ? 'bg-blue-50 border-blue-200' : 'bg-rose-50 border-rose-200'
            }`}>
              <div className="space-y-1 border-b border-slate-200 pb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Burn Multiple</div>
                <div className="text-5xl font-black text-slate-950 font-mono">
                  {burnMultiple}x
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {burnMultiple <= 1.0
                    ? 'Amazing (≤ 1.0x). Burning less than $1 to create $1 of ARR.'
                    : burnMultiple <= 1.5
                    ? 'Good (1.0–1.5x). Healthy venture capital efficiency band.'
                    : burnMultiple <= 2.0
                    ? 'Suspect (1.5–2.0x). High capital drag.'
                    : 'Bad (> 2.0x). Alarmingly inefficient capital consumption.'}
                </p>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 text-xs">
              <div className="font-bold text-emerald-400">Formula:</div>
              <div className="font-mono text-slate-300">Burn Multiple = Net Cash Burn ÷ Net New ARR</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
