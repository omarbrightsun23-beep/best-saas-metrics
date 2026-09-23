'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';
import { ArrowRight, ChevronRight, RotateCcw, Percent } from 'lucide-react';

export default function RuleOf40CalculatorPage() {
  const defaultNiche = SUB_NICHES[0];

  const [growthRate, setGrowthRate] = useState<number>(35);
  const [profitMargin, setProfitMargin] = useState<number>(12);

  const ruleOf40Score = growthRate + profitMargin;
  const isHealthy = ruleOf40Score >= 40;

  const handleReset = () => {
    setGrowthRate(35);
    setProfitMargin(12);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#15803d] font-bold">Rule of 40 Calculator</span>
        </nav>

        <div className="space-y-2 border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            SaaS Rule of 40 Calculator (Bessemer &amp; Scale Venture Partners)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Determine if your software company achieves elite growth and profitability balance. The Rule of 40 states that your YoY revenue growth rate plus your Free Cash Flow (FCF) margin should equal or exceed 40%.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Performance Metrics</h2>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* YoY Revenue Growth Rate */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="growth-rate">Year-over-Year (YoY) ARR Growth Rate (%)</label>
                <span className="font-mono text-[#15803d]">{growthRate}%</span>
              </div>
              <input
                id="growth-rate"
                type="range"
                min={-20}
                max={150}
                step={1}
                value={growthRate}
                onChange={(e) => setGrowthRate(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#15803d]"
              />
              <p className="text-[11px] text-slate-500">Annual recurring revenue growth percentage over the trailing 12 months.</p>
            </div>

            {/* Profit Margin (FCF / EBITDA) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="profit-margin">Free Cash Flow (FCF) or EBITDA Margin (%)</label>
                <span className="font-mono text-[#15803d]">{profitMargin}%</span>
              </div>
              <input
                id="profit-margin"
                type="range"
                min={-50}
                max={60}
                step={1}
                value={profitMargin}
                onChange={(e) => setProfitMargin(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#15803d]"
              />
              <p className="text-[11px] text-slate-500">Operational free cash flow margin (FCF / Revenue) or EBITDA percentage.</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className={`border rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs ${
              isHealthy ? 'bg-[#eef8ed] border-[#d2edd0]' : 'bg-amber-50/60 border-amber-200'
            }`}>
              <div className="space-y-1 border-b border-slate-200/80 pb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Rule of 40 Score</div>
                <div className="text-5xl font-black text-slate-950 font-mono">
                  {ruleOf40Score}%{' '}
                  <span className={`text-base font-bold px-2.5 py-1 rounded-full border ${
                    isHealthy
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}>
                    {isHealthy ? '✓ Meets Benchmark' : 'Below 40% Target'}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {isHealthy
                    ? 'Elite SaaS tier. High valuation multiples and strong investor interest.'
                    : 'Sub-40% profile. Accelerate growth velocity or optimize operational cash burn.'}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Growth Component:</span>
                  <span className="font-mono font-bold">{growthRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Profitability Component:</span>
                  <span className="font-mono font-bold">{profitMargin}%</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 text-xs">
              <div className="font-bold text-emerald-400">Formula &amp; VC Benchmarks:</div>
              <div className="font-mono text-slate-300">Rule of 40 Score = YoY Growth Rate % + Free Cash Flow Margin %</div>
              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                According to Bessemer Venture Partners (BVP), public cloud companies exceeding the Rule of 40 command 2.5x higher enterprise valuation revenue multiples compared to those under 40%.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
