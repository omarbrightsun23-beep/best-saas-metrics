'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator } from 'lucide-react';
import { SubNicheData } from '../types';
import { SUB_NICHES } from '../data/niches';
import Logo from './Logo';
import { PageTabType } from './LegalAndStaticPagesModal';

interface HeaderNavProps {
  selectedNiche?: SubNicheData;
  onSelectNiche?: (niche: SubNicheData) => void;
  onOpenPage?: (page: PageTabType) => void;
}

export default function HeaderNav({
  selectedNiche = SUB_NICHES[0],
  onSelectNiche,
  onOpenPage,
}: HeaderNavProps = {}) {
  const [activeTab, setActiveTab] = useState<'home' | 'calc' | 'cashflow' | 'benchmarks' | 'formula'>('home');

  const scrollTo = (id: string, tab: 'home' | 'calc' | 'cashflow' | 'benchmarks' | 'formula') => {
    setActiveTab(tab);
    if (id === 'top') {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    if (typeof document !== 'undefined') {
      const elem = document.getElementById(id);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      } else if (typeof window !== 'undefined') {
        window.location.href = `/#${id}`;
      }
    }
  };

  const currentSlug = selectedNiche?.slug || SUB_NICHES[0].slug;

  return (
    <header id="header-nav" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo with Home Navigation Link */}
        <Link href="/" className="hover:opacity-95 transition-opacity" aria-label="bestsaasmetrics.com Home">
          <Logo size="md" showTagline={true} variant="light" />
        </Link>

        {/* Clean Header Navigation Links */}
        <div className="flex items-center gap-3 sm:gap-4">
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-600">
            {/* HOME */}
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'home'
                  ? 'text-indigo-900 font-bold bg-indigo-50 border border-indigo-200/80'
                  : 'hover:text-indigo-900 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>
            {/* CALCULATOR */}
            <button
              type="button"
              onClick={() => scrollTo('calculator-control-panel', 'calc')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'calc'
                  ? 'text-indigo-900 font-bold bg-indigo-50 border border-indigo-200/80'
                  : 'hover:text-indigo-900 hover:bg-slate-50'
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
                  ? 'text-indigo-900 font-bold bg-indigo-50 border border-indigo-200/80'
                  : 'hover:text-indigo-900 hover:bg-slate-50'
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
                  ? 'text-indigo-900 font-bold bg-indigo-50 border border-indigo-200/80'
                  : 'hover:text-indigo-900 hover:bg-slate-50'
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
                  ? 'text-indigo-900 font-bold bg-indigo-50 border border-indigo-200/80'
                  : 'hover:text-indigo-900 hover:bg-slate-50'
              }`}
            >
              Methodology &amp; Math
            </button>
          </nav>

          {/* Model Selector Dropdown */}
          <div className="relative">
            <select
              value={currentSlug}
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
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer max-w-[140px] sm:max-w-none transition-all shadow-2xs"
              aria-label="Select SaaS Industry Niche Preset"
            >
              {SUB_NICHES.map((n) => (
                <option key={n.slug} value={n.slug} className="bg-white text-slate-900">
                  {n.name}
                </option>
              ))}
            </select>
          </div>

          {/* Primary Action Button in Modern Purple-Indigo */}
          <button
            type="button"
            onClick={() => scrollTo('calculator-control-panel', 'calc')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 active:scale-95 text-white text-xs font-bold transition shadow-sm shadow-indigo-500/20 cursor-pointer"
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
