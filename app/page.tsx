import type { Metadata } from 'next';
import SaaSCalculator from '@/src/components/SaaSCalculator';
import { SUB_NICHES } from '@/src/data/niches';

export const metadata: Metadata = {
  title: 'Best SaaS Metrics | B2B SaaS CAC Payback Period & Unit Economics Calculator',
  description:
    'Institutional-grade B2B SaaS unit economics calculator. Compute true gross margin-adjusted CAC payback periods, LTV:CAC ratios, and 36-month cashflow breakeven trajectories across 8 industry cohorts.',
  alternates: {
    canonical: 'https://bestsaasmetrics.com/',
  },
  openGraph: {
    title: 'Best SaaS Metrics | B2B SaaS CAC Payback & Unit Economics',
    description:
      'Compute true gross margin-adjusted CAC payback periods, LTV:CAC ratios, and 36-month cashflow breakeven trajectories across 8 industry cohorts.',
    url: 'https://bestsaasmetrics.com/',
    type: 'website',
  },
};

export default function HomePage() {
  const defaultNiche = SUB_NICHES[0];

  const homepageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://bestsaasmetrics.com/#website',
        url: 'https://bestsaasmetrics.com/',
        name: 'Best SaaS Metrics',
        description: 'B2B SaaS CAC Payback Period & Unit Economics Benchmark Calculator',
        publisher: {
          '@type': 'Organization',
          '@id': 'https://bestsaasmetrics.com/#organization',
          name: 'Best SaaS Metrics Quantitative Research',
          url: 'https://bestsaasmetrics.com/',
          logo: {
            '@type': 'ImageObject',
            url: 'https://bestsaasmetrics.com/icon.svg',
          },
        },
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://bestsaasmetrics.com/#calculator-app',
        name: 'B2B SaaS CAC Payback Period & Unit Economics Calculator',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All modern web browsers',
        url: 'https://bestsaasmetrics.com/',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: [
          'Gross Margin-Adjusted CAC Payback Period Calculation',
          'Customer Lifetime Value (LTV) & LTV:CAC Ratio Analysis',
          '36-Month Cumulative Cashflow Breakeven Trajectory Chart',
          '8 Specialized SaaS Vertical Benchmarks & Cohort Presets',
          'Executive PDF & Board Summary Presentation Export',
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <SaaSCalculator initialNicheSlug={defaultNiche.slug} isNextRouter={true} />
    </>
  );
}
