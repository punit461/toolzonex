import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://punit461.github.io/toolzonex';

export default function sitemap(): MetadataRoute.Sitemap {
  const calculators = [
    '/finance/emi-calculator',
    '/finance/sip-calculator',
    '/finance/gst-calculator',
    '/finance/income-tax-calculator',
    '/finance/ppf-calculator',
    '/finance/rent-vs-buy-calculator',
    '/finance/gold-calculator',
    '/finance/silver-calculator',
    '/finance/ssy-calculator',
    '/finance/gratuity-calculator',
    '/finance/salary-increment-calculator',
    '/finance/retirement-calculator',
    '/health/bmi-calculator',
    '/health/bmr-calculator',
    '/health/tdee-calculator',
    '/health/pft-calculator',
    '/health/cft-calculator',
    '/utilities/age-calculator',
    '/utilities/percentage-calculator',
    '/utilities/date-calculator',
    '/tools/online-notepad',
  ];

  const blogs = [
    '/blog/sip-early-retirement',
    '/blog/old-vs-new-tax-regime',
    '/blog/understanding-gst',
    '/blog/50-30-20-budgeting-rule',
    '/blog/improve-cibil-score',
    '/blog/renting-vs-buying-home',
    '/blog/complete-guide-to-ppf',
    '/blog/power-of-compound-interest',
    '/blog/sukanya-samriddhi-yojana-benefits',
    '/blog/understanding-gratuity-india',
    '/blog/new-tax-regime-fy-2025-26',
    '/blog/section-87a-rebate-guide',
    '/blog/hra-exemption-calculation',
    '/blog/section-80c-investment-guide',
  ];

  const staticPages = [
    '/about',
    '/faq',
    '/privacy-policy',
    '/terms-of-service',
    '/contact',
  ];

  const routes = [
    {
      url: `${DOMAIN}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${DOMAIN}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    ...calculators.map((route) => ({
      url: `${DOMAIN}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...blogs.map((route) => ({
      url: `${DOMAIN}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...staticPages.map((route) => ({
      url: `${DOMAIN}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];

  return routes;
}
