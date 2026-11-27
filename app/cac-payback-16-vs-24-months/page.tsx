import type { Metadata } from 'next';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';

const pageTitle = 'CAC Payback: Why Benchmarks Say 16 Months and 24 Months — and Which One Applies to You';
const pageDescription =
  'CAC payback is quoted as both 16 and 24 months. The gap is cost definition, company stage and data year — see which benchmark actually fits your SaaS.';
const canonical = 'https://bestsaasmetrics.com/cac-payback-16-vs-24-months';
const heroImage = 'https://bestsaasmetrics.com/images/cac-payback-two-benchmarks-whiteboard.webp';

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
    images: [{ url: heroImage, width: 1200, height: 800, alt: 'Two diverging timeline bars drawn on a whiteboard in a startup office, representing two different CAC payback benchmarks' }],
  },
  twitter: { card: 'summary_large_image', title: `${pageTitle} | Best SaaS Metrics`, description: pageDescription, images: [heroImage] },
};

const faqs = [
  { question: 'Why do CAC payback benchmarks differ so much between sources?', answer: 'For three reasons, set out in full above: the sources define CAC differently (sales and marketing only versus fully loaded), their samples mix different stages and contract sizes (Benchmarkit measures ~11 months under $5K ACV and ~22 months at $50–100K ACV), and their data comes from different years. The formula — CAC ÷ (ARPU × gross margin) — is the same throughout.' },
  { question: 'Is 16 months or 24 months the right CAC payback benchmark?', answer: 'The one whose construction matches your own calculation. The 16-month median (Aleph × Benchmarkit 2026, CY2025 data, n≈198 reporting payback) fits a broad private-SaaS comparison on a narrower cost basis; the 24-month KeyBanc-lineage figure fits larger, later-stage companies on a fully loaded basis. Comparing your number to the mismatched one is the error.' },
  { question: 'What is a good CAC payback period?', answer: 'In the 2026 Benchmarkit data the top quartile recovers CAC in 6 months or less, and the median is 16 months. But \u201Cgood\u201D is band-relative: at under $5K ACV the median itself is ~11 months, so judge your figure against your ACV band on our CAC payback period benchmarks page, and against expected customer lifetime, before calling it good or bad.' },
];

const twoNumbers = [
  { label: 'Source', sixteen: 'Aleph × Benchmarkit 2026 SaaS & AI Performance Benchmarks', twentyfour: 'KeyBanc survey lineage' },
  { label: 'Data period', sixteen: 'Full-year 2025 (CY2025) actuals', twentyfour: 'Older survey years' },
  { label: 'Sample', sixteen: 'Private B2B SaaS and AI companies; CAC payback reported by n≈198', twentyfour: 'Larger, later-stage companies' },
  { label: 'Cost basis', sixteen: 'As reported by participating finance teams', twentyfour: 'Fully loaded acquisition cost' },
  { label: 'What it describes', sixteen: 'The current median across a broad private-SaaS sample', twentyfour: 'Payback at bigger companies carrying the full cost of acquiring and onboarding' },
];

const acvBenchmarks = [
  { acv: 'Under $5K ACV', payback: '~11 months' },
  { acv: '$50–100K ACV', payback: '~22 months' },
];

export default function CacPayback16Vs24Page() {
  const defaultNiche = SUB_NICHES[0];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://bestsaasmetrics.com/cac-payback-16-vs-24-months#faq',
    mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav selectedNiche={defaultNiche} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <nav className="text-xs text-slate-500 mb-3"><Link href="/" className="hover:text-indigo-600">Home</Link> &gt; <span>CAC Payback: 16 vs 24 Months</span></nav>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">CAC Payback: Why Benchmarks Say 16 Months and 24 Months — and Which One Applies to You</h1>
        <p className="text-slate-600 mt-4 leading-relaxed"><strong>Quick answer:</strong> Both numbers are real — they are just not measuring the same companies in the same way. The <strong>16-month</strong> figure is the median CAC payback in the Aleph × Benchmarkit 2026 benchmarks, on full-year 2025 data from roughly 198 companies reporting payback. The <strong>24-month</strong> figure comes from the older KeyBanc survey lineage, drawn from larger, later-stage companies and built on fully loaded acquisition costs. If your CAC counts sales and marketing spend only, 16 months is the benchmark built from companies like yours. If your CAC is fully loaded — plus onboarding and customer success allocation — and you sell larger contracts, 24 months is the closer comparison. Most of the gap is definition, sample and year, not disagreement about how SaaS economics work.</p>
        <img src="/images/cac-payback-two-benchmarks-whiteboard.webp" alt="Two diverging timeline bars drawn on a whiteboard in a startup office, representing two different CAC payback benchmarks" className="w-full rounded-2xl border border-slate-200 shadow-xs mt-8" width={1200} height={800} />

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">The two numbers, side by side</h2>
          <p className="text-slate-600 leading-relaxed">Search for a CAC payback benchmark and you will meet both figures within minutes, usually stated as flat facts with no reconciliation. Founderpath&rsquo;s SaaS KPIs page and BreakingB2B&rsquo;s benchmarks page both cite figures in this range — and neither fully works through why two credible sources land eight months apart, or which one a given reader should use. That is the gap this page closes. Our main benchmark tables live on our <Link href="/cac-payback-period-benchmarks" className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">CAC payback period benchmarks</Link> page; this article is the companion piece that explains the conflict inside them.</p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs mt-3">
            <table className="w-full text-sm"><thead><tr className="bg-slate-900 text-white"><th className="text-left px-4 py-3 font-bold"></th><th className="text-left px-4 py-3 font-bold">The 16-month figure</th><th className="text-left px-4 py-3 font-bold">The 24-month figure</th></tr></thead>
            <tbody>{twoNumbers.map((row, i) => (<tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}><td className="px-4 py-3 font-bold text-slate-900">{row.label}</td><td className="px-4 py-3 text-slate-600">{row.sixteen}</td><td className="px-4 py-3 text-slate-600">{row.twentyfour}</td></tr>))}</tbody></table>
          </div>
          <p className="text-slate-600 mt-6 leading-relaxed">Two more figures from the same 2026 Benchmarkit data frame the spread. The <strong>top quartile recovers CAC in 6 months or less</strong> (Benchmarkit/Aleph 2026, via Founderpath). And payback rises steeply with contract size, from about <strong>11 months at under $5K ACV to about 22 months at $50–100K ACV</strong> (Benchmarkit). Hold those facts together and the puzzle mostly dissolves: a median is a property of a sample, and these two samples are built very differently.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">The formula both sides are using</h2>
          <p className="text-slate-600 leading-relaxed">The arithmetic itself is not in dispute:</p>
          <div className="bg-slate-900 text-white rounded-2xl px-5 py-4 mt-4 overflow-x-auto"><code className="font-mono text-sm">CAC payback (months) = CAC ÷ (ARPU × gross margin)</code></div>
          <p className="text-slate-600 mt-4 leading-relaxed">CAC is the cost of acquiring one new customer. ARPU (or ARPA, per account) is the monthly recurring revenue that customer pays. Gross margin is the share of that revenue left after the direct cost of serving the customer. The denominator — ARPU × gross margin — is the monthly gross profit the new customer generates, and the result is how many months of it repay the acquisition cost.</p>
          <p className="text-slate-600 mt-4 leading-relaxed">Every fight about payback benchmarks is a fight about the inputs, not the formula. Change what counts as CAC and the numerator moves. Change the sample&rsquo;s customer mix and ARPU moves. Change the era and all three move at once. The next section takes those three levers in turn.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">Why the benchmarks differ: the reconciliation</h2>
          <p className="text-slate-600 leading-relaxed"><em>This section is this article&rsquo;s analysis of how the two published figures are constructed — not a quote from either source. Neither publishes a reconciliation of the other&rsquo;s number, which is precisely why the confusion persists.</em></p>
          <h3 className="font-bold text-slate-950 mt-8">(a) Cost definition: what counts as CAC</h3>
          <p className="text-slate-600 mt-2 leading-relaxed">This is the largest lever. A payback built on <strong>sales and marketing spend only</strong> — team salaries, programmes, tools and advertising, divided by new customers — produces a materially smaller CAC than one built on <strong>fully loaded cost</strong>, which adds onboarding and an allocation of customer success cost. Implementation, migration, training and the success staff who carry a new account to first value are real cash spent because that customer was won. Excluding them does not make them free; it makes payback shorter on paper.</p>
          <p className="text-slate-600 mt-4 leading-relaxed">The worked example below quantifies this lever: the same business, with the same customers and revenue, reports 12.5 months on a narrower CAC and 24 months once onboarding and customer success allocation are loaded in — a gap from definition alone that is more than enough to explain two honest benchmarks at 16 and 24.</p>
          <h3 className="font-bold text-slate-950 mt-8">(b) Sample mix: stage and ACV</h3>
          <p className="text-slate-600 mt-2 leading-relaxed">Payback lengthens as contracts get bigger, because bigger contracts are bought with longer, more heavily staffed sales cycles. Benchmarkit&rsquo;s by-ACV figures make the gradient concrete:</p>
          <p className="font-bold text-slate-950 mt-6">CAC payback by annual contract value (Benchmarkit):</p>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs mt-3">
            <table className="w-full text-sm"><thead><tr className="bg-slate-900 text-white"><th className="text-left px-4 py-3 font-bold">Annual contract value</th><th className="text-left px-4 py-3 font-bold">Median CAC payback</th></tr></thead>
            <tbody>{acvBenchmarks.map((row, i) => (<tr key={row.acv} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}><td className="px-4 py-3 font-bold text-slate-900">{row.acv}</td><td className="px-4 py-3 font-semibold text-indigo-700">{row.payback}</td></tr>))}</tbody></table>
          </div>
          <p className="text-slate-600 mt-6 leading-relaxed">A sample weighted toward smaller-ACV, earlier-stage companies will therefore publish a shorter median than one weighted toward larger, later-stage companies — even if every company calculated payback identically. The KeyBanc lineage draws on larger, later-stage companies than the broad private-SaaS sample behind the 2026 median, so part of the gap is simply the ACV gradient showing up in two different samples. Neither median is wrong; each is the middle of a different crowd.</p>
          <h3 className="font-bold text-slate-950 mt-8">(c) Data year</h3>
          <p className="text-slate-600 mt-2 leading-relaxed">The 16-month median is measured on CY2025 data, published in 2026. The 24-month figure descends from older KeyBanc survey work. Payback is not a constant of nature: it moves with hiring costs, sales-cycle length and how hard companies push growth over efficiency in a given year. Comparing a median from one era against a figure inherited from an earlier one, without noting the dates, manufactures a contradiction the underlying data never contained. Quote a benchmark&rsquo;s data year with it — a benchmark without a date is a rumour with a number in it.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">Which benchmark applies to you</h2>
          <p className="text-slate-600 leading-relaxed">Work through three questions, in this order:</p>
          <p className="text-slate-600 mt-4 leading-relaxed"><strong>1. What is inside your CAC?</strong> If your number is sales and marketing spend divided by new customers — no onboarding, no customer success allocation — the 16-month median is the honest comparison set. If your CAC is fully loaded, compare against the fully loaded lineage instead, where 24 months is a live figure rather than an alarming one. The most common benchmarking error in SaaS is comparing a narrowly defined own-number against a fully loaded benchmark, or the reverse. Both directions flatter or frighten you for no real reason.</p>
          <p className="text-slate-600 mt-3 leading-relaxed"><strong>2. What is your ACV?</strong> Place yourself on the Benchmarkit gradient before either headline. At under $5K ACV the measured median is around 11 months, so a 16-month payback is already slow for your band — the headline median is too kind to you. At $50–100K ACV the measured median is around 22 months, so a 20-month payback is roughly typical for your band even though it looks poor against the 16-month headline. Segment first, headline second.</p>
          <p className="text-slate-600 mt-3 leading-relaxed"><strong>3. What year is your comparison from?</strong> If a deck or an investor update quotes 24 months, ask which survey year and sample produced it before reacting. An older, later-stage, fully loaded figure is a legitimate benchmark — for older, later-stage, fully loaded comparisons.</p>
          <p className="text-slate-600 mt-4 leading-relaxed">Then sanity-check the result. Payback must sit comfortably inside expected customer lifetime — see <Link href="/how-to-calculate-churn-rate" className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">how to calculate churn rate</Link> — and alongside the <Link href="/ltv-cac-ratio" className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">LTV:CAC ratio</Link>, which tests whether the customer is worth their acquisition cost over their whole life. A fast payback on a customer who churns in month fourteen is not efficiency; it is a near-miss dressed as one.</p>
          <img src="/images/cac-payback-worked-example-charts.webp" alt="Clean printed charts and a notebook on a desk showing a payback curve graphic" className="w-full rounded-2xl border border-slate-200 shadow-xs mt-6" width={1200} height={800} loading="lazy" />
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">Worked example: one company, both benchmarks</h2>
          <p className="text-slate-600 leading-relaxed">This example starts from SaaS Library&rsquo;s worked example, then extends it — the extension is where the reconciliation stops being abstract.</p>
          <p className="text-slate-600 mt-4 leading-relaxed"><strong>The company, on the narrower CAC definition:</strong></p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>CAC: <strong>$5,000</strong> per new customer</li>
            <li>ARPU: <strong>$500 per month</strong></li>
            <li>Gross margin: <strong>80%</strong></li>
          </ul>
          <div className="bg-slate-900 text-white rounded-2xl px-5 py-4 mt-4 overflow-x-auto"><code className="font-mono text-sm">Monthly gross profit per customer = $500 × 0.8 = $400<br />CAC payback = $5,000 ÷ $400 = 12.5 months</code></div>
          <p className="text-slate-600 mt-4 leading-relaxed"><strong>12.5 months</strong> — comfortably better than the 16-month median. On this definition, the company looks efficient.</p>
          <p className="text-slate-600 mt-4 leading-relaxed"><strong>The same company, with a fully loaded CAC.</strong> Now add the costs the narrower definition left out. <em>The added figures are an illustrative assumption, stated explicitly so you can replace them with your own: onboarding $2,800 per new customer (implementation and training time), plus a customer success allocation of $1,800 per new customer.</em></p>
          <div className="bg-slate-900 text-white rounded-2xl px-5 py-4 mt-4 overflow-x-auto"><code className="font-mono text-sm">Fully loaded CAC = $5,000 + $2,800 + $1,800 = $9,600<br />CAC payback = $9,600 ÷ $400 = 24.0 months</code></div>
          <p className="text-slate-600 mt-4 leading-relaxed"><strong>24.0 months</strong> — exactly the higher benchmark figure. Nothing about the company changed: same product, customers, revenue, margin and sales team. Only the numerator&rsquo;s definition moved, and the company travelled from &ldquo;beats the median&rdquo; to &ldquo;sits on the older, fully loaded benchmark&rdquo; in one step.</p>
          <p className="text-slate-600 mt-4 leading-relaxed">That is the centrepiece of the puzzle. The two headlines are not rival measurements of one thing; they are measurements of two different cost definitions, from two different samples, in two different periods. A company can honestly report payback in the low teens and in the mid-twenties in the same quarter — and a reader who never asks which definition produced a benchmark will misjudge both.</p>
          <img src="/images/founder-calculating-cac-payback-spreadsheet.webp" alt="Founder working on a laptop spreadsheet with a calculator and coffee while calculating CAC payback" className="w-full rounded-2xl border border-slate-200 shadow-xs mt-6" width={1200} height={800} loading="lazy" />
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">How to report your own number so it survives scrutiny</h2>
          <p className="text-slate-600 leading-relaxed">Publish your payback with its workings attached:</p>
          <ol className="list-decimal pl-6 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li><strong>State the cost definition in words</strong> — &ldquo;sales and marketing only&rdquo; or &ldquo;fully loaded, including onboarding and customer success allocation&rdquo; — next to the number, every time.</li>
            <li><strong>State the period and the cohort</strong>, with any lag between spend and signings disclosed.</li>
            <li><strong>State your ACV band</strong>, so a reader can place you on the by-ACV gradient, not against a blended headline.</li>
            <li><strong>Report both versions if you can.</strong> The distance between them is itself information about how much acquisition cost sits in onboarding and success.</li>
          </ol>
          <p className="text-slate-600 mt-4 leading-relaxed">For the full benchmark tables — payback by segment, with the source conflicts flagged rather than smoothed over — use our main <Link href="/cac-payback-period-benchmarks" className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">CAC payback period benchmarks</Link> page.</p>
        </section>

        <section className="mt-10" id="faq">
          <h2 className="text-xl font-black text-slate-950 mb-4">CAC payback benchmarks: FAQs</h2>
          <div className="space-y-4">{faqs.map((faq) => (<div key={faq.question} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs"><h3 className="font-bold text-slate-950 text-sm">{faq.question}</h3><p className="text-sm text-slate-600 mt-2 leading-relaxed">{faq.answer}</p></div>))}</div>
        </section>

        <section className="mt-10 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-slate-950 mb-3">Next steps</h2>
          <p className="text-slate-700 text-sm leading-relaxed">Calculate your payback both ways — S&amp;M-only and fully loaded — and note which benchmark each version should be judged against. Then read the full tables on <Link href="/cac-payback-period-benchmarks" className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline">CAC payback period benchmarks</Link> and check the result against the <Link href="/ltv-cac-ratio" className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline">LTV:CAC ratio</Link>, so a fast payback is not hiding a short-lived customer.</p>
          <p className="text-slate-500 text-xs mt-4"><em>This article is general information about SaaS metrics and benchmarking methods. It is not financial, accounting or investment advice, and benchmark figures from third-party surveys describe their samples, not your company.</em></p>
          <p className="text-xs text-slate-500 mt-4">Last updated: November 2026</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
