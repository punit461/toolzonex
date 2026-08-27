import fs from 'fs';
import path from 'path';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

function getPriority(route) {
  if (route === '/') return '1.0';
  if (route.startsWith('/blog/tools/')) return '0.7';
  if (route.startsWith('/blog/')) return '0.8';
  if (route.startsWith('/finance/') || route.startsWith('/health/') || route.startsWith('/utilities/')) return '0.9';
  if (route.startsWith('/tools/') || route.startsWith('/converters/') || route.startsWith('/text-tools/') || route.startsWith('/generators/') || route.startsWith('/developer-tools/') || route.startsWith('/ai/')) return '0.9';
  return '0.6';
}

function getChangeFreq(route) {
  if (route === '/') return 'daily';
  if (route.startsWith('/blog/')) return 'monthly';
  return 'weekly';
}

function getLastMod(filePath) {
  try {
    const stat = fs.statSync(filePath);
    return stat.mtime.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

async function generateSitemap() {
  const outPath = path.join(process.cwd(), 'out');
  
  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath, { recursive: true });
  }

  const urls = [];

  function crawlDir(directory, basePath = '') {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const fullPath = path.join(directory, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        crawlDir(fullPath, `${basePath}/${file}`);
      } else if (file.endsWith('.html') && file !== '404.html') {
        const html = fs.readFileSync(fullPath, 'utf8');
        if (/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html)) {
          continue;
        }

        let route = `${basePath}/${file.replace('.html', '')}`;
        if (route.endsWith('/index')) {
          route = route.replace('/index', '');
        }
        if (route === '') {
          route = '/';
        }
        urls.push({ route, filePath: fullPath });
      }
    }
  }

  crawlDir(outPath);

  const uniqueUrls = [...new Map(urls.map(u => [u.route, u])).values()];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${uniqueUrls
  .map(({ route, filePath }) => {
    return `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${getLastMod(filePath)}</lastmod>
    <changefreq>${getChangeFreq(route)}</changefreq>
    <priority>${getPriority(route)}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(outPath, 'sitemap.xml'), sitemap);
  console.log(`✅ sitemap.xml generated with ${uniqueUrls.length} URLs`);

  const robots = `# ToolZoneX robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(outPath, 'robots.txt'), robots);
  console.log('✅ robots.txt generated');
}

generateSitemap();
