import type { Metadata } from 'next';

const title = 'SaaS CAC Calculator (Fully Loaded)';
const description =
  'Calculate your true, fully loaded SaaS CAC — sales salaries, ad spend and tooling included. Free calculator with ASC 340-40 compliant formula.';
const canonical = 'https://bestsaasmetrics.com/cac-calculator';

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
        alt: 'Best SaaS Metrics — SaaS CAC Calculator',
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

export default function CacCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
