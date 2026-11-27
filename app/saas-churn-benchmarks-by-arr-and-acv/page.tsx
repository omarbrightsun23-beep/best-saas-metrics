import type { Metadata } from 'next';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';

const pageTitle = 'SaaS Churn Benchmarks by ARR Band and ACV (2026, Every Figure Sourced)';
const pageDescription =
  'SaaS churn benchmarks by ARR band and ACV for 2026: sourced NRR, GRR and logo churn medians, the honest monthly-to-annual conversion, and how to find your row.';
const canonical = 'https://bestsaasmetrics.com/saas-churn-benchmarks-by-arr-and-acv';
const heroImage = 'https://bestsaasmetrics.com/images/saas-churn-benchmarks-dashboard-hero.webp';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical },
  openGraph: {
    title: `${pageTitle} | Best SaaS Metrics`,
    description: pageDescription,
    url: canonical,
    type: 'article',
    siteName: 'Best SaaS Metrics',
    images: [{ url: heroImage, width: 1200, height: 800, alt: 'SaaS analytics dashboard on a monitor showing abstract churn trend charts' }],
  },
  twitter: { card: 'summary_large_image', title: `${pageTitle} | Best SaaS Metrics`, description: pageDescription, images: [heroImage] },
};

const faqs = [
  { question: 'What is a good churn rate for SaaS?', answer: 'There is no segment-free answer. On the sourced figures here: median annual GRR runs from 84% (Aleph × Benchmarkit 2026, n=342) to 91% (SaaS Capital 2025, n=1,000+) — gross revenue churn of about 9–16% a year — while median GRR by ACV runs from 85% under $10k ACV to 88–90% over $100k ACV (Benchmarkit 2025). \u201CGood\u201D means at or better than the median for your ACV band, segment and motion.' },
  { question: 'What is a good monthly logo churn rate?', answer: 'Convert your band\u2019s annual figures rather than borrowing a monthly rule of thumb. Annual gross revenue churn of 15% (the under-$10k ACV GRR median) compounds back to roughly 1.35% a month on a revenue basis; logo churn for small-account books typically runs higher, because small accounts cancel most often. Any monthly figure quoted without segment and basis is unlabelled, not a benchmark.' },
  { question: 'Why do two reputable benchmark reports give different NRR medians?', answer: 'Usually because their samples differ: survey samples (NRR medians of 101–102% here) skew toward larger, sales-led companies; billing-platform samples (82% here) include far more small, self-serve companies. See the ChartMogul discussion above, labelled as an explanation of method rather than a measured decomposition.' },
];

const headlineBenchmarks = [
  { metric: 'NRR — median', figure: '102%', source: 'Aleph × Benchmarkit 2026', sample: '342 companies', year: 'CY2025' },
  { metric: 'GRR — median', figure: '84%', source: 'Aleph × Benchmarkit 2026', sample: '342 companies', year: 'CY2025' },
  { metric: 'NRR — median', figure: '101%', source: 'SaaS Capital 2025', sample: '1,000+ companies', year: '2025' },
  { metric: 'GRR — median', figure: '91%', source: 'SaaS Capital 2025', sample: '1,000+ companies', year: '2025' },
  { metric: 'NRR — median', figure: '82%', source: 'ChartMogul, Dec 2025', sample: '≈2,700 companies', year: '2025' },
];

const acvBenchmarks = [
  { band: 'Under $10k ACV', grr: '85%', source: 'Benchmarkit 2025', sample: 'n≈225–228', year: '2025' },
  { band: 'Over $100k ACV', grr: '88–90%', source: 'Benchmarkit 2025', sample: 'n≈225–228', year: '2025' },
];

const segmentBenchmarks = [
  { segment: 'SMB', nrr: '≈97%', basis: 'Secondary citation (via RetentionLens)' },
  { segment: 'Mid-market', nrr: '≈108%', basis: 'Secondary citation (via RetentionLens)' },
  { segment: 'Enterprise', nrr: '≈118%', basis: 'Secondary citation (via RetentionLens)' },
];

const motionBenchmarks = [
  { cut: 'Product-led growth (PLG) motion', figure: '79%', metric: 'GRR — median, annual', source: 'Aleph × Benchmarkit 2026 (n=342)' },
  { cut: 'Sales-led motion', figure: '88%', metric: 'GRR — median, annual', source: 'Aleph × Benchmarkit 2026 (n=342)' },
  { cut: 'Usage-based pricing', figure: '108%', metric: 'NRR — median, annual', source: 'Aleph × Benchmarkit 2026 (n=342)' },
  { cut: 'Seat-based pricing', figure: '98%', metric: 'NRR — median, annual', source: 'Aleph × Benchmarkit 2026 (n=342)' },
];

export default function SaasChurnBenchmarksPage() {
  const defaultNiche = SUB_NICHES[0];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://bestsaasmetrics.com/saas-churn-benchmarks-by-arr-and-acv#faq',
    mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav selectedNiche={defaultNiche} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <nav className="text-xs text-slate-500 mb-3"><Link href="/" className="hover:text-indigo-600">Home</Link> &gt; <span>SaaS Churn Benchmarks by ARR Band and ACV</span></nav>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">SaaS Churn Benchmarks by ARR Band and ACV (2026, Every Figure Sourced)</h1>
        <p className="text-slate-600 mt-4 leading-relaxed"><strong>Quick answer:</strong> There is no single &ldquo;good churn rate&rdquo; for SaaS — only a good rate <em>for your segment</em>. On the sourced figures below, median gross revenue retention (GRR) sits between 84% and 91% a year and median net revenue retention (NRR) between 82% and 102%, with the spread explained by who is in each sample, not by anyone&rsquo;s arithmetic being wrong. Where you should land depends first on your average contract value (ACV): median GRR is about 85% under $10k ACV, rising to 88–90% above $100k ACV (Benchmarkit 2025, n≈225–228). Find your ACV row first, then cross-check against your ARR band and sales motion — and never compare a monthly logo churn figure against an annual revenue retention figure, the most common reason published benchmark pages appear to contradict themselves.</p>
        <img src="/images/saas-churn-benchmarks-dashboard-hero.webp" alt="SaaS analytics dashboard on a monitor showing abstract churn trend charts" className="w-full rounded-2xl border border-slate-200 shadow-xs mt-8" width={1200} height={800} />
        <p className="text-slate-500 text-sm mt-4 leading-relaxed"><em>General information only: the benchmarks in this article are survey and platform data about other companies, from the sources and years cited. They are not a guarantee of your results, a target anyone promises you can hit, or a substitute for measuring your own cohorts.</em></p>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">First, why published churn benchmarks contradict themselves</h2>
          <p className="text-slate-600 leading-relaxed">Search for a good churn rate and you will find pages that cannot all be true at once. This is usually not dishonesty; it is three different statistics quoted under one name.</p>
          <p className="text-slate-600 mt-4 leading-relaxed"><strong>Logo churn vs revenue churn.</strong> Logo (customer) churn counts <em>accounts</em> lost; revenue churn counts <em>money</em> lost. A company selling $20/month plans to thousands of small businesses will show higher logo churn than one selling $200k contracts to forty enterprises, even if both retain revenue equally well — small accounts cancel more often, and each cancellation is a smaller share of revenue.</p>
          <p className="text-slate-600 mt-4 leading-relaxed"><strong>Monthly vs annual mixing.</strong> A monthly rate and an annual rate are related by compounding, not by multiplying by 12 (worked example below). Pages that place a monthly figure from one source beside an annual figure from another — or convert with the ×12 shortcut — manufacture contradictions out of consistent data. One factual example: the Sigos benchmarks page (dated 27 November 2025) gives SMB monthly churn of 3–7% in its table, which compounds to roughly 31–58% a year, while its own text describes SMB annual churn as 3–5%. Both cannot describe the same population on the same basis, and the page gives no sample sizes to work out which basis each figure uses. This article avoids that failure mode: every figure carries its metric, period, source, sample size and data year, and logo churn, revenue churn, GRR and NRR are never blended into one row.</p>
          <p className="text-slate-600 mt-4 leading-relaxed">For the underlying definitions and formulas, start with <Link href="/how-to-calculate-churn-rate" className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">how to calculate churn rate</Link> and <Link href="/nrr-vs-grr" className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">NRR vs GRR</Link>.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">The four metrics, kept separate</h2>
          <p className="text-slate-600 leading-relaxed">Every table here uses exactly these definitions, on an <strong>annual</strong> basis unless a row says otherwise:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li><strong>Logo churn</strong> — customers lost in the period ÷ customers at the start of the period. Counts accounts, ignores what they paid.</li>
            <li><strong>Gross revenue churn</strong> — revenue lost to cancellations and downgrades ÷ revenue at the start of the period. Counts money, ignores expansion.</li>
            <li><strong>GRR (gross revenue retention)</strong> — 100% minus gross revenue churn, same period basis. Never above 100%.</li>
            <li><strong>NRR (net revenue retention)</strong> — GRR plus expansion revenue from the surviving base (upsells, seat and usage growth). Can exceed 100%, and at enterprise segment usually does.</li>
          </ul>
          <p className="text-slate-600 mt-4 leading-relaxed">GRR asks &ldquo;how much of last year&rsquo;s revenue did we keep, before expansion?&rdquo; NRR asks &ldquo;what did last year&rsquo;s cohort become worth this year?&rdquo; The two can diverge sharply — mediocre GRR with excellent NRR, if a minority of accounts expand hard — so they are always separate rows here, never averaged.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">The headline retention benchmarks, by source</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs mt-3">
            <table className="w-full text-sm"><thead><tr className="bg-slate-900 text-white"><th className="text-left px-4 py-3 font-bold">Metric (annual)</th><th className="text-left px-4 py-3 font-bold">Figure</th><th className="text-left px-4 py-3 font-bold">Source</th><th className="text-left px-4 py-3 font-bold">Sample</th><th className="text-left px-4 py-3 font-bold">Data year</th></tr></thead>
            <tbody>{headlineBenchmarks.map((row, i) => (<tr key={`${row.metric}-${row.source}`} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}><td className="px-4 py-3 font-bold text-slate-900">{row.metric}</td><td className="px-4 py-3 font-semibold text-indigo-700">{row.figure}</td><td className="px-4 py-3 text-slate-600">{row.source}</td><td className="px-4 py-3 text-slate-600">{row.sample}</td><td className="px-4 py-3 text-slate-600">{row.year}</td></tr>))}</tbody></table>
          </div>
          <p className="text-slate-600 mt-6 leading-relaxed">Read this as three measurements of three populations, not a disagreement to be averaged away. The survey-based NRR medians (102% and 101%) agree closely; their GRR medians do not (84% vs 91%), and Aleph × Benchmarkit note their GRR median fell from 88% in the prior year&rsquo;s report to 84% — a benchmark is a snapshot of a sample in a year, not a constant of nature. The cuts by ACV, segment and motion below are where the usable guidance lives.</p>
          <h3 className="font-bold text-slate-950 mt-8">Why ChartMogul&rsquo;s 82% NRR is not &ldquo;worse performance&rdquo;</h3>
          <p className="text-slate-600 mt-2 leading-relaxed">The ChartMogul figure comes from live billing data across roughly 2,700 companies, not a survey. <em>Explanation of method, offered as an explanation rather than a measured finding:</em> a billing-platform population contains far more small, self-serve and SMB-heavy companies than a survey population, whose respondents skew toward larger, finance-led businesses. Self-serve SMB customers expand less and cancel more, so a sample weighted toward them mechanically produces a lower median NRR — even if every company in both samples performed identically to its peers. Both 82% and 102% can be accurate medians of their samples. Benchmark against the dataset whose mix resembles yours: heavy self-serve and SMB exposure points to the billing-data end; a sales-led, mid-market-or-up book points to the survey end.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">Benchmarks by ACV: the cut that matters most</h2>
          <p className="text-slate-600 leading-relaxed">Average contract value is the strongest single predictor of retention in the published cuts, because contract size tracks switching costs, procurement scrutiny and how many stakeholders would notice the tool disappearing.</p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs mt-3">
            <table className="w-full text-sm"><thead><tr className="bg-slate-900 text-white"><th className="text-left px-4 py-3 font-bold">ACV band</th><th className="text-left px-4 py-3 font-bold">GRR — median (annual)</th><th className="text-left px-4 py-3 font-bold">Source</th><th className="text-left px-4 py-3 font-bold">Sample</th><th className="text-left px-4 py-3 font-bold">Data year</th></tr></thead>
            <tbody>{acvBenchmarks.map((row, i) => (<tr key={row.band} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}><td className="px-4 py-3 font-bold text-slate-900">{row.band}</td><td className="px-4 py-3 font-semibold text-indigo-700">{row.grr}</td><td className="px-4 py-3 text-slate-600">{row.source}</td><td className="px-4 py-3 text-slate-600">{row.sample}</td><td className="px-4 py-3 text-slate-600">{row.year}</td></tr>))}</tbody></table>
          </div>
          <p className="text-slate-600 mt-6 leading-relaxed">An 85% GRR means 15% of the starting revenue base is lost each year to cancellations and downgrades before expansion; at 88–90% GRR that leak narrows to 10–12%. Note what this does to the &ldquo;is my churn good?&rdquo; question. Sell a $4,000-a-year product at 86% GRR and you are at or slightly above your band&rsquo;s median — not failing against an enterprise benchmark you were never part of. Sell a $150,000-a-year product at 86% GRR and you are below your band&rsquo;s median. Same number, opposite verdicts; the band decides.</p>
          <p className="text-slate-600 mt-4 leading-relaxed">ACV bands and ARR bands overlap but are not interchangeable: a $3M ARR company might be 750 customers at $4k ACV or 25 customers at $120k ACV, and those two should expect very different retention. Hence the decision section below: find your ACV row <em>first</em>, use ARR only as a cross-check.</p>
          <img src="/images/founder-reviewing-churn-by-segment-charts.webp" alt="Founder at a desk reviewing printed segment benchmark charts next to a laptop" className="w-full rounded-2xl border border-slate-200 shadow-xs mt-6" width={1200} height={800} loading="lazy" />
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">Benchmarks by segment and ARR band</h2>
          <p className="text-slate-600 leading-relaxed">Segment medians for NRR show the same gradient as the ACV cut, from the customer side:</p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs mt-3">
            <table className="w-full text-sm"><thead><tr className="bg-slate-900 text-white"><th className="text-left px-4 py-3 font-bold">Segment</th><th className="text-left px-4 py-3 font-bold">NRR — median (annual)</th><th className="text-left px-4 py-3 font-bold">Basis</th></tr></thead>
            <tbody>{segmentBenchmarks.map((row, i) => (<tr key={row.segment} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}><td className="px-4 py-3 font-bold text-slate-900">{row.segment}</td><td className="px-4 py-3 font-semibold text-indigo-700">{row.nrr}</td><td className="px-4 py-3 text-slate-600">{row.basis}</td></tr>))}</tbody></table>
          </div>
          <p className="text-slate-600 mt-6 leading-relaxed">These figures are labelled honestly: they reach this article as <strong>secondary citations</strong> — medians cited by RetentionLens rather than read from a primary report with a stated sample size — so treat them as directional, not precise to the point. Their shape matches what the primary sources imply: an SMB median just under 100% means the typical SMB-heavy book roughly holds its revenue year to year; an enterprise median near 118% means the typical enterprise book grows existing-customer revenue by close to a fifth annually before a single new logo is signed.</p>
          <p className="text-slate-600 mt-4 leading-relaxed">ARR band enters as a proxy rather than a primary cut, because the primary sources segment by ACV, segment and motion rather than publishing clean ARR-band tables. In practice the bands travel together: sub-$1M ARR companies are usually SMB- and self-serve-heavy; $1M–$10M ARR companies are typically mixed, with mid-market exposure pulling NRR toward or past 100%; above $10M ARR, enterprise books sit closest to the enterprise medians. Use ARR band to decide <em>which segment row probably describes your mix</em> — then confirm against your actual ACV. If the two point at different rows, believe the ACV.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">Benchmarks by motion and pricing model</h2>
          <p className="text-slate-600 leading-relaxed">How you sell moves retention almost as much as what you charge:</p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs mt-3">
            <table className="w-full text-sm"><thead><tr className="bg-slate-900 text-white"><th className="text-left px-4 py-3 font-bold">Cut</th><th className="text-left px-4 py-3 font-bold">Figure</th><th className="text-left px-4 py-3 font-bold">Metric</th><th className="text-left px-4 py-3 font-bold">Source</th></tr></thead>
            <tbody>{motionBenchmarks.map((row, i) => (<tr key={row.cut} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}><td className="px-4 py-3 font-bold text-slate-900">{row.cut}</td><td className="px-4 py-3 font-semibold text-indigo-700">{row.figure}</td><td className="px-4 py-3 text-slate-600">{row.metric}</td><td className="px-4 py-3 text-slate-600">{row.source}</td></tr>))}</tbody></table>
          </div>
          <p className="text-slate-600 mt-6 leading-relaxed">The nine-point GRR gap between PLG (79%) and sales-led (88%) is largely the ACV effect in different clothes: self-serve products are cheaper, easier to start and easier to leave, with no procurement process anchoring the account. It does not follow that PLG is a worse business — PLG books typically grow the funnel far faster — but a PLG founder comparing their GRR against a blended benchmark is grading themselves on the wrong curve.</p>
          <p className="text-slate-600 mt-4 leading-relaxed">The pricing-model gap runs the other way: usage-based pricing posts a median NRR of 108% against 98% for seat-based pricing in the same dataset, because usage revenue expands automatically when customers grow, while seat counts are renegotiated, audited and trimmed. Seat-based with NRR in the high 90s means you are at your model&rsquo;s median; the lever is the mechanics of seat expansion and contraction in your contracts.</p>
          <p className="text-slate-600 mt-4 leading-relaxed">One more component belongs in any honest churn picture: a share of revenue churn is not a decision at all. Failed payments and expired cards cancel subscriptions nobody chose to end, and that slice is recoverable with dunning and card-update flows. Our guide to <Link href="/involuntary-churn" className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">involuntary churn</Link> covers measuring that share separately.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">Worked example: converting monthly churn to annual, honestly</h2>
          <p className="text-slate-600 leading-relaxed">Benchmarks are quoted annually in most primary reports and monthly in most internal dashboards, so sooner or later you must convert. The conversion compounds, because each month&rsquo;s churn applies to the customers who survived the previous months.</p>
          <p className="text-slate-600 mt-4 leading-relaxed"><strong>Monthly to annual.</strong> Take a 3% monthly logo churn rate:</p>
          <div className="bg-slate-900 text-white rounded-2xl px-5 py-4 mt-3 overflow-x-auto"><code className="font-mono text-sm">Annual churn = 1 − (1 − 0.03)^12 = 1 − 0.97^12 = 1 − 0.6938 = 30.6% per year</code></div>
          <p className="text-slate-600 mt-4 leading-relaxed">The shortcut — 3% × 12 = 36% — overstates annual churn by 5.4 points, because it pretends the original base is fully at risk every month. The gap widens as the rate rises: at 7% monthly, compounding gives about 58% a year, while ×12 claims 84%. (This is also how a table can print &ldquo;3–7% monthly&rdquo; and &ldquo;31–58% annual&rdquo; for one segment and be internally consistent — the same range, compounded.)</p>
          <p className="text-slate-600 mt-4 leading-relaxed"><strong>Annual to monthly.</strong> The reverse conversion undoes the compounding with a twelfth root. Take a 20% annual churn figure:</p>
          <div className="bg-slate-900 text-white rounded-2xl px-5 py-4 mt-3 overflow-x-auto"><code className="font-mono text-sm">Monthly churn = 1 − (1 − 0.20)^(1/12) = 1 − 0.80^(1/12) = 1 − 0.9816 = 1.84% per month</code></div>
          <p className="text-slate-600 mt-4 leading-relaxed">Note the asymmetry the shortcut hides: 20% a year is <em>not</em> 20 ÷ 12 = 1.67% a month. The compounded answer, 1.84%, is higher, because a steady 1.67% monthly rate compounds to only about 18.3% annually. Convert in the direction the compounding actually runs, and label the period on every figure you report.</p>
          <img src="/images/monthly-vs-annual-churn-compounding-graph.webp" alt="Minimalist line graph comparing a straight simple-multiplication churn curve with a curved compounded churn curve" className="w-full rounded-2xl border border-slate-200 shadow-xs mt-6" width={1200} height={800} loading="lazy" />
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">Which row applies to you: a three-step decision</h2>
          <p className="text-slate-600 leading-relaxed">Work through these in order; each step narrows the comparison set.</p>
          <p className="text-slate-600 mt-4 leading-relaxed"><strong>Step 1 — Find your ACV first.</strong> Compute average contract value (total recurring revenue ÷ paying customers, annualised). Under $10k ACV, your primary GRR reference is the ≈85% median (Benchmarkit 2025); over $100k ACV, the 88–90% range.</p>
          <p className="text-slate-600 mt-3 leading-relaxed"><strong>Step 2 — Cross-check with your ARR band and segment mix.</strong> Ask which segment — SMB, mid-market, enterprise — supplies most of your revenue, and compare your NRR against that segment&rsquo;s median (≈97% / ≈108% / ≈118%, secondary-cited). Sanity-check against your ARR band: a sub-$1M ARR company claiming the enterprise row needs enterprise ACV and contract lengths to back it. If Steps 1 and 2 disagree, Step 1 wins — ACV is measured from billing data; segment labels are judgement calls.</p>
          <p className="text-slate-600 mt-3 leading-relaxed"><strong>Step 3 — Adjust for motion and pricing model.</strong> PLG or self-serve? Expect GRR nearer the 79% PLG median than the 88% sales-led one. Usage-based pricing? The 108% NRR median is your reference class; seat-based, the 98% median is. A PLG, seat-based, sub-$10k ACV company should expect the demanding end of every table here; a sales-led, usage-based, six-figure ACV company the opposite. Neither position is a verdict; both are the correct starting line.</p>
          <p className="text-slate-600 mt-4 leading-relaxed">Then measure yourself properly: same metric, same period, same population definition as the row you chose. Most &ldquo;we are below benchmark&rdquo; alarms dissolve here — the company was comparing monthly logo churn to an annual NRR median, or its blended book to an enterprise-only sample.</p>
        </section>

        <section className="mt-10" id="faq">
          <h2 className="text-xl font-black text-slate-950 mb-4">SaaS churn benchmarks: FAQs</h2>
          <div className="space-y-4">{faqs.map((faq) => (<div key={faq.question} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs"><h3 className="font-bold text-slate-950 text-sm">{faq.question}</h3><p className="text-sm text-slate-600 mt-2 leading-relaxed">{faq.answer}</p></div>))}</div>
        </section>

        <section className="mt-10 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-slate-950 mb-3">Next steps</h2>
          <p className="text-slate-700 text-sm leading-relaxed">Calculate your ACV, identify the one row here that matches your ACV, segment and motion, and convert your own churn figures to that row&rsquo;s period basis — compounding, never ×12 — before deciding whether you have a retention problem. Then split out your <Link href="/involuntary-churn" className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline">involuntary churn</Link> share: the recoverable slice of churn should be fixed with billing flows, not benchmarked against anyone&rsquo;s product decisions.</p>
          <p className="text-xs text-slate-500 mt-4">Last updated: November 2026</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
