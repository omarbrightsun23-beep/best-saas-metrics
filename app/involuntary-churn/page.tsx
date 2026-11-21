import type { Metadata } from 'next';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';

const pageTitle = "Involuntary Churn: The Revenue You're Losing to Failed Payments (and How to Measure It)";
const pageDescription =
  'Involuntary churn costs SaaS 1.06% of customers a year to failed payments (Recurly). The formula, a worked example, and realistic recovery rates.';
const canonical = 'https://bestsaasmetrics.com/involuntary-churn';
const heroImage = 'https://bestsaasmetrics.com/images/involuntary-churn-dashboard-hero.webp';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical,
  },
  openGraph: {
    title: `${pageTitle} | Best SaaS Metrics`,
    description: pageDescription,
    url: canonical,
    type: 'article',
    siteName: 'Best SaaS Metrics',
    images: [
      {
        url: heroImage,
        width: 1200,
        height: 800,
        alt: 'Laptop in a bright office showing a SaaS analytics dashboard with a churn line falling after payment recovery is switched on',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${pageTitle} | Best SaaS Metrics`,
    description: pageDescription,
    images: [heroImage],
  },
};

const faqs = [
  {
    question: 'What is a good involuntary churn rate for SaaS?',
    answer:
      'Against Recurly\u2019s annual medians, SaaS sits at 1.06% involuntary churn per year (July 2026 data) \u2014 about 0.09% a month in equivalent terms, and about a third of total churn. Judge yourself primarily on the share and on your price band: $10\u201325 plans run 1.30% a year, plans over $250 run 0.18%. If failed payments are causing much more than ~40% of your total churn, your billing operation \u2014 not your product \u2014 is the outlier.',
  },
  {
    question: 'How is involuntary churn different from delinquent churn?',
    answer:
      'They describe the same leak at different stages. Delinquent churn is often used for accounts currently past due and inside the recovery window; involuntary churn is the final count \u2014 accounts actually lost after recovery failed. Report the delinquent number as an early-warning metric and the involuntary number as the result.',
  },
  {
    question: 'Does involuntary churn count in GRR and NRR?',
    answer:
      'Yes. Revenue lost to unrecovered failed payments is churned MRR, so it reduces both gross and net revenue retention exactly like a voluntary cancellation. It is one reason GRR can sag in self-serve segments even when product satisfaction is stable \u2014 see the retention benchmarks on our SaaS benchmarks page.',
  },
  {
    question: 'What share of failed payments should we expect to recover?',
    answer:
      'A well-configured billing platform recovers roughly half from the first failure (Stripe\u2019s published average is 55%, including card account updates). A dedicated dunning layer then recovers a further slice of what remains \u2014 Baremetrics\u2019 May 2026 median across 119 B2B SaaS companies was 12.7% of the post-platform residue. Budget on the stack, not on any single tool\u2019s headline.',
  },
];

const industryBenchmarks = [
  { industry: 'SaaS / software', total: '3.22%', voluntary: '2.16%', involuntary: '1.06%', share: '32.9%' },
  { industry: 'Business & professional services', total: '3.44%', voluntary: '2.27%', involuntary: '1.18%', share: '34.3%' },
  { industry: 'Travel, hospitality & entertainment', total: '3.91%', voluntary: '2.63%', involuntary: '1.28%', share: '32.7%' },
  { industry: 'Digital media & entertainment', total: '4.14%', voluntary: '2.55%', involuntary: '1.59%', share: '38.4%' },
  { industry: 'E-commerce', total: '4.25%', voluntary: '2.87%', involuntary: '1.38%', share: '32.5%' },
  { industry: 'Education', total: '4.99%', voluntary: '3.30%', involuntary: '1.69%', share: '33.9%' },
  { industry: 'All industries', total: '3.60%', voluntary: '2.34%', involuntary: '1.25%', share: '34.7%' },
];

const priceBenchmarks = [
  { band: '$10\u201325', total: '4.29%', involuntary: '1.30%' },
  { band: '$25\u201350', total: '3.84%', involuntary: '1.11%' },
  { band: '$50\u2013100', total: '3.15%', involuntary: '0.74%' },
  { band: '$100\u2013250', total: '2.87%', involuntary: '0.46%' },
  { band: 'Over $250', total: '3.07%', involuntary: '0.18%' },
];

export default function InvoluntaryChurnPage() {
  const defaultNiche = SUB_NICHES[0];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://bestsaasmetrics.com/involuntary-churn#faq',
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
          <Link href="/" className="hover:text-indigo-600">Home</Link> &gt; <span>Involuntary Churn</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">
          Involuntary Churn: The Revenue You&rsquo;re Losing to Failed Payments (and How to Measure It)
        </h1>
        <p className="text-slate-600 mt-4 leading-relaxed">
          <strong>The short answer:</strong> involuntary churn is the share of your customers who lose access not
          because they decided to leave, but because their payment failed and was never recovered — an expired card,
          an issuer decline, insufficient funds. In Recurly&rsquo;s benchmark network (data updated July 2026), SaaS
          companies lose a median of <strong>1.06% of customers a year</strong> this way, out of 3.22% total annual
          churn — so roughly <strong>one in three churned SaaS customers never chose to leave</strong>. It is usually
          the cheapest churn you have to fix, because the customer still wants the product. This guide covers how to
          calculate your own rate correctly, how it separates from voluntary churn, what the benchmarks actually say
          (and where they conflict), and what recovery rates are realistic once you start fixing it.
        </p>

        <img
          src="/images/involuntary-churn-dashboard-hero.webp"
          alt="Laptop in a bright office showing a SaaS analytics dashboard with a churn line falling after payment recovery is switched on"
          className="w-full rounded-2xl border border-slate-200 shadow-xs mt-8"
          width={1200}
          height={800}
        />

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">What involuntary churn is — and what it is not</h2>
          <p className="text-slate-600 leading-relaxed">
            Every cancelled subscription ends for one of two reasons:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>
              <strong>Voluntary churn</strong> — the customer acts: they cancel, downgrade to free, or let a contract
              lapse on purpose. The cause is product, price, fit or budget.
            </li>
            <li>
              <strong>Involuntary churn</strong> — the payment acts: the renewal charge fails, the recovery attempts
              fail, and the subscription is cancelled by the billing system. The customer may not even know it
              happened.
            </li>
          </ul>
          <p className="text-slate-600 mt-3 leading-relaxed">
            The distinction matters because the fixes are completely different. Voluntary churn is fought with
            onboarding, product work and pricing. Involuntary churn is fought with payment operations: card updaters,
            retry logic, dunning emails and grace periods. Teams that track only one blended churn number cannot tell
            which fight they are losing — and routinely spend product budget on what is actually a billing problem.
          </p>

          <h3 className="font-bold text-slate-950 mt-6">What causes a payment to fail</h3>
          <p className="text-slate-600 mt-2 leading-relaxed">
            Failed renewals fall into two decline families:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>
              <strong>Soft declines</strong> are temporary: insufficient funds, issuer processing errors, temporary
              holds, daily-limit breaches. The card is fine; the timing or the balance is not. In dunning vendor
              Slicker&rsquo;s customer data, soft declines make up roughly 65% of failed payments — treat that as one
              vendor&rsquo;s dataset rather than an industry census, but the direction is consistent everywhere: most
              failures are recoverable in principle.
            </li>
            <li>
              <strong>Hard declines</strong> are permanent: lost, stolen or closed cards, revoked authorisation. No
              retry will ever succeed; the only fix is the customer supplying a new payment method, which is why hard
              declines are won or lost on messaging, not retry logic.
            </li>
          </ul>
          <p className="text-slate-600 mt-3 leading-relaxed">
            Cards also expire. A card issued for three years means a meaningful slice of your base hits an expiry date
            every month — which is why so much of involuntary-churn prevention is about credentials being refreshed
            before the renewal attempt ever happens.
          </p>
          <img
            src="/images/failed-payment-declined-card-phone.webp"
            alt="Smartphone beside a laptop showing a declined-card payment alert — the moment an involuntary churn case begins"
            className="w-full rounded-2xl border border-slate-200 shadow-xs mt-6"
            width={1200}
            height={800}
            loading="lazy"
          />
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">How to calculate involuntary churn</h2>
          <p className="text-slate-600 leading-relaxed">
            You need four numbers from your billing system for the period (usually a month): customers at the start,
            customers lost to unrecovered failed payments, customers lost to voluntary cancellation, and the
            failed-payment detail (first-attempt failures and how many were later paid).
          </p>

          <p className="font-bold text-slate-950 mt-6">Involuntary churn rate (logo):</p>
          <div className="bg-slate-900 text-white rounded-2xl px-5 py-4 mt-2 overflow-x-auto">
            <code className="font-mono text-sm">Involuntary churn rate = Customers lost to unrecovered failed payments ÷ Customers at start of period × 100</code>
          </div>

          <p className="font-bold text-slate-950 mt-6">Involuntary revenue churn rate:</p>
          <div className="bg-slate-900 text-white rounded-2xl px-5 py-4 mt-2 overflow-x-auto">
            <code className="font-mono text-sm">Involuntary revenue churn = MRR lost to unrecovered failed payments ÷ Starting MRR × 100</code>
          </div>

          <p className="font-bold text-slate-950 mt-6">
            Involuntary share of total churn — the number that tells you how much of your churn problem is a billing problem:
          </p>
          <div className="bg-slate-900 text-white rounded-2xl px-5 py-4 mt-2 overflow-x-auto">
            <code className="font-mono text-sm">Involuntary share = Customers lost to failed payments ÷ All customers lost × 100</code>
          </div>

          <p className="font-bold text-slate-950 mt-6">And the two payment-operations rates that drive it:</p>
          <div className="bg-slate-900 text-white rounded-2xl px-5 py-4 mt-2 overflow-x-auto">
            <code className="font-mono text-sm">Failed payment rate = First-attempt failures ÷ Renewal attempts × 100</code>
          </div>
          <div className="bg-slate-900 text-white rounded-2xl px-5 py-4 mt-3 overflow-x-auto">
            <code className="font-mono text-sm">Recovery rate = Failed payments later paid ÷ Failed payments × 100</code>
          </div>

          <p className="text-slate-600 mt-6 leading-relaxed">
            Three measurement rules decide whether your number means anything:
          </p>
          <ol className="list-decimal pl-6 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>
              <strong>Count a customer as involuntarily churned only when recovery has finished and failed</strong> —
              at the end of your dunning cycle, not at the first decline. A first failure is an incident, not a churn
              event; most first failures are recovered.
            </li>
            <li>
              <strong>Fix your recovery window and keep it.</strong> Recovery rate measured over 7 days and over 30
              days are different statistics. Pick one window (30 days from first failure is the common convention) and
              never change it mid-trend.
            </li>
            <li>
              <strong>Never mix monthly and annual figures.</strong> A monthly logo churn rate and an annual
              subscriber churn rate differ by an order of magnitude. Convert properly, with compounding:{' '}
              <code className="font-mono text-sm bg-slate-100 px-1 rounded">Annual = 1 − (1 − monthly)^12</code>, and{' '}
              <code className="font-mono text-sm bg-slate-100 px-1 rounded">Monthly = 1 − (1 − annual)^(1/12)</code>.
              Most of the &ldquo;conflicting benchmarks&rdquo; in this niche are just these two units quoted side by side.
            </li>
          </ol>

          <h3 className="font-bold text-slate-950 mt-8">Worked example</h3>
          <p className="text-slate-600 mt-2 leading-relaxed">
            A self-serve SaaS company starts the month with <strong>5,000 customers</strong> paying an average of{' '}
            <strong>$30/month — $150,000 MRR</strong>. During the month:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>
              <strong>Step 1 — failures.</strong> 320 renewal payments fail on the first attempt. Failed payment rate
              = 320 ÷ 5,000 = <strong>6.4%</strong>. Revenue at risk: 320 × $30 = <strong>$9,600</strong>.
            </li>
            <li>
              <strong>Step 2 — recovery.</strong> Within the dunning window, 192 of the failed payments are eventually
              paid. Recovery rate = 192 ÷ 320 = <strong>60%</strong>. Recovered revenue: 192 × $30 ={' '}
              <strong>$5,760</strong>.
            </li>
            <li>
              <strong>Step 3 — involuntary losses.</strong> 320 − 192 = <strong>128 customers</strong> are cancelled
              by the billing system. Lost MRR: 128 × $30 = <strong>$3,840</strong>.
            </li>
            <li>
              <strong>Step 4 — voluntary losses.</strong> Separately, 210 customers cancel on purpose.
            </li>
          </ul>
          <p className="text-slate-600 mt-4 leading-relaxed">Now the rates:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li><strong>Involuntary churn rate</strong> = 128 ÷ 5,000 = <strong>2.56% for the month</strong></li>
            <li><strong>Voluntary churn rate</strong> = 210 ÷ 5,000 = <strong>4.20% for the month</strong></li>
            <li><strong>Total logo churn</strong> = (128 + 210) ÷ 5,000 = <strong>6.76% for the month</strong></li>
            <li>
              <strong>Involuntary share of churn</strong> = 128 ÷ 338 = <strong>37.9%</strong> — inside the 20–40%
              band Paddle has long used to describe involuntary churn&rsquo;s share of total churn
            </li>
            <li>
              <strong>Involuntary revenue churn</strong> = $3,840 ÷ $150,000 = <strong>2.56%</strong> — identical to
              the logo rate here only because every customer pays the same $30. When failures concentrate in your
              cheapest plans (they usually do), revenue churn runs <em>below</em> logo churn; when they hit enterprise
              cards, it runs above it. Track both.
            </li>
          </ul>
          <p className="text-slate-600 mt-4 leading-relaxed">Two ways to see what this leak costs:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>
              <strong>Direct cost:</strong> unrecovered failed revenue = $9,600 × (1 − 60%) ={' '}
              <strong>$3,840 of MRR per month</strong>. Twelve identical months remove{' '}
              <strong>$46,080 from the ARR run-rate</strong> — before counting the future months those customers would
              have stayed for.
            </li>
            <li>
              <strong>The improvement case:</strong> lifting recovery from 60% to 70% recovers 224 payments instead of
              192, loses 96 customers instead of 128, and keeps an extra{' '}
              <strong>32 customers and $960 of MRR every month</strong>. The involuntary churn rate falls from 2.56%
              to 1.92%. On a fixed failure base, recovery points are worth more than most acquisition experiments —
              the customers are already sold.
            </li>
          </ul>
          <p className="text-slate-600 mt-4 leading-relaxed">
            For comparison, this company&rsquo;s 2.56% <em>monthly</em> involuntary rate compounds to roughly 26.7%
            annualised (1 − (1 − 0.0256)^12) — far above the Recurly median below. That gap is mostly measurement, not
            performance: Recurly&rsquo;s medians are annual rates across a billing network heavy with established and
            annual-plan businesses, while a $30 self-serve product lives at the harsh end of every churn table.
            Compare like with like, and use the <em>share</em> (≈ one third) as the portable benchmark. Run your own
            totals through our{' '}
            <Link href="/saas-churn-rate-calculator" className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">
              SaaS churn rate calculator
            </Link>{' '}
            to see the logo, GRR and NRR picture together.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">Benchmarks: what the data actually says</h2>
          <p className="text-slate-600 leading-relaxed">
            The most complete current source is <strong>Recurly&rsquo;s churn rate benchmarks</strong>, drawn from its
            billing network (2,200+ subscription businesses, 76 million subscribers) and updated with{' '}
            <strong>July 2026</strong> data. Recurly reports <strong>median annual</strong> churn rates — annual, not
            monthly; that label is the single most-mangled fact in this niche.
          </p>

          <p className="font-bold text-slate-950 mt-6">Median annual churn by industry (Recurly, July 2026):</p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-4 py-3 font-bold">Industry</th>
                  <th className="text-left px-4 py-3 font-bold">Total</th>
                  <th className="text-left px-4 py-3 font-bold">Voluntary</th>
                  <th className="text-left px-4 py-3 font-bold">Involuntary</th>
                  <th className="text-left px-4 py-3 font-bold">Involuntary share</th>
                </tr>
              </thead>
              <tbody>
                {industryBenchmarks.map((row, i) => (
                  <tr key={row.industry} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 font-bold text-slate-900">{row.industry}</td>
                    <td className="px-4 py-3 text-slate-600">{row.total}</td>
                    <td className="px-4 py-3 text-slate-600">{row.voluntary}</td>
                    <td className="px-4 py-3 font-semibold text-indigo-700">{row.involuntary}</td>
                    <td className="px-4 py-3 text-slate-600">{row.share}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            (Share column calculated from Recurly&rsquo;s published voluntary/involuntary split. Top-quartile SaaS
            companies hold <em>total</em> annual churn to 1.78% or below.)
          </p>

          <p className="text-slate-600 mt-4 leading-relaxed">
            Read in monthly terms, the SaaS involuntary median of 1.06% a year is about <strong>0.09% a month</strong>{' '}
            (1 − (1 − 0.0106)^(1/12)). If your monthly involuntary logo churn is several percent — normal for low-priced
            self-serve products — you are not necessarily 30× worse than benchmark; you are measuring a different
            population on a different clock. What should match is the structure: about a third of churn involuntary,
            and involuntary churn falling steeply as price rises.
          </p>

          <p className="font-bold text-slate-950 mt-6">Median annual involuntary churn by price (Recurly, July 2026):</p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs mt-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="text-left px-4 py-3 font-bold">Monthly revenue per customer</th>
                  <th className="text-left px-4 py-3 font-bold">Total churn</th>
                  <th className="text-left px-4 py-3 font-bold">Involuntary churn</th>
                </tr>
              </thead>
              <tbody>
                {priceBenchmarks.map((row, i) => (
                  <tr key={row.band} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 font-bold text-slate-900">{row.band}</td>
                    <td className="px-4 py-3 text-slate-600">{row.total}</td>
                    <td className="px-4 py-3 font-semibold text-indigo-700">{row.involuntary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 mt-4 leading-relaxed">
            Involuntary churn falls by more than 85% from the cheapest band to the most expensive (1.30% → 0.18%). The
            mechanism is mundane: cheap plans sit on consumer debit cards that hit balance limits; expensive plans sit
            on corporate cards watched by finance teams who fix a decline the day it happens. Benchmark yourself
            against your price band first and your industry second. The full benchmark set, including GRR and NRR
            medians, is on our{' '}
            <Link href="/saas-benchmarks" className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">
              SaaS benchmarks
            </Link>{' '}
            page.
          </p>

          <img
            src="/images/saas-revenue-recovery-review.webp"
            alt="SaaS founder reviewing revenue and retention charts on a monitor while measuring involuntary churn"
            className="w-full rounded-2xl border border-slate-200 shadow-xs mt-6"
            width={1200}
            height={800}
            loading="lazy"
          />
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">What recovery rate is realistic? The 55% vs 12.7% problem</h2>
          <p className="text-slate-600 leading-relaxed">
            Search this topic and you will find two numbers that appear to contradict each other:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>
              <strong>Stripe</strong> reports that its automated tools — Smart Retries plus card account updates —
              recover <strong>55% of failed payments on average</strong>, measured from the first failure across Stripe
              Billing.
            </li>
            <li>
              <strong>Baremetrics&rsquo;</strong> May 2026 recovery benchmark reports a{' '}
              <strong>median attempted recovery rate of 12.7%</strong> across 119 US B2B SaaS companies using its
              Recover product.
            </li>
          </ul>
          <p className="text-slate-600 mt-3 leading-relaxed">
            Both can be true, because they measure different layers of the same funnel. Stripe&rsquo;s 55% is the{' '}
            <em>platform layer</em>: everything the billing system itself does from the first decline, including
            silently refreshing expired card credentials before a retry. Baremetrics&rsquo; 12.7% is an{' '}
            <em>add-on dunning layer</em> measured on the residue — the failures still unpaid after the platform&rsquo;s
            own retries already recovered the easy ones. A rate counted on leftovers will always look small next to a
            rate counted from the start.
          </p>
          <p className="text-slate-600 mt-3 leading-relaxed">
            Stacked honestly, the two medians imply something like this per 100 failed payments (illustrative
            arithmetic, not a benchmark): the platform recovers ~55; of the ~45 remaining, a dunning layer at the
            12.7% median recovers ~6 more; roughly <strong>61 of 100 failures end up paid, and ~39 become involuntary
            churn</strong> unless the customer acts. Your mileage will move with your decline mix — a base heavy in
            insufficient-funds soft declines recovers better than one heavy in stolen-card hard declines.
          </p>
          <p className="text-slate-600 mt-3 leading-relaxed">
            Two vendor claims to hold at arm&rsquo;s length: dunning tools commonly advertise relative uplifts (20% is
            a typical claim) rather than absolute recovery — an uplift on a small residue is a small number of
            customers. And any recovery figure quoted without its window, its starting point and whether it is
            count-based or revenue-based is marketing, not a benchmark. Measure your own stack&rsquo;s{' '}
            <em>incremental</em> recovery — recovered payments that would not have been paid anyway — before paying for
            anyone&rsquo;s.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">The recovery levers, in the order they pay off</h2>
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h3 className="font-bold text-slate-950">1. Prevent the failure: card account updater and network tokens</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                When a card is replaced, updater services and network tokens refresh the credential on file
                automatically, so the renewal never declines. This is prevention, not recovery — it is inside
                Stripe&rsquo;s 55% figure and cannot be separated from it, which is exactly why it ranks first: a
                failure that never happens needs no dunning at all. Make sure it is enabled in your billing platform
                before buying anything else.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h3 className="font-bold text-slate-950">2. Pre-dunning: expiry warnings before the renewal</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                An email 30, 7 and 1 days before a card expires, with a one-click update link, converts next
                month&rsquo;s hard problem into this month&rsquo;s two-minute task. It only reaches customers whose
                cards are near expiry — a small, knowable list — and it is the cheapest lever on this page.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h3 className="font-bold text-slate-950">3. Retry logic: timing, not volume</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Soft declines are timing problems: insufficient funds clears after payday, issuer glitches pass, limits
                reset. Smart-retry systems time attempts to the decline reason instead of retrying on a fixed schedule.
                Respect the networks&rsquo; ceilings — card-network rules cap retries (Visa&rsquo;s guidance, for
                example, allows up to 15 attempts in a rolling 30-day window, per Checkout.com&rsquo;s retry
                documentation) and some decline codes must never be retried at all. More attempts past the cap buys
                fees and risk, not revenue.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h3 className="font-bold text-slate-950">4. Dunning emails that say what happened</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                During the recovery window, a short sequence — immediate notice, mid-window reminder, final warning
                before cancellation — each naming the problem (&ldquo;your card ending 4417 was declined&rdquo;) and
                linking to a hosted update page that needs no password reset. Judge this layer against the Baremetrics
                median: recovering roughly an eighth of what the platform left behind is a <em>median</em> outcome, not
                a poor one.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h3 className="font-bold text-slate-950">5. Grace periods and in-app prompts</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Cancelling access on the first failed attempt converts a recoverable payment into a churn decision. A
                grace period of several days, with a persistent in-app banner while the account is past due, catches
                the large group of customers who never open email. The customer experiences a reminder, not an eviction.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <h3 className="font-bold text-slate-950">6. A backup payment method</h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Ask for a second card (or an alternative method such as ACH/direct debit where it fits) at signup or at
                the first failure. Backup credentials turn many hard declines into a non-event, and direct debit
                sidesteps card expiry entirely for the customers who adopt it.
              </p>
            </div>
          </div>
          <p className="text-slate-600 mt-4 leading-relaxed">
            Sequenced this way, the stack attacks the funnel in order: fewer failures (1–2), more of the rest recovered
            automatically (3), more of the remainder rescued by the customer (4–6). What is left after all six is your
            true involuntary churn — and at that point, further gains come from decline-mix and pricing, not more
            emails.
          </p>
        </section>

        <section className="mt-10" id="faq">
          <h2 className="text-xl font-black text-slate-950 mb-4">Involuntary churn: FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <h3 className="font-bold text-slate-950 text-sm">{faq.question}</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-slate-950 mb-3">Next steps</h2>
          <p className="text-slate-700 text-sm leading-relaxed">
            Split your own churn into voluntary and involuntary for the last three months — if you only track the
            blend, start there. Then run the totals through the{' '}
            <Link href="/saas-churn-rate-calculator" className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline">
              SaaS churn rate calculator
            </Link>{' '}
            and compare your structure against the full{' '}
            <Link href="/saas-benchmarks" className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline">
              SaaS benchmarks
            </Link>{' '}
            set. The cheapest growth most SaaS companies own is the revenue already failing at the payment step.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
