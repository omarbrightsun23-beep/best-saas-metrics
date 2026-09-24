'use client';

import React from 'react';
import {
  ChevronRight,
  ArrowRight,
  TrendingUp,
  BarChart2,
  Percent,
  Clock,
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

  const scrollToTrajectory = () => {
    const elem = document.getElementById('trajectory-chart-container');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-section"
      className="bg-gradient-to-b from-[#F8F9FD] via-[#FAF9FE] to-white text-slate-900 pt-6 pb-6 sm:pb-8 relative border-b border-indigo-100/70 shadow-xs"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Breadcrumb Navigation */}
        <div className="flex items-center justify-between text-xs border-b border-indigo-100/60 pb-2.5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500">
            <span
              className="hover:text-indigo-600 transition cursor-pointer text-slate-600 font-medium"
              onClick={() => {
                if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              bestsaasmetrics.com
            </span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span
              className="hover:text-indigo-600 transition cursor-pointer text-slate-600 font-medium"
              onClick={scrollToCalculator}
            >
              Unit Economics
            </span>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-indigo-600 font-bold">{selectedNiche.name}</span>
          </nav>
        </div>

        {/* Hero Headline & Subtitle matching SaaSify modern purple/indigo style */}
        <div className="text-center space-y-3 pt-2">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200/80 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-pulse" />
            <span>2026 SaaS Unit Economics &amp; FP&amp;A Engine</span>
          </div>

          {/* Main Title with Gradient Accent */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.15] max-w-4xl mx-auto">
            Build better SaaS unit economics,{' '}
            <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              faster than ever
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm lg:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Institutional calculator for founders and finance teams. Model gross margin-adjusted CAC payback periods, LTV:CAC ratios, and 36-month cumulative cashflow breakevens with zero rounding errors.
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={scrollToCalculator}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 active:scale-95 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-500/20 transition cursor-pointer"
            >
              <span>Launch Calculator</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={scrollToTrajectory}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 text-xs sm:text-sm font-semibold shadow-xs transition cursor-pointer"
            >
              <span>36-Mo Trajectory</span>
            </button>
          </div>
        </div>

        {/* 4-Metric Proof Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 pb-2 text-center border-t border-slate-200/70">
          <div className="space-y-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-950 font-mono tracking-tight">8 Cohorts</div>
            <div className="text-[11px] text-slate-500 font-medium">B2B SaaS Benchmarks</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-950 font-mono tracking-tight">ASC 606</div>
            <div className="text-[11px] text-slate-500 font-medium">GAAP Compliant Math</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-950 font-mono tracking-tight">36-Month</div>
            <div className="text-[11px] text-slate-500 font-medium">Cohort Decay Model</div>
          </div>
          <div className="space-y-0.5">
            <div className="text-xl sm:text-2xl font-black text-slate-950 font-mono tracking-tight flex items-center justify-center gap-1">
              <span>4.9</span>
              <span className="text-amber-500 text-base">★</span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Finance Team Rating</div>
          </div>
        </div>

        {/* Industry Cohort Selector Bar */}
        <div className="pt-4 border-t border-indigo-100/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold shrink-0">
            <span>Benchmark Cohort:</span>
            <span className="text-indigo-600 font-bold">{selectedNiche.name}</span>
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
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-xs'
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
          <div className="bg-white border border-indigo-100/80 rounded-xl p-3 space-y-0.5 shadow-2xs hover:border-indigo-200 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-[10px] font-medium">
              <span>Average CAC</span>
              <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <div className="text-xs sm:text-sm font-bold font-mono text-slate-900">
              ${selectedNiche.benchmarks.cacRange[0].toLocaleString()} – ${selectedNiche.benchmarks.cacRange[1].toLocaleString()}
            </div>
            <div className="text-[10px] text-slate-500">Fully loaded S&amp;M spend</div>
          </div>

          {/* Tile 2: Target Payback */}
          <div className="bg-white border border-indigo-100/80 rounded-xl p-3 space-y-0.5 shadow-2xs hover:border-indigo-200 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-[10px] font-medium">
              <span>Target Payback</span>
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <div className="text-xs sm:text-sm font-bold font-mono text-indigo-700">
              {selectedNiche.benchmarks.targetPaybackMedian} Months
            </div>
            <div className="text-[10px] text-slate-500">Industry median breakeven</div>
          </div>

          {/* Tile 3: Gross Margin */}
          <div className="bg-white border border-indigo-100/80 rounded-xl p-3 space-y-0.5 shadow-2xs hover:border-indigo-200 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-[10px] font-medium">
              <span>Software Margin</span>
              <Percent className="w-3.5 h-3.5 text-indigo-600" />
            </div>
            <div className="text-xs sm:text-sm font-bold font-mono text-slate-900">
              {selectedNiche.benchmarks.grossMarginMedian}%
            </div>
            <div className="text-[10px] text-slate-500">Direct hosting &amp; support COGS</div>
          </div>

          {/* Tile 4: Monthly Churn */}
          <div className="bg-white border border-indigo-100/80 rounded-xl p-3 space-y-0.5 shadow-2xs hover:border-indigo-200 transition-colors">
            <div className="flex items-center justify-between text-slate-500 text-[10px] font-medium">
              <span>Logo Churn</span>
              <BarChart2 className="w-3.5 h-3.5 text-indigo-600" />
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
