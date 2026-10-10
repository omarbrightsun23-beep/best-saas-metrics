'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';
import { ArrowRight, ChevronRight, RotateCcw, Percent } from 'lucide-react';

export default function RuleOf40CalculatorPage() {
  const defaultNiche = SUB_NICHES[0];

  const [growthRate, setGrowthRate] = useState<number>(35);
  const [profitMargin, setProfitMargin] = useState<number>(12);

  const ruleOf40Score = growthRate + profitMargin;
  const isHealthy = ruleOf40Score >= 40;

  const handleReset = () => {
    setGrowthRate(35);
    setProfitMargin(12);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav selectedNiche={defaultNiche} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#4F46E5] font-bold">Rule of 40 Calculator</span>
        </nav>

        <div className="space-y-2 border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            SaaS Rule of 40 Calculator (Bessemer &amp; Scale Venture Partners)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Determine if your software company achieves elite growth and profitability balance. The Rule of 40 states that your YoY revenue growth rate plus your Free Cash Flow (FCF) margin should equal or exceed 40%.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Performance Metrics</h2>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* YoY Revenue Growth Rate */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="growth-rate">Year-over-Year (YoY) ARR Growth Rate (%)</label>
                <span className="font-mono text-[#4F46E5]">{growthRate}%</span>
              </div>
              <input
                id="growth-rate"
                type="range"
                min={-20}
                max={150}
                step={1}
                value={growthRate}
                onChange={(e) => setGrowthRate(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4F46E5]"
              />
              <p className="text-[11px] text-slate-500">Annual recurring revenue growth percentage over the trailing 12 months.</p>
            </div>

            {/* Profit Margin (FCF / EBITDA) */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="profit-margin">Free Cash Flow (FCF) or EBITDA Margin (%)</label>
                <span className="font-mono text-[#4F46E5]">{profitMargin}%</span>
              </div>
              <input
                id="profit-margin"
                type="range"
                min={-50}
                max={60}
                step={1}
                value={profitMargin}
                onChange={(e) => setProfitMargin(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4F46E5]"
              />
              <p className="text-[11px] text-slate-500">Operational free cash flow margin (FCF / Revenue) or EBITDA percentage.</p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className={`border rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs ${
              isHealthy ? 'bg-[#EEF2FF] border-[#E0E7FF]' : 'bg-amber-50/60 border-amber-200'
            }`}>
              <div className="space-y-1 border-b border-slate-200/80 pb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Rule of 40 Score</div>
                <div className="text-5xl font-black text-slate-950 font-mono">
                  {ruleOf40Score}%{' '}
                  <span className={`text-base font-bold px-2.5 py-1 rounded-full border ${
                    isHealthy
                      ? 'bg-emerald-100 text-indigo-900 border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border-amber-300'
                  }`}>
                    {isHealthy ? '✓ Meets Benchmark' : 'Below 40% Target'}
                  </span>
                </div>
                <p className="text-xs text-slate-600">
                  {isHealthy
                    ? 'Elite SaaS tier. High valuation multiples and strong investor interest.'
                    : 'Sub-40% profile. Accelerate growth velocity or optimize operational cash burn.'}
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Growth Component:</span>
                  <span className="font-mono font-bold">{growthRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Profitability Component:</span>
                  <span className="font-mono font-bold">{profitMargin}%</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 text-xs">
              <div className="font-bold text-emerald-400">Formula &amp; VC Benchmarks:</div>
              <div className="font-mono text-slate-300">Rule of 40 Score = YoY Growth Rate % + Free Cash Flow Margin %</div>
              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                According to Bessemer Venture Partners (BVP), public cloud companies exceeding the Rule of 40 command 2.5x higher enterprise valuation revenue multiples compared to those under 40%.
              </p>
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
            "@id": "https://bestsaasmetrics.com/rule-of-40-calculator#faq",
            "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the Rule of 40 in SaaS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The Rule of 40 states that a SaaS company's year-over-year revenue growth rate plus its free cash flow margin should total at least 40. It balances growth against profitability: fast growers can offset negative margins, and slower growers can compensate with high margins. Scores above 40 indicate healthy unit economics; above 50 is strong."
          }
        },
        {
          "@type": "Question",
          "name": "How do you calculate the Rule of 40?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Add two percentages: (1) YoY revenue growth rate = (current revenue \u2212 prior-year revenue) \u00f7 prior-year revenue \u00d7 100; (2) free cash flow margin = (operating cash flow \u2212 capex) \u00f7 revenue \u00d7 100. The sum is the score. Use consistent definitions period to period \u2014 mixing FCF margin one quarter with EBITDA margin the next makes the trend meaningless."
          }
        },
        {
          "@type": "Question",
          "name": "What is a good Rule of 40 score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "40 is the passing line. 40\u201350 is healthy, 50\u201360 is strong, and 60+ is elite. Below 30 signals real trouble \u2014 the company is neither growing fast enough nor profitable enough. Context matters: early-stage startups are judged more leniently, while public companies live and die by the number."
          }
        },
        {
          "@type": "Question",
          "name": "Should I use FCF margin or EBITDA margin?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Free cash flow margin is the standard and the more honest measure \u2014 it captures actual cash generation. EBITDA margin flatters the score by adding back stock-based compensation, which is a real (if non-cash) cost of talent. Bessemer's canonical formulation uses FCF. If you use EBITDA, say so explicitly; sophisticated readers will mentally haircut the number otherwise."
          }
        },
        {
          "@type": "Question",
          "name": "Does the Rule of 40 apply to early-stage startups?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Loosely. Pre-Series C companies are generally expected to prioritize growth, and investors tolerate sub-40 scores for genuine hypergrowth (100%+ YoY). But the framework still disciplines: a seed company at 40% growth and \u221260% margins (score \u221220) is burning without velocity, and no stage excuses that. Use it as a guardrail early, a target from Series C on."
          }
        },
        {
          "@type": "Question",
          "name": "Why 40 and not 30 or 50?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Forty emerged empirically from Bessemer's analysis of public SaaS companies \u2014 it was roughly the line separating durable compounders from the rest. It's a heuristic, not a law of physics. Some investors use 50 for top-quartile framing. The value isn't the number itself but the discipline of holding growth and profitability in one equation instead of optimizing either in isolation."
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
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">What Is the Rule of 40?</h2>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">The Rule of 40 is a SaaS performance framework holding that a healthy software company's revenue growth rate plus its profit margin should sum to at least 40. A <strong className="font-semibold text-slate-900">Rule of 40 calculator</strong> adds year-over-year revenue growth percentage to free cash flow margin percentage: a company growing 30% with 15% FCF margin scores 45 and passes; one growing 60% while burning at −30% margin scores 30 and fails. Popularized by Bessemer Venture Partners and refined by Scale Venture Partners, the rule encodes the central tradeoff of SaaS economics — growth and profitability are substitutes, and excellence means getting enough of their sum, not maximizing either alone.</p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">The framework's endurance comes from its balance. Pure growth metrics reward capital destruction; pure profitability metrics punish young companies for investing. The Rule of 40 lets a hypergrowth startup offset negative margins with speed, and lets a slower grower compensate with efficiency — while exposing companies that are both slow-growing *and* unprofitable, the true danger zone. In 2026, after several years of efficiency-first markets, it has evolved from a venture heuristic into a board-level operating standard: public SaaS multiples now correlate more tightly with Rule of 40 scores than with growth alone, which is why CFOs track it quarterly and tie executive comp to it.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Rule of 40 Formula</h2>
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 overflow-x-auto">
            <div className="font-mono text-[13px] sm:text-sm text-emerald-300 whitespace-pre">Rule of 40 Score = YoY Revenue Growth Rate % + Free Cash Flow Margin %</div>
          </div>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Variable definitions:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">YoY Revenue Growth Rate %</strong> — (Current period revenue − same period last year) ÷ same period last year × 100. Use GAAP revenue (or ARR for private companies, consistently). The standard is year-over-year to neutralize seasonality.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Free Cash Flow Margin %</strong> — (Operating cash flow − capital expenditures) ÷ revenue × 100. FCF is preferred over EBITDA because it reflects actual cash generation after the capex SaaS companies do incur. Some practitioners substitute EBITDA margin or even GAAP operating margin — pick one definition and hold it constant, because the variants can differ by 10+ points.</span>
            </li>
          </ul>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Passing score: <strong className="font-semibold text-slate-900">≥ 40</strong>. A score of 40+ indicates a healthy balance; 50+ is strong; 60+ is elite and rare outside the largest platforms.</p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Common variants: Bessemer's original formulation used growth + FCF margin. Some investors use growth + EBITDA margin (flattering, since it adds back stock comp). The "Rule of 40" name is sometimes stretched to "Rule of 50" or "Rule of 60" for top-quartile framing — the math is identical, only the bar moves.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Worked Example</h2>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Take a public-scale SaaS company reporting full-year 2026:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>2025 revenue: $400M; 2026 revenue: $520M</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>YoY growth = ($520M − $400M) ÷ $400M = <strong className="font-semibold text-slate-900">30%</strong></span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>Operating cash flow: $104M; capex: $12M → FCF = $92M</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>FCF margin = $92M ÷ $520M = <strong className="font-semibold text-slate-900">17.7%</strong></span>
            </li>
          </ul>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Rule of 40 score = 30 + 17.7 = <strong className="font-semibold text-slate-900">47.7</strong> — passes comfortably, with a balanced profile: real growth plus real cash generation.</p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Contrast two companies that both "pass" differently:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">HypergrowthCo</strong>: 75% growth, −20% FCF margin → <strong className="font-semibold text-slate-900">55</strong>. Passes on velocity. The bet: growth compounds into future margins. Works only if unit economics (NRR, gross margin) are strong underneath.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">EfficientCo</strong>: 15% growth, +30% FCF margin → <strong className="font-semibold text-slate-900">45</strong>. Passes on discipline. The market rewards this profile more generously in downturns — it doesn't need external capital.</span>
            </li>
          </ul>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">And the failure mode: <strong className="font-semibold text-slate-900">StuckCo</strong> at 18% growth and 5% FCF margin → <strong className="font-semibold text-slate-900">23</strong>. Too slow to be a growth story, too undisciplined to be a cash cow. This is the profile the Rule of 40 is designed to surface, and in 2026 it trades at the steepest discount in SaaS.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Benchmarks</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-xs sm:text-sm">
              <thead><tr className="bg-slate-100"><th className="px-4 py-3 font-bold text-slate-900 text-left">Score</th><th className="px-4 py-3 font-bold text-slate-900 text-left">Rating</th><th className="px-4 py-3 font-bold text-slate-900 text-left">Typical profile</th></tr></thead>
              <tbody>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">60+</td><td className="px-4 py-3 text-slate-600 align-top">Elite</td><td className="px-4 py-3 text-slate-600 align-top">Top-decile public SaaS; commands premium multiples</td></tr>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">50–60</td><td className="px-4 py-3 text-slate-600 align-top">Strong</td><td className="px-4 py-3 text-slate-600 align-top">Best-in-class balance of growth and efficiency</td></tr>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">40–50</td><td className="px-4 py-3 text-slate-600 align-top">Healthy</td><td className="px-4 py-3 text-slate-600 align-top">The passing band; fundable, acquirable, durable</td></tr>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">30–40</td><td className="px-4 py-3 text-slate-600 align-top">Watch</td><td className="px-4 py-3 text-slate-600 align-top">One leg is weak; needs a credible path to 40+</td></tr>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">&lt; 30</td><td className="px-4 py-3 text-slate-600 align-top">Troubled</td><td className="px-4 py-3 text-slate-600 align-top">Neither growing fast nor profitable — demands restructuring</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">How the market reads it in 2026:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Public SaaS multiples</strong> track Rule of 40 scores more closely than growth alone. A 45 at balanced 25/20 often trades richer than a 45 built as 70/−25, because the market discounts cash-burning growth.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Private fundraising</strong> uses 40 as a screening threshold for growth rounds; below it, expect valuation haircuts or structure.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Stage adjustments</strong>: early-stage (Series A/B) companies are rarely held to 40 — investors accept sub-40 for genuine hypergrowth. The bar hardens from Series C onward.</span>
            </li>
          </ul>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">What is the Rule of 40 in SaaS?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">The Rule of 40 states that a SaaS company's year-over-year revenue growth rate plus its free cash flow margin should total at least 40. It balances growth against profitability: fast growers can offset negative margins, and slower growers can compensate with high margins. Scores above 40 indicate healthy unit economics; above 50 is strong.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">How do you calculate the Rule of 40?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Add two percentages: (1) YoY revenue growth rate = (current revenue − prior-year revenue) ÷ prior-year revenue × 100; (2) free cash flow margin = (operating cash flow − capex) ÷ revenue × 100. The sum is the score. Use consistent definitions period to period — mixing FCF margin one quarter with EBITDA margin the next makes the trend meaningless.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">What is a good Rule of 40 score?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">40 is the passing line. 40–50 is healthy, 50–60 is strong, and 60+ is elite. Below 30 signals real trouble — the company is neither growing fast enough nor profitable enough. Context matters: early-stage startups are judged more leniently, while public companies live and die by the number.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Should I use FCF margin or EBITDA margin?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Free cash flow margin is the standard and the more honest measure — it captures actual cash generation. EBITDA margin flatters the score by adding back stock-based compensation, which is a real (if non-cash) cost of talent. Bessemer's canonical formulation uses FCF. If you use EBITDA, say so explicitly; sophisticated readers will mentally haircut the number otherwise.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Does the Rule of 40 apply to early-stage startups?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Loosely. Pre-Series C companies are generally expected to prioritize growth, and investors tolerate sub-40 scores for genuine hypergrowth (100%+ YoY). But the framework still disciplines: a seed company at 40% growth and −60% margins (score −20) is burning without velocity, and no stage excuses that. Use it as a guardrail early, a target from Series C on.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Why 40 and not 30 or 50?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Forty emerged empirically from Bessemer's analysis of public SaaS companies — it was roughly the line separating durable compounders from the rest. It's a heuristic, not a law of physics. Some investors use 50 for top-quartile framing. The value isn't the number itself but the discipline of holding growth and profitability in one equation instead of optimizing either in isolation.</p>
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
