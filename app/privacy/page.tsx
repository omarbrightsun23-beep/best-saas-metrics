import type { Metadata } from 'next';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';

export const metadata: Metadata = {
  title: 'Privacy Policy | Best SaaS Metrics',
  description: 'Privacy Policy, data governance standards, and Google AdSense cookie disclosure for Best SaaS Metrics.',
  alternates: {
    canonical: 'https://bestsaasmetrics.com/privacy',
  },
};

export default function PrivacyPage() {
  const defaultNiche = SUB_NICHES[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 space-y-8">
        <div className="border-b border-slate-200 pb-5">
          <nav className="text-xs text-slate-500 mb-2">
            <Link href="/" className="hover:text-emerald-700">Home</Link> &gt; <span>Privacy Policy</span>
          </nav>
          <h1 className="text-3xl font-black text-slate-950">Privacy Policy &amp; Cookie Disclosure</h1>
          <p className="text-xs text-slate-500 mt-1">Effective Date: January 1, 2026 · Last Updated: September 2026</p>
        </div>

        <section className="space-y-4 text-sm text-slate-700 leading-relaxed bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900">1. Client-Side Financial Calculation Privacy</h2>
          <p>
            At <strong>Best SaaS Metrics</strong>, your financial privacy is our highest architectural priority. All inputs entered into our calculator—including Customer Acquisition Cost (CAC), Average Revenue Per Account (ARPA), Software Gross Margins, Churn Rates, and Sales Cycles—are processed <strong>exclusively client-side in your web browser</strong> using JavaScript. None of your proprietary unit economics data is transmitted to, logged by, or stored on our servers.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">2. Google AdSense &amp; Third-Party Advertising Cookies</h2>
          <p>
            This website partners with third-party vendors, including Google, to serve advertisements when you visit our site. In compliance with Google AdSense Publisher Policies:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-600">
            <li>Google, as a third-party vendor, uses cookies to serve ads based on a user's prior visits to this website or other websites.</li>
            <li>Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.</li>
            <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-semibold">Google Ads Settings</a>.</li>
            <li>Alternatively, users can opt out of third-party vendor use of cookies for personalized advertising by visiting <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-semibold">www.aboutads.info</a>.</li>
          </ul>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">3. Local Storage &amp; User State</h2>
          <p>
            To provide persistent convenience without account registration, this platform uses browser <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800 font-mono">localStorage</code> to remember your benchmark selections and sensitivity scenarios when you explicitly click "Save Model". You can clear this data at any time via your browser settings.
          </p>

          <h2 className="text-lg font-bold text-slate-900 pt-4 border-t border-slate-100">4. Contact Information</h2>
          <p>
            For privacy inquiries or compliance questions, please contact our team at:
            <br />
            <strong className="text-slate-900">Email:</strong> Contact@bestsaasmetrics.com
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
