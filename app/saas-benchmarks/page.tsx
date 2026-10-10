import type { Metadata } from 'next';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';

export const metadata: Metadata = {
  title: 'SaaS Benchmarks 2026: Unit Economics Reference | Best SaaS Metrics',
  description:
    'The 2026 SaaS benchmarks that matter: CAC payback, LTV:CAC, churn, NRR, gross margin, burn multiple, Rule of 40, and magic number — with median, top-quartile, and elite bands.',
  alternates: {
    canonical: 'https://bestsaasmetrics.com/saas-benchmarks',
  },
  openGraph: {
    title: 'SaaS Benchmarks 2026: Unit Economics Reference | Best SaaS Metrics',
    description:
      'The 2026 SaaS benchmarks that matter: CAC payback, LTV:CAC, churn, NRR, gross margin, burn multiple, Rule of 40, and magic number — with median, top-quartile, and elite bands.',
    url: 'https://bestsaasmetrics.com/saas-benchmarks',
    type: 'article',
    siteName: 'Best SaaS Metrics',
    images: [
      {
        url: 'https://bestsaasmetrics.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SaaS Benchmarks 2026: Unit Economics Reference',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SaaS Benchmarks 2026: Unit Economics Reference | Best SaaS Metrics',
    description:
      'The 2026 SaaS benchmarks that matter: CAC payback, LTV:CAC, churn, NRR, gross margin, burn multiple, Rule of 40, and magic number.',
    images: ['https://bestsaasmetrics.com/og-image.png'],
  },
};

const faqs = [
  {
    question: 'What are good SaaS benchmarks in 2026?',
    answer:
      'For most B2B SaaS in 2026: CAC payback under 12 months, LTV:CAC of 3:1 or better, monthly logo churn under 2.5%, net revenue retention above 110%, gross margin above 75%, burn multiple under 2x, Rule of 40 score above 40, and a magic number above 0.75. The right target shifts with your sales motion — enterprise benchmarks are looser on payback and tighter on churn than self-serve.',
  },
  {
    question: 'What is a good Rule of 40 score for SaaS in 2026?',
    answer:
      '40 or above is the standard bar: your revenue growth rate plus your profit margin should sum to at least 40. Top-quartile public SaaS companies score 40–60; elite operators exceed 60. Below $20M ARR the rule matters less — early-stage companies are expected to trade efficiency for growth.',
  },
  {
    question: 'What is a good burn multiple for a SaaS startup in 2026?',
    answer:
      "Under 1.5x is the bar for raising in 2026 — under 1x is considered amazing, 1–2x good, 2–3x suspect, and above 3x a red flag that will stall a fundraise. These are David Sacks' bands, and they have only tightened since the zero-interest-rate era ended.",
  },
  {
    question: 'What is a good LTV to CAC ratio for SaaS?',
    answer:
      '3:1 is the widely cited healthy minimum — three dollars of lifetime gross profit for every acquisition dollar. Top-quartile companies run 5:1 or better. Below 2:1, growth destroys value unless payback is extremely fast. Always compute LTV on margin-adjusted profit, not revenue.',
  },
  {
    question: 'What is a good CAC payback period for B2B SaaS?',
    answer:
      'Under 12 months for SMB and self-serve motions, 12–18 months for mid-market, and up to 24 months for enterprise with multi-year contracts. The blended median across B2B SaaS sits around 16 months, so roughly half the market operates outside the efficient range.',
  },
  {
    question: 'How often should SaaS benchmarks be updated?',
    answer:
      'Review your benchmarks against the market annually — the numbers move as interest rates, buyer behavior, and AI-driven cost structures shift — but track your own metrics monthly. The trend of your payback period and NRR over four quarters tells investors more than any single benchmark comparison.',
  },
];

const masterBenchmarks = [
  { metric: 'CAC Payback Period', median: '14–18 months', top: '< 12 months', elite: '< 6 months' },
  { metric: 'LTV:CAC Ratio', median: '3:1', top: '5:1+', elite: '7:1+' },
  { metric: 'Logo Churn (monthly)', median: '2.5%', top: '1.5%', elite: '< 1%' },
  { metric: 'Net Revenue Retention', median: '105%', top: '115%', elite: '125%+' },
  { metric: 'Gross Margin', median: '75%', top: '80%+', elite: '85%+' },
  { metric: 'Burn Multiple', median: '1.5–2.0x', top: '< 1.5x', elite: '< 1.0x' },
  { metric: 'Rule of 40 Score', median: '25–30', top: '40+', elite: '60+' },
  { metric: 'Magic Number', median: '0.7', top: '1.0+', elite: '1.5+' },
];

const profileBenchmarks = [
  { profile: 'Bootstrapped Micro-SaaS', slug: 'bootstrapped-micro-saas', payback: '5–7 months', ltvCac: '3.6x', churn: '3.8%', margin: '90%' },
  { profile: 'PLG Self-Serve', slug: 'plg-self-serve-saas', payback: '8–11 months', ltvCac: '3.8x', churn: '3.0%', margin: '85%' },
  { profile: 'Mid-Market (composite)', slug: 'salestech-saas', payback: '9–11 months', ltvCac: '4.4x', churn: '2.0%', margin: '84%' },
  { profile: 'Enterprise B2B', slug: 'enterprise-b2b-saas', payback: '14–18 months', ltvCac: '4.8x', churn: '0.9%', margin: '80%' },
];

const metricGuides = [
  {
    name: 'CAC Payback Period',
    body: 'The months of gross profit needed to recover the cost of acquiring a customer. Under 12 months is strong for SMB and mid-market motions; enterprise can justify up to 24 given contract sizes. The nuance most teams miss: always compute it on margin-adjusted profit, not revenue — the unadjusted shortcut understates payback by 20–40%.',
    link: '/cac-calculator',
    linkLabel: 'Calculate yours with our CAC payback calculator',
  },
  {
    name: 'LTV:CAC Ratio',
    body: "Lifetime gross profit per customer divided by acquisition cost. 3:1 is the classic healthy minimum from Skok's framework; above 5:1 is efficient growth. The nuance: a ratio above 7:1 can signal under-investment — you may be leaving growth on the table.",
    link: '/saas-ltv-calculator',
    linkLabel: 'Calculate yours with our LTV calculator',
  },
  {
    name: 'Logo Churn (monthly)',
    body: 'The share of customers lost each month. Under 1% is elite and typical of enterprise; 3–5% is normal for self-serve SMB. The nuance: blended churn hides everything — segment by cohort and plan tier before judging the number.',
    link: '/saas-churn-rate-calculator',
    linkLabel: 'Calculate yours with our churn rate calculator',
  },
  {
    name: 'Net Revenue Retention (NRR)',
    body: 'Revenue retained from existing customers including expansion, minus contraction and churn. 110%+ is the baseline investors expect at Series A; 120%+ is the enterprise bar. The nuance: NRR above 130% with weak new-logo growth can mask a broken acquisition engine. Pair it with payback, never read it alone.',
    link: null,
    linkLabel: null,
  },
  {
    name: 'Gross Margin',
    body: 'Revenue minus cost of goods sold, as a percentage. 75%+ is the SaaS expectation; below 70% at scale triggers hard questions about architecture or service-heavy delivery. The nuance: fintech and infrastructure businesses structurally run lower (60–72%) because processing and hosting sit in COGS — judge margin against your cohort, not the SaaS average.',
    link: null,
    linkLabel: null,
  },
  {
    name: 'Burn Multiple',
    body: "Net burn divided by net new ARR: how many dollars you burn to create one dollar of new recurring revenue. Sacks' bands still rule: under 1x is amazing, 1–2x is good, over 3x is a red flag. The nuance: the multiple is meaningless without the growth rate beside it — a 0.8x multiple at 10% growth is a lifestyle business, not an efficient one.",
    link: '/saas-burn-multiple-calculator',
    linkLabel: 'Calculate yours with our burn multiple calculator',
  },
  {
    name: 'Rule of 40',
    body: 'Revenue growth rate plus profit margin; 40+ means you are balancing growth and profitability acceptably. The nuance: early-stage companies routinely fail it while investing — it becomes the primary health metric from roughly $20M ARR onward.',
    link: '/rule-of-40-calculator',
    linkLabel: 'Calculate yours with our Rule of 40 calculator',
  },
  {
    name: 'Magic Number',
    body: 'Net new ARR divided by sales and marketing spend; measures go-to-market efficiency directly. Above 1.0 means each acquisition dollar returns more than a dollar of ARR. The nuance: it punishes companies investing ahead of revenue — read it alongside payback period, which captures the timing the magic number ignores.',
    link: '/saas-magic-number-calculator',
    linkLabel: 'Calculate yours with our magic number calculator',
  },
];

export default function SaaSBenchmarksPage() {
  const defaultNiche = SUB_NICHES[0];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://bestsaasmetrics.com/saas-benchmarks#faq',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav selectedNiche={defaultNiche} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <nav className="text-xs text-slate-500 mb-3">
          <Link href="/" className="hover:text-indigo-600">Home</Link> &gt; <span>SaaS Benchmarks 2026</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          SaaS Benchmarks 2026: The Unit Economics Reference
        </h1>
        <p className="text-slate-600 mt-4 leading-relaxed">
          Growth is no longer the argument — efficiency is. In 2026, investors price SaaS companies on how cheaply
          they buy growth, not how fast they spend to get it. This guide collects the <strong>SaaS benchmarks</strong> that
          matter in 2026: CAC payback period, LTV:CAC, churn, net revenue retention, gross margin, burn multiple,
          Rule of 40, and magic number — with median, top-quartile, and elite bands for each.
        </p>
        <p className="text-slate-600 mt-3 leading-relaxed">
          It is written for founders, finance teams, and investors who need a number to compare against, fast. The
          figures below combine our per-cohort benchmark models (eight SaaS go-to-market profiles tracked on this site)
          with the public frameworks the industry actually prices against: Bessemer&apos;s efficiency targets, David
          Skok&apos;s SaaS Metrics 2.0, and David Sacks&apos; burn multiple bands. Benchmarks are directional guides for
          judgment, not audited survey data — compare yourself against your own motion first, the market second.
        </p>

        {/* Master benchmark table */}
        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-4">Master benchmark table: all SaaS metrics, 2026</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-4 py-3 font-bold">Metric</th>
                  <th className="text-left px-4 py-3 font-bold">Median / target</th>
                  <th className="text-left px-4 py-3 font-bold">Top quartile</th>
                  <th className="text-left px-4 py-3 font-bold">Elite</th>
                </tr>
              </thead>
              <tbody>
                {masterBenchmarks.map((row, i) => (
                  <tr key={row.metric} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 font-bold text-slate-900">{row.metric}</td>
                    <td className="px-4 py-3 text-slate-600">{row.median}</td>
                    <td className="px-4 py-3 text-slate-600">{row.top}</td>
                    <td className="px-4 py-3 font-semibold text-indigo-700">{row.elite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Bands are blended across motions; the right target for you depends on ACV and sales cycle (see the
            per-profile table below). Where precise audited medians don&apos;t exist, these are the targets published
            by Bessemer, Skok, and Sacks — the numbers investors actually use.
          </p>
        </section>

        {/* How to use */}
        <section className="mt-10 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-slate-950 mb-3">How to use these benchmarks</h2>
          <p className="text-slate-700 text-sm leading-relaxed">
            Three rules before you compare yourself. <strong>First, match your motion:</strong> a PLG company judging
            itself against enterprise payback bands will either panic unnecessarily or celebrate a number that is
            actually weak for its model. Use the per-profile table below, not the blended master table.{' '}
            <strong>Second, watch the trend, not the snapshot:</strong> a 14-month payback that has held steady for
            four quarters is healthier than a 9-month payback that has stretched three months in two. Investors price
            direction, not just position. <strong>Third, never read one metric alone:</strong> payback without NRR, or
            burn multiple without growth rate, will mislead you. The eight metrics above are a system — weakness in one
            is usually explained by strength in another.
          </p>
        </section>

        {/* Per-metric guides */}
        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-4">What each metric means — and what &ldquo;good&rdquo; looks like in 2026</h2>
          <div className="space-y-4">
            {metricGuides.map((m) => (
              <div key={m.name} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <h3 className="font-bold text-slate-950">{m.name}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{m.body}</p>
                {m.link && (
                  <Link href={m.link} className="inline-block mt-3 text-sm font-bold text-indigo-600 hover:text-indigo-800 hover:underline">
                    {m.linkLabel} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Per-profile table */}
        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-4">Benchmarks by company profile</h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            Your motion determines your numbers. A 16-month payback is a crisis for a bootstrapped founder and a
            Tuesday for an enterprise vendor.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-4 py-3 font-bold">Profile</th>
                  <th className="text-left px-4 py-3 font-bold">CAC Payback</th>
                  <th className="text-left px-4 py-3 font-bold">LTV:CAC</th>
                  <th className="text-left px-4 py-3 font-bold">Monthly Churn</th>
                  <th className="text-left px-4 py-3 font-bold">Gross Margin</th>
                </tr>
              </thead>
              <tbody>
                {profileBenchmarks.map((row, i) => (
                  <tr key={row.profile} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 font-bold">
                      <Link href={`/${row.slug}`} className="text-indigo-700 hover:underline">
                        {row.profile}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{row.payback}</td>
                    <td className="px-4 py-3 text-slate-600">{row.ltvCac}</td>
                    <td className="px-4 py-3 text-slate-600">{row.churn}</td>
                    <td className="px-4 py-3 text-slate-600">{row.margin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            Figures drawn from our cohort benchmark models. The pattern is structural: as ACV rises, payback stretches
            and churn collapses — enterprise tolerates an 18-month payback because 0.9% monthly churn and multi-year
            contracts make the lifetime value enormous. Compare yourself against your row, not the SaaS average.
          </p>
        </section>

        {/* Methodology */}
        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">Methodology</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            These <strong>B2B SaaS benchmarks</strong> are compiled from two sources: (1) our cohort benchmark models
            covering eight go-to-market profiles — enterprise, bootstrapped, PLG, fintech, healthcare, edtech,
            salestech, and devtools — each with modeled CAC, payback, churn, margin, and LTV:CAC bands; and (2) the
            public frameworks investors price against (Bessemer&apos;s Atlas targets, Skok&apos;s SaaS Metrics 2.0,
            Sacks&apos; burn multiple bands). They are directional guides for operator judgment, not audited survey
            results — always benchmark against companies with similar ACV and sales motion before making decisions.
          </p>
        </section>

        {/* FAQs */}
        <section className="mt-10" id="faq">
          <h2 className="text-xl font-black text-slate-950 mb-4">SaaS benchmarks 2026: FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <h3 className="font-bold text-slate-950 text-sm">{faq.question}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Explore links */}
        <section className="mt-10 bg-slate-900 rounded-2xl p-6 text-white">
          <h2 className="text-lg font-black mb-3">Explore the calculators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <Link href="/cac-calculator" className="hover:text-indigo-300 hover:underline">CAC Payback Calculator</Link>
            <Link href="/saas-ltv-calculator" className="hover:text-indigo-300 hover:underline">LTV Calculator</Link>
            <Link href="/saas-churn-rate-calculator" className="hover:text-indigo-300 hover:underline">Churn Rate Calculator</Link>
            <Link href="/saas-magic-number-calculator" className="hover:text-indigo-300 hover:underline">Magic Number Calculator</Link>
            <Link href="/saas-burn-multiple-calculator" className="hover:text-indigo-300 hover:underline">Burn Multiple Calculator</Link>
            <Link href="/rule-of-40-calculator" className="hover:text-indigo-300 hover:underline">Rule of 40 Calculator</Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
