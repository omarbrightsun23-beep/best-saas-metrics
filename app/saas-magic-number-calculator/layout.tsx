import type { Metadata } from 'next';

const title = 'SaaS Magic Number Calculator';
const description =
  'Calculate your SaaS magic number to measure sales efficiency. Free calculator with benchmarks for efficient growth spending.';
const canonical = 'https://bestsaasmetrics.com/saas-magic-number-calculator';

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
        alt: 'Best SaaS Metrics — SaaS Magic Number Calculator',
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

export default function MagicNumberCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
