import type { Metadata } from 'next';
import CategoryDashboard from '@/components/CategoryDashboard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: 'Finance Tools - Loan, Investment & Tax Calculators Free',
  description:
    'Free finance calculators for loans, investments, taxes, retirement, and budgeting, plus paycheck calculators for every US state -- all free, no signup.',
  keywords: ['finance calculators', 'loan calculator', 'investment calculator', 'paycheck calculator by state', 'tax calculator'],
  alternates: { canonical: '/finance' },
  openGraph: {
    title: 'Finance Tools | ToolZoneX',
    description:
      'Free finance calculators for loans, investments, taxes, retirement, and budgeting, plus paycheck calculators for every US state.',
    url: `${SITE_URL}/finance`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'ToolZoneX' }],
  },
};

export default function Page() {
  return (
    <CategoryDashboard
      pageTitle="Finance Tools"
      intro="Calculators for loans, investments, taxes, retirement planning, and everyday budgeting, plus a full set of paycheck calculators broken out by US state so you can see your exact take-home pay."
      sections={[
        { label: 'Calculators', categoryLabel: 'Finance' },
        { label: 'US Paycheck Calculators by State', categoryLabel: 'Paycheck Calculators' },
      ]}
    />
  );
}
