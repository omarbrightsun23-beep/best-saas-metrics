import React, { useEffect, useRef } from 'react';

/**
 * AdBanner - Google AdSense Display Ad Component (with dev placeholder)
 * Usage:
 * <AdBanner
 *   client="ca-pub-YOUR_PUBLISHER_ID_HERE"
 *   slot="1234567890"
 *   format="auto"
 *   responsive="true"
 * />
 * If slot or client is left as placeholder, it cleanly renders an advertisement placeholder
 * without throwing errors or breaking page layout.
 */
export default function AdBanner({
  client = 'ca-pub-YOUR_PUBLISHER_ID_HERE',
  slot = '',
  format = 'auto',
  responsive = 'true',
  style = { display: 'block' },
  className = '',
}) {
  const adRef = useRef(null);
  const isLoaded = useRef(false);
  const isPlaceholder = !slot || client.includes('YOUR_PUBLISHER_ID_HERE');

  useEffect(() => {
    // Only attempt to push AdSense if a real slot and client are provided
    if (!isPlaceholder && !isLoaded.current) {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          isLoaded.current = true;
        }
      } catch (err) {
        console.error('Google AdSense error:', err);
      }
    }
  }, [isPlaceholder, slot, client]);

  // When configured with real AdSense slot
  if (!isPlaceholder) {
    return (
      <div className={`ad-banner-container my-6 w-full text-center overflow-hidden ${className}`}>
        <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-1">
          Advertisement
        </div>
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={style}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive={responsive}
        />
      </div>
    );
  }

  // Placeholder mode for development & preview
  return (
    <div
      className={`ad-banner-placeholder my-6 w-full max-w-4xl mx-auto rounded-2xl border border-dashed border-slate-300 bg-slate-50/80 p-4 sm:p-6 text-center shadow-xs transition-colors hover:border-slate-400 ${className}`}
      aria-label="Advertisement Placeholder"
    >
      <div className="flex items-center justify-between border-b border-slate-200/80 pb-2 mb-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Advertisement Placeholder
        </span>
        <span className="text-[10px] font-mono text-slate-400">
          Google AdSense Display Ad
        </span>
      </div>
      <div className="flex flex-col items-center justify-center py-4 sm:py-6 space-y-1.5">
        <div className="text-xs font-bold text-slate-700">
          Google AdSense Responsive Banner Slot
        </div>
        <p className="text-[11px] text-slate-500 max-w-md leading-relaxed">
          Replace <code className="bg-slate-200/80 px-1 py-0.5 rounded text-slate-800 font-mono text-[10px]">ca-pub-YOUR_PUBLISHER_ID_HERE</code> with your AdSense Publisher ID and pass your assigned <code className="bg-slate-200/80 px-1 py-0.5 rounded text-slate-800 font-mono text-[10px]">slot</code> ID to display live ads.
        </p>
      </div>
      <div className="pt-2 border-t border-slate-200/60 text-[10px] text-slate-400 flex items-center justify-center gap-2">
        <span>Format: {format}</span>
        <span>·</span>
        <span>Responsive: {responsive}</span>
      </div>
    </div>
  );
}
