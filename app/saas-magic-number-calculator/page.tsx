'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';
import { ArrowRight, ChevronRight, RotateCcw } from 'lucide-react';

export default function MagicNumberCalculatorPage() {
  const defaultNiche = SUB_NICHES[0];

  const [currentQuarterArr, setCurrentQuarterArr] = useState<number>(1250000);
  const [priorQuarterArr, setPriorQuarterArr] = useState<number>(1000000);
  const [quarterSmSpend, setQuarterSmSpend] = useState<number>(200000);

  const netNewArr = currentQuarterArr - priorQuarterArr;
  const magicNumber = quarterSmSpend > 0 ? Number(((netNewArr * 4) / quarterSmSpend).toFixed(2)) : 0;

  const handleReset = () => {
    setCurrentQuarterArr(1250000);
    setPriorQuarterArr(1000000);
    setQuarterSmSpend(200000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav selectedNiche={defaultNiche} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#4F46E5] font-bold">Magic Number Calculator</span>
        </nav>

        <div className="space-y-2 border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            SaaS Magic Number Calculator (Sales Efficiency Index)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Calculate your SaaS Magic Number to measure sales efficiency. A Magic Number &gt; 1.0 indicates that your sales and marketing investments are highly efficient and ready for aggressive scaling.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Quarterly Financials</h2>
              <button type="button" onClick={handleReset} className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-semibold">
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="curr-arr">Current Quarter Ending ARR ($)</label>
                <span className="font-mono text-[#4F46E5]">${currentQuarterArr.toLocaleString()}</span>
              </div>
              <input
                id="curr-arr"
                type="range"
                min={100000}
                max={5000000}
                step={25000}
                value={currentQuarterArr}
                onChange={(e) => setCurrentQuarterArr(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4F46E5]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="prior-arr">Prior Quarter Ending ARR ($)</label>
                <span className="font-mono text-[#4F46E5]">${priorQuarterArr.toLocaleString()}</span>
              </div>
              <input
                id="prior-arr"
                type="range"
                min={50000}
                max={4500000}
                step={25000}
                value={priorQuarterArr}
                onChange={(e) => setPriorQuarterArr(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4F46E5]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="sm-spend">Prior Quarter Sales &amp; Marketing Spend ($)</label>
                <span className="font-mono text-[#4F46E5]">${quarterSmSpend.toLocaleString()}</span>
              </div>
              <input
                id="sm-spend"
                type="range"
                min={10000}
                max={1000000}
                step={10000}
                value={quarterSmSpend}
                onChange={(e) => setQuarterSmSpend(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4F46E5]"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className={`border rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs ${
              magicNumber >= 1.0 ? 'bg-[#EEF2FF] border-[#E0E7FF]' : magicNumber >= 0.75 ? 'bg-blue-50 border-blue-200' : 'bg-amber-50 border-amber-200'
            }`}>
              <div className="space-y-1 border-b border-slate-200 pb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">SaaS Magic Number</div>
                <div className="text-5xl font-black text-slate-950 font-mono">
                  {magicNumber}x
                </div>
                <p className="text-xs text-slate-600 font-medium">
                  {magicNumber >= 1.0
                    ? 'Excellent efficiency (Magic Number ≥ 1.0). Invest aggressively in sales & marketing.'
                    : magicNumber >= 0.75
                    ? 'Healthy efficiency (0.75–1.0x). Solid sales motion with balanced capital returns.'
                    : 'Needs optimization (< 0.75x). Fix product-market fit or sales conversion before scaling spend.'}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Net New ARR Added:</span>
                  <span className="font-mono font-bold">${netNewArr.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annualized New ARR:</span>
                  <span className="font-mono font-bold">${(netNewArr * 4).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 text-xs">
              <div className="font-bold text-emerald-400">Formula:</div>
              <div className="font-mono text-slate-300">Magic Number = (Quarter Net New ARR × 4) ÷ Prior Quarter S&amp;M Expense</div>
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
            "@id": "https://bestsaasmetrics.com/saas-magic-number-calculator#faq",
            "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a good magic number for SaaS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Above 1.0 is excellent \u2014 it means every S&M dollar generates more than a dollar of new ARR. The 0.75\u20131.0 range is healthy for most scaling companies. Below 0.5, your go-to-market motion is inefficient and needs diagnosis before you scale spend. Context matters: enterprise sales cycles and deliberate hypergrowth phases both depress the number legitimately."
          }
        },
        {
          "@type": "Question",
          "name": "How is the SaaS magic number calculated?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Magic Number = (quarterly net new ARR \u00d7 4) \u00f7 prior quarter's S&M expense. Net new ARR is new-logo ARR plus expansion minus churn and contraction. The \u00d74 annualizes the quarter. Use fully loaded S&M from the previous quarter, since spend precedes bookings. The result is a pure efficiency ratio with no units."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between magic number and CAC payback?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Magic number measures S&M efficiency at the company level \u2014 ARR created per dollar spent. CAC payback measures liquidity at the customer level \u2014 months to recover acquisition cost from gross profit. A company can have a great magic number and a terrible payback period (efficient at creating ARR, but each customer takes two years to pay back). Track both: efficiency without liquidity is a cash-flow trap."
          }
        },
        {
          "@type": "Question",
          "name": "Why is my magic number so high?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Usually one of three reasons: expansion ARR from the installed base is doing the work (the formula credits it to S&M), you are under-spending relative to pipeline, or net new ARR includes one-time items that shouldn't count as recurring. Decompose into new-logo-only and expansion-only variants to find the real driver before concluding your sales team is superhuman."
          }
        },
        {
          "@type": "Question",
          "name": "Does the magic number work for PLG companies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Partly. PLG companies typically show very high magic numbers because S&M spend is small relative to product-driven ARR \u2014 the metric flatters them. It still works as a trend indicator (is efficiency improving or degrading?), but absolute benchmarks designed for sales-led motions don't apply cleanly. Pair it with CAC payback for a meaningful read."
          }
        },
        {
          "@type": "Question",
          "name": "Should I use gross or net new ARR in the magic number?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Net. Using gross new ARR (ignoring churn) produces a vanity metric that rewards leaky growth \u2014 you can look efficient while churning nearly as fast as you sell. Net new ARR forces the metric to reflect true incremental revenue, which is the only version investors will accept in diligence."
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
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">What Is the SaaS Magic Number?</h2>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">The SaaS magic number is a sales efficiency metric that answers a blunt question: for every dollar of sales and marketing spend, how much new recurring revenue did we create? A <strong className="font-semibold text-slate-900">SaaS magic number calculator</strong> takes the quarter's net new ARR, annualizes it, and divides by the prior quarter's S&amp;M expense. The result tells you whether your go-to-market engine is a money printer or a furnace. It was popularized by Scale Venture Partners and remains one of the fastest efficiency screens in venture diligence — a single number that summarizes whether growth spending is working.</p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">The metric's power is its simplicity, and its weakness is the same thing. It treats all S&amp;M spend as if it converts to ARR in one quarter, which penalizes enterprise motions with 9-month sales cycles and flatters businesses riding expansion from prior quarters' pipeline. It also says nothing about retention: a company can post a sparkling magic number while churning the customers it just bought. In 2026, experienced operators use it as a directional gauge alongside CAC payback and NRR, not as a standalone verdict. When the magic number, payback period, and retention all point the same way, you can trust the signal; when they diverge, the divergence itself is the insight.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Magic Number Formula</h2>
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 overflow-x-auto">
            <div className="font-mono text-[13px] sm:text-sm text-emerald-300 whitespace-pre">Magic Number = (Quarter Net New ARR × 4) ÷ Prior Quarter S&amp;M Expense</div>
          </div>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Variable definitions:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Quarter Net New ARR</strong> — New ARR from new logos plus expansion ARR, minus churned and contracted ARR, for the quarter. Use net (not gross) new ARR so the metric reflects true incremental revenue.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">× 4</strong> — Annualizes the quarterly ARR figure so it is comparable to the spend base. Some teams use the current quarter's ARR × 4; the standard definition annualizes net new ARR.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Prior Quarter S&amp;M Expense</strong> — Total sales and marketing expense from the *previous* quarter, fully loaded (salaries, commissions, programs, tooling). Using the prior quarter acknowledges that spend precedes bookings — this quarter's pipeline was built with last quarter's money.</span>
            </li>
          </ul>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Interpretation: a magic number of 1.0 means each dollar of S&amp;M produced one dollar of annualized new ARR. Above 1.0, the engine is efficient; below 0.75, each growth dollar is buying less than 75 cents of ARR and the motion needs surgery.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Worked Example</h2>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">A Series B SaaS company reports Q1 2026:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>New logo ARR closed in Q1: $900,000</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>Expansion ARR in Q1: $400,000</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>Churned + contracted ARR in Q1: $300,000</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>Net new ARR = $900,000 + $400,000 − $300,000 = <strong className="font-semibold text-slate-900">$1,000,000</strong></span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>Q4 2025 S&amp;M expense (fully loaded): $1,100,000</span>
            </li>
          </ul>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Magic Number = ($1,000,000 × 4) ÷ $1,100,000 = $4,000,000 ÷ $1,100,000 ≈ <strong className="font-semibold text-slate-900">3.6</strong></p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">That looks extraordinary — and it should invite skepticism. A 3.6 usually means one of three things: the quarter included outsized expansion from the installed base (which the formula credits to S&amp;M), the company is under-spending relative to its pipeline, or net new ARR is inflated by multi-year prepays recognized oddly. Before celebrating, decompose: compute the magic number on *new-logo ARR only* ($900,000 × 4 ÷ $1,100,000 ≈ 3.3 — still strong) and check whether expansion is doing the heavy lifting. The metric is most honest when you run it both ways.</p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">A more typical mid-market case: $600,000 net new ARR against $2,400,000 of prior-quarter S&amp;M → ($600,000 × 4) ÷ $2,400,000 = <strong className="font-semibold text-slate-900">1.0</strong>, right on the efficiency line. Companies spending their way into hypergrowth often print 0.5–0.7 here — acceptable if deliberate, fatal if accidental.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Benchmarks</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-xs sm:text-sm">
              <thead><tr className="bg-slate-100"><th className="px-4 py-3 font-bold text-slate-900 text-left">Magic Number</th><th className="px-4 py-3 font-bold text-slate-900 text-left">Reading</th><th className="px-4 py-3 font-bold text-slate-900 text-left">Typical context</th></tr></thead>
              <tbody>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">&gt; 1.0</td><td className="px-4 py-3 text-slate-600 align-top">Efficient</td><td className="px-4 py-3 text-slate-600 align-top">Best-in-class GTM; each S&amp;M dollar returns more than a dollar of ARR</td></tr>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">0.75 – 1.0</td><td className="px-4 py-3 text-slate-600 align-top">Healthy</td><td className="px-4 py-3 text-slate-600 align-top">Normal for scaling SaaS; growth spend is productive</td></tr>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">0.5 – 0.75</td><td className="px-4 py-3 text-slate-600 align-top">Watch</td><td className="px-4 py-3 text-slate-600 align-top">Common in aggressive growth mode; needs a path back up</td></tr>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">&lt; 0.5</td><td className="px-4 py-3 text-slate-600 align-top">Poor</td><td className="px-4 py-3 text-slate-600 align-top">S&amp;M is not converting; diagnose before spending more</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Caveats that move the goalposts:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Enterprise motions</strong> (9–18 month cycles) should expect lower numbers — spend in Q4 may not book until Q2. Use a two-quarter lag variant for long cycles.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">PLG companies</strong> often show very high magic numbers because S&amp;M is small, not because sales is brilliant. Pair with payback period for the full picture.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Expansion-heavy quarters</strong> inflate the number. Always compute a new-logo-only variant to see what the hunting motion actually produces.</span>
            </li>
          </ul>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">What is a good magic number for SaaS?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Above 1.0 is excellent — it means every S&amp;M dollar generates more than a dollar of new ARR. The 0.75–1.0 range is healthy for most scaling companies. Below 0.5, your go-to-market motion is inefficient and needs diagnosis before you scale spend. Context matters: enterprise sales cycles and deliberate hypergrowth phases both depress the number legitimately.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">How is the SaaS magic number calculated?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Magic Number = (quarterly net new ARR × 4) ÷ prior quarter's S&amp;M expense. Net new ARR is new-logo ARR plus expansion minus churn and contraction. The ×4 annualizes the quarter. Use fully loaded S&amp;M from the previous quarter, since spend precedes bookings. The result is a pure efficiency ratio with no units.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">What is the difference between magic number and CAC payback?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Magic number measures S&amp;M efficiency at the company level — ARR created per dollar spent. CAC payback measures liquidity at the customer level — months to recover acquisition cost from gross profit. A company can have a great magic number and a terrible payback period (efficient at creating ARR, but each customer takes two years to pay back). Track both: efficiency without liquidity is a cash-flow trap.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Why is my magic number so high?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Usually one of three reasons: expansion ARR from the installed base is doing the work (the formula credits it to S&amp;M), you are under-spending relative to pipeline, or net new ARR includes one-time items that shouldn't count as recurring. Decompose into new-logo-only and expansion-only variants to find the real driver before concluding your sales team is superhuman.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Does the magic number work for PLG companies?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Partly. PLG companies typically show very high magic numbers because S&amp;M spend is small relative to product-driven ARR — the metric flatters them. It still works as a trend indicator (is efficiency improving or degrading?), but absolute benchmarks designed for sales-led motions don't apply cleanly. Pair it with CAC payback for a meaningful read.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Should I use gross or net new ARR in the magic number?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Net. Using gross new ARR (ignoring churn) produces a vanity metric that rewards leaky growth — you can look efficient while churning nearly as fast as you sell. Net new ARR forces the metric to reflect true incremental revenue, which is the only version investors will accept in diligence.</p>
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
