import type { Metadata } from 'next';
import CategoryDashboard from '@/components/CategoryDashboard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: 'Health & Fitness Calculators - BMI, Calories & More Free',
  description:
    'Free health and fitness calculators covering BMI, calories, body fat, macros, pregnancy, and more -- all processed in your browser, no signup.',
  keywords: ['health calculators', 'bmi calculator', 'calorie calculator', 'body fat calculator', 'fitness calculator'],
  alternates: { canonical: '/health' },
  openGraph: {
    title: 'Health & Fitness Calculators | ToolZoneX',
    description:
      'Free health and fitness calculators covering BMI, calories, body fat, macros, pregnancy, and more.',
    url: `${SITE_URL}/health`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'ToolZoneX' }],
  },
};

export default function Page() {
  return (
    <CategoryDashboard
      pageTitle="Health & Fitness Calculators"
      intro="Calculators for BMI, calories, body composition, pregnancy, macros, and other everyday health and fitness questions -- fast, free, and calculated right in your browser."
      sections={[{ label: 'Health Tools', categoryLabel: 'Health' }]}
    />
  );
}
