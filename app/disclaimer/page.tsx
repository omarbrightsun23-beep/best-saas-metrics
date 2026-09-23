import type { Metadata } from 'next';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';

export const metadata: Metadata = {
  title: 'Financial Disclaimer | Best SaaS Metrics',
  description: 'Legal and financial calculation disclaimers for Best SaaS Metrics.',
  alternates: {
    canonical: 'https://bestsaasmetrics.com/disclaimer',
  },
};

export default function DisclaimerPage() {
  const defaultNiche = SUB_NICHES[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav selectedNiche={defaultNiche} onSelectNiche={() => {}} onOpenPage={() => {}} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-8">
        <div className="border-b border-slate-200 pb-5">
          <nav className="text-xs text-slate-500 mb-2">
            <Link href="/" className="hover:text-emerald-700">Home</Link> &gt; <span>Disclaimer</span>
          </nav>
          <h1 className="text-3xl font-black text-slate-950">Financial &amp; Legal Disclaimer</h1>
        </div>

        <section className="space-y-4 text-sm text-slate-700 leading-relaxed bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <p>
            The calculations, models, and industry quartile benchmarks provided on <strong>Best SaaS Metrics</strong> are intended strictly for educational, analytical, and preliminary strategic evaluation.
          </p>
          <p>
            No information on this website constitutes professional financial, tax, or legal advisory. Always consult a licensed Certified Public Accountant (CPA) or Chief Financial Officer (CFO) prior to executing corporate capital allocations or debt/equity financing decisions.
          </p>
        </section>
      </main>
      <Footer onSelectNiche={() => {}} onOpenPage={() => {}} />
    </div>
  );
}
