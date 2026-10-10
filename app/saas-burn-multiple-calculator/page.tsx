'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';
import { ChevronRight, RotateCcw } from 'lucide-react';

export default function BurnMultipleCalculatorPage() {
  const defaultNiche = SUB_NICHES[0];

  const [netBurn, setNetBurn] = useState<number>(300000);
  const [netNewArr, setNetNewArr] = useState<number>(250000);

  const burnMultiple = netNewArr > 0 ? Number((netBurn / netNewArr).toFixed(2)) : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav selectedNiche={defaultNiche} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#4F46E5] font-bold">Burn Multiple Calculator</span>
        </nav>

        <div className="space-y-2 border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            SaaS Burn Multiple Calculator (David Sacks / Craft Ventures)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            The Burn Multiple measures capital efficiency: how much cash does a startup burn to generate every $1.00 of Net New ARR?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">Inputs</h2>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="net-burn">Net Cash Burn in Period ($)</label>
                <span className="font-mono text-[#4F46E5]">${netBurn.toLocaleString()}</span>
              </div>
              <input
                id="net-burn"
                type="range"
                min={20000}
                max={2000000}
                step={10000}
                value={netBurn}
                onChange={(e) => setNetBurn(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4F46E5]"
              />
              <p className="text-[11px] text-slate-500">Cash burned over the quarter or year (Cash In minus Cash Out).</p>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="net-new-arr">Net New ARR Generated ($)</label>
                <span className="font-mono text-[#4F46E5]">${netNewArr.toLocaleString()}</span>
              </div>
              <input
                id="net-new-arr"
                type="range"
                min={10000}
                max={2000000}
                step={10000}
                value={netNewArr}
                onChange={(e) => setNetNewArr(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4F46E5]"
              />
              <p className="text-[11px] text-slate-500">Net new ARR added in the same period (New ARR + Expansion - Churn).</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className={`border rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs ${
              burnMultiple <= 1.0 ? 'bg-[#EEF2FF] border-[#E0E7FF]' : burnMultiple <= 1.5 ? 'bg-blue-50 border-blue-200' : 'bg-rose-50 border-rose-200'
            }`}>
              <div className="space-y-1 border-b border-slate-200 pb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Burn Multiple</div>
                <div className="text-5xl font-black text-slate-950 font-mono">
                  {burnMultiple}x
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {burnMultiple <= 1.0
                    ? 'Amazing (≤ 1.0x). Burning less than $1 to create $1 of ARR.'
                    : burnMultiple <= 1.5
                    ? 'Good (1.0–1.5x). Healthy venture capital efficiency band.'
                    : burnMultiple <= 2.0
                    ? 'Suspect (1.5–2.0x). High capital drag.'
                    : 'Bad (> 2.0x). Alarmingly inefficient capital consumption.'}
                </p>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 text-xs">
              <div className="font-bold text-emerald-400">Formula:</div>
              <div className="font-mono text-slate-300">Burn Multiple = Net Cash Burn ÷ Net New ARR</div>
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
            "@id": "https://bestsaasmetrics.com/saas-burn-multiple-calculator#faq",
            "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a good burn multiple for SaaS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Under 2x is good, under 1x is excellent. The Craft Ventures framework that popularized the metric sets 1\u20132x as the healthy band for scaling SaaS companies, 2\u20133x as tolerable during aggressive growth, and above 3x as a red flag. In 2026's efficiency-focused funding market, sub-2x is increasingly table stakes for raising a growth round."
          }
        },
        {
          "@type": "Question",
          "name": "How do you calculate burn multiple?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Burn Multiple = net cash burn \u00f7 net new ARR, for the same period. Net cash burn is the decrease in cash balance (use actual cash flow, not accounting net income). Net new ARR is new-logo plus expansion ARR minus churned and contracted ARR. Both inputs must cover the same quarter or year, or the ratio is meaningless."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between burn multiple and magic number?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Burn multiple divides *total* net cash burn by net new ARR \u2014 it measures whole-company capital efficiency. Magic number divides only *S&M spend* by annualized net new ARR \u2014 it measures go-to-market efficiency. A company can have a good magic number and a terrible burn multiple if R&D and G&A are bloated. Use magic number to diagnose sales, burn multiple to diagnose the company."
          }
        },
        {
          "@type": "Question",
          "name": "Can burn multiple be negative?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Arithmetically yes, when a company is cash-flow positive \u2014 but the metric is meaningless in that case. A negative burn multiple doesn't mean \"infinitely efficient\"; it means the company has outgrown the metric. Profitable or breakeven companies should track the Rule of 40 or free cash flow margin instead."
          }
        },
        {
          "@type": "Question",
          "name": "Why is my burn multiple so high?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The usual causes: S&M spend that isn't converting (check the magic number to isolate this), R&D headcount growing faster than revenue, G&A bloat, or simply too little ARR growth for the cost base. Decompose the numerator \u2014 if S&M is the driver, it's a go-to-market problem; if it's R&D/G&A, it's an operating discipline problem. The fix depends entirely on which."
          }
        },
        {
          "@type": "Question",
          "name": "How does burn multiple relate to runway?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Directly: runway = cash on hand \u00f7 net burn per period, and burn multiple tells you whether that burn is *productive*. Eighteen months of runway at a 4x multiple means 18 months of capital destruction \u2014 the company will struggle to raise. The same runway at 1.2x is a position of strength. Report them together; neither means much alone."
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
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">What Is Burn Multiple?</h2>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Burn multiple measures capital efficiency: how much cash a SaaS company burns to generate each dollar of new recurring revenue. A <strong className="font-semibold text-slate-900">burn multiple calculator</strong> divides net cash burn by net new ARR — a multiple of 2 means the company spent $2 to create $1 of new ARR. The metric was popularized by David Sacks of Craft Ventures as a corrective to the growth-at-all-costs era, and it has become the standard efficiency screen for startups between product-market fit and profitability. Where the magic number looks only at sales and marketing spend, burn multiple looks at the whole company — every dollar out the door versus every dollar of new ARR in.</p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">That breadth is both its strength and its limitation. Burn multiple captures R&amp;D, G&amp;A, and the full opex base, so it reflects true corporate efficiency rather than just go-to-market efficiency. But it breaks down at the extremes: it is meaningless for profitable companies (negative burn produces a negative multiple) and misleading for pre-revenue or hyper-early companies where ARR is near zero. It is also a snapshot, not a trend — a single quarter's multiple can be distorted by hiring waves or annual prepay collections. In 2026, the best operators track burn multiple on a trailing-twelve-month basis and pair it with the Rule of 40, which balances the same efficiency instinct against growth.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Burn Multiple Formula</h2>
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 overflow-x-auto">
            <div className="font-mono text-[13px] sm:text-sm text-emerald-300 whitespace-pre">Burn Multiple = Net Cash Burn ÷ Net New ARR</div>
          </div>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Variable definitions:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Net Cash Burn</strong> — Total cash outflows minus total cash inflows for the period (usually a quarter or year). Use *cash* burn, not accounting net loss — non-cash items like stock-based compensation and amortization distort the picture. If the company is cash-flow positive, the multiple is negative and the metric doesn't apply.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Net New ARR</strong> — New-logo ARR plus expansion ARR, minus churned and contracted ARR, for the same period. Same-period matching matters: dividing Q1 burn by full-year ARR flatters the result.</span>
            </li>
          </ul>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Interpretation: a burn multiple of 1.5 means $1.50 of net cash burned per $1.00 of net new ARR created. Lower is better. The Craft Ventures framework:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">&lt; 1x</strong> — Excellent. The company is nearly self-funding its growth.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">1–2x</strong> — Good. Normal for a well-run scaling SaaS company.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">2–3x</strong> — Acceptable in high-growth phases, but should be improving.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">&gt; 3x</strong> — Poor. The company is incinerating capital to grow and needs a plan.</span>
            </li>
          </ul>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Worked Example</h2>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">A Series A SaaS company reports for Q1 2026:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>Starting cash (Jan 1): $12,000,000</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>Ending cash (Mar 31): $10,200,000</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>Net cash burn = $12,000,000 − $10,200,000 = <strong className="font-semibold text-slate-900">$1,800,000</strong></span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>New logo ARR: $500,000; expansion ARR: $200,000; churned/contracted ARR: $100,000</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>Net new ARR = $500,000 + $200,000 − $100,000 = <strong className="font-semibold text-slate-900">$600,000</strong></span>
            </li>
          </ul>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Burn Multiple = $1,800,000 ÷ $600,000 = <strong className="font-semibold text-slate-900">3.0x</strong></p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">That sits right on the edge of poor — the company burns $3 for every $1 of new ARR. Runway is $10.2M ÷ $1.8M per quarter ≈ 5.7 quarters, roughly 17 months. The diagnosis writes itself: either growth must accelerate without proportional spend, or burn must come down. If the same company cut burn to $900K/quarter while holding ARR growth, the multiple drops to 1.5x — good — and runway extends to about 11 quarters.</p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Contrast with a disciplined peer: $400K quarterly burn producing $500K net new ARR → <strong className="font-semibold text-slate-900">0.8x</strong>, excellent, with years of runway. Same ARR growth, radically different capital story — which is exactly what the metric is designed to expose.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Benchmarks</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-xs sm:text-sm">
              <thead><tr className="bg-slate-100"><th className="px-4 py-3 font-bold text-slate-900 text-left">Burn Multiple</th><th className="px-4 py-3 font-bold text-slate-900 text-left">Rating</th><th className="px-4 py-3 font-bold text-slate-900 text-left">What it signals</th></tr></thead>
              <tbody>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">&lt; 1x</td><td className="px-4 py-3 text-slate-600 align-top">Excellent</td><td className="px-4 py-3 text-slate-600 align-top">Growth nearly self-funded; maximum strategic optionality</td></tr>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">1–2x</td><td className="px-4 py-3 text-slate-600 align-top">Good</td><td className="px-4 py-3 text-slate-600 align-top">Healthy scaling efficiency; the 2026 investor sweet spot</td></tr>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">2–3x</td><td className="px-4 py-3 text-slate-600 align-top">Tolerable</td><td className="px-4 py-3 text-slate-600 align-top">Justifiable only with very high growth or a clear path down</td></tr>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">&gt; 3x</td><td className="px-4 py-3 text-slate-600 align-top">Poor</td><td className="px-4 py-3 text-slate-600 align-top">Capital destruction; fix before raising again</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Context that changes the reading:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Stage matters.</strong> Seed companies pre-scale will show ugly multiples — the metric applies from Series A onward, once there is real ARR to measure against.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Growth rate matters.</strong> A 3x multiple at 200% YoY growth is a different conversation than 3x at 30% growth. Pair burn multiple with growth rate (this is what the Rule of 40 does formally).</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">One-time effects distort.</strong> Annual prepay collections depress cash burn in the collection quarter; big hiring waves inflate it. Use trailing-twelve-month figures for board-level reporting.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Profitable companies</strong> should ignore the metric entirely — negative burn makes it meaningless.</span>
            </li>
          </ul>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">What is a good burn multiple for SaaS?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Under 2x is good, under 1x is excellent. The Craft Ventures framework that popularized the metric sets 1–2x as the healthy band for scaling SaaS companies, 2–3x as tolerable during aggressive growth, and above 3x as a red flag. In 2026's efficiency-focused funding market, sub-2x is increasingly table stakes for raising a growth round.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">How do you calculate burn multiple?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Burn Multiple = net cash burn ÷ net new ARR, for the same period. Net cash burn is the decrease in cash balance (use actual cash flow, not accounting net income). Net new ARR is new-logo plus expansion ARR minus churned and contracted ARR. Both inputs must cover the same quarter or year, or the ratio is meaningless.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">What is the difference between burn multiple and magic number?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Burn multiple divides *total* net cash burn by net new ARR — it measures whole-company capital efficiency. Magic number divides only *S&amp;M spend* by annualized net new ARR — it measures go-to-market efficiency. A company can have a good magic number and a terrible burn multiple if R&amp;D and G&amp;A are bloated. Use magic number to diagnose sales, burn multiple to diagnose the company.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Can burn multiple be negative?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Arithmetically yes, when a company is cash-flow positive — but the metric is meaningless in that case. A negative burn multiple doesn't mean "infinitely efficient"; it means the company has outgrown the metric. Profitable or breakeven companies should track the Rule of 40 or free cash flow margin instead.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Why is my burn multiple so high?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">The usual causes: S&amp;M spend that isn't converting (check the magic number to isolate this), R&amp;D headcount growing faster than revenue, G&amp;A bloat, or simply too little ARR growth for the cost base. Decompose the numerator — if S&amp;M is the driver, it's a go-to-market problem; if it's R&amp;D/G&amp;A, it's an operating discipline problem. The fix depends entirely on which.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">How does burn multiple relate to runway?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Directly: runway = cash on hand ÷ net burn per period, and burn multiple tells you whether that burn is *productive*. Eighteen months of runway at a 4x multiple means 18 months of capital destruction — the company will struggle to raise. The same runway at 1.2x is a position of strength. Report them together; neither means much alone.</p>
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
