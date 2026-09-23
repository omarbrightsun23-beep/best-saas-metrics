import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../src/index.css';

export const viewport: Viewport = {
  themeColor: '#0F172A',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://bestsaasmetrics.com'),
  title: {
    default: 'Best SaaS Metrics | B2B SaaS CAC Payback Period & Unit Economics Calculator',
    template: '%s | Best SaaS Metrics',
  },
  description:
    'Institutional-grade B2B SaaS unit economics calculator. Compute true gross margin-adjusted CAC payback periods, LTV:CAC ratios, and 36-month capital trajectories across 8 industry cohorts.',
  keywords: [
    'Best SaaS Metrics',
    'CAC payback period calculator',
    'LTV CAC ratio',
    'SaaS unit economics',
    'ARPA',
    'gross margin adjusted payback',
    'B2B SaaS benchmarks',
    'SaaS financial modeling',
  ],
  authors: [{ name: 'Best SaaS Metrics Quantitative Research' }],
  creator: 'Best SaaS Metrics',
  publisher: 'Best SaaS Metrics Quantitative Research',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bestsaasmetrics.com/',
    siteName: 'Best SaaS Metrics',
    title: 'Best SaaS Metrics | B2B SaaS CAC Payback & Unit Economics',
    description:
      'Calculate gross margin-adjusted CAC payback period, customer lifetime value, and capital efficiency with 8 industry benchmark cohorts.',
    images: [
      {
        url: 'https://bestsaasmetrics.com/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Best SaaS Metrics — Unit Economics & Benchmarks',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best SaaS Metrics | B2B SaaS CAC Payback & Unit Economics',
    description:
      'Calculate gross margin-adjusted CAC payback period, customer lifetime value, and capital efficiency with 8 industry benchmark cohorts.',
    images: ['https://bestsaasmetrics.com/og-image.svg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/icon.svg' }],
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-50 text-slate-900 antialiased font-sans selection:bg-[#15803d] selection:text-white min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
