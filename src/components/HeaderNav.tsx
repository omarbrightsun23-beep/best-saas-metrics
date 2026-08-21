import React, { useState } from 'react';
import { Mail, ChevronDown, Calculator, BookOpen, TrendingUp, Sparkles } from 'lucide-react';
import { SubNicheData } from '../types';
import { SUB_NICHES } from '../data/niches';
import Logo from './Logo';
import { PageTabType } from './LegalAndStaticPagesModal';

interface HeaderNavProps {
  selectedNiche: SubNicheData;
  onSelectNiche: (niche: SubNicheData) => void;
  onOpenPage: (page: PageTabType) => void;
}

export default function HeaderNav({ selectedNiche, onSelectNiche, onOpenPage }: HeaderNavProps) {
  const [isCalculatorsOpen, setIsCalculatorsOpen] = useState(false);

  const scrollTo = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Logo size="md" showTagline={true} />

        {/* Clean Header Navigation Links (PayPro Global style) */}
        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden md:flex items-center gap-1.5 text-xs text-slate-700 font-semibold">
            {/* Calculators Quick Jump */}
            <button
              type="button"
              onClick={() => scrollTo('calculator-control-panel')}
              className="px-3.5 py-2 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 active:scale-95 transition-all duration-150 cursor-pointer flex items-center gap-1.5 font-bold"
            >
              <Calculator className="w-3.5 h-3.5 text-blue-600" />
              <span>CAC Calculator</span>
            </button>

            {/* Cashflow Curve */}
            <button
              type="button"
              onClick={() => scrollTo('trajectory-chart-container')}
              className="px-3.5 py-2 rounded-xl text-slate-700 hover:text-emerald-700 hover:bg-emerald-50/80 active:scale-95 transition-all duration-150 cursor-pointer flex items-center gap-1.5 font-bold"
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>36-Mo Cashflow</span>
            </button>

            {/* Industry Benchmarks */}
            <button
              type="button"
              onClick={() => scrollTo('editorial-niche-content')}
              className="px-3.5 py-2 rounded-xl text-slate-700 hover:text-indigo-700 hover:bg-indigo-50/80 active:scale-95 transition-all duration-150 cursor-pointer flex items-center gap-1.5 font-bold"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>2026 Benchmarks</span>
            </button>

            {/* Formula & GAAP */}
            <button
              type="button"
              onClick={() => scrollTo('semantic-math-glossary-section')}
              className="px-3.5 py-2 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 active:scale-95 transition-all duration-150 cursor-pointer font-bold"
            >
              ASC 606 Formula
            </button>
          </nav>

          {/* Model Selector Dropdown */}
          <div className="relative">
            <select
              value={selectedNiche.slug}
              onChange={(e) => {
                const found = SUB_NICHES.find((n) => n.slug === e.target.value);
                if (found) onSelectNiche(found);
              }}
              className="bg-slate-100 hover:bg-slate-200/90 border border-slate-200 hover:border-slate-300 text-slate-900 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-blue-600 focus:bg-white cursor-pointer max-w-[140px] sm:max-w-none transition-all shadow-2xs hover:shadow-xs"
              aria-label="Select SaaS Industry Niche Preset"
            >
              {SUB_NICHES.map((n) => (
                <option key={n.slug} value={n.slug}>
                  {n.name}
                </option>
              ))}
            </select>
          </div>

          {/* PayPro Global Style Primary Contact Button */}
          <button
            type="button"
            onClick={() => onOpenPage('contact')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-bold transition-all duration-150 shadow-sm hover:shadow-md hover:shadow-blue-600/25 active:scale-95 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Contact Advisory</span>
            <span className="sm:hidden">Contact</span>
          </button>
        </div>
      </div>
    </header>
  );
}

