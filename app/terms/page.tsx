import type { Metadata } from 'next';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';

export const metadata: Metadata = {
  title: 'Terms of Service | Best SaaS Metrics',
  description: 'Terms of service and usage guidelines for the Best SaaS Metrics unit economics engine.',
  alternates: {
    canonical: 'https://bestsaasmetrics.com/terms',
  },
};

export default function TermsPage() {
  const defaultNiche = SUB_NICHES[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-8">
        <div className="border-b border-slate-200 pb-5">
          <nav className="text-xs text-slate-500 mb-2">
            <Link href="/" className="hover:text-emerald-700">Home</Link> &gt; <span>Terms of Service</span>
          </nav>
          <h1 className="text-3xl font-black text-slate-950">Terms of Service</h1>
          <p className="text-xs text-slate-500 mt-1">Effective Date: January 1, 2026</p>
        </div>

        <section className="space-y-4 text-sm text-slate-700 leading-relaxed bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using <strong>Best SaaS Metrics</strong>, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, you should discontinue using the platform.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">2. Financial Calculation Disclaimer</h2>
          <p>
            Calculations, charts, and benchmark figures are provided for general educational, strategic, and informational modeling purposes only. Outputs do not constitute certified public accounting (CPA) advice, formal auditing, tax counsel, or investment banking recommendations.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">3. Permitted Usage &amp; Reporting</h2>
          <p>
            You are granted a revocable, non-exclusive license to use this calculator for personal analysis, company FP&amp;A reviews, board presentations, and PDF audit exports.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
