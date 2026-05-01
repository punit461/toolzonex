import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const DOMAIN = process.env.VITE_SITE_URL || 'https://punit461.github.io/toolzonex';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/'],
    },
    sitemap: `${DOMAIN}/sitemap.xml`,
  };
}
