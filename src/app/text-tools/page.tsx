import type { Metadata } from 'next';
import CategoryDashboard from '@/components/CategoryDashboard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: 'Text Tools - Word Counter, Case Converter & More Free',
  description:
    'Free text tools for counting, cleaning, formatting, and analyzing text -- word counters, case converters, duplicate removers, and more, right in your browser.',
  keywords: ['text tools', 'word counter', 'case converter', 'text cleaner', 'remove duplicate lines'],
  alternates: { canonical: '/text-tools' },
  openGraph: {
    title: 'Text Tools | ToolZoneX',
    description:
      'Free text tools for counting, cleaning, formatting, and analyzing text -- word counters, case converters, duplicate removers, and more.',
    url: `${SITE_URL}/text-tools`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'ToolZoneX' }],
  },
};

export default function Page() {
  return (
    <CategoryDashboard
      pageTitle="Text Tools"
      intro="Tools for counting, cleaning, formatting, and analyzing text -- word and character counters, case converters, duplicate and whitespace cleanup, and more."
      sections={[{ label: 'Text Tools', categoryLabel: 'Text Tools' }]}
    />
  );
}
