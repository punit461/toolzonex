import type { Metadata } from 'next';
import CategoryDashboard from '@/components/CategoryDashboard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: 'Generators - Password, Name & Random Generators Free',
  description:
    'Free generator tools for passwords, names, random numbers, UUIDs, and more -- fast, free, and fully client-side, no signup required.',
  keywords: ['generators', 'password generator', 'random name generator', 'uuid generator', 'random number generator'],
  alternates: { canonical: '/generators' },
  openGraph: {
    title: 'Generators | ToolZoneX',
    description:
      'Free generator tools for passwords, names, random numbers, UUIDs, and more -- fast, free, and fully client-side.',
    url: `${SITE_URL}/generators`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'ToolZoneX' }],
  },
};

export default function Page() {
  return (
    <CategoryDashboard
      pageTitle="Generators"
      intro="Generate passwords, names, random numbers, UUIDs, lorem ipsum, and dozens of other things you need on the spot -- all free and computed right in your browser."
      sections={[{ label: 'Generators', categoryLabel: 'Generators' }]}
    />
  );
}
