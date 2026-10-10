'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';
import { ChevronRight, RotateCcw } from 'lucide-react';

export default function LtvCalculatorPage() {
  const defaultNiche = SUB_NICHES[0];

  const [arpa, setArpa] = useState<number>(500);
  const [margin, setMargin] = useState<number>(80);
  const [churn, setChurn] = useState<number>(2.0);

  const churnDecimal = churn > 0 ? churn / 100 : 0.01;
  const lifespanMonths = churn > 0 ? Number((1 / churnDecimal).toFixed(1)) : 0;
  const netArpa = arpa * (margin / 100);
  const ltv = churnDecimal > 0 ? Math.round(netArpa / churnDecimal) : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav selectedNiche={defaultNiche} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#4F46E5] font-bold">LTV Calculator</span>
        </nav>

        <div className="space-y-2 border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Customer Lifetime Value (LTV) Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Compute gross margin-adjusted Customer Lifetime Value (LTV) and average customer account lifespan across monthly logo churn rates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Model Parameters</h2>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="arpa-ltv">Monthly ARPA ($)</label>
                <span className="font-mono text-[#4F46E5]">${arpa.toLocaleString()}/mo</span>
              </div>
              <input
                id="arpa-ltv"
                type="range"
                min={20}
                max={5000}
                step={25}
                value={arpa}
                onChange={(e) => setArpa(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4F46E5]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="margin-ltv">Gross Margin (%)</label>
                <span className="font-mono text-[#4F46E5]">{margin}%</span>
              </div>
              <input
                id="margin-ltv"
                type="range"
                min={30}
                max={95}
                step={1}
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4F46E5]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="churn-ltv">Monthly Logo Churn (%)</label>
                <span className="font-mono text-[#4F46E5]">{churn}%</span>
              </div>
              <input
                id="churn-ltv"
                type="range"
                min={0.2}
                max={10}
                step={0.1}
                value={churn}
                onChange={(e) => setChurn(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4F46E5]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#EEF2FF] border border-[#E0E7FF] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="space-y-1 border-b border-[#E0E7FF]/80 pb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Projected Customer LTV</div>
                <div className="text-5xl font-black text-slate-950 font-mono">
                  ${ltv.toLocaleString()}
                </div>
                <p className="text-xs text-slate-500">Gross profit contribution generated over the customer lifecycle.</p>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Customer Lifespan:</span>
                  <span className="font-mono font-bold">{lifespanMonths} Months</span>
                </div>
                <div className="flex justify-between">
                  <span>Net Monthly Contribution:</span>
                  <span className="font-mono font-bold">${netArpa.toFixed(2)}/mo</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 text-xs">
              <div className="font-bold text-emerald-400">Formula:</div>
              <div className="font-mono text-slate-300">LTV = (Monthly ARPA × Gross Margin %) ÷ Monthly Churn Rate</div>
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
            "@id": "https://bestsaasmetrics.com/saas-ltv-calculator#faq",
            "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the customer lifetime value formula?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The standard SaaS formula is: LTV = (ARPA \u00d7 gross margin) \u00f7 churn rate, using matching time units \u2014 monthly ARPA with monthly churn, or annual values with annual churn. Always margin-adjust: revenue without COGS overstates lifetime value. For the ratio investors care about, divide the result by fully loaded CAC to get LTV:CAC."
          }
        },
        {
          "@type": "Question",
          "name": "What is a good LTV to CAC ratio for SaaS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "3:1 is the widely cited minimum for healthy SaaS unit economics \u2014 three dollars of lifetime gross profit for every acquisition dollar. The 3:1\u20135:1 band is considered efficient growth; above 5:1 can signal under-investment in growth. Early-stage companies in land-grab mode sometimes run below 3:1 deliberately, but they should be able to show a credible path back above it."
          }
        },
        {
          "@type": "Question",
          "name": "How do you calculate LTV when churn is very low?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The formula still works \u2014 low churn simply produces a large LTV, which is mathematically correct but practically fragile: at 0.5% monthly churn, implied customer lifetime is 200 months, well beyond any observable data. Cap the horizon at 5\u20137 years for planning purposes, and segment enterprise accounts (contractually committed) from self-serve (behaviorally retained) rather than blending them into one number."
          }
        },
        {
          "@type": "Question",
          "name": "Should LTV use gross margin or contribution margin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use gross margin at minimum \u2014 revenue minus hosting, support delivery, and other COGS. Sophisticated teams go further and use contribution margin, subtracting customer success and account management costs too, since those scale with the customer base. Whichever you choose, disclose it: an LTV computed on revenue alone is 15\u201330% higher than a margin-adjusted one, and mixing definitions across periods makes trends meaningless."
          }
        },
        {
          "@type": "Question",
          "name": "Why does my LTV keep changing every quarter?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Because churn and ARPA move. LTV is hypersensitive to churn \u2014 a one-point change in monthly churn can swing LTV by 30% or more. Track the inputs (ARPA, margin, churn by cohort) rather than the headline number, and investigate which input moved before reacting. Most \"LTV collapses\" are actually churn measurement changes, not business changes."
          }
        },
        {
          "@type": "Question",
          "name": "Is LTV:CAC or CAC payback period more important?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "They answer different questions. LTV:CAC measures total return on acquisition spend \u2014 the efficiency of the machine. CAC payback period measures how fast the cash comes back \u2014 the liquidity of the machine. A bootstrapped company should optimize payback (cash is survival); a venture-backed company in a winner-take-most market may tolerate slower payback for a strong LTV:CAC. Report both; optimize the one your capital structure demands."
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
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">What Is Customer Lifetime Value (LTV)?</h2>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Customer Lifetime Value (LTV) is the total gross profit a SaaS business expects to earn from a customer over the entire commercial relationship. A proper <strong className="font-semibold text-slate-900">SaaS LTV calculator</strong> multiplies average revenue per account (ARPA) by gross margin and divides by the churn rate — because a customer is only worth the margin-adjusted revenue they generate before they cancel. LTV is the numerator that gives acquisition spend its meaning: without it, CAC is just a cost; with it, CAC becomes an investment with a measurable return.</p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">The metric most people actually care about is the <strong className="font-semibold text-slate-900">LTV:CAC ratio</strong>, which answers the only question that matters in SaaS unit economics: for every dollar we spend acquiring a customer, how many dollars of gross profit come back? The classic benchmark is 3:1 — spend a dollar, get three back. Below that, growth consumes more value than it creates; far above 5:1, you may be under-investing in growth and leaving market share on the table. Because LTV compounds small errors in churn assumptions into large valuation swings, finance teams in 2026 increasingly report LTV by cohort and segment rather than as a single company-wide number, since a single blended figure hides the spread between sticky enterprise accounts and leaky SMB ones.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Customer Lifetime Value Formula</h2>
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 overflow-x-auto">
            <div className="font-mono text-[13px] sm:text-sm text-emerald-300 whitespace-pre">LTV = (Monthly ARPA × Gross Margin %) ÷ Monthly Churn Rate</div>
          </div>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Variable definitions:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Monthly ARPA</strong> — Average revenue per account per month, computed as MRR ÷ total customers. Use account-level ARPA (not per-seat or per-user) so the unit matches the customer count in your churn rate.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Gross Margin %</strong> — (Revenue − cost of goods sold) ÷ revenue, expressed as a decimal. For SaaS this is typically 0.70–0.85 after hosting, support, and customer success delivery costs. Never use revenue without the margin adjustment — it overstates LTV by 15–30 percent.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Monthly Churn Rate</strong> — The fraction of customers (logo churn) or revenue (revenue churn) lost per month, expressed as a decimal. Use the churn definition that matches the ARPA unit: logo churn with per-account ARPA.</span>
            </li>
          </ul>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">The formula assumes churn is constant, which makes it an approximation — real cohorts decay on a curve. For board-level work it is the standard; for pricing and packaging decisions, cohort-based LTV built from actual retention curves is more accurate.</p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">The companion ratio:</p>
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 overflow-x-auto">
            <div className="font-mono text-[13px] sm:text-sm text-emerald-300 whitespace-pre">LTV:CAC Ratio = LTV ÷ Fully Loaded CAC</div>
          </div>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Worked Example</h2>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Consider a vertical SaaS company in 2026 with these metrics:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>MRR: $480,000 across 400 customers → Monthly ARPA = $1,200</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>Gross margin: 82% (0.82)</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>Monthly logo churn: 2.5% (0.025)</span>
            </li>
          </ul>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">LTV = ($1,200 × 0.82) ÷ 0.025 = $984 ÷ 0.025 = <strong className="font-semibold text-slate-900">$39,360</strong></p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Now suppose fully loaded CAC is $9,800. The LTV:CAC ratio = $39,360 ÷ $9,800 ≈ <strong className="font-semibold text-slate-900">4.0:1</strong> — comfortably above the 3:1 bar.</p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Sensitivity check — this is where LTV gets dangerous. If churn were actually 4% instead of 2.5% (a common mismeasurement when involuntary churn is excluded), LTV drops to ($1,200 × 0.82) ÷ 0.04 = <strong className="font-semibold text-slate-900">$24,600</strong>, and the ratio falls to 2.5:1 — below the efficiency threshold. A 1.5-point error in churn flips the entire investment conclusion, which is why best-practice teams reconcile the churn input against billing-system data every quarter rather than trusting a dashboard default.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Benchmarks</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-xs sm:text-sm">
              <thead><tr className="bg-slate-100"><th className="px-4 py-3 font-bold text-slate-900 text-left">Segment</th><th className="px-4 py-3 font-bold text-slate-900 text-left">Healthy LTV:CAC</th><th className="px-4 py-3 font-bold text-slate-900 text-left">Notes</th></tr></thead>
              <tbody>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">SMB / self-serve</td><td className="px-4 py-3 text-slate-600 align-top">3:1 – 5:1</td><td className="px-4 py-3 text-slate-600 align-top">High churn is offset by low CAC; payback speed matters more than the ratio</td></tr>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">Mid-market</td><td className="px-4 py-3 text-slate-600 align-top">3:1 – 6:1</td><td className="px-4 py-3 text-slate-600 align-top">The classic efficient-growth band; expansion revenue lifts the ratio</td></tr>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">Enterprise</td><td className="px-4 py-3 text-slate-600 align-top">4:1 – 8:1+</td><td className="px-4 py-3 text-slate-600 align-top">High CAC is justified by large ACVs, multi-year terms, and low churn</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Reading the ratio:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Below 3:1</strong> — Acquisition economics are broken or the business is in deliberate land-grab mode. Either fix churn/pricing or acknowledge the burn.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">3:1 to 5:1</strong> — The efficient growth zone most Series A–C investors want to see.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Above 5:1</strong> — Efficient, but possibly under-spending on growth. If competitors are out-investing you for share, a 7:1 ratio can be a strategic mistake, not a victory.</span>
            </li>
          </ul>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Two caveats. First, LTV:CAC is a trailing indicator — it describes the customers you already acquired, not the marginal efficiency of your next dollar of spend. Second, never compute LTV with revenue churn and ARPA-per-seat mixed with logo counts; mismatched units are the most common source of fantasy LTVs in pitch decks.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">What is the customer lifetime value formula?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">The standard SaaS formula is: LTV = (ARPA × gross margin) ÷ churn rate, using matching time units — monthly ARPA with monthly churn, or annual values with annual churn. Always margin-adjust: revenue without COGS overstates lifetime value. For the ratio investors care about, divide the result by fully loaded CAC to get LTV:CAC.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">What is a good LTV to CAC ratio for SaaS?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">3:1 is the widely cited minimum for healthy SaaS unit economics — three dollars of lifetime gross profit for every acquisition dollar. The 3:1–5:1 band is considered efficient growth; above 5:1 can signal under-investment in growth. Early-stage companies in land-grab mode sometimes run below 3:1 deliberately, but they should be able to show a credible path back above it.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">How do you calculate LTV when churn is very low?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">The formula still works — low churn simply produces a large LTV, which is mathematically correct but practically fragile: at 0.5% monthly churn, implied customer lifetime is 200 months, well beyond any observable data. Cap the horizon at 5–7 years for planning purposes, and segment enterprise accounts (contractually committed) from self-serve (behaviorally retained) rather than blending them into one number.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Should LTV use gross margin or contribution margin?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Use gross margin at minimum — revenue minus hosting, support delivery, and other COGS. Sophisticated teams go further and use contribution margin, subtracting customer success and account management costs too, since those scale with the customer base. Whichever you choose, disclose it: an LTV computed on revenue alone is 15–30% higher than a margin-adjusted one, and mixing definitions across periods makes trends meaningless.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Why does my LTV keep changing every quarter?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Because churn and ARPA move. LTV is hypersensitive to churn — a one-point change in monthly churn can swing LTV by 30% or more. Track the inputs (ARPA, margin, churn by cohort) rather than the headline number, and investigate which input moved before reacting. Most "LTV collapses" are actually churn measurement changes, not business changes.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Is LTV:CAC or CAC payback period more important?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">They answer different questions. LTV:CAC measures total return on acquisition spend — the efficiency of the machine. CAC payback period measures how fast the cash comes back — the liquidity of the machine. A bootstrapped company should optimize payback (cash is survival); a venture-backed company in a winner-take-most market may tolerate slower payback for a strong LTV:CAC. Report both; optimize the one your capital structure demands.</p>
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
