import React from 'react';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  variant?: 'light' | 'dark';
  withBackground?: boolean;
  className?: string;
}

/**
 * Official BestSaaSMetrics Brand Logo - Concept 04: The SaaS Sigma
 * Features the signature mathematical Sigma with forward growth arrow in #84CC16
 */
export default function Logo({
  size = 'md',
  showTagline = true,
  variant = 'light',
  withBackground = false,
  className = '',
}: LogoProps) {
  const isDark = variant === 'dark';

  // Sizing matrix for scale and height
  const config = {
    sm: {
      markSize: 'w-7 h-7',
      titleSize: 'text-base sm:text-lg',
      taglineSize: 'text-[9px]',
      gap: 'gap-2',
    },
    md: {
      markSize: 'w-9 h-9 sm:w-10 sm:h-10',
      titleSize: 'text-xl sm:text-[22px]',
      taglineSize: 'text-[10px]',
      gap: 'gap-2.5',
    },
    lg: {
      markSize: 'w-11 h-11 sm:w-12 sm:h-12',
      titleSize: 'text-2xl sm:text-3xl',
      taglineSize: 'text-xs',
      gap: 'gap-3',
    },
    xl: {
      markSize: 'w-14 h-14 sm:w-16 sm:h-16',
      titleSize: 'text-3xl sm:text-4xl',
      taglineSize: 'text-xs sm:text-sm',
      gap: 'gap-3.5',
    },
  }[size];

  // Text color based on variant
  const titleColor = isDark ? 'text-white' : 'text-slate-950';
  const dotComColor = 'text-[#84CC16]';
  const taglineColor = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div
      className={`inline-flex flex-col justify-center select-none group ${className}`}
      aria-label="bestsaasmetrics.com Logo"
    >
      <div className={`flex items-center ${config.gap}`}>
        {/* Official SaaS Sigma Mark */}
        <div
          className={`${config.markSize} relative flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
            withBackground
              ? 'rounded-2xl bg-[#0F1117] border border-slate-800 p-1.5 shadow-md shadow-[#84CC16]/15'
              : ''
          }`}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_2px_8px_rgba(132,204,22,0.25)]"
          >
            {/* The SaaS Sigma: Summation + Growth Arrow */}
            <path
              d="M 76 80 L 26 80 L 52 50 L 26 20 L 64 20"
              stroke="#84CC16"
              strokeWidth="11"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Forward Arrowhead */}
            <polygon
              points="62,11 81,20 62,29"
              fill="#84CC16"
            />
          </svg>
        </div>

        {/* Wordmark Typography matching official logo kit */}
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline tracking-tight">
            <span className={`font-black tracking-tight ${config.titleSize} ${titleColor}`}>
              bestsaasmetrics<span className={`${dotComColor} font-black`}>.com</span>
            </span>
          </div>

          {/* Official Subtitle: ALGORITHMIC UNIT ECONOMICS & BENCHMARKS */}
          {showTagline && (
            <div className="flex items-center mt-1">
              <span className={`font-mono font-bold uppercase tracking-wider ${config.taglineSize} ${taglineColor}`}>
                ALGORITHMIC UNIT ECONOMICS &amp; BENCHMARKS
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Named export for compatibility with `{ Logo }` imports
export { Logo };
