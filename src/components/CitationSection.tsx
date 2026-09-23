import React from 'react';
import { ExternalLink, BookOpen, Scale, Award, Database } from 'lucide-react';

export default function CitationSection() {
  const citations = [
    {
      title: 'FASB ASC 340-40 & ASC 606: Capitalization of Contract Acquisition Costs',
      organization: 'Financial Accounting Standards Board (FASB)',
      description: 'Defines accounting treatment for amortizing sales commissions over customer contract life versus immediately expensed marketing spend.',
      url: 'https://www.fasb.org',
      icon: Scale,
      badge: 'Accounting Standard',
    },
    {
      title: 'Bessemer Venture Partners (BVP) State of the Cloud & CAC Payback Efficiency',
      organization: 'Bessemer Venture Partners',
      description: 'Defines top-quartile cloud benchmarks and efficiency metrics across ARR growth velocity, Magic Number, and Net Retention.',
      url: 'https://www.bvp.com/atlas/state-of-the-cloud-2024',
      icon: Award,
      badge: 'Venture Benchmark',
    },
    {
      title: 'KeyBanc (formerly Pacific Crest) Annual Private SaaS Company Survey',
      organization: 'KeyBanc Capital Markets',
      description: 'Longitudinal industry benchmark data surveying over 500 venture-backed SaaS companies on CAC payback and gross margins.',
      url: 'https://www.key.com',
      icon: Database,
      badge: '500+ Company Survey',
    },
    {
      title: 'SaaS Metrics 2.0: A Guide to Measuring and Improving What Matters',
      organization: 'David Skok / For Entrepreneurs',
      description: 'The definitive foundational framework for LTV:CAC ratios, net negative churn, and capital efficiency calculations.',
      url: 'https://www.forentrepreneurs.com/saas-metrics-2/',
      icon: BookOpen,
      badge: 'Foundational Text',
    },
  ];

  return (
    <section id="citations-sources-section" className="mt-8 bg-[#eef8ed]/60 border border-[#d2edd0] rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex items-center gap-2 border-b border-[#d2edd0]/80 pb-3">
        <div className="p-1.5 rounded-lg bg-[#15803d] text-white shadow-xs">
          <BookOpen className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-sm font-black text-slate-900">Methodology Sources &amp; Industry Research Citations</h3>
          <p className="text-[11px] text-slate-500 font-medium">Mathematical models calibrated against published research from David Skok, Bessemer Venture Partners, KeyBanc Capital Markets, and OpenView.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {citations.map((c, i) => {
          const Icon = c.icon;
          return (
            <a
              key={i}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-between p-3.5 rounded-xl bg-white border border-[#d2edd0] hover:border-[#15803d] hover:shadow-xs transition text-slate-900 group shadow-2xs cursor-pointer"
            >
              <div className="space-y-1 pr-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-900 bg-[#eef8ed] border border-[#d2edd0] px-2 py-0.5 rounded-md">
                    {c.badge}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500">{c.organization}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-[#15803d] leading-snug">
                  {c.title}
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                  {c.description}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#15803d] shrink-0 mt-1" />
            </a>
          );
        })}
      </div>
    </section>
  );
}
