import React from 'react';

interface AdBannerSlotProps {
  slotId?: string;
  format?: 'horizontal' | 'in-feed' | 'skyscraper-left' | 'skyscraper-right' | 'sticky-bottom';
  className?: string;
}

/**
 * Google AdSense & Publisher Policy Compliant Ad Placement Slot.
 * Features:
 * - Explicit "ADVERTISEMENT" label in compliance with AdSense guidelines.
 * - Standard IAB responsive aspect ratios (Leaderboard 728x90, Skyscraper 160x600/300x600, In-Feed).
 * - Safe gutter distance and clear visual boundary to avoid accidental clicks (invalid traffic prevention).
 * - Auto-hides skyscrapers on small/standard laptop screens to prevent cluttering (<1536px / 2xl).
 * - Ready for production AdSense tag / Mediavine / Raptive insertion.
 */
export default function AdBannerSlot({
  slotId = 'saas-calc-ad-slot',
  format = 'horizontal',
  className = '',
}: AdBannerSlotProps) {
  // 1. Horizontal Leaderboard / Banner (Top or Bottom of Content)
  if (format === 'horizontal') {
    return (
      <div
        id={slotId}
        className={`w-full max-w-7xl mx-auto my-6 px-4 sm:px-6 lg:px-8 ${className}`}
        aria-label="Advertisement"
      >
        <div className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-3 text-center transition hover:border-slate-300">
          <div className="flex items-center justify-between px-2 pb-1.5 border-b border-slate-200/60 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              Advertisement
            </span>
            <span className="text-[10px] text-slate-400 font-medium">
              Google AdSense Compliant Placement
            </span>
          </div>

          <div className="min-h-[90px] flex items-center justify-center bg-white border border-dashed border-slate-200 rounded-xl p-4">
            <div className="space-y-1 text-center">
              <div className="text-xs font-bold text-slate-700">
                Premium B2B SaaS & Financial Software Partner
              </div>
              <div className="text-[11px] text-slate-500 max-w-md mx-auto">
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
        className={`my-6 bg-slate-100/60 border border-slate-200/80 rounded-2xl p-3 text-center ${className}`}
        aria-label="Advertisement"
      >
        <div className="flex items-center justify-between px-2 pb-1.5 border-b border-slate-200/60 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Sponsored Partner
          </span>
          <span className="text-[10px] text-slate-400 font-medium">AdSense</span>
        </div>
        <div className="min-h-[100px] flex items-center justify-center bg-white border border-dashed border-slate-200 rounded-xl p-3">
          <div className="space-y-1 text-center">
            <div className="text-xs font-bold text-slate-700">
              Venture Capital & SaaS Banking Solutions
            </div>
            <div className="text-[11px] text-slate-500">
              Non-dilutive ARR financing, treasury yields & runway extensions for B2B founders.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Left Gutter Skyscraper (160x600 / Wide 300x600) - Only on ultra-wide desktop (>=1536px)
  if (format === 'skyscraper-left') {
    return (
      <aside
        id={slotId}
        className={`hidden 2xl:block fixed left-4 top-28 w-[160px] 3xl:w-[200px] z-30 pointer-events-auto ${className}`}
        aria-label="Left Skyscraper Advertisement"
      >
        <div className="bg-white/90 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-2.5 shadow-sm space-y-2 text-center">
          <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1">
            Advertisement
          </div>
          
          <div className="min-h-[500px] flex flex-col items-center justify-center bg-slate-50/80 border border-dashed border-slate-200 rounded-xl p-3 text-center space-y-3">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold border border-blue-200">
              Ad
            </div>
            <div className="text-xs font-bold text-slate-700 leading-snug">
              SaaS Billing & Subscription Automation
            </div>
            <div className="text-[10px] text-slate-500 leading-relaxed">
              Automate usage-based billing, deferred revenue & churn forecasting.
            </div>
            <div className="mt-4 px-2 py-1 rounded-md bg-blue-600 text-white text-[10px] font-semibold">
              Learn More
            </div>
          </div>
          
          <div className="text-[8px] text-slate-400">160 × 600 Skyscraper</div>
        </div>
      </aside>
    );
  }

  // 4. Right Gutter Skyscraper (160x600 / Wide 300x600) - Only on ultra-wide desktop (>=1536px)
  if (format === 'skyscraper-right') {
    return (
      <aside
        id={slotId}
        className={`hidden 2xl:block fixed right-4 top-28 w-[160px] 3xl:w-[200px] z-30 pointer-events-auto ${className}`}
        aria-label="Right Skyscraper Advertisement"
      >
        <div className="bg-white/90 backdrop-blur-xs border border-slate-200/90 rounded-2xl p-2.5 shadow-sm space-y-2 text-center">
          <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-1">
            Advertisement
          </div>

          <div className="min-h-[500px] flex flex-col items-center justify-center bg-slate-50/80 border border-dashed border-slate-200 rounded-xl p-3 text-center space-y-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold border border-emerald-200">
              Ad
            </div>
            <div className="text-xs font-bold text-slate-700 leading-snug">
              Non-Dilutive Growth Capital
            </div>
            <div className="text-[10px] text-slate-500 leading-relaxed">
              Up to $10M non-dilutive ARR financing for scaling B2B SaaS companies.
            </div>
            <div className="mt-4 px-2 py-1 rounded-md bg-emerald-600 text-white text-[10px] font-semibold">
              Explore Rates
            </div>
          </div>

          <div className="text-[8px] text-slate-400">160 × 600 Skyscraper</div>
        </div>
      </aside>
    );
  }

  return null;
}
