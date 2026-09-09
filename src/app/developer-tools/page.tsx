import type { Metadata } from 'next';
import CategoryDashboard, { FeaturedGuide } from '@/components/CategoryDashboard';

const developerGuides: FeaturedGuide[] = [
  { slug: 'jwt-explained', title: "JWT Explained: What's Actually Inside a JSON Web Token", description: 'How JWTs actually work under the hood.' },
  { slug: 'cron-syntax-cheatsheet', title: 'Cron Syntax Cheatsheet: How to Read Any Crontab Schedule', description: 'The five fields, decoded.' },
  { slug: 'cloud-gpu-pricing-guide', title: 'Cloud GPU Pricing Explained: Community Cloud vs. Hyperscalers', description: 'Why the same GPU can cost 3.5x more depending on where you rent it.' },
  { slug: 'llm-api-pricing-guide', title: 'How Much Do LLM API Calls Actually Cost? A Practical Guide', description: 'Input vs. output token pricing, explained.' },
];

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
      featuredGuides={developerGuides}
    />
  );
}
