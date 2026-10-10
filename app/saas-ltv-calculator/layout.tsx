import type { Metadata } from 'next';

const title = 'SaaS LTV Calculator';
const description =
  'Calculate customer lifetime value for your SaaS with gross margin and churn adjustments. Free LTV calculator with LTV:CAC ratio benchmarks.';
const canonical = 'https://bestsaasmetrics.com/saas-ltv-calculator';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical,
  },
  openGraph: {
    title,
    description,
    url: canonical,
    type: 'website',
    siteName: 'Best SaaS Metrics',
    images: [
      {
        url: 'https://bestsaasmetrics.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Best SaaS Metrics — SaaS LTV Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['https://bestsaasmetrics.com/og-image.png'],
  },
};

export default function LtvCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
