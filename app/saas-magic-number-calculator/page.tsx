'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';
import { ArrowRight, ChevronRight, RotateCcw } from 'lucide-react';

export default function MagicNumberCalculatorPage() {
  const defaultNiche = SUB_NICHES[0];

  const [currentQuarterArr, setCurrentQuarterArr] = useState<number>(1250000);
  const [priorQuarterArr, setPriorQuarterArr] = useState<number>(1000000);
  const [quarterSmSpend, setQuarterSmSpend] = useState<number>(200000);

  const netNewArr = currentQuarterArr - priorQuarterArr;
  const magicNumber = quarterSmSpend > 0 ? Number(((netNewArr * 4) / quarterSmSpend).toFixed(2)) : 0;

  const handleReset = () => {
    setCurrentQuarterArr(1250000);
    setPriorQuarterArr(1000000);
    setQuarterSmSpend(200000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav selectedNiche={defaultNiche} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#15803d] font-bold">Magic Number Calculator</span>
        </nav>

        <div className="space-y-2 border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            SaaS Magic Number Calculator (Sales Efficiency Index)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Calculate your SaaS Magic Number to measure sales efficiency. A Magic Number &gt; 1.0 indicates that your sales and marketing investments are highly efficient and ready for aggressive scaling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Quarterly Financials</h2>
              <button type="button" onClick={handleReset} className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-semibold">
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="curr-arr">Current Quarter Ending ARR ($)</label>
                <span className="font-mono text-[#15803d]">${currentQuarterArr.toLocaleString()}</span>
              </div>
              <input
                id="curr-arr"
                type="range"
                min={100000}
                max={5000000}
                step={25000}
                value={currentQuarterArr}
                onChange={(e) => setCurrentQuarterArr(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#15803d]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="prior-arr">Prior Quarter Ending ARR ($)</label>
                <span className="font-mono text-[#15803d]">${priorQuarterArr.toLocaleString()}</span>
              </div>
              <input
                id="prior-arr"
                type="range"
                min={50000}
                max={4500000}
                step={25000}
                value={priorQuarterArr}
                onChange={(e) => setPriorQuarterArr(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#15803d]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="sm-spend">Prior Quarter Sales &amp; Marketing Spend ($)</label>
                <span className="font-mono text-[#15803d]">${quarterSmSpend.toLocaleString()}</span>
              </div>
              <input
                id="sm-spend"
                type="range"
                min={10000}
                max={1000000}
                step={10000}
                value={quarterSmSpend}
                onChange={(e) => setQuarterSmSpend(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#15803d]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className={`border rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs ${
              magicNumber >= 1.0 ? 'bg-[#eef8ed] border-[#d2edd0]' : magicNumber >= 0.75 ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'
            }`}>
              <div className="space-y-1 border-b border-slate-200 pb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">SaaS Magic Number</div>
                <div className="text-5xl font-black text-slate-950 font-mono">
                  {magicNumber}x
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {magicNumber >= 1.0
                    ? 'Excellent efficiency (Magic Number ≥ 1.0). Invest aggressively in sales & marketing.'
                    : magicNumber >= 0.75
                    ? 'Healthy efficiency (0.75–1.0x). Solid sales motion with balanced capital returns.'
                    : 'Needs optimization (< 0.75x). Fix product-market fit or sales conversion before scaling spend.'}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Net New ARR Added:</span>
                  <span className="font-mono font-bold">${netNewArr.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annualized New ARR:</span>
                  <span className="font-mono font-bold">${(netNewArr * 4).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 text-xs">
              <div className="font-bold text-emerald-400">Formula:</div>
              <div className="font-mono text-slate-300">Magic Number = (Quarter Net New ARR × 4) ÷ Prior Quarter S&amp;M Expense</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
