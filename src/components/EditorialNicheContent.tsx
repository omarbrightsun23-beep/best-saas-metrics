'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  BarChart2,
  Zap,
  HelpCircle,
  TrendingDown,
  Lightbulb,
  ArrowRight,
  Layers,
  BookOpen,
  Calculator,
} from 'lucide-react';
import { SubNicheData, FinancialInputs, ComputedMetrics } from '../types';
import { SUB_NICHES } from '../data/niches';
import AdBannerSlot from './AdBannerSlot';

interface EditorialNicheContentProps {
  niche: SubNicheData;
  inputs: FinancialInputs;
  metrics: ComputedMetrics;
  onSelectNiche?: (niche: SubNicheData) => void;
}

export default function EditorialNicheContent({
  niche,
  onSelectNiche,
}: EditorialNicheContentProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const otherNiches = SUB_NICHES.filter((n) => n.slug !== niche.slug);

  const relatedCalculators = [
    { title: 'Customer Acquisition Cost (CAC) Calculator', desc: 'Compute blended & paid sales and marketing acquisition cost per customer.', href: '/cac-calculator' },
    { title: 'Customer Lifetime Value (LTV) Calculator', desc: 'Forecast total net profit generated over the average account lifespan.', href: '/saas-ltv-calculator' },
    { title: 'SaaS Churn Rate Calculator', desc: 'Measure logo and net revenue churn to protect recurring ARR.', href: '/saas-churn-rate-calculator' },
    { title: 'SaaS Magic Number Calculator', desc: 'Measure sales efficiency and net new ARR added per $1 invested in S&M.', href: '/saas-magic-number-calculator' },
    { title: 'SaaS Burn Multiple Calculator', desc: 'Assess cash burn efficiency in relation to Net New ARR generation.', href: '/saas-burn-multiple-calculator' },
    { title: 'SaaS Rule of 40 Calculator', desc: 'Evaluate balanced growth and operating profit margins for enterprise valuation.', href: '/rule-of-40-calculator' },
  ];

  return (
    <article
      id="editorial-niche-content"
      className="mt-12 space-y-12 border-t border-slate-200 pt-10"
      aria-labelledby="niche-guide-title"
    >
      {/* Editorial Methodology & Review Bylines */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#eef8ed] border border-[#d2edd0] flex items-center justify-center text-emerald-950 font-bold text-xs shrink-0">
            BSM
          </div>
          <div>
            <div className="font-bold text-slate-900">BestSaaSMetrics Quantitative Research</div>
            <div className="text-slate-500 text-[11px]">Calibrated against KeyBanc Capital Markets (KBCM) and OpenView SaaS benchmark distributions</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-slate-500 shrink-0 flex-wrap">
          <span>Cohort: <strong className="text-slate-700">{niche.name}</strong></span>
          <span>·</span>
          <span>Framework: <strong className="text-slate-700">David Skok / BVP</strong></span>
        </div>
      </div>

      {/* 1. What is SaaS CAC Payback Period? */}
      <section className="space-y-4" aria-labelledby="what-is-payback-title">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[#15803d] text-white shadow-2xs">
            <BookOpen className="w-4 h-4" />
          </span>
          <h2
            id="what-is-payback-title"
            className="text-xl sm:text-2xl font-black tracking-tight text-slate-900"
          >
            What is the SaaS CAC Payback Period?
          </h2>
        </div>
        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            The <strong>CAC Payback Period</strong> (also known as <em>Months to Recover CAC</em>) is the number of months of gross profit required for a SaaS company to fully recover the sales and marketing capital spent acquiring a new customer account.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            In modern subscription economics, customers pay on a recurring monthly or annual basis, while customer acquisition costs (sales commissions, digital advertising, onboarding teams, and SDR salaries) are incurred upfront on Day 0. The faster a business recovers this initial cash outlay, the quicker it can reinvest those freed-up cash flows into acquiring subsequent cohorts without relying on external equity dilution.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-[#eef8ed]/70 border border-[#d2edd0] space-y-1">
              <span className="text-xs font-bold text-emerald-950 block">Upfront CAC Outlay</span>
              <p className="text-xs text-slate-600">Total sales, ads, tooling, and onboarding costs spent on customer acquisition.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#eef8ed]/70 border border-[#d2edd0] space-y-1">
              <span className="text-xs font-bold text-emerald-950 block">Gross Profit Contribution</span>
              <p className="text-xs text-slate-600">Monthly recurring revenue (ARPA) adjusted for COGS, hosting, and customer success.</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#eef8ed]/70 border border-[#d2edd0] space-y-1">
              <span className="text-xs font-bold text-emerald-950 block">Capital Velocity</span>
              <p className="text-xs text-slate-600">The frequency at which growth capital is recycled to fuel continuous customer acquisition.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Industry Benchmarks for [Niche Name] */}
      <section className="space-y-5" aria-labelledby="benchmarks-section-title">
        <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3">
          <div className="p-2 rounded-xl bg-[#eef8ed] text-[#15803d] border border-[#d2edd0] shadow-xs">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <h3 id="benchmarks-section-title" className="text-xl font-black text-slate-900">
              Industry Benchmarks: What is a Good CAC Payback for {niche.name}?
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Comparative quartile distributions referenced from KeyBanc Capital Markets annual surveys, OpenView SaaS reports, and public Cloud Index filings.
            </p>
          </div>
        </div>

        {/* Benchmarks Quartile Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border-2 border-emerald-500 hover:shadow-md hover:-translate-y-0.5 rounded-2xl p-5 shadow-xs space-y-2 transition-all duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Top Quartile (Elite)
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#15803d]" />
            </div>
            <div className="text-3xl font-black font-mono text-emerald-950">
              {niche.benchmarkContext.topQuartilePayback}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Highly capital-efficient SaaS companies with strong product-led growth, organic inbound velocity, and net revenue retention &gt; 115%.
            </p>
          </div>

          <div className="bg-white border border-[#d2edd0] hover:border-[#15803d] hover:shadow-md hover:-translate-y-0.5 rounded-2xl p-5 shadow-xs space-y-2 transition-all duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Median Benchmark (50th %ile)
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            </div>
            <div className="text-3xl font-black font-mono text-slate-900">
              {niche.benchmarkContext.medianPayback}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Healthy venture-backed baseline for sustainable ARR scaling with standard sales cycle and account executive compensation.
            </p>
          </div>

          <div className="bg-white border border-rose-200 hover:border-rose-400 hover:shadow-md hover:-translate-y-0.5 rounded-2xl p-5 shadow-xs space-y-2 transition-all duration-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
                Bottom Quartile (High Drag)
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            </div>
            <div className="text-3xl font-black font-mono text-slate-900">
              {niche.benchmarkContext.bottomQuartilePayback}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Extended payback timelines consuming excessive cash reserves; requires pricing optimization or sales cycle compression.
            </p>
          </div>
        </div>

        {/* Analytical Context Callout */}
        <div className="bg-[#eef8ed]/70 border border-[#d2edd0] rounded-2xl p-4 flex items-start gap-3 text-xs text-slate-700 shadow-xs">
          <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-emerald-950 font-bold">Sector Analysis: </strong>
            {niche.benchmarkContext.analysis}
          </div>
        </div>
      </section>

      {/* In-Feed Google AdSense Slot */}
      <AdBannerSlot slotId="mid-content-ad-slot" format="in-feed" />

      {/* Section 3: 5 Proven Strategies to Shorten Payback Period */}
      <section className="space-y-5" aria-labelledby="reduction-strategies-title">
        <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3">
          <div className="p-2 rounded-xl bg-[#eef8ed] text-[#15803d] border border-[#d2edd0] shadow-xs">
            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <h3 id="reduction-strategies-title" className="text-xl font-black text-slate-900">
              Proven Strategies to Shorten Your CAC Payback Period
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Actionable operational levers across pricing, onboarding velocity, expansion revenue, and margin defense.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {niche.reductionStrategies.map((strat, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#d2edd0] hover:border-[#15803d] hover:shadow-md hover:-translate-y-1 rounded-2xl p-5 shadow-xs transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#eef8ed] border border-[#d2edd0] text-emerald-900">
                    {strat.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      strat.impact === 'Critical'
                        ? 'bg-rose-50 text-rose-800 border-rose-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                  >
                    {strat.impact} Impact
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900">{strat.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">{strat.description}</p>
              </div>
              <div className="rounded-xl bg-[#eef8ed]/60 p-3.5 border border-[#d2edd0] text-[11px] text-slate-700 space-y-1 shadow-2xs">
                <div className="flex items-center gap-1 font-bold text-emerald-950">
                  <Zap className="w-3.5 h-3.5 text-[#15803d]" />
                  <span>Actionable Execution:</span>
                </div>
                <p className="leading-relaxed">{strat.actionableTactic}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Related SaaS Metrics Calculators */}
      <section className="space-y-4" aria-labelledby="related-calcs-title">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
          <Calculator className="w-5 h-5 text-[#15803d]" />
          <h3 id="related-calcs-title" className="text-lg font-black text-slate-900">
            Related SaaS Financial &amp; Growth Calculators
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedCalculators.map((calc, i) => (
            <Link
              key={i}
              href={calc.href}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#15803d] hover:shadow-md hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 group cursor-pointer space-y-2 block text-left"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#15803d] transition-colors">
                  {calc.title}
                </h4>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#15803d] group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {calc.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 5: Frequently Asked Questions */}
      <section className="space-y-5" aria-labelledby="faq-section-title">
        <div className="flex items-center gap-2.5 border-b border-slate-200 pb-3">
          <div className="p-2 rounded-xl bg-[#eef8ed] text-[#15803d] border border-[#d2edd0] shadow-xs">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 id="faq-section-title" className="text-xl font-black text-slate-900">
              Frequently Asked Questions ({niche.shortName})
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Common questions on CAC payback accounting, GAAP standards, and fundraising metrics.
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {niche.faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-200/90 hover:border-[#d2edd0] rounded-2xl overflow-hidden shadow-2xs hover:shadow-xs transition-all duration-150"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-sm text-slate-900 hover:text-[#15803d] hover:bg-slate-50/50 transition-colors focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
                      isOpen ? 'rotate-180 text-[#15803d]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50 font-normal">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 6: Programmatic SEO Cross-Linking Mesh */}
      <section className="space-y-4 pt-6 border-t border-slate-200" aria-labelledby="pseo-mesh-title">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#15803d]" />
          <h3 id="pseo-mesh-title" className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Compare Against Other SaaS Sub-Niche Benchmarks (pSEO Directory)
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {otherNiches.map((other) => (
            <button
              key={other.slug}
              type="button"
              onClick={() => {
                if (onSelectNiche) onSelectNiche(other);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-3.5 bg-white border border-slate-200 hover:border-[#15803d] hover:bg-[#eef8ed]/60 active:scale-95 rounded-xl text-left transition-all duration-150 group cursor-pointer shadow-2xs hover:shadow-xs hover:-translate-y-0.5"
            >
              <div className="text-xs font-bold text-slate-900 group-hover:text-[#15803d] transition-colors truncate">
                {other.name}
              </div>
              <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between">
                <span>Target: {other.benchmarks.targetPaybackMedian} Mo</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#15803d] group-hover:translate-x-0.5 transition-all" />
              </div>
            </button>
          ))}
        </div>
      </section>
    </article>
  );
}
