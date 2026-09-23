import React from 'react';

interface AdBannerSlotProps {
  slotId?: string;
  format?: 'horizontal' | 'in-feed' | 'skyscraper-left' | 'skyscraper-right' | 'sticky-bottom';
  className?: string;
}

/**
 * Google AdSense & Publisher Policy Compliant Ad Placement Slot.
 * - Non-intrusive, inline layout that never covers page content or controls.
 * - Safe clear visual boundaries to prevent invalid clicks.
 * - Side skyscrapers are disabled to avoid viewport overlap and content obstruction.
 */
export default function AdBannerSlot({
  slotId = 'saas-calc-ad-slot',
  format = 'horizontal',
  className = '',
}: AdBannerSlotProps) {
  // 1. Horizontal Leaderboard / In-Flow Banner (Top or Bottom of Content)
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
                Premium B2B SaaS &amp; Financial Software Partner
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

  // 2. In-Feed Editorial Ad Banner (Flows naturally within article text)
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
              Venture Capital &amp; SaaS Banking Solutions
            </div>
            <div className="text-[11px] text-slate-500">
              Non-dilutive ARR financing, treasury yields &amp; runway extensions for B2B founders.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Side skyscrapers disabled to guarantee content is never covered or obstructed
  return null;
}
