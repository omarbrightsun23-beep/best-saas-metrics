import React, { useState } from 'react';

interface AdBannerSlotProps {
  slotId?: string;
  format?: 'horizontal' | 'in-feed' | 'skyscraper-left' | 'skyscraper-right' | 'sticky-bottom';
  className?: string;
}

/**
 * Google AdSense & Publisher Policy Compliant Ad Placement Slot.
 * Features:
 * - Explicit "ADVERTISEMENT" label in compliance with AdSense guidelines.
 * - Standard IAB responsive aspect ratios (Leaderboard 728x90, Skyscraper 160x600, In-Feed, Sticky Bottom).
 * - Safe gutter distance and clear visual boundary to avoid accidental clicks (invalid traffic prevention).
 * - Auto-hides skyscrapers on screens under 1680px (min-[1680px]:block) to prevent overlapping main content.
 * - Ready for production AdSense tag / Mediavine / Raptive insertion.
 */
export default function AdBannerSlot({
  slotId = 'saas-calc-ad-slot',
  format = 'horizontal',
  className = '',
}: AdBannerSlotProps) {
  const [isStickyDismissed, setIsStickyDismissed] = useState(false);

  // 1. Horizontal Leaderboard / Banner (Top or Bottom of Content)
  if (format === 'horizontal') {
    return (
      <div
        id={slotId}
        className={`w-full max-w-7xl mx-auto my-8 px-4 sm:px-6 lg:px-8 ${className}`}
        aria-label="Advertisement"
      >
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center transition hover:border-slate-700 shadow-lg">
          <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800 mb-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Advertisement
            </span>
            <span className="text-[10px] text-slate-500 font-medium">
              Google AdSense Compliant Placement
            </span>
          </div>

          <div className="min-h-[90px] flex items-center justify-center bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-4">
            <div className="space-y-1 text-center">
              <div className="text-xs font-bold text-slate-200">
                Premium B2B SaaS & Financial Software Partner
              </div>
              <div className="text-[11px] text-slate-400 max-w-lg mx-auto">
                Discover modern cloud ERP, subscription billing automation, and automated ASC 606 revenue recognition platforms.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. In-Feed Editorial Ad Banner
  if (format === 'in-feed') {
    return (
      <div
        id={slotId}
        className={`my-8 bg-slate-900/70 border border-slate-800 rounded-2xl p-4 text-center ${className}`}
        aria-label="Advertisement"
      >
        <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
            Sponsored Partner
          </span>
          <span className="text-[10px] text-slate-500 font-medium">AdSense</span>
        </div>
        <div className="min-h-[100px] flex items-center justify-center bg-slate-950/60 border border-dashed border-slate-800 rounded-xl p-4">
          <div className="space-y-1.5 text-center">
            <div className="text-xs font-bold text-slate-200">
              Venture Capital & SaaS Banking Solutions
            </div>
            <div className="text-[11px] text-slate-400 max-w-md mx-auto">
              Non-dilutive ARR financing, treasury yields & runway extensions for B2B founders.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Left Gutter Skyscraper (160x600) - Only visible on screens >= 1680px to completely prevent overlap
  if (format === 'skyscraper-left') {
    return (
      <aside
        id={slotId}
        className={`hidden min-[1680px]:block fixed left-4 top-28 w-[160px] z-20 pointer-events-auto ${className}`}
        aria-label="Left Skyscraper Advertisement"
      >
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-3 shadow-xl space-y-3 text-center">
          <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-1.5">
            Advertisement
          </div>

          <div className="min-h-[500px] flex flex-col items-center justify-center bg-slate-950/80 border border-dashed border-slate-800 rounded-xl p-3 text-center space-y-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-xs font-bold border border-blue-500/20">
              Ad
            </div>
            <div className="text-xs font-bold text-slate-200 leading-snug">
              SaaS Billing & Subscription Automation
            </div>
            <div className="text-[10px] text-slate-400 leading-relaxed">
              Automate usage-based billing, deferred revenue & churn forecasting.
            </div>
            <button className="mt-4 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-semibold transition-colors">
              Learn More
            </button>
          </div>

          <div className="text-[9px] font-mono text-slate-500">160 × 600 Skyscraper</div>
        </div>
      </aside>
    );
  }

  // 4. Right Gutter Skyscraper (160x600) - Only visible on screens >= 1680px to completely prevent overlap
  if (format === 'skyscraper-right') {
    return (
      <aside
        id={slotId}
        className={`hidden min-[1680px]:block fixed right-4 top-28 w-[160px] z-20 pointer-events-auto ${className}`}
        aria-label="Right Skyscraper Advertisement"
      >
        <div className="bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-2xl p-3 shadow-xl space-y-3 text-center">
          <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-800 pb-1.5">
            Advertisement
          </div>

          <div className="min-h-[500px] flex flex-col items-center justify-center bg-slate-950/80 border border-dashed border-slate-800 rounded-xl p-3 text-center space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xs font-bold border border-emerald-500/20">
              Ad
            </div>
            <div className="text-xs font-bold text-slate-200 leading-snug">
              Non-Dilutive Growth Capital
            </div>
            <div className="text-[10px] text-slate-400 leading-relaxed">
              Up to $10M non-dilutive ARR financing for scaling B2B SaaS companies.
            </div>
            <button className="mt-4 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-semibold transition-colors">
              Explore Rates
            </button>
          </div>

          <div className="text-[9px] font-mono text-slate-500">160 × 600 Skyscraper</div>
        </div>
      </aside>
    );
  }

  // 5. Sticky Bottom Floating Banner (Mobile & Desktop)
  if (format === 'sticky-bottom' && !isStickyDismissed) {
    return (
      <div
        id={slotId}
        className={`fixed bottom-0 left-0 right-0 z-40 p-2 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 shadow-2xl flex items-center justify-center ${className}`}
        aria-label="Sticky Bottom Advertisement"
      >
        <div className="w-full max-w-4xl flex items-center justify-between gap-4 px-4 py-1.5">
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-bold uppercase tracking-widest bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
              Ad
            </span>
            <span className="text-xs font-medium text-slate-300 truncate">
              Scale your SaaS ARR with automated revenue & churn modeling tools.
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded transition-colors">
              Explore
            </button>
            <button
              onClick={() => setIsStickyDismissed(true)}
              className="text-slate-500 hover:text-slate-300 text-sm font-bold px-1"
              aria-label="Close Ad"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
