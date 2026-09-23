import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SUB_NICHES, AUTHOR_DATA } from '@/src/data/niches';
import SaaSCalculator from '@/src/components/SaaSCalculator';

interface PageProps {
  params: Promise<{ industry: string }> | { industry: string };
}

function findNicheBySlug(slug: string) {
  const aliasMap: Record<string, string> = {
    'healthcare-b2b-saas': 'healthcare-saas',
    'salestech-crm-saas': 'salestech-saas',
  };
  const resolvedSlug = aliasMap[slug] || slug;
  return SUB_NICHES.find((n) => n.slug === resolvedSlug);
}

export async function generateStaticParams() {
  return SUB_NICHES.map((niche) => ({
    industry: niche.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const industry = resolvedParams?.industry || '';
  const niche = findNicheBySlug(industry);

  if (!niche) {
    return {
      title: 'Industry Not Found | Best SaaS Metrics',
      description: 'The requested SaaS industry cohort could not be found.',
    };
  }

  const title = `${niche.name} CAC Payback & LTV:CAC Calculator (2026) | Best SaaS Metrics`;
  const description = niche.metaDescription;
  const canonicalUrl = `https://bestsaasmetrics.com/${niche.slug}`;

  return {
    title,
    description,
    keywords: [
      `${niche.name} CAC payback`,
      `${niche.name} unit economics`,
      `${niche.name} LTV CAC ratio`,
      `${niche.name} benchmarks 2026`,
      'SaaS financial model',
      'gross margin adjusted payback',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
      siteName: 'Best SaaS Metrics',
      images: [
        {
          url: 'https://bestsaasmetrics.com/og-image.svg',
          width: 1200,
          height: 630,
          alt: `${niche.name} SaaS Unit Economics & Benchmarks`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://bestsaasmetrics.com/og-image.svg'],
    },
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const resolvedParams = await Promise.resolve(params);
  const industry = resolvedParams?.industry || '';
  const niche = findNicheBySlug(industry);

  if (!niche) {
    notFound();
  }

  const canonicalUrl = `https://bestsaasmetrics.com/${niche.slug}`;

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${canonicalUrl}#article`,
        headline: `${niche.name} CAC Payback Period & Unit Economics Benchmark Guide (2026)`,
        description: niche.metaDescription,
        url: canonicalUrl,
        inLanguage: 'en-US',
        datePublished: '2026-01-15T08:00:00+00:00',
        dateModified: '2026-09-20T00:00:00+00:00',
        author: {
          '@type': 'Person',
          name: AUTHOR_DATA.name,
          jobTitle: AUTHOR_DATA.title,
          description: AUTHOR_DATA.bio,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Best SaaS Metrics Quantitative Research',
          url: 'https://bestsaasmetrics.com/',
          logo: {
            '@type': 'ImageObject',
            url: 'https://bestsaasmetrics.com/icon.svg',
          },
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${canonicalUrl}#calculator`,
        name: `${niche.name} CAC Payback Period Calculator`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All modern web browsers',
        url: canonicalUrl,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://bestsaasmetrics.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'SaaS Benchmarks',
            item: 'https://bestsaasmetrics.com/enterprise-b2b-saas',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: niche.name,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        mainEntity: niche.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <SaaSCalculator initialNicheSlug={niche.slug} isNextRouter={true} />
    </>
  );
}
