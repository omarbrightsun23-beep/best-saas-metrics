import React from 'react';
import { ChevronRight, Calculator, Sparkles, Layers, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { SubNicheData } from '../types';
import { SUB_NICHES } from '../data/niches';

interface HeroSectionProps {
  selectedNiche: SubNicheData;
  onSelectNiche: (niche: SubNicheData) => void;
}

export default function HeroSection({ selectedNiche, onSelectNiche }: HeroSectionProps) {
  return (
    <section id="hero-section" className="paypro-hero-bg text-white pt-8 pb-12 relative overflow-hidden border-b border-slate-800 shadow-lg">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 paypro-grid-pattern pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        {/* Breadcrumb Navigation (PayPro Global style with high contrast light colors) */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-300 font-medium flex-wrap">
          <span className="hover:text-cyan-300 hover:underline transition cursor-pointer">Home</span>
          <ChevronRight className="w-3 h-3 text-slate-500" />
          <span className="hover:text-cyan-300 hover:underline transition cursor-pointer">SaaS Metrics Calculators</span>
          <ChevronRight className="w-3 h-3 text-slate-500" />
          <span className="text-cyan-400 font-semibold">{selectedNiche.name} Payback</span>
        </nav>

        {/* Hero Title & Description Header */}
        <div className="space-y-3 max-w-4xl">
          {/* Badge Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-bold backdrop-blur-md shadow-2xs">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            <span>SaaS Metrics Calculator • 2026 Audit Edition</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-sans leading-tight">
            SaaS CAC Payback Period Calculator
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Determine how long it takes your subscription business to recoup the investment made in acquiring a new customer. Compute gross-margin adjusted payback periods, analyze LTV:CAC ratios, and model 36-month cashflow breakeven trajectories.
          </p>
        </div>

        {/* Sub-Niche Model Preset Pills on Dark Canvas */}
        <div className="pt-2 flex items-center flex-wrap gap-2.5 text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 pr-1 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Select Model:</span>
          </span>
          {SUB_NICHES.map((niche) => {
            const isActive = niche.slug === selectedNiche.slug;
            return (
              <button
                key={niche.slug}
                id={`niche-tab-${niche.slug}`}
                onClick={() => onSelectNiche(niche)}
                className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap text-xs transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/40 ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-900 -translate-y-0.5 scale-[1.02]'
                    : 'bg-slate-900/90 border border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-500 hover:-translate-y-0.5 hover:shadow-md hover:shadow-cyan-500/10 active:scale-95 active:translate-y-0 backdrop-blur-sm'
                }`}
              >
                {niche.shortName}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

