import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  variant?: 'light' | 'dark';
  className?: string;
}

export default function Logo({
  size = 'md',
  showTagline = true,
  variant = 'light',
  className = '',
}: LogoProps) {
  // Height and scale mapping
  const heightClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  };

  const isDark = variant === 'dark';
  const mainTextColor = isDark ? '#F8FAFC' : '#0F172A';
  const arcBgColor = isDark ? '#334155' : '#E5E7EB';
  const needleColor = isDark ? '#F8FAFC' : '#0F172A';

  return (
    <div className={`inline-flex flex-col justify-center select-none ${className}`}>
      <div className="flex items-center gap-2">
        <svg
          viewBox="0 0 210 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${heightClasses[size]} w-auto max-w-full transition-transform duration-200 hover:scale-[1.02] cursor-pointer`}
          aria-label="BestSaaSMetrics Logo"
        >
          {/* Gauge Arc Background */}
          <path
            d="M10 40C10 23.4315 23.4315 10 40 10C56.5685 10 70 23.4315 70 40"
            stroke={arcBgColor}
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Green High-Efficiency Zone */}
          <path
            d="M50 13.2C61.2 16.6 69 27.2 69.9 39.9"
            stroke="#10B981"
            strokeWidth="7"
            strokeLinecap="round"
          />
          {/* Gauge Needle */}
          <path
            d="M40 40L60 20"
            stroke={needleColor}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx="40" cy="40" r="4.5" fill={needleColor} />

          {/* Brand Typography */}
          <text
            x="82"
            y="32"
            fontFamily="Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
            fontWeight="800"
            fontSize="20"
            letterSpacing="-0.03em"
            fill={mainTextColor}
          >
            Best<tspan fill="#10B981">SaaS</tspan>Metrics
          </text>
        </svg>
      </div>

      {showTagline && (
        <p
          className={`text-[10.5px] font-semibold tracking-tight -mt-0.5 ml-1 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          B2B CAC Payback & Unit Economics Engine
        </p>
      )}
    </div>
  );
}


