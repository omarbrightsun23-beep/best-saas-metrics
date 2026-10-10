import type { Metadata } from 'next';

const title = 'SaaS Churn Rate Calculator';
const description =
  'Calculate logo and revenue churn rate for your SaaS. Free churn calculator with retention benchmarks and NRR vs GRR explainer.';
const canonical = 'https://bestsaasmetrics.com/saas-churn-rate-calculator';

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
        alt: 'Best SaaS Metrics — SaaS Churn Rate Calculator',
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

export default function ChurnCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
