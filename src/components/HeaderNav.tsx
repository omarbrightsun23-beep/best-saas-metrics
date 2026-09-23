'use client';

import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { SubNicheData } from '../types';
import { SUB_NICHES } from '../data/niches';
import Logo from './Logo';
import { PageTabType } from './LegalAndStaticPagesModal';

interface HeaderNavProps {
  selectedNiche: SubNicheData;
  onSelectNiche: (niche: SubNicheData) => void;
  onOpenPage: (page: PageTabType) => void;
}

export default function HeaderNav({ selectedNiche, onSelectNiche }: HeaderNavProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'calc' | 'cashflow' | 'benchmarks' | 'formula'>('home');

  const scrollTo = (id: string, tab: 'home' | 'calc' | 'cashflow' | 'benchmarks' | 'formula') => {
    setActiveTab(tab);
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header id="header-nav" className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo with Home Navigation Link */}
        <a href="/" className="hover:opacity-95 transition-opacity" aria-label="bestsaasmetrics.com Home">
          <Logo size="md" showTagline={true} variant="light" />
        </a>

        {/* Clean Header Navigation Links */}
        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-600">
            {/* HOME */}
            <button
              type="button"
              onClick={() => scrollTo('top', 'home')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'text-emerald-900 font-bold bg-[#eef8ed] border border-[#d2edd0]'
                  : 'hover:text-emerald-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            {/* CALCULATOR */}
            <button
              type="button"
              onClick={() => scrollTo('calculator-control-panel', 'calc')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'calc'
                  ? 'text-emerald-900 font-bold bg-[#eef8ed] border border-[#d2edd0]'
                  : 'hover:text-emerald-900 hover:bg-slate-50'
              }`}
            >
              Calculator
            </button>
            {/* 36-MO CASHFLOW */}
            <button
              type="button"
              onClick={() => scrollTo('trajectory-chart-container', 'cashflow')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'cashflow'
                  ? 'text-emerald-900 font-bold bg-[#eef8ed] border border-[#d2edd0]'
                  : 'hover:text-emerald-900 hover:bg-slate-50'
              }`}
            >
              36-Mo Cashflow
            </button>
            {/* BENCHMARKS */}
            <button
              type="button"
              onClick={() => scrollTo('editorial-niche-content', 'benchmarks')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'benchmarks'
                  ? 'text-emerald-900 font-bold bg-[#eef8ed] border border-[#d2edd0]'
                  : 'hover:text-emerald-900 hover:bg-slate-50'
              }`}
            >
              Benchmarks
            </button>
            {/* METHODOLOGY & FORMULAS */}
            <button
              type="button"
              onClick={() => scrollTo('semantic-math-glossary-section', 'formula')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'formula'
                  ? 'text-emerald-900 font-bold bg-[#eef8ed] border border-[#d2edd0]'
                  : 'hover:text-emerald-900 hover:bg-slate-50'
              }`}
            >
              Methodology &amp; Math
            </button>
          </nav>

          {/* Model Selector Dropdown */}
          <div className="relative">
            <select
              value={selectedNiche.slug}
              onChange={(e) => {
                const found = SUB_NICHES.find((n) => n.slug === e.target.value);
                if (found) {
                  if (onSelectNiche) {
                    onSelectNiche(found);
                  } else if (typeof window !== 'undefined') {
                    window.location.href = `/${found.slug}`;
                  }
                }
              }}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#15803d]/30 cursor-pointer max-w-[140px] sm:max-w-none transition-all shadow-2xs"
              aria-label="Select SaaS Industry Niche Preset"
            >
              {SUB_NICHES.map((n) => (
                <option key={n.slug} value={n.slug} className="bg-white text-slate-900">
                  {n.name}
                </option>
              ))}
            </select>
          </div>

          {/* Primary Action Button in Forest Green */}
          <button
            type="button"
            onClick={() => {
              const elem = document.getElementById('calculator-control-panel');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#15803d] hover:bg-[#166534] active:bg-[#14532d] text-white text-xs font-bold transition shadow-xs cursor-pointer active:scale-95"
          >
            <Calculator className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">Launch Calculator</span>
            <span className="sm:hidden">Calculate</span>
          </button>
        </div>
      </div>
    </header>
  );
}
