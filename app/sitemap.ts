import { MetadataRoute } from 'next';
import { SUB_NICHES } from '@/src/data/niches';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bestsaasmetrics.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Dedicated Standalone Metric Calculators
    {
      url: `${baseUrl}/cac-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/saas-ltv-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/saas-churn-rate-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/saas-magic-number-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/saas-burn-multiple-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rule-of-40-calculator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Contact
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    // SaaS Benchmarks 2026 hub
    {
      url: `${baseUrl}/saas-benchmarks`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Involuntary Churn guide
    {
      url: `${baseUrl}/involuntary-churn`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // CAC Payback Period Benchmarks guide
    {
      url: `${baseUrl}/cac-payback-period-benchmarks`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // How to Calculate Churn Rate guide
    {
      url: `${baseUrl}/how-to-calculate-churn-rate`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = SUB_NICHES.map((niche) => ({
    url: `${baseUrl}/${niche.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
