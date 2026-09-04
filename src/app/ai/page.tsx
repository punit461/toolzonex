import type { Metadata } from 'next';
import CategoryDashboard from '@/components/CategoryDashboard';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: 'AI Tools - LLM & GPU Cost Calculators Free',
  description:
    'Free AI tools for estimating LLM API costs and GPU rental costs -- plan your AI project budget in seconds, no signup required.',
  keywords: ['ai tools', 'llm cost calculator', 'gpu cost calculator', 'ai budget calculator'],
  alternates: { canonical: '/ai' },
  openGraph: {
    title: 'AI Tools | ToolZoneX',
    description: 'Free AI tools for estimating LLM API costs and GPU rental costs.',
    url: `${SITE_URL}/ai`,
    type: 'article',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'ToolZoneX' }],
  },
};

export default function Page() {
  return (
    <CategoryDashboard
      pageTitle="AI Tools"
      intro="Calculators for planning the cost of working with AI -- estimate LLM API spend and GPU rental costs before you commit."
      sections={[{ label: 'AI Tools', categoryLabel: 'AI' }]}
    />
  );
}
