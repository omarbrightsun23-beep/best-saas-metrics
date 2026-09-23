'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';
import { ChevronRight, RotateCcw } from 'lucide-react';

export default function ChurnRateCalculatorPage() {
  const defaultNiche = SUB_NICHES[0];

  const [startCustomers, setStartCustomers] = useState<number>(500);
  const [churnedCustomers, setChurnedCustomers] = useState<number>(10);

  const logoChurnRate = startCustomers > 0 ? Number(((churnedCustomers / startCustomers) * 100).toFixed(2)) : 0;
  const annualLogoChurn = Number((1 - Math.pow(1 - logoChurnRate / 100, 12)) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#15803d] font-bold">Churn Rate Calculator</span>
        </nav>

        <div className="space-y-2 border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            SaaS Churn Rate Calculator (Logo &amp; Annualized Compounding)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Calculate your monthly logo churn percentage and compound annualized customer attrition rate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Account Counts</h2>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="start-cust">Customers at Beginning of Month</label>
                <span className="font-mono text-[#15803d]">{startCustomers}</span>
              </div>
              <input
                id="start-cust"
                type="range"
                min={10}
                max={5000}
                step={10}
                value={startCustomers}
                onChange={(e) => setStartCustomers(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#15803d]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="churn-cust">Customers Lost During Month</label>
                <span className="font-mono text-rose-600 font-bold">{churnedCustomers}</span>
              </div>
              <input
                id="churn-cust"
                type="range"
                min={0}
                max={250}
                step={1}
                value={churnedCustomers}
                onChange={(e) => setChurnedCustomers(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#15803d]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#eef8ed] border border-[#d2edd0] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="space-y-1 border-b border-[#d2edd0]/80 pb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Monthly Logo Churn</div>
                <div className="text-5xl font-black text-slate-950 font-mono">
                  {logoChurnRate}% <span className="text-lg font-bold text-slate-600">/ mo</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Annualized Compounded Churn:</span>
                  <span className="font-mono font-bold">{annualLogoChurn}% / year</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Customer Lifespan:</span>
                  <span className="font-mono font-bold">{(100 / (logoChurnRate || 1)).toFixed(1)} Months</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 text-xs">
              <div className="font-bold text-emerald-400">Formula:</div>
              <div className="font-mono text-slate-300">Monthly Churn = (Customers Lost in Month ÷ Starting Customers) × 100</div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
