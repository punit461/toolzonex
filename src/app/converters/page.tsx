import type { Metadata } from 'next';
import CategoryDashboard from '@/components/CategoryDashboard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: 'Converters - Unit, Text & File Format Converters Free',
  description:
    'Free online converters for units, colors, encodings, and file formats -- Base64, hex, binary, CSV/JSON, temperature, length, and more, all in your browser.',
  keywords: ['online converters', 'unit converter', 'base64 converter', 'csv to json', 'color converter'],
  alternates: { canonical: '/converters' },
  openGraph: {
    title: 'Converters | ToolZoneX',
    description:
      'Free online converters for units, colors, encodings, and file formats -- Base64, hex, binary, CSV/JSON, temperature, length, and more.',
    url: `${SITE_URL}/converters`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'ToolZoneX' }],
  },
};

export default function Page() {
  return (
    <CategoryDashboard
      pageTitle="Converters"
      intro="Convert between units, colors, encodings, and file formats -- from length and temperature to Base64, hex, binary, and CSV/JSON -- instantly and entirely in your browser."
      sections={[{ label: 'Converters', categoryLabel: 'Converters' }]}
    />
  );
}
