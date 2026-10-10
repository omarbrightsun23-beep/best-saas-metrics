'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';
import { ChevronRight, RotateCcw } from 'lucide-react';

export default function ChurnRateCalculatorPage() {
  const defaultNiche = SUB_NICHES[0];

  const [startCustomers, setStartCustomers] = useState<number>(500);
  const [churnedCustomers, setChurnedCustomers] = useState<number>(10);

  const logoChurnRate = startCustomers > 0 ? Number(((churnedCustomers / startCustomers) * 100).toFixed(2)) : 0;
  const annualLogoChurn = Number((1 - Math.pow(1 - logoChurnRate / 100, 12)) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav selectedNiche={defaultNiche} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#4F46E5] font-bold">Churn Rate Calculator</span>
        </nav>

        <div className="space-y-2 border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            SaaS Churn Rate Calculator (Logo &amp; Annualized Compounding)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Calculate your monthly logo churn percentage and compound annualized customer attrition rate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Account Counts</h2>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="start-cust">Customers at Beginning of Month</label>
                <span className="font-mono text-[#4F46E5]">{startCustomers}</span>
              </div>
              <input
                id="start-cust"
                type="range"
                min={10}
                max={5000}
                step={10}
                value={startCustomers}
                onChange={(e) => setStartCustomers(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4F46E5]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="churn-cust">Customers Lost During Month</label>
                <span className="font-mono text-rose-600 font-bold">{churnedCustomers}</span>
              </div>
              <input
                id="churn-cust"
                type="range"
                min={0}
                max={250}
                step={1}
                value={churnedCustomers}
                onChange={(e) => setChurnedCustomers(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4F46E5]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#EEF2FF] border border-[#E0E7FF] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="space-y-1 border-b border-[#E0E7FF]/80 pb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Monthly Logo Churn</div>
                <div className="text-5xl font-black text-slate-950 font-mono">
                  {logoChurnRate}% <span className="text-lg font-bold text-slate-600">/ mo</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Annualized Compounded Churn:</span>
                  <span className="font-mono font-bold">{annualLogoChurn}% / year</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Customer Lifespan:</span>
                  <span className="font-mono font-bold">{(100 / (logoChurnRate || 1)).toFixed(1)} Months</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 text-xs">
              <div className="font-bold text-emerald-400">Formula:</div>
              <div className="font-mono text-slate-300">Monthly Churn = (Customers Lost in Month ÷ Starting Customers) × 100</div>
            </div>
          </div>
        </div>
      {/* SEO Guide: JSON-LD FAQ schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "@id": "https://bestsaasmetrics.com/saas-churn-rate-calculator#faq",
            "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the difference between logo churn and revenue churn?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Logo churn counts customers: what fraction of accounts cancelled. Revenue churn (usually expressed as GRR/NRR) counts dollars: what fraction of recurring revenue was lost or retained. A company can lose 5% of logos but only 1% of revenue if churn concentrates in small accounts \u2014 which is why revenue retention, not logo counts, drives valuation."
          }
        },
        {
          "@type": "Question",
          "name": "What is a good churn rate for SaaS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It depends on segment. For SMB self-serve, under 3% monthly logo churn is good. For mid-market, under 1.5% monthly. For enterprise, under 1% monthly. But the metrics that matter most are revenue-based: aim for GRR above 90% and NRR above 110%. A company with 4% logo churn and 115% NRR is healthier than one with 1% logo churn and 92% NRR."
          }
        },
        {
          "@type": "Question",
          "name": "NRR vs GRR: which should I report?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Report both, lead with the one your audience cares about. GRR measures product stickiness \u2014 can you keep the revenue you have? NRR measures account growth \u2014 can you expand it? Investors and acquirers weight NRR most heavily because expansion is the cheapest growth. Internally, track GRR to diagnose product problems (it strips out the flattering effect of upsells) and NRR to measure commercial performance."
          }
        },
        {
          "@type": "Question",
          "name": "How do you annualize monthly churn rate?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use compounding: Annualized Churn = 1 \u2212 (1 \u2212 monthly churn)^12. So 2% monthly annualizes to 21.5%, not 24%. Never simply multiply by 12 \u2014 it overstates churn and the error grows with the rate. For the reverse, monthly \u2248 1 \u2212 (1 \u2212 annual)^(1/12)."
          }
        },
        {
          "@type": "Question",
          "name": "What causes high churn in SaaS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The usual culprits, in order of frequency: selling to the wrong ICP (customers who were never a fit churn fastest), weak onboarding (most churn happens in the first 90 days), missing or broken core workflows, and pricing misalignment. Involuntary churn \u2014 failed payments \u2014 quietly accounts for 20\u201340% of logo churn at self-serve companies and is the cheapest to fix with dunning and card-updater tooling."
          }
        },
        {
          "@type": "Question",
          "name": "Can NRR be over 100% with high logo churn?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, and it happens often in PLG and SMB SaaS: many small accounts churn while survivors expand aggressively through seats and usage. It is a legitimate signal of product value, but treat it carefully \u2014 if logo churn is very high, the expansion base is narrow and NRR becomes volatile. Durable NRR above 110% comes from broad-based expansion across most of the base, not a handful of whales."
          }
        }
            ]
          })
        }}
      />

      {/* SEO Guide */}
      <section className="border-t border-slate-200 mt-4 pt-10">
        <div className="max-w-3xl mx-auto space-y-10">
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">What Is SaaS Churn Rate?</h2>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Churn rate is the percentage of customers or revenue a SaaS business loses over a given period. A <strong className="font-semibold text-slate-900">SaaS churn rate calculator</strong> typically starts with logo churn — customers lost divided by customers at the start of the period — but sophisticated teams track three numbers, because each answers a different question. Logo churn tells you whether customers stay. Gross revenue retention (GRR) tells you whether the revenue from the customers you keep is stable. Net revenue retention (NRR) tells you whether expansion from existing accounts outruns contraction — the single best predictor of efficient growth in 2026.</p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">The distinction matters because a company can have alarming logo churn and superb economics at the same time. A self-serve product losing 5% of logos monthly but expanding the survivors looks terrible on logo churn and fantastic on NRR. Conversely, an enterprise vendor with 1% logo churn but heavy down-sells has a retention problem its logo metric hides. Investors in the current market weight NRR and GRR far more heavily than logo churn, because revenue retention — not headcount retention — is what compounds. Measure all three, report the one your segment is judged on, and never let a blended average hide a deteriorating cohort.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Churn Rate Formulas</h2>
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 overflow-x-auto">
            <div className="font-mono text-[13px] sm:text-sm text-emerald-300 whitespace-pre">Monthly Logo Churn = (Customers Lost in Month ÷ Customers at Start of Month) × 100</div>
          </div>
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 overflow-x-auto">
            <div className="font-mono text-[13px] sm:text-sm text-emerald-300 whitespace-pre">Gross Revenue Retention (GRR) = (Starting MRR − Contraction − Churned MRR) ÷ Starting MRR × 100</div>
          </div>
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 overflow-x-auto">
            <div className="font-mono text-[13px] sm:text-sm text-emerald-300 whitespace-pre">Net Revenue Retention (NRR) = (Starting MRR − Contraction − Churned MRR + Expansion MRR) ÷ Starting MRR × 100</div>
          </div>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Variable definitions:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Customers Lost in Month</strong> — Logos that cancelled or failed to renew in the period. Exclude trial users who never converted; including them inflates churn and makes trends unreadable.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Customers at Start of Month</strong> — Total paying customers on day one of the period. Do not use an average of start and end — the standard definition uses the starting base.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Contraction MRR</strong> — Downgrades and seat reductions from retained customers.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Churned MRR</strong> — MRR from customers lost entirely.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Expansion MRR</strong> — Upsells, cross-sells, and seat additions from retained customers. This is what can push NRR above 100%.</span>
            </li>
          </ul>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Annualizing monthly churn: <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-indigo-700">Annualized Churn = 1 − (1 − Monthly Churn)^12</code>. Note this compounds — 2% monthly is not 24% annually, it is 21.5%.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Worked Example</h2>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">A mid-market SaaS company starts March 2026 with 500 customers and $600,000 MRR. During March:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>15 customers cancel outright, taking $21,000 MRR with them</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>10 customers downgrade, reducing MRR by $8,000</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>25 customers expand (upsells + seats), adding $30,000 MRR</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>Starting customer count: 500</span>
            </li>
          </ul>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed"><strong className="font-semibold text-slate-900">Logo churn</strong> = 15 ÷ 500 = <strong className="font-semibold text-slate-900">3.0%</strong> for the month (annualized: 1 − 0.97^12 ≈ 30.6%).</p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed"><strong className="font-semibold text-slate-900">GRR</strong> = ($600,000 − $8,000 − $21,000) ÷ $600,000 = $571,000 ÷ $600,000 = <strong className="font-semibold text-slate-900">95.2%</strong>.</p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed"><strong className="font-semibold text-slate-900">NRR</strong> = ($571,000 + $30,000) ÷ $600,000 = $601,000 ÷ $600,000 = <strong className="font-semibold text-slate-900">100.2%</strong>.</p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Read the story the three numbers tell together: logo churn of 3% looks elevated, but GRR of 95.2% shows the lost logos were below-average spenders, and NRR just above 100% shows expansion fully offsets all contraction and churn. This is a company whose retention economics are fine despite noisy logo churn — exactly the nuance a single churn number would miss, and precisely why acquirers now diligence NRR cohorts rather than headline churn.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Benchmarks</h2>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed"><strong className="font-semibold text-slate-900">Monthly logo churn by segment:</strong></p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-xs sm:text-sm">
              <thead><tr className="bg-slate-100"><th className="px-4 py-3 font-bold text-slate-900 text-left">Segment</th><th className="px-4 py-3 font-bold text-slate-900 text-left">Good</th><th className="px-4 py-3 font-bold text-slate-900 text-left">Average</th><th className="px-4 py-3 font-bold text-slate-900 text-left">Poor</th></tr></thead>
              <tbody>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">SMB / self-serve</td><td className="px-4 py-3 text-slate-600 align-top">&lt; 3%</td><td className="px-4 py-3 text-slate-600 align-top">3–5%</td><td className="px-4 py-3 text-slate-600 align-top">&gt; 7%</td></tr>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">Mid-market</td><td className="px-4 py-3 text-slate-600 align-top">&lt; 1.5%</td><td className="px-4 py-3 text-slate-600 align-top">1.5–2.5%</td><td className="px-4 py-3 text-slate-600 align-top">&gt; 4%</td></tr>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">Enterprise</td><td className="px-4 py-3 text-slate-600 align-top">&lt; 0.8%</td><td className="px-4 py-3 text-slate-600 align-top">0.8–1.5%</td><td className="px-4 py-3 text-slate-600 align-top">&gt; 2.5%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed"><strong className="font-semibold text-slate-900">Revenue retention (the numbers investors actually use):</strong></p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-xs sm:text-sm">
              <thead><tr className="bg-slate-100"><th className="px-4 py-3 font-bold text-slate-900 text-left">Metric</th><th className="px-4 py-3 font-bold text-slate-900 text-left">Best-in-class</th><th className="px-4 py-3 font-bold text-slate-900 text-left">Acceptable</th><th className="px-4 py-3 font-bold text-slate-900 text-left">Troubled</th></tr></thead>
              <tbody>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">NRR</td><td className="px-4 py-3 text-slate-600 align-top">&gt; 120%</td><td className="px-4 py-3 text-slate-600 align-top">100–110%</td><td className="px-4 py-3 text-slate-600 align-top">&lt; 95%</td></tr>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">GRR</td><td className="px-4 py-3 text-slate-600 align-top">&gt; 92%</td><td className="px-4 py-3 text-slate-600 align-top">85–90%</td><td className="px-4 py-3 text-slate-600 align-top">&lt; 80%</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Reasoning: NRR above 120% means the existing base grows without any new sales — the hallmark of product-led expansion and the strongest valuation driver in SaaS. GRR below 85% means the core product is leaking faster than success teams can plug, and no amount of new-logo growth sustainably fixes it. In 2026, with growth capital more expensive than it was in 2021, buyers and investors penalize sub-100% NRR far more harshly than they once did.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">What is the difference between logo churn and revenue churn?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Logo churn counts customers: what fraction of accounts cancelled. Revenue churn (usually expressed as GRR/NRR) counts dollars: what fraction of recurring revenue was lost or retained. A company can lose 5% of logos but only 1% of revenue if churn concentrates in small accounts — which is why revenue retention, not logo counts, drives valuation.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">What is a good churn rate for SaaS?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">It depends on segment. For SMB self-serve, under 3% monthly logo churn is good. For mid-market, under 1.5% monthly. For enterprise, under 1% monthly. But the metrics that matter most are revenue-based: aim for GRR above 90% and NRR above 110%. A company with 4% logo churn and 115% NRR is healthier than one with 1% logo churn and 92% NRR.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">NRR vs GRR: which should I report?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Report both, lead with the one your audience cares about. GRR measures product stickiness — can you keep the revenue you have? NRR measures account growth — can you expand it? Investors and acquirers weight NRR most heavily because expansion is the cheapest growth. Internally, track GRR to diagnose product problems (it strips out the flattering effect of upsells) and NRR to measure commercial performance.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">How do you annualize monthly churn rate?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Use compounding: Annualized Churn = 1 − (1 − monthly churn)^12. So 2% monthly annualizes to 21.5%, not 24%. Never simply multiply by 12 — it overstates churn and the error grows with the rate. For the reverse, monthly ≈ 1 − (1 − annual)^(1/12).</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">What causes high churn in SaaS?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">The usual culprits, in order of frequency: selling to the wrong ICP (customers who were never a fit churn fastest), weak onboarding (most churn happens in the first 90 days), missing or broken core workflows, and pricing misalignment. Involuntary churn — failed payments — quietly accounts for 20–40% of logo churn at self-serve companies and is the cheapest to fix with dunning and card-updater tooling.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Can NRR be over 100% with high logo churn?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Yes, and it happens often in PLG and SMB SaaS: many small accounts churn while survivors expand aggressively through seats and usage. It is a legitimate signal of product value, but treat it carefully — if logo churn is very high, the expansion base is narrow and NRR becomes volatile. Durable NRR above 110% comes from broad-based expansion across most of the base, not a handful of whales.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
