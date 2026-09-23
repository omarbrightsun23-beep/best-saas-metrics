import React from 'react';
import { Helmet } from 'react-helmet-async';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogImage?: string;
  twitterCard?: string;
  schemaData?: Record<string, unknown> | Array<Record<string, unknown>> | null;
  noIndex?: boolean;
}

/**
 * Reusable SEO component for dynamic programmatic SEO pages.
 */
export const SEO: React.FC<SEOProps> = ({
  title = 'Best SaaS Metrics | B2B SaaS CAC Payback Period & Unit Economics Calculator',
  description = 'Calculate gross margin-adjusted CAC payback period, LTV:CAC ratio, and 36-month capital trajectories across 8 SaaS benchmark cohorts.',
  canonicalUrl = 'https://bestsaasmetrics.com/',
  schemaData = null,
  ogType = 'website',
  ogImage = 'https://bestsaasmetrics.com/og-image.svg',
  twitterCard = 'summary_large_image',
  noIndex = false,
}) => {
  const fullTitle = title
    ? (title.includes('Best SaaS Metrics') || title.includes('Best SAAS Metrics')
        ? title
        : `${title} | Best SaaS Metrics`)
    : 'Best SaaS Metrics | B2B SaaS CAC Payback Period & Unit Economics Calculator';

  return (
    <Helmet>
      {/* Primary HTML Title */}
      {fullTitle && <title>{fullTitle}</title>}

      {/* Meta Description */}
      {description && <meta name="description" content={description} />}

      {/* Robots Tag */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}

      {/* Canonical Link */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph Tags */}
      {fullTitle && <meta property="og:title" content={fullTitle} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={ogType} />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:site_name" content="Best SaaS Metrics" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImage && <meta property="og:image:alt" content={fullTitle} />}

      {/* Twitter Cards */}
      <meta name="twitter:card" content={twitterCard} />
      {fullTitle && <meta name="twitter:title" content={fullTitle} />}
      {description && <meta name="twitter:description" content={description} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Dynamic JSON-LD Schema */}
      {schemaData && (
        <script type="application/ld+json">
          {typeof schemaData === 'string' ? schemaData : JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
