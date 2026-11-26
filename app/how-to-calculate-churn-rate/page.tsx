import type { Metadata } from 'next';
import Link from 'next/link';
import HeaderNav from '@/src/components/HeaderNav';
import Footer from '@/src/components/Footer';
import { SUB_NICHES } from '@/src/data/niches';

const pageTitle = 'How to Calculate Churn Rate: Customer Churn vs Revenue Churn, With a Messy Worked Example';
const pageDescription =
  'How to calculate churn rate: customer (logo) and revenue churn formulas, labelled by period, plus a messy worked example with trials and annual plans.';
const canonical = 'https://bestsaasmetrics.com/how-to-calculate-churn-rate';
const heroImage = 'https://bestsaasmetrics.com/images/churn-rate-calculation-dashboard-hero.webp';

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
    images: [{ url: heroImage, width: 1200, height: 800, alt: 'Laptop showing an abstract SaaS retention dashboard while a founder calculates the monthly churn rate' }],
  },
  twitter: { card: 'summary_large_image', title: `${pageTitle} | Best SaaS Metrics`, description: pageDescription, images: [heroImage] },
};

const faqs = [
  { question: 'What is the churn rate formula for SaaS?', answer: 'Customer churn = customers lost in the period ÷ customers at the start of the period × 100. Revenue churn = recurring revenue lost in the period ÷ recurring revenue at the start of the period × 100. State the period (monthly, quarterly, annual) with every figure.' },
  { question: 'Should new customers be included in the churn calculation?', answer: 'Not in the headline rate. Customers who join during the period were not in the starting base, so neither their arrival nor their departure belongs in that period\u2019s churn fraction. Measure joiners separately as a cohort.' },
  { question: 'How do annual-plan customers count in monthly churn?', answer: 'As one customer in the logo count (churning in the month their subscription ends without renewal), and at their monthly recognised value (annual contract ÷ 12) in revenue churn — never at full contract value.' },
  { question: 'How do I convert monthly churn to annual churn?', answer: 'Compound it: annual = 1 − (1 − monthly)^12. A 4.5% monthly rate compounds to about 42.5% a year — not 54%. The reverse conversion is monthly = 1 − (1 − annual)^(1/12).' },
  { question: 'Can churn be negative?', answer: 'Logo churn cannot. Net revenue churn can, when expansion from remaining customers exceeds all losses — the same condition that produces net revenue retention above 100%.' },
];

const useCases = [
  { situation: 'Pricing is flat — most customers pay about the same', use: 'Customer (logo) churn', why: 'Accounts and revenue move together; the simpler number is the honest one' },
  { situation: 'Wide price spread, or a few large accounts carry much of the revenue', use: 'Revenue churn (gross and net)', why: 'Losing one $90 customer and one $50 customer are not the same event; logo churn treats them as if they were' },
  { situation: 'Judging product/onboarding health — are relationships surviving?', use: 'Customer churn, by cohort', why: 'Revenue weighting hides small-customer losses, which are usually the earliest signal of a product or onboarding problem' },
  { situation: 'Judging the revenue base for planning and forecasting', use: 'Gross revenue churn', why: 'Forecasts need the true leak, before expansion covers it' },
  { situation: 'Reporting retention to a board alongside NRR/GRR', use: 'Net revenue churn, shown next to gross', why: 'Net connects directly to net revenue retention (net churn ≈ 100% − period NRR, on the same period basis); showing both prevents expansion from masking churn' },
  { situation: 'Mostly annual contracts', use: 'Revenue churn on a quarterly or annual period, plus logo churn at renewal cohorts', why: 'Monthly logo churn on an annual base is lumpy — most customers cannot churn in a given month — so the monthly figure understates risk until renewal season arrives' },
];

export default function HowToCalculateChurnRatePage() {
  const defaultNiche = SUB_NICHES[0];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://bestsaasmetrics.com/how-to-calculate-churn-rate#faq',
    mainEntity: faqs.map((faq) => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
  };
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <HeaderNav selectedNiche={defaultNiche} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <nav className="text-xs text-slate-500 mb-3"><Link href="/" className="hover:text-indigo-600">Home</Link> &gt; <span>How to Calculate Churn Rate</span></nav>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight">How to Calculate Churn Rate: Customer Churn vs Revenue Churn, With a Messy Worked Example</h1>
        <p className="text-slate-600 mt-4 leading-relaxed"><strong>Quick answer:</strong> Customer (logo) churn rate = <strong>customers lost in the period ÷ customers at the start of the period × 100</strong>. Revenue churn rate = <strong>recurring revenue lost in the period ÷ recurring revenue at the start of the period × 100</strong>. Both formulas use the <em>start</em> of the period as the denominator — never the end, and never a base that includes customers who joined during the period. Every churn figure must carry its period label: a 4.5% <strong>monthly</strong> churn rate and a 4.5% <strong>annual</strong> churn rate describe businesses in completely different health, and converting between them is compounding, not multiplying by 12. The worked example below runs both formulas on one deliberately messy month — mid-month joins, annual-plan customers, trials that convert and trials that end — because that is the month your billing system actually gives you.</p>
        <img src="/images/churn-rate-calculation-dashboard-hero.webp" alt="Laptop showing an abstract SaaS retention dashboard while a founder calculates the monthly churn rate" className="w-full rounded-2xl border border-slate-200 shadow-xs mt-8" width={1200} height={800} />

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">The two formulas, defined precisely</h2>
          <h3 className="font-bold text-slate-950 mt-6">Customer churn (logo churn)</h3>
          <div className="bg-slate-900 text-white rounded-2xl px-5 py-4 mt-2 overflow-x-auto"><code className="font-mono text-sm">Customer churn rate = Customers lost during the period ÷ Customers at start of period × 100</code></div>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-slate-600 leading-relaxed">
            <li>&ldquo;Customers&rdquo; means <strong>paying customers</strong> — accounts on a paid plan at the start of the period. Free trials and free-plan users are not customers and never enter either side of this fraction.</li>
            <li>&ldquo;Lost&rdquo; means the subscription <strong>ended</strong> during the period: cancelled and not renewed, or cancelled by the billing system after failed payments. A customer who has clicked cancel but whose paid period runs to the 28th has not churned until the 28th — count churn when access ends, in the period it ends.</li>
            <li>The period must be named every time the number is used: monthly customer churn, quarterly customer churn, annual customer churn. An unlabelled churn rate is not a metric; it is a rumour.</li>
          </ul>
          <h3 className="font-bold text-slate-950 mt-8">Revenue churn</h3>
          <div className="bg-slate-900 text-white rounded-2xl px-5 py-4 mt-2 overflow-x-auto"><code className="font-mono text-sm">Gross revenue churn rate = (MRR lost to cancellations + MRR lost to downgrades) ÷ MRR at start of period × 100</code></div>
          <div className="bg-slate-900 text-white rounded-2xl px-5 py-4 mt-3 overflow-x-auto"><code className="font-mono text-sm">Net revenue churn rate = (MRR lost to cancellations and downgrades − MRR gained from expansion by remaining customers) ÷ MRR at start of period × 100</code></div>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-slate-600 leading-relaxed">
            <li>Revenue churn counts <strong>money, not accounts</strong>: cancellations remove their full monthly recurring revenue (MRR); downgrades (contraction) remove the difference; upgrades by customers who stay (expansion) are excluded from the gross figure and credited only in the net figure.</li>
            <li>For annual-plan customers, use the <strong>monthly recognised equivalent</strong> of their contract (annual contract value ÷ 12) in both the starting MRR and the lost MRR, so annual and monthly customers sit on the same scale. Mixing full annual contract values into a monthly churn calculation is one of the commonest errors in this whole topic — see the mistakes section.</li>
            <li>Net revenue churn can be <strong>negative</strong> when expansion exceeds losses. That is a real and useful result (it is the churn-side view of net revenue retention above 100%), not a spreadsheet error.</li>
          </ul>
          <p className="text-slate-600 mt-4 leading-relaxed">The two rates answer different questions. Logo churn asks <em>how many relationships are we losing?</em> Revenue churn asks <em>how much of the revenue base is leaking?</em> When your customers all pay roughly the same, the two rates track closely. When a few large customers carry much of the revenue, they can diverge sharply — and the divergence itself is diagnostic, as the example shows.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">The messy worked example: one real-shaped month</h2>
          <p className="text-slate-600 leading-relaxed">Textbook examples start with 100 customers, lose 5, and end the lesson. Real billing data is not like that. Here is one month — <strong>October</strong>, so every rate below is a <strong>monthly</strong> rate — at a fictional SaaS company, with every complication left in.</p>
          <p className="font-bold text-slate-950 mt-6">The starting position, 1 October:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li><strong>800 paying customers</strong> and <strong>$48,000 MRR</strong>, made up of: 600 monthly-plan customers × $50/month = $30,000 MRR; 200 annual-plan customers × $1,080/year = $90/month recognised each = $18,000 MRR</li>
            <li>Separately: <strong>40 free trials</strong> in progress. Trials are not customers. They are in neither the 800 nor the $48,000.</li>
          </ul>
          <p className="font-bold text-slate-950 mt-6">What happens during October:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li><strong>60 new paying customers join</strong>, most of them mid-month — including <strong>18 trials that convert</strong> to paid plans.</li>
            <li><strong>22 trials end without converting.</strong> Nobody churned here: these were never customers. Counting them as churn is Mistake 3 below.</li>
            <li><strong>3 of the 60 new customers cancel again before month-end.</strong> They joined and left inside the same period.</li>
            <li><strong>36 of the starting 800 customers churn</strong>: 28 monthly-plan customers cancel, and 8 annual-plan subscriptions reach the end of their term and do not renew.</li>
            <li><strong>10 surviving customers downgrade</strong> from $50 to $30/month.</li>
            <li><strong>Surviving customers expand</strong> by a combined <strong>+$650 MRR</strong> (seat additions and upgrades).</li>
          </ul>
          <img src="/images/founder-calculating-churn-worked-example.webp" alt="Founder working through a messy churn calculation with printouts and a calculator" className="w-full rounded-2xl border border-slate-200 shadow-xs mt-6" width={1200} height={800} loading="lazy" />
          <h3 className="font-bold text-slate-950 mt-8">Step 1 — Customer (logo) churn</h3>
          <p className="text-slate-600 mt-2 leading-relaxed">Only the starting base can churn in this period&rsquo;s rate, because only the starting base was at risk for the whole period:</p>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>Customers lost from the starting base = <strong>36</strong> (the 3 join-and-leave customers are <em>not</em> in this numerator — they were never in the denominator either; they belong to a cohort analysis of October joiners, not to October&rsquo;s churn rate)</li>
            <li>Customer churn rate = 36 ÷ 800 × 100 = <strong>4.5% for the month</strong></li>
          </ul>
          <p className="text-slate-600 mt-4 leading-relaxed">Sanity check the headcount: 800 − 36 + 60 = <strong>824 customers at 31 October</strong>. The company grew by 24 customers <em>while</em> churning 4.5% of its base. Growth and churn are not opposites; a growing company can have a serious churn problem, which is exactly why the rate is computed on the starting base and not inferred from the net change.</p>
          <h3 className="font-bold text-slate-950 mt-8">Step 2 — Gross revenue churn</h3>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>MRR lost to cancellations: 28 × $50 = $1,400, plus 8 × $90 = $720 → <strong>$2,120</strong></li>
            <li>MRR lost to downgrades (contraction): 10 × ($50 − $30) = <strong>$200</strong></li>
            <li>Gross revenue churn rate = ($2,120 + $200) ÷ $48,000 × 100 = $2,320 ÷ $48,000 = <strong>4.83% for the month</strong></li>
          </ul>
          <p className="text-slate-600 mt-4 leading-relaxed">Note that revenue churn (4.83%) runs <em>above</em> logo churn (4.5%) here, even though the downgrades involve customers who stayed. Two forces push it up: the churned annual-plan customers carried $90/month each — nearly double the $50 average of the monthly base — and contraction adds losses that logo churn cannot see at all. If your churn is concentrated in cheap plans, the relationship flips and revenue churn runs below logo churn. Neither direction is &ldquo;wrong&rdquo;; the gap tells you <em>where</em> the losses sit.</p>
          <h3 className="font-bold text-slate-950 mt-8">Step 3 — Net revenue churn</h3>
          <ul className="list-disc pl-6 mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li>Expansion from remaining customers: <strong>+$650</strong></li>
            <li>Net revenue churn rate = ($2,320 − $650) ÷ $48,000 × 100 = $1,670 ÷ $48,000 = <strong>3.48% for the month</strong></li>
          </ul>
          <p className="text-slate-600 mt-4 leading-relaxed">Gross 4.83%, net 3.48%: expansion by the surviving base offset a little over a quarter of the month&rsquo;s losses ($650 ÷ $2,320 = 28%). Report both. Gross is the leak; net is the leak after the bucket brigade — a company that only tracks net can watch its gross leak widen for months while expansion politely covers it.</p>
          <h3 className="font-bold text-slate-950 mt-8">Step 4 — Label the period, and convert honestly</h3>
          <p className="text-slate-600 mt-2 leading-relaxed">Every rate above is <strong>monthly</strong>. If you need the annual equivalent of the 4.5% monthly logo churn, compound it — do not multiply by 12:</p>
          <div className="bg-slate-900 text-white rounded-2xl px-5 py-4 mt-3 overflow-x-auto"><code className="font-mono text-sm">Annual churn = 1 − (1 − monthly churn)^12 = 1 − (1 − 0.045)^12 = 1 − 0.5755 = 42.5% per year</code></div>
          <p className="text-slate-600 mt-4 leading-relaxed">The naive shortcut (4.5% × 12 = 54%) overstates annual churn by more than 11 points, because each month&rsquo;s churn applies to a smaller surviving base. This single conversion error is one reason so many published churn benchmarks appear to conflict: pages place a monthly figure from one source beside an annual figure from another and present both as the same statistic. When you compare your rate against any benchmark — including the set on our <Link href="/saas-benchmarks" className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">SaaS benchmarks</Link> page — first confirm which period the benchmark uses, and convert yours to match before concluding anything.</p>
          <p className="text-slate-600 mt-4 leading-relaxed">Run your own month through our <Link href="/saas-churn-rate-calculator" className="font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">SaaS churn rate calculator</Link> to get the logo, gross and net figures on one consistent basis.</p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">The common mistakes</h2>
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs"><h3 className="font-bold text-slate-950">Mistake 1 — Wrong denominator</h3><p className="text-sm text-slate-600 mt-2 leading-relaxed">Using customers at the <em>end</em> of the period (36 ÷ 824 = 4.37% in the example) or, worse, an average of start and end. The denominator is the population that was at risk of churning for the whole period: the starting base. Every variant that lets joiners into the denominator understates churn, and the understatement grows as you grow — so the error rewards exactly the companies most at risk of fooling themselves.</p></div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs"><h3 className="font-bold text-slate-950">Mistake 2 — Mixing monthly and annual figures</h3><p className="text-sm text-slate-600 mt-2 leading-relaxed">Two versions: multiplying a monthly rate by 12 instead of compounding (Step 4), and counting an annual-plan customer&rsquo;s full $1,080 contract value as &ldquo;MRR lost&rdquo; in a monthly calculation. The second version is catastrophic: one annual churner would outweigh 21 monthly churners in the numerator while contributing only $90 to the starting MRR. Always convert annual contracts to their monthly recognised equivalent before any monthly maths.</p></div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs"><h3 className="font-bold text-slate-950">Mistake 3 — Counting trials as customers, or trial endings as churn</h3><p className="text-sm text-slate-600 mt-2 leading-relaxed">The 22 expired trials in the example never appear in any churn figure. Trials belong in a <em>conversion rate</em> (18 converted ÷ 40 trialled, measured on the trial cohort), not in churn. Companies that fold trials into the customer base manufacture a huge, meaningless &ldquo;churn&rdquo; number that moves with their trial volume rather than with retention.</p></div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs"><h3 className="font-bold text-slate-950">Mistake 4 — Letting join-and-churn customers into the headline rate</h3><p className="text-sm text-slate-600 mt-2 leading-relaxed">The 3 customers who joined and left inside October do not belong in October&rsquo;s churn numerator, because the denominator never contained them. Adding them anyway (39 ÷ 800 = 4.88%) mixes a numerator from one population with a denominator from another. They matter — a join-and-leave pattern is an onboarding or expectation problem — but they are measured as a <em>cohort</em> stat (&ldquo;what share of October joiners were gone within the month?&rdquo;), not folded into the base churn rate.</p></div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs"><h3 className="font-bold text-slate-950">Mistake 5 — Counting the cancellation click instead of the subscription end</h3><p className="text-sm text-slate-600 mt-2 leading-relaxed">A customer who cancels on 3 October but has paid through 31 October churns in October only if access ends in October; on an annual plan cancelled in October with term ending in February, the churn lands in February. Pick the rule &ldquo;churn is counted in the period access ends&rdquo; and apply it uniformly, or your monthly series will jump around with billing-cycle timing rather than with behaviour.</p></div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs"><h3 className="font-bold text-slate-950">Mistake 6 — Reporting only net revenue churn</h3><p className="text-sm text-slate-600 mt-2 leading-relaxed">Net is the flattering number by construction. In the example it hides $200 of downgrade leakage and the fact that the gross leak (4.83%) exceeds the logo rate. Always keep gross beside it.</p></div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-black text-slate-950 mb-3">When to use which churn type</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs mt-3">
            <table className="w-full text-sm"><thead><tr className="bg-slate-900 text-white"><th className="text-left px-4 py-3 font-bold">Situation</th><th className="text-left px-4 py-3 font-bold">Use</th><th className="text-left px-4 py-3 font-bold">Why</th></tr></thead>
            <tbody>{useCases.map((row, i) => (<tr key={row.situation} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}><td className="px-4 py-3 text-slate-600">{row.situation}</td><td className="px-4 py-3 font-bold text-slate-900">{row.use}</td><td className="px-4 py-3 text-slate-600">{row.why}</td></tr>))}</tbody></table>
          </div>
          <img src="/images/customer-churn-retention-concept.webp" alt="Abstract group of customer icons with a few fading out, representing customer churn against retention" className="w-full rounded-2xl border border-slate-200 shadow-xs mt-6" width={1200} height={800} loading="lazy" />
          <p className="text-slate-600 mt-4 leading-relaxed">The short version: track logo churn and gross revenue churn every period, on the same period basis, and add net revenue churn when expansion becomes material. The moment the two headline rates start moving in different directions, you have learned something neither could have told you alone.</p>
        </section>

        <section className="mt-10" id="faq">
          <h2 className="text-xl font-black text-slate-950 mb-4">Churn rate: FAQs</h2>
          <div className="space-y-4">{faqs.map((faq) => (<div key={faq.question} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs"><h3 className="font-bold text-slate-950 text-sm">{faq.question}</h3><p className="text-sm text-slate-600 mt-2 leading-relaxed">{faq.answer}</p></div>))}</div>
        </section>

        <section className="mt-10 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
          <h2 className="text-xl font-black text-slate-950 mb-3">Next steps</h2>
          <p className="text-slate-700 text-sm leading-relaxed">Pull last month&rsquo;s billing data, separate your starting base from joiners and trials, and run both formulas on the same period basis in the <Link href="/saas-churn-rate-calculator" className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline">SaaS churn rate calculator</Link>. Then compare the result — period label first — against the <Link href="/saas-benchmarks" className="font-bold text-indigo-600 hover:text-indigo-800 hover:underline">SaaS benchmarks</Link> set before drawing any conclusion about whether your number is high or low.</p>
          <p className="text-xs text-slate-500 mt-4">Last updated: November 2026</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
