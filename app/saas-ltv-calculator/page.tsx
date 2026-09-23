'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';
import { ChevronRight, RotateCcw } from 'lucide-react';

export default function LtvCalculatorPage() {
  const defaultNiche = SUB_NICHES[0];

  const [arpa, setArpa] = useState<number>(500);
  const [margin, setMargin] = useState<number>(80);
  const [churn, setChurn] = useState<number>(2.0);

  const churnDecimal = churn > 0 ? churn / 100 : 0.01;
  const lifespanMonths = churn > 0 ? Number((1 / churnDecimal).toFixed(1)) : 0;
  const netArpa = arpa * (margin / 100);
  const ltv = churnDecimal > 0 ? Math.round(netArpa / churnDecimal) : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav selectedNiche={defaultNiche} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#15803d] font-bold">LTV Calculator</span>
        </nav>

        <div className="space-y-2 border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Customer Lifetime Value (LTV) Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Compute gross margin-adjusted Customer Lifetime Value (LTV) and average customer account lifespan across monthly logo churn rates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Model Parameters</h2>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="arpa-ltv">Monthly ARPA ($)</label>
                <span className="font-mono text-[#15803d]">${arpa.toLocaleString()}/mo</span>
              </div>
              <input
                id="arpa-ltv"
                type="range"
                min={20}
                max={5000}
                step={25}
                value={arpa}
                onChange={(e) => setArpa(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#15803d]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="margin-ltv">Gross Margin (%)</label>
                <span className="font-mono text-[#15803d]">{margin}%</span>
              </div>
              <input
                id="margin-ltv"
                type="range"
                min={30}
                max={95}
                step={1}
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#15803d]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="churn-ltv">Monthly Logo Churn (%)</label>
                <span className="font-mono text-[#15803d]">{churn}%</span>
              </div>
              <input
                id="churn-ltv"
                type="range"
                min={0.2}
                max={10}
                step={0.1}
                value={churn}
                onChange={(e) => setChurn(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#15803d]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#eef8ed] border border-[#d2edd0] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="space-y-1 border-b border-[#d2edd0]/80 pb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Projected Customer LTV</div>
                <div className="text-5xl font-black text-slate-950 font-mono">
                  ${ltv.toLocaleString()}
                </div>
                <p className="text-xs text-slate-500">Gross profit contribution generated over the customer lifecycle.</p>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Customer Lifespan:</span>
                  <span className="font-mono font-bold">{lifespanMonths} Months</span>
                </div>
                <div className="flex justify-between">
                  <span>Net Monthly Contribution:</span>
                  <span className="font-mono font-bold">${netArpa.toFixed(2)}/mo</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 text-xs">
              <div className="font-bold text-emerald-400">Formula:</div>
              <div className="font-mono text-slate-300">LTV = (Monthly ARPA × Gross Margin %) ÷ Monthly Churn Rate</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
