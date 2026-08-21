import { useEffect } from 'react';
import { SubNicheData, AuthorProfile } from '../types';

interface SchemaJsonLdProps {
  niche: SubNicheData;
  author: AuthorProfile;
  appUrl?: string;
}

export default function SchemaJsonLd({
  niche,
  author,
  appUrl = 'https://bestsaasmetrics.com',
}: SchemaJsonLdProps) {
  const currentUrl = `${appUrl}/?niche=${niche.slug}`;

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${appUrl}/#software`,
        name: 'Best SAAS Metrics - CAC Payback & Unit Economics Calculator',
        applicationCategory: 'FinanceApplication',
        operatingSystem: 'All Modern Web Browsers (Chrome, Safari, Firefox, Edge)',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
        featureList: [
          'Zero-rounding error CAC Payback Period calculation',
          'Customer Lifetime Value (LTV) and LTV:CAC Ratio engine',
          '36-month interactive cumulative cashflow trajectory modeling',
          '8 Industry B2B SaaS benchmark comparison presets',
          '1-Page Executive PDF Unit Economics Audit Report export',
          'Client-side state persistence and instant shareable URL parameters',
        ],
        author: {
          '@type': 'Person',
          name: author.name,
          jobTitle: author.title,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Best SAAS Metrics Research Institute',
          url: appUrl,
          logo: `${appUrl}/logo.png`,
        },
      },
      {
        '@type': 'TechArticle',
        '@id': `${currentUrl}#article`,
        headline: `${niche.name} CAC Payback Period & Unit Economics Benchmark Guide (2026)`,
        description: niche.metaDescription,
        url: currentUrl,
        inLanguage: 'en-US',
        mainEntityOfPage: currentUrl,
        datePublished: author.datePublished,
        dateModified: author.dateModified,
        author: {
          '@type': 'Person',
          '@id': `${appUrl}/#author-alex-mercer`,
          name: author.name,
          jobTitle: author.title,
          description: author.bio,
          sameAs: [author.linkedinUrl],
        },
        accountablePerson: {
          '@type': 'Person',
          name: author.reviewerName,
          jobTitle: author.reviewerTitle,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Best SAAS Metrics Research Institute',
          url: appUrl,
        },
        keywords: [
          'CAC Payback Period',
          'LTV CAC Ratio',
          'SaaS Unit Economics',
          'Gross Margin Adjusted Payback',
          'Net Monthly ARPU',
          niche.name,
          'SaaS Financial Modeling',
          'ASC 606 Revenue Recognition',
        ],
      },
      {
        '@type': 'DefinedTermSet',
        '@id': `${appUrl}/#metrics-terms`,
        name: 'SaaS Unit Economics & Valuation Terms',
        hasDefinedTerm: [
          {
            '@type': 'DefinedTerm',
            name: 'CAC Payback Period',
            description:
              'The number of months required for a SaaS business to recover the customer acquisition cost (CAC) through gross-margin adjusted net recurring revenue.',
            inDefinedTermSet: `${appUrl}/#metrics-terms`,
          },
          {
            '@type': 'DefinedTerm',
            name: 'LTV:CAC Ratio',
            description:
              'The ratio of Customer Lifetime Value to Customer Acquisition Cost, measuring overall capital efficiency and return on sales/marketing investments.',
            inDefinedTermSet: `${appUrl}/#metrics-terms`,
          },
          {
            '@type': 'DefinedTerm',
            name: 'Net Monthly ARPA',
            description:
              'Average Revenue Per Account multiplied by the software Gross Margin percentage, reflecting actual cash contribution available to amortize CAC.',
            inDefinedTermSet: `${appUrl}/#metrics-terms`,
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${currentUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: appUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'SaaS Calculators',
            item: `${appUrl}/?niche=enterprise-b2b-saas`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: niche.name,
            item: currentUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${currentUrl}#faq`,
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

  useEffect(() => {
    // Dynamically update document title and meta description
    const fullTitle = `${niche.name} CAC Payback & LTV:CAC Calculator (2026) | Best SAAS Metrics`;
    document.title = fullTitle;

    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('name', 'description', niche.metaDescription);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', niche.metaDescription);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', niche.metaDescription);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', currentUrl);
  }, [niche, currentUrl]);

  return (
    <script
      id="structured-data-json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph, null, 2) }}
    />
  );
}
