import type { Metadata } from 'next';
import CategoryDashboard, { FeaturedGuide } from '@/components/CategoryDashboard';

const financeGuides: FeaturedGuide[] = [
  { slug: 'complete-guide-to-ppf', title: 'The Complete Guide to PPF: Interest Rate, Rules, and Benefits (2026)', description: 'Current PPF rate, EEE tax status, and how it compares to ELSS/NSC/FD.' },
  { slug: 'old-vs-new-tax-regime', title: 'Old vs. New Tax Regime: Which Should You Choose? (FY 2025-26)', description: 'Full slab-rate comparison and a quick-verdict heuristic.' },
  { slug: 'new-tax-regime-fy-2025-26', title: 'New Tax Regime FY 2025-26: Every Change Explained', description: 'What changed in Budget 2025 — new slabs and a higher standard deduction.' },
  { slug: 'section-87a-rebate-guide', title: 'Section 87A Rebate: Pay Zero Tax up to ₹12.75 Lakh in FY 2025-26', description: 'How the rebate can zero out your tax liability entirely.' },
  { slug: 'hra-exemption-calculation', title: 'HRA Exemption: How to Calculate and Maximise It', description: 'One of the biggest old-regime deductions for salaried tenants.' },
  { slug: 'section-80c-investment-guide', title: 'Section 80C: ₹1.5 Lakh Deduction — Complete Investment Guide', description: 'Every qualifying 80C investment, compared.' },
  { slug: 'sukanya-samriddhi-yojana-benefits', title: "Securing Your Daughter's Future with Sukanya Samriddhi Yojana (SSY)", description: 'Another EEE, government-backed 80C instrument.' },
  { slug: 'sip-early-retirement', title: 'How to Plan Your Early Retirement Using SIPs', description: 'Using systematic investing to retire earlier.' },
  { slug: 'power-of-compound-interest', title: 'The Power of Compound Interest in Mutual Funds', description: 'Why starting early matters more than the amount you invest.' },
  { slug: '50-30-20-budgeting-rule', title: "The 50/30/20 Rule: A Beginner's Guide to Budgeting", description: 'A simple framework for splitting your income before you invest a rupee.' },
  { slug: 'improve-cibil-score', title: 'How to Improve Your CIBIL Score Quickly', description: 'A step-by-step guide to fixing a bad credit score and keeping it above 750.' },
  { slug: 'renting-vs-buying-home', title: 'Is Buying a Home Better Than Renting in 2026?', description: 'A detailed analysis of the age-old rent-vs-buy debate.' },
  { slug: 'understanding-gratuity-india', title: 'Understanding Gratuity: Eligibility, Calculation, and Tax Rules', description: 'Eligibility criteria and how to calculate your final gratuity amount.' },
  { slug: 'understanding-gst', title: 'Understanding GST: How it Impacts Small Businesses', description: 'GST basics and how it affects day-to-day business operations.' },
];

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
      featuredGuides={financeGuides}
    />
  );
}
