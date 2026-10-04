import type { Metadata } from 'next';
import CategoryDashboard from '@/components/CategoryDashboard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: 'Developer Tools - Hash, Regex, Color & More Free',
  description:
    'Free developer tools for hashing, encoding, color codes, regex testing, validators, and more -- all free and processed entirely in your browser.',
  keywords: ['developer tools', 'hash generator', 'regex tester', 'color picker', 'json validator'],
  alternates: { canonical: '/developer-tools' },
  openGraph: {
    title: 'Developer Tools | ToolZoneX',
    description:
      'Free developer tools for hashing, encoding, color codes, regex testing, validators, and more.',
    url: `${SITE_URL}/developer-tools`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'ToolZoneX' }],
  },
};

export default function Page() {
  return (
    <CategoryDashboard
      pageTitle="Developer Tools"
      intro="Utilities for everyday development work: hashing, encoding, color codes, regex testing, validators, generators, and more -- all free and processed entirely in your browser."
      sections={[{ label: 'Developer Tools', categoryLabel: 'Developer Tools' }]}
    />
  );
}
