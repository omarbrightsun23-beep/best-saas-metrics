import React from 'react';
import { BookOpen, Calculator, DollarSign, CheckCircle2, FileSpreadsheet } from 'lucide-react';
import { SubNicheData, ComputedMetrics, FinancialInputs } from '../types';
import { formatCurrency, formatMonths } from '../utils/financialMath';

interface SemanticFormulasAndGlossaryProps {
  niche: SubNicheData;
  inputs: FinancialInputs;
  metrics: ComputedMetrics;
}

export default function SemanticFormulasAndGlossary({
  niche,
  inputs,
  metrics,
}: SemanticFormulasAndGlossaryProps) {
  return (
    <section
      id="semantic-math-glossary-section"
      className="mt-12 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8"
      aria-labelledby="formulas-math-title"
    >
      {/* Section Header */}
      <div className="space-y-2 border-b border-slate-200 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eef8ed] border border-[#d2edd0] text-emerald-950 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-[#15803d]" />
          <span>SaaS FP&amp;A Operating Frameworks</span>
        </div>
        <h2
          id="formulas-math-title"
          className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight"
        >
          SaaS Unit Economics Mathematical Formulation &amp; Methodologies
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          The financial definitions and formulas governing Customer Acquisition Cost (CAC) Payback, Customer Lifetime Value (LTV), and Cash Breakeven under standard venture capital and operating frameworks (David Skok, Bessemer Venture Partners, and OpenView).
        </p>
      </div>

      {/* 1. Core Mathematical Formula Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Formula 1: Gross-Margin Adjusted CAC Payback */}
        <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#15803d] text-white">
                <Calculator className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">
                1. Gross-Margin Adjusted CAC Payback Period
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded">
              Primary Standard
            </span>
          </div>
          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-300 space-y-1.5 shadow-inner">
            <div className="text-emerald-400 font-bold">
              Payback Period (Months) = CAC / (Monthly ARPA &times; Gross Margin %)
            </div>
            <div className="text-[11px] text-slate-400 pt-1.5 border-t border-slate-800 font-sans">
              Current Live Computation for {niche.shortName}:
            </div>
            <div className="text-xs font-bold text-slate-200 font-mono">
              ${inputs.cac.toLocaleString()} / (${inputs.arpa.toLocaleString()} &times; {inputs.grossMargin}%) = <span className="text-emerald-400 font-black">{formatMonths(metrics.cacPaybackMonths)}</span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <dfn className="font-bold text-white not-italic">Gross-Margin Adjusted Payback</dfn> is the number of calendar months of gross profit required to fully offset the customer acquisition costs. Using unadjusted top-line revenue instead of gross margin creates a dangerous 15–35% underestimation of capital requirements.
          </p>
        </div>

        {/* Formula 2: Lifetime Value (LTV) Formula */}
        <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-[#15803d] text-white">
                <DollarSign className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">
                2. Customer Lifetime Value (LTV)
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded">
              LTV Calculation
            </span>
          </div>
          <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-300 space-y-1.5 shadow-inner">
            <div className="text-emerald-400 font-bold">
              LTV = (Monthly ARPA &times; Gross Margin %) / Monthly Churn Rate %
            </div>
            <div className="text-[11px] text-slate-400 pt-1.5 border-t border-slate-800 font-sans">
              Current Live Computation for {niche.shortName}:
            </div>
            <div className="text-xs font-bold text-slate-200 font-mono">
              (${inputs.arpa.toLocaleString()} &times; {inputs.grossMargin}%) / {inputs.churnRate}% = <span className="text-emerald-400 font-black">{formatCurrency(metrics.ltv)}</span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <dfn className="font-bold text-white not-italic">Customer Lifetime Value (LTV)</dfn> measures the total cumulative gross profit a single logo generates before churning. An LTV:CAC ratio exceeding 3.0x indicates healthy unit economics suitable for aggressive growth.
          </p>
        </div>
      </div>

      {/* 2. Semantic Financial Entity Definition List (<dl>) */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4 text-[#15803d]" />
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Canonical SaaS Accounting Entity Definitions
          </h3>
        </div>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600">
          <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-1.5">
            <dt className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" />
              Fully Loaded CAC (ASC 340-40)
            </dt>
            <dd className="leading-relaxed">
              Includes all direct sales salaries, commissions, marketing ad spend, SDR compensation, marketing automation software licenses, and travel expenses allocated to new logo acquisition.
            </dd>
          </div>
          <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-1.5">
            <dt className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" />
              Net Monthly Contribution (Net ARPA)
            </dt>
            <dd className="leading-relaxed">
              Calculated as <code className="bg-slate-200 text-slate-800 px-1 py-0.5 rounded">ARPA &times; Gross Margin %</code>. Represents the exact monthly cash remaining after cloud infrastructure, customer success hosting, and third-party API costs are subtracted.
            </dd>
          </div>
          <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-1.5">
            <dt className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" />
              Magic Number (SaaS Sales Efficiency)
            </dt>
            <dd className="leading-relaxed">
              Measures ARR growth generated per dollar spent on sales and marketing. A Magic Number &gt; 1.0 implies payback periods below 12 months with immediate capital deployment efficiency.
            </dd>
          </div>
          <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-xl space-y-1.5">
            <dt className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#15803d]" />
              Net Revenue Retention (NRR) vs Logo Churn
            </dt>
            <dd className="leading-relaxed">
              While logo churn dictates customer lifespan, Net Revenue Retention captures seat upgrades and tier expansion. In {niche.name}, NRR above 115% mathematically compresses the real-world payback timeline.
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
