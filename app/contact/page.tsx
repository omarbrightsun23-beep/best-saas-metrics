import type { Metadata } from 'next';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';
import { Mail, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us | Best SaaS Metrics',
  description: 'Contact the research and editorial team at Best SaaS Metrics.',
  alternates: {
    canonical: 'https://bestsaasmetrics.com/contact',
  },
};

export default function ContactPage() {
  const defaultNiche = SUB_NICHES[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav selectedNiche={defaultNiche} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-8">
        <div className="border-b border-slate-200 pb-5">
          <nav className="text-xs text-slate-500 mb-2">
            <Link href="/" className="hover:text-emerald-700">Home</Link> &gt; <span>Contact Us</span>
          </nav>
          <h1 className="text-3xl font-black text-slate-950">Contact Research &amp; Support</h1>
          <p className="text-xs text-slate-500 mt-1">We typically respond to inquiries within 1 business day.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900">Official Inquiries &amp; Support</h2>
            <p className="text-xs text-slate-600">Send benchmark methodology questions, feedback, or corporate partnership inquiries.</p>
            <a href="mailto:Contact@bestsaasmetrics.com" className="text-sm font-bold text-blue-700 hover:underline block pt-2">
              Contact@bestsaasmetrics.com
            </a>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h2 className="text-base font-bold text-slate-900">WhatsApp Direct</h2>
            <p className="text-xs text-slate-600">Direct instant messaging for quick research queries and bug reports.</p>
            <a href="https://wa.me/923336109888" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-emerald-700 hover:underline block pt-2">
              +92 333 6109888
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
