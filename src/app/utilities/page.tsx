import type { Metadata } from 'next';
import CategoryDashboard from '@/components/CategoryDashboard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: 'Everyday Utilities - Free Online Tools & Testers',
  description:
    'Free everyday utility tools for unit conversion, date math, productivity, and quick device or screen tests -- all free, no signup, runs in your browser.',
  keywords: ['online utilities', 'free tools', 'productivity tools', 'screen test tools', 'date calculator'],
  alternates: { canonical: '/utilities' },
  openGraph: {
    title: 'Everyday Utilities | ToolZoneX',
    description:
      'Free everyday utility tools for unit conversion, date math, productivity, and quick device or screen tests.',
    url: `${SITE_URL}/utilities`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'ToolZoneX' }],
  },
};

export default function Page() {
  return (
    <CategoryDashboard
      pageTitle="Everyday Utilities"
      intro="Handy day-to-day utilities: unit and date conversions, productivity helpers for planning your time, and fun screen tests for checking your display or devices."
      sections={[
        { label: 'Utilities', categoryLabel: 'Utilities' },
        { label: 'Time & Productivity', categoryLabel: 'Time & Productivity' },
        { label: 'Fun Screens & Testers', categoryLabel: 'Screens' },
      ]}
    />
  );
}
