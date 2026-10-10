import type { Metadata } from 'next';

const title = 'Rule of 40 Calculator for SaaS';
const description =
  'Check if your SaaS meets the Rule of 40. Free calculator balancing revenue growth and profit margin, with benchmarks.';
const canonical = 'https://bestsaasmetrics.com/rule-of-40-calculator';

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
        alt: 'Best SaaS Metrics — Rule of 40 Calculator for SaaS',
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

export default function RuleOf40CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
