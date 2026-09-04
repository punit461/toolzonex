import type { Metadata } from 'next';
import Link from 'next/link';
import CategoryDashboard from '@/components/CategoryDashboard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: 'Tools - Miscellaneous Free Online Tools',
  description:
    'A collection of free miscellaneous online tools -- from label croppers to file utilities -- all processed in your browser, no signup.',
  keywords: ['online tools', 'free tools', 'label cropper', 'file tools'],
  alternates: { canonical: '/tools' },
  openGraph: {
    title: 'Tools | ToolZoneX',
    description: 'A collection of free miscellaneous online tools -- all processed in your browser, no signup.',
    url: `${SITE_URL}/tools`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'ToolZoneX' }],
  },
};

export default function Page() {
  return (
    <CategoryDashboard
      pageTitle="Tools"
      intro={
        <>
          A mixed set of handy free tools that don&apos;t fit neatly into any other category. Looking for PDF
          tools specifically? They have their own dedicated hub at{' '}
          <Link href="/tools/pdf-tools">/tools/pdf-tools</Link>.
        </>
      }
      sections={[{ label: 'Tools', categoryLabel: 'Tools' }]}
    />
  );
}
