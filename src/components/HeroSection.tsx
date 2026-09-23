'use client';

import React from 'react';
import {
  ChevronRight,
  ArrowDown,
  TrendingUp,
  BarChart2,
  Percent,
  Clock,
  Target,
} from 'lucide-react';
import { SubNicheData } from '../types';
import { SUB_NICHES } from '../data/niches';

interface HeroSectionProps {
  selectedNiche: SubNicheData;
  onSelectNiche: (niche: SubNicheData) => void;
}

export default function HeroSection({ selectedNiche, onSelectNiche }: HeroSectionProps) {
  const scrollToCalculator = () => {
    const elem = document.getElementById('calculator-control-panel');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-section"
      className="bg-gradient-to-b from-[#eef8ed] via-[#f7fcf6] to-white text-slate-900 pt-4 pb-4 sm:pb-5 relative border-b border-[#d2edd0] shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        {/* Top Breadcrumb & Research Edition Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-[#d2edd0]/80 pb-2.5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500">
            <span
              className="hover:text-[#15803d] transition cursor-pointer text-slate-600 font-medium"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              bestsaasmetrics.com
            </span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span
              className="hover:text-[#15803d] transition cursor-pointer text-slate-600 font-medium"
              onClick={scrollToCalculator}
            >
              Unit Economics
            </span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#15803d] font-bold">{selectedNiche.name}</span>
          </nav>
          <div className="flex items-center gap-2 text-[11px] text-slate-600">
            <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider">
              Data Calibration:
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-[#d2edd0] text-emerald-900 text-[10px] font-bold shadow-2xs">
              <Target className="w-3 h-3 text-[#15803d]" />
              {selectedNiche.benchmarkContext.topQuartilePayback} Top-Quartile Target
            </span>
            <span className="hidden md:inline text-slate-300">·</span>
            <span className="hidden md:inline text-[11px] text-slate-500 font-medium">
              Bessemer &amp; OpenView Benchmarks
            </span>
          </div>
        </div>

        {/* Hero Title and Description Grid */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-white border border-[#d2edd0] text-emerald-800 shadow-2xs">
                SaaS FP&amp;A Engine
              </span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-xs text-slate-500 font-medium">
                Client-Side Unit Economics Model
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-950 tracking-tight leading-tight">
              SaaS CAC Payback Period Calculator
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Calculate exact months to recover customer acquisition spend adjusted for software gross margins and cohort decay.
            </p>
          </div>

          {/* Quick Action Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={scrollToCalculator}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#15803d] hover:bg-[#166534] active:bg-[#14532d] text-white text-xs font-bold transition shadow-xs hover:shadow-md cursor-pointer active:scale-95"
            >
              <span>Jump to Calculator</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Industry Cohort Selector Bar */}
        <div className="pt-2 border-t border-[#d2edd0]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold shrink-0">
            <span>Benchmark Cohort:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none w-full sm:w-auto">
            {SUB_NICHES.map((niche) => {
              const isSelected = niche.slug === selectedNiche.slug;
              return (
                <a
                  key={niche.slug}
                  href={`/${niche.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectNiche(niche);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all duration-150 whitespace-nowrap cursor-pointer inline-flex items-center ${
                    isSelected
                      ? 'bg-[#15803d] text-white font-bold shadow-xs border border-[#15803d]'
                      : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-slate-200 font-medium'
                  }`}
                >
                  {niche.name}
                </a>
              );
            })}
          </div>
        </div>

        {/* Live Sub-Niche Institutional Baseline Data Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
          {/* Tile 1: CAC Range */}
          <div className="bg-white border border-[#d2edd0] rounded-xl p-2.5 space-y-0.5 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-[10px] font-medium">
              <span>Average CAC</span>
              <TrendingUp className="w-3 h-3 text-[#15803d]" />
            </div>
            <div className="text-xs sm:text-sm font-bold font-mono text-slate-900">
              ${selectedNiche.benchmarks.cacRange[0].toLocaleString()} – ${selectedNiche.benchmarks.cacRange[1].toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-500">Fully loaded S&amp;M spend</div>
          </div>

          {/* Tile 2: Target Payback */}
          <div className="bg-white border border-[#d2edd0] rounded-xl p-2.5 space-y-0.5 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-[10px] font-medium">
              <span>Target Payback</span>
              <Clock className="w-3 h-3 text-[#15803d]" />
            </div>
            <div className="text-xs sm:text-sm font-bold font-mono text-emerald-800">
              {selectedNiche.benchmarks.targetPaybackMedian} Months
            </div>
            <div className="text-[10px] text-slate-500">Industry median breakeven</div>
          </div>

          {/* Tile 3: Gross Margin */}
          <div className="bg-white border border-[#d2edd0] rounded-xl p-2.5 space-y-0.5 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-[10px] font-medium">
              <span>Software Margin</span>
              <Percent className="w-3 h-3 text-[#15803d]" />
            </div>
            <div className="text-xs sm:text-sm font-bold font-mono text-slate-900">
              {selectedNiche.benchmarks.grossMarginMedian}%
            </div>
            <div className="text-[10px] text-slate-500">Direct hosting &amp; support COGS</div>
          </div>

          {/* Tile 4: Monthly Churn */}
          <div className="bg-white border border-[#d2edd0] rounded-xl p-2.5 space-y-0.5 shadow-2xs">
            <div className="flex items-center justify-between text-slate-500 text-[10px] font-medium">
              <span>Logo Churn</span>
              <BarChart2 className="w-3 h-3 text-[#15803d]" />
            </div>
            <div className="text-xs sm:text-sm font-bold font-mono text-slate-900">
              {selectedNiche.benchmarks.churnRateMedian}% / mo
            </div>
            <div className="text-[10px] text-slate-500">Median monthly cancellation</div>
          </div>
        </div>
      </div>
    </section>
  );
}
