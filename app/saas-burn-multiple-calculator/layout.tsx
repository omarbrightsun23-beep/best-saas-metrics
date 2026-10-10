import type { Metadata } from 'next';

const title = 'SaaS Burn Multiple Calculator';
const description =
  "Calculate burn multiple to measure your startup's capital efficiency. Free SaaS calculator with top-quartile benchmarks.";
const canonical = 'https://bestsaasmetrics.com/saas-burn-multiple-calculator';

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
        alt: 'Best SaaS Metrics — SaaS Burn Multiple Calculator',
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

export default function BurnMultipleCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
