'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';
import { DollarSign, ArrowRight, BookOpen, CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react';

export default function CacCalculatorPage() {
  const defaultNiche = SUB_NICHES[0];
  
  // Inputs
  const [salesSpend, setSalesSpend] = useState<number>(35000);
  const [marketingSpend, setMarketingSpend] = useState<number>(25000);
  const [toolsSpend, setToolsSpend] = useState<number>(5000);
  const [customersAcquired, setCustomersAcquired] = useState<number>(10);

  // Calculations
  const totalCost = salesSpend + marketingSpend + toolsSpend;
  const fullyLoadedCac = customersAcquired > 0 ? Math.round(totalCost / customersAcquired) : 0;
  const blendedCac = fullyLoadedCac;

  const handleReset = () => {
    setSalesSpend(35000);
    setMarketingSpend(25000);
    setToolsSpend(5000);
    setCustomersAcquired(10);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav selectedNiche={defaultNiche} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#4F46E5] font-bold">CAC Calculator</span>
        </nav>

        {/* Title */}
        <div className="space-y-2 border-b border-slate-200 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            Customer Acquisition Cost (CAC) Calculator (Fully Loaded)
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Calculate your true, fully loaded Customer Acquisition Cost under GAAP / ASC 340-40 accounting standards, including sales rep salaries, ad spend, marketing automation tooling, and overhead.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">Period S&amp;M Expenditures</h2>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Sales Salaries & Commissions */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="sales-spend">Sales Salaries &amp; Commissions ($)</label>
                <span className="font-mono text-[#4F46E5]">${salesSpend.toLocaleString()}</span>
              </div>
              <input
                id="sales-spend"
                type="range"
                min={0}
                max={200000}
                step={1000}
                value={salesSpend}
                onChange={(e) => setSalesSpend(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4F46E5]"
              />
              <p className="text-[11px] text-slate-500">AE, SDR, and sales management compensation allocated to new logos.</p>
            </div>

            {/* Marketing Ad Spend & Agency Fees */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="marketing-spend">Marketing Ad Spend &amp; Programs ($)</label>
                <span className="font-mono text-[#4F46E5]">${marketingSpend.toLocaleString()}</span>
              </div>
              <input
                id="marketing-spend"
                type="range"
                min={0}
                max={150000}
                step={1000}
                value={marketingSpend}
                onChange={(e) => setMarketingSpend(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4F46E5]"
              />
              <p className="text-[11px] text-slate-500">Google Ads, LinkedIn, content marketing, SEO agencies, sponsorships.</p>
            </div>

            {/* S&M Software & Overhead */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="tools-spend">Sales &amp; Marketing Software Licenses ($)</label>
                <span className="font-mono text-[#4F46E5]">${toolsSpend.toLocaleString()}</span>
              </div>
              <input
                id="tools-spend"
                type="range"
                min={0}
                max={30000}
                step={500}
                value={toolsSpend}
                onChange={(e) => setToolsSpend(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4F46E5]"
              />
              <p className="text-[11px] text-slate-500">HubSpot, Salesforce, ZoomInfo, Apollo, Gong subscriptions.</p>
            </div>

            {/* New Customers Acquired */}
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <label htmlFor="cust-acquired">New Paying Customers Acquired</label>
                <span className="font-mono text-indigo-950 font-bold">{customersAcquired} Logos</span>
              </div>
              <input
                id="cust-acquired"
                type="range"
                min={1}
                max={200}
                step={1}
                value={customersAcquired}
                onChange={(e) => setCustomersAcquired(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#4F46E5]"
              />
              <p className="text-[11px] text-slate-500">Total new logo conversions signed during this measured period.</p>
            </div>
          </div>

          {/* Results Pane */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-[#EEF2FF] border border-[#E0E7FF] rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="space-y-1 border-b border-[#E0E7FF]/80 pb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700">Fully Loaded CAC</div>
                <div className="text-4xl sm:text-5xl font-black text-slate-950 font-mono">
                  ${fullyLoadedCac.toLocaleString()}{' '}
                  <span className="text-xl font-bold text-slate-600 font-sans">/ Customer</span>
                </div>
                <p className="text-xs text-slate-500">Total acquisition cost allocated per new paying customer.</p>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center text-slate-800 font-semibold">
                  <span>Total S&amp;M Capital Deployed:</span>
                  <span className="font-mono font-bold text-slate-950">${totalCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-slate-800 font-semibold">
                  <span>New Customer Count:</span>
                  <span className="font-mono font-bold text-slate-950">{customersAcquired} Customers</span>
                </div>
                <div className="flex justify-between items-center text-slate-800 font-semibold">
                  <span>Sales vs Marketing Share:</span>
                  <span className="font-mono font-bold text-slate-950">
                    {Math.round((salesSpend / (totalCost || 1)) * 100)}% Sales / {Math.round((marketingSpend / (totalCost || 1)) * 100)}% Marketing
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E0E7FF]/80">
                <Link
                  href="/"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold transition shadow-xs"
                >
                  <span>Model Payback Period with This CAC</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Formula Block */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 text-xs">
              <div className="font-bold text-emerald-400">Formula (ASC 340-40 Compliance):</div>
              <div className="font-mono text-slate-300">
                Fully Loaded CAC = (Sales Salaries + Ad Spend + S&amp;M Tooling + Overhead) ÷ New Customers
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                Measuring blended CAC without sales salaries or overhead artificially lowers your CAC by 40% to 60%, creating false unit economics that fail under investor diligence.
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
            "@id": "https://bestsaasmetrics.com/cac-calculator#faq",
            "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a good CAC for a SaaS company?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "There is no universal good number \u2014 a $2,000 CAC is excellent for a $500 ACV product and catastrophic for a $50 ACV one. Judge CAC through the payback period (months to recover it from gross profit) and the LTV:CAC ratio instead. As a rule of thumb, payback under 12 months and LTV:CAC above 3:1 indicate healthy acquisition economics for most B2B SaaS motions in 2026."
          }
        },
        {
          "@type": "Question",
          "name": "What is the customer acquisition cost formula?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The standard formula is: CAC = total sales and marketing expenses \u00f7 number of new customers acquired in the same period. For investor-grade reporting, use fully loaded CAC: include sales salaries, commissions, benefits, marketing programs, S&M software, and allocated overhead \u2014 not just ad spend. Always match the numerator and denominator to the same time period."
          }
        },
        {
          "@type": "Question",
          "name": "Should CAC include salaries?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Excluding sales salaries and commissions is the single most common way companies understate CAC, typically by 40 to 60 percent. Fully burdened sales compensation \u2014 base, variable, benefits, payroll taxes \u2014 belongs in the numerator, along with the marketing team costs that support acquisition. The resulting number is the only one that survives diligence."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between CAC and CPA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "CPA (cost per acquisition) usually measures the cost of a single conversion event \u2014 a signup, trial, or lead \u2014 often within one channel. CAC measures the fully loaded cost of acquiring a paying customer across the whole go-to-market motion. CPA is a campaign optimization metric; CAC is a unit-economics metric."
          }
        },
        {
          "@type": "Question",
          "name": "How do you lower CAC without hurting growth?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The durable levers are: improve conversion rates at each funnel stage (demo-to-close rate is usually the biggest), shift mix toward higher-converting channels, raise ACV through packaging so the same spend yields more revenue per logo, and shorten sales cycles. Cutting productive spend lowers CAC arithmetically but shrinks the pipeline \u2014 track pipeline coverage alongside CAC to avoid fooling yourself."
          }
        },
        {
          "@type": "Question",
          "name": "What is a good CAC payback period for SaaS?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "For SMB and mid-market SaaS, under 12 months is strong and 12\u201318 months is acceptable. Enterprise motions with large ACVs and multi-year contracts can support 18\u201324 months. Payback beyond 24 months means each new customer is a two-year loan to growth \u2014 defensible only with very high net revenue retention and cheap capital."
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
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">What Is Customer Acquisition Cost (CAC)?</h2>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Customer Acquisition Cost (CAC) is the total sales and marketing capital a company spends to acquire one new paying customer. A proper <strong className="font-semibold text-slate-900">SaaS CAC calculator</strong> doesn't just divide ad spend by signups — it captures the fully loaded cost: sales rep salaries and commissions, SDR teams, paid acquisition, content and brand programs, marketing automation tooling, and the overhead allocated to the go-to-market org. Under GAAP and ASC 340-40, the costs of obtaining a customer contract (commissions, for example) are recognized as assets and amortized, which is why serious finance teams measure CAC on a fully loaded basis rather than the "marketing spend only" shortcut that understates true cost by 40 to 60 percent.</p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">CAC is the denominator of SaaS unit economics. On its own it tells you what growth costs; paired with gross margin and ARPA it produces the CAC payback period, and paired with lifetime value it produces the LTV:CAC ratio — the two metrics investors scrutinize first. Founders often track a blended CAC (all S&amp;M spend over all new customers) alongside channel-level CAC to see which motions are efficient and which are subsidized by the average. The number only becomes actionable when measured consistently period over period, with the same cost definitions, so trends reflect reality rather than accounting drift.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Customer Acquisition Cost Formula</h2>
          <div className="bg-slate-900 text-white rounded-2xl p-5 space-y-2 overflow-x-auto">
            <div className="font-mono text-[13px] sm:text-sm text-emerald-300 whitespace-pre">Fully Loaded CAC = (Sales Salaries + Commissions + Marketing Spend + S&amp;M Tooling + Allocated Overhead) ÷ New Customers Acquired</div>
          </div>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Variable definitions:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Sales Salaries + Commissions</strong> — Fully burdened compensation for AEs, SDRs/BDRs, sales management, and sales engineering, for the measurement period. Include payroll taxes and benefits, not just base salary.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Marketing Spend</strong> — Paid acquisition (search, social, display), content production, SEO agencies, events, sponsorships, and brand programs in the period.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">S&amp;M Tooling</strong> — CRM, sales engagement, data enrichment, marketing automation, and attribution software licenses allocated to new-customer acquisition.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">Allocated Overhead</strong> — The defensible share of facilities, finance, and people-ops costs attributable to the go-to-market headcount.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">New Customers Acquired</strong> — Net new paying logos closed in the same period. Use the same period for numerator and denominator; mixing a quarterly spend with an annual customer count is the most common CAC error.</span>
            </li>
          </ul>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">A narrower variant, <strong className="font-semibold text-slate-900">paid CAC</strong>, divides only paid marketing spend by customers from paid channels. It is useful for channel optimization but must never substitute for fully loaded CAC in board reporting or fundraising materials.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Worked Example</h2>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Take a B2B SaaS company selling a $1,500/month product with a field-assisted sales motion. In Q1 2026:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>Sales salaries, commissions, and benefits: $350,000</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>Marketing ad spend and programs: $250,000</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>S&amp;M software licenses (Salesforce, HubSpot, Gong, ZoomInfo): $50,000</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>Allocated overhead (10% of go-to-market opex): $65,000</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span>New paying customers acquired in Q1: 110</span>
            </li>
          </ul>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Total S&amp;M capital deployed: $350,000 + $250,000 + $50,000 + $65,000 = <strong className="font-semibold text-slate-900">$715,000</strong></p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Fully loaded CAC: $715,000 ÷ 110 = <strong className="font-semibold text-slate-900">$6,500 per customer</strong></p>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Now put it in context. Monthly ARPA is $1,500 and gross margin is 80%, so each customer contributes $1,200/month in gross profit. CAC payback period = $6,500 ÷ $1,200 ≈ <strong className="font-semibold text-slate-900">5.4 months</strong> — a healthy figure for a mid-market motion. If the same company had reported "marketing CAC" of ($250,000 ÷ 110) = $2,273, it would look three times more efficient than it is — exactly the kind of distortion that collapses under investor diligence.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Benchmarks</h2>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Fully loaded CAC varies enormously by motion, so compare against your own segment:</p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-xs sm:text-sm">
              <thead><tr className="bg-slate-100"><th className="px-4 py-3 font-bold text-slate-900 text-left">Motion</th><th className="px-4 py-3 font-bold text-slate-900 text-left">Typical fully loaded CAC</th><th className="px-4 py-3 font-bold text-slate-900 text-left">What drives it</th></tr></thead>
              <tbody>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">PLG / self-serve SMB</td><td className="px-4 py-3 text-slate-600 align-top">$500 – $3,000</td><td className="px-4 py-3 text-slate-600 align-top">Product-led acquisition, minimal sales touch</td></tr>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">Inside sales, SMB</td><td className="px-4 py-3 text-slate-600 align-top">$3,000 – $10,000</td><td className="px-4 py-3 text-slate-600 align-top">SDR + AE teams, 30–60 day cycles</td></tr>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">Mid-market, field-assisted</td><td className="px-4 py-3 text-slate-600 align-top">$10,000 – $40,000</td><td className="px-4 py-3 text-slate-600 align-top">Multi-stakeholder deals, pilots</td></tr>
            <tr className="border-t border-slate-200"><td className="px-4 py-3 text-slate-600 align-top">Enterprise</td><td className="px-4 py-3 text-slate-600 align-top">$50,000 – $200,000+</td><td className="px-4 py-3 text-slate-600 align-top">6–18 month cycles, sales engineering, procurement</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">What matters more than the absolute number is the ratio work CAC feeds into:</p>
          <ul className="space-y-2.5">
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">CAC payback period under 12 months</strong> is strong for SMB/mid-market; enterprise motions can justify 18–24 months given contract sizes and expansion.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">LTV:CAC of 3:1 or better</strong> is the classic efficiency bar (Bessemer). Below 2:1, growth destroys value unless payback is very fast.</span>
            </li>
            <li className="flex gap-2.5 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              <span><strong className="font-semibold text-slate-900">CAC trending down while win rates hold</strong> signals genuine efficiency gains; CAC falling because you cut into productive spend is a warning sign.</span>
            </li>
          </ul>
          <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed">Benchmark CAC against companies with similar ACV and sales cycle — comparing a PLG product's CAC to an enterprise vendor's is meaningless.</p>
          </div>
          <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">What is a good CAC for a SaaS company?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">There is no universal good number — a $2,000 CAC is excellent for a $500 ACV product and catastrophic for a $50 ACV one. Judge CAC through the payback period (months to recover it from gross profit) and the LTV:CAC ratio instead. As a rule of thumb, payback under 12 months and LTV:CAC above 3:1 indicate healthy acquisition economics for most B2B SaaS motions in 2026.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">What is the customer acquisition cost formula?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">The standard formula is: CAC = total sales and marketing expenses ÷ number of new customers acquired in the same period. For investor-grade reporting, use fully loaded CAC: include sales salaries, commissions, benefits, marketing programs, S&amp;M software, and allocated overhead — not just ad spend. Always match the numerator and denominator to the same time period.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">Should CAC include salaries?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">Yes. Excluding sales salaries and commissions is the single most common way companies understate CAC, typically by 40 to 60 percent. Fully burdened sales compensation — base, variable, benefits, payroll taxes — belongs in the numerator, along with the marketing team costs that support acquisition. The resulting number is the only one that survives diligence.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">What is the difference between CAC and CPA?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">CPA (cost per acquisition) usually measures the cost of a single conversion event — a signup, trial, or lead — often within one channel. CAC measures the fully loaded cost of acquiring a paying customer across the whole go-to-market motion. CPA is a campaign optimization metric; CAC is a unit-economics metric.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">How do you lower CAC without hurting growth?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">The durable levers are: improve conversion rates at each funnel stage (demo-to-close rate is usually the biggest), shift mix toward higher-converting channels, raise ACV through packaging so the same spend yields more revenue per logo, and shorten sales cycles. Cutting productive spend lowers CAC arithmetically but shrinks the pipeline — track pipeline coverage alongside CAC to avoid fooling yourself.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">What is a good CAC payback period for SaaS?</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">For SMB and mid-market SaaS, under 12 months is strong and 12–18 months is acceptable. Enterprise motions with large ACVs and multi-year contracts can support 18–24 months. Payback beyond 24 months means each new customer is a two-year loan to growth — defensible only with very high net revenue retention and cheap capital.</p>
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
