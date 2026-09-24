'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  Mail,
  CheckCircle2,
  ArrowRight,
  Zap,
  Building2,
  CreditCard,
  Download,
} from 'lucide-react';
import { ComputedMetrics, FinancialInputs } from '../types';

interface SaaSMonetizationCardProps {
  inputs: FinancialInputs;
  metrics: ComputedMetrics;
}

export default function SaaSMonetizationCard({ inputs }: SaaSMonetizationCardProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Condition 1: High CAC or Extended Sales Cycle
  const isHighCacOrLongCycle = inputs.cac > 10000 || inputs.salesCycle > 6;
  // Condition 2: High ARPA and Low Gross Margin
  const isHighArpaLowMargin = inputs.arpa > 1000 && inputs.grossMargin < 70;

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  // State 1: Enterprise Lead Intelligence & Sales Pipeline
  if (isHighCacOrLongCycle) {
    return (
      <div
        id="monetization-card-enterprise"
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#EEF2FF] via-[#f4faf2] to-white border border-[#E0E7FF] p-6 shadow-xs transition duration-200"
      >
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#4F46E5] text-white shadow-xs">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4F46E5]">
                Recommended Enterprise Solution
              </span>
              <h4 className="text-base font-black text-slate-900">
                Enterprise B2B Lead Intelligence &amp; Sales Pipeline Tools
              </h4>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white text-indigo-950 border border-[#E0E7FF] shadow-xs">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>High CAC Detected (${inputs.cac.toLocaleString()})</span>
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 mb-4 leading-relaxed font-normal">
          High CAC requiring longer sales cycles? Upgrade your prospect data and outbound automated sequences.
          Top enterprise sales teams use verified B2B intelligence platforms to shorten deal discovery, identify decision-makers, and compress pipeline velocity by 35%.
        </p>

        {/* Recommended Platforms */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="https://www.apollo.io"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E0E7FF] hover:border-[#4F46E5] hover:shadow-xs transition text-slate-900 group shadow-2xs cursor-pointer"
          >
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#4F46E5]">Apollo.io</div>
              <div className="text-[10px] text-slate-500">275M+ verified contacts &amp; sequences</div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#4F46E5]" />
          </a>
          <a
            href="https://www.zoominfo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E0E7FF] hover:border-[#4F46E5] hover:shadow-xs transition text-slate-900 group shadow-2xs cursor-pointer"
          >
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#4F46E5]">ZoomInfo</div>
              <div className="text-[10px] text-slate-500">Enterprise org charts &amp; intent signals</div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#4F46E5]" />
          </a>
          <a
            href="https://www.clay.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E0E7FF] hover:border-[#4F46E5] hover:shadow-xs transition text-slate-900 group shadow-2xs cursor-pointer"
          >
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#4F46E5]">Clay</div>
              <div className="text-[10px] text-slate-500">100+ enrichment providers in 1 sheet</div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#4F46E5]" />
          </a>
        </div>
      </div>
    );
  }

  // State 2: Automated SaaS Billing & Revenue Operations
  if (isHighArpaLowMargin) {
    return (
      <div
        id="monetization-card-billing"
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#EEF2FF] via-[#f4faf2] to-white border border-[#E0E7FF] p-6 shadow-xs transition duration-200"
      >
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#4F46E5] text-white shadow-xs">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#4F46E5]">
                Gross Margin Optimization
              </span>
              <h4 className="text-base font-black text-slate-900">
                Automated SaaS Billing &amp; Revenue Operations Software
              </h4>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white text-indigo-950 border border-[#E0E7FF] shadow-xs">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Margin Under 70% ({inputs.grossMargin}%)</span>
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 mb-4 leading-relaxed font-normal">
          Protect your gross margins and eliminate billing leakage with dedicated SaaS revenue engines.
          Prevent uncollected revenue, invoice disputes, and interchange drag on high-ARPA (${inputs.arpa.toLocaleString()}/mo) contracts.
        </p>

        {/* Recommended Platforms */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="https://www.chargebee.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E0E7FF] hover:border-[#4F46E5] hover:shadow-xs transition text-slate-900 group shadow-2xs cursor-pointer"
          >
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#4F46E5]">Chargebee</div>
              <div className="text-[10px] text-slate-500">Automated recurring billing &amp; RevRec</div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#4F46E5]" />
          </a>
          <a
            href="https://www.maxio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E0E7FF] hover:border-[#4F46E5] hover:shadow-xs transition text-slate-900 group shadow-2xs cursor-pointer"
          >
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#4F46E5]">Maxio</div>
              <div className="text-[10px] text-slate-500">B2B SaaS financial operations &amp; metrics</div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#4F46E5]" />
          </a>
          <a
            href="https://stripe.com/billing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E0E7FF] hover:border-[#4F46E5] hover:shadow-xs transition text-slate-900 group shadow-2xs cursor-pointer"
          >
            <div>
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#4F46E5]">Stripe Billing</div>
              <div className="text-[10px] text-slate-500">Flexible usage-based &amp; invoice automation</div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#4F46E5]" />
          </a>
        </div>
      </div>
    );
  }

  // State 3: Default Lead Capture State
  return (
    <div
      id="monetization-card-default"
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#EEF2FF] via-[#f7fcf6] to-white border border-[#E0E7FF] p-6 shadow-xs"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#4F46E5] text-white shadow-xs font-bold">
              <Download className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
              Free Executive Resource
            </span>
          </div>
          <h4 className="text-base font-black text-slate-900">
            Download Free 2026 B2B SaaS Benchmark Metrics Report (PDF)
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            Comprehensive breakdown of 500+ private and public SaaS companies across Seed, Series A, and Growth stages covering CAC payback, Magic Number, and Net Retention.
          </p>
        </div>

        {/* Lead Form */}
        <div className="w-full md:w-auto min-w-[280px]">
          {isSubmitted ? (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-[#EEF2FF] border border-[#E0E7FF] text-indigo-950 text-xs font-bold shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#4F46E5] shrink-0" />
              <span>Report sent to your inbox! Check your email for download link.</span>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-2">
              <div className="flex items-center gap-1 bg-white border border-[#E0E7FF] rounded-xl p-1 shadow-xs focus-within:border-[#4F46E5] focus-within:ring-2 focus-within:ring-[#4F46E5]/20">
                <Mail className="w-4 h-4 text-slate-400 ml-2.5 shrink-0" />
                <input
                  id="lead-capture-email"
                  type="email"
                  required
                  placeholder="work-email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent px-2 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none w-full font-medium"
                />
                <button
                  id="btn-submit-lead-capture"
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white font-bold text-xs transition shrink-0 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <span>Get PDF</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </>
                  )}
                </button>
              </div>
              <div className="text-[11px] text-slate-500 flex items-center justify-between px-1 font-medium">
                <span>✓ No spam guarantee</span>
                <span>Instant 2026 Edition</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
