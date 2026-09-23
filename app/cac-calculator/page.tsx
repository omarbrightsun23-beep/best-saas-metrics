'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';
import { DollarSign, ArrowRight, BookOpen, CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';

export default function CacCalculatorPage() {
  const defaultNiche = SUB_NICHES[0];
  
  // Inputs
  const [salesSpend, setSalesSpend] = useState<number>(35000);
  const [marketingSpend, setMarketingSpend] = useState<number>(25000);
  const [toolsSpend, setToolsSpend] = useState<number>(5000);
  const [customersAcquired, setCustomersAcquired] = useState<number>(10);

  // Calculations
  const totalCost = salesSpend + marketingSpend + toolsSpend;
  const fullyLoadedCac = customersAcquired > 0 ? Math.round(totalCost / customersAcquired) : 0;
  const blendedCac = fullyLoadedCac;

  const handleReset = () => {
    setSalesSpend(35000);
    setMarketingSpend(25000);
    setToolsSpend(5000);
    setCustomersAcquired(10);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav selectedNiche={defaultNiche} onSelectNiche={() => {}} onOpenPage={() => {}} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-emerald-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#15803d] font-bold">CAC Calculator</span>
        </nav>

        {/* Title */}
        <div className="space-y-2 border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Customer Acquisition Cost (CAC) Calculator (Fully Loaded)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Calculate your true, fully loaded Customer Acquisition Cost under GAAP / ASC 340-40 accounting standards, including sales rep salaries, ad spend, marketing automation tooling, and overhead.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Period S&amp;M Expenditures</h2>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Sales Salaries & Commissions */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="sales-spend">Sales Salaries &amp; Commissions ($)</label>
                <span className="font-mono text-[#15803d]">${salesSpend.toLocaleString()}</span>
              </div>
              <input
                id="sales-spend"
                type="range"
                min={0}
                max={200000}
                step={1000}
                value={salesSpend}
                onChange={(e) => setSalesSpend(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#15803d]"
              />
              <p className="text-[11px] text-slate-500">AE, SDR, and sales management compensation allocated to new logos.</p>
            </div>

            {/* Marketing Ad Spend & Agency Fees */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="marketing-spend">Marketing Ad Spend &amp; Programs ($)</label>
                <span className="font-mono text-[#15803d]">${marketingSpend.toLocaleString()}</span>
              </div>
              <input
                id="marketing-spend"
                type="range"
                min={0}
                max={150000}
                step={1000}
                value={marketingSpend}
                onChange={(e) => setMarketingSpend(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#15803d]"
              />
              <p className="text-[11px] text-slate-500">Google Ads, LinkedIn, content marketing, SEO agencies, sponsorships.</p>
            </div>

            {/* S&M Software & Overhead */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="tools-spend">Sales &amp; Marketing Software Licenses ($)</label>
                <span className="font-mono text-[#15803d]">${toolsSpend.toLocaleString()}</span>
              </div>
              <input
                id="tools-spend"
                type="range"
                min={0}
                max={30000}
                step={500}
                value={toolsSpend}
                onChange={(e) => setToolsSpend(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#15803d]"
              />
              <p className="text-[11px] text-slate-500">HubSpot, Salesforce, ZoomInfo, Apollo, Gong subscriptions.</p>
            </div>

            {/* New Customers Acquired */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="cust-acquired">New Paying Customers Acquired</label>
                <span className="font-mono text-emerald-950 font-bold">{customersAcquired} Logos</span>
              </div>
              <input
                id="cust-acquired"
                type="range"
                min={1}
                max={200}
                step={1}
                value={customersAcquired}
                onChange={(e) => setCustomersAcquired(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#15803d]"
              />
              <p className="text-[11px] text-slate-500">Total new logo conversions signed during this measured period.</p>
            </div>
          </div>

          {/* Results Pane */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#eef8ed] border border-[#d2edd0] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="space-y-1 border-b border-[#d2edd0]/80 pb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Fully Loaded CAC</div>
                <div className="text-4xl sm:text-5xl font-black text-slate-950 font-mono">
                  ${fullyLoadedCac.toLocaleString()}{' '}
                  <span className="text-xl font-bold text-slate-600 font-sans">/ Customer</span>
                </div>
                <p className="text-xs text-slate-500">Total acquisition cost allocated per new paying customer.</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center text-slate-800 font-semibold">
                  <span>Total S&amp;M Capital Deployed:</span>
                  <span className="font-mono font-bold text-slate-950">${totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-slate-800 font-semibold">
                  <span>New Customer Count:</span>
                  <span className="font-mono font-bold text-slate-950">{customersAcquired} Customers</span>
                </div>
                <div className="flex justify-between items-center text-slate-800 font-semibold">
                  <span>Sales vs Marketing Share:</span>
                  <span className="font-mono font-bold text-slate-950">
                    {Math.round((salesSpend / (totalCost || 1)) * 100)}% Sales / {Math.round((marketingSpend / (totalCost || 1)) * 100)}% Marketing
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#d2edd0]/80">
                <Link
                  href="/"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#15803d] hover:bg-[#166534] text-white text-xs font-bold transition shadow-xs"
                >
                  <span>Model Payback Period with This CAC</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Formula Block */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 text-xs">
              <div className="font-bold text-emerald-400">Formula (ASC 340-40 Compliance):</div>
              <div className="font-mono text-slate-300">
                Fully Loaded CAC = (Sales Salaries + Ad Spend + S&amp;M Tooling + Overhead) ÷ New Customers
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                Measuring blended CAC without sales salaries or overhead artificially lowers your CAC by 40% to 60%, creating false unit economics that fail under investor diligence.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer onSelectNiche={() => {}} onOpenPage={() => {}} />
    </div>
  );
}
