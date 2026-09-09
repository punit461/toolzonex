import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

// Verification files (Google/Bing/Yandex/Pinterest site-ownership proofs) live at the
// domain root as static HTML but are not real content pages — they must never be
// submitted in the sitemap as indexable URLs.
const VERIFICATION_FILE_PATTERN = /^(google[a-f0-9]+|bingsiteauth|yandex_[a-f0-9]+|pinterest-[a-f0-9]+)$/i;

const gitDateCache = new Map();

/** Real last-commit date (author date, ISO 8601) for a source file, via git history —
 *  used instead of the build output's mtime, which is identical for every page in a
 *  given build run and carries no real content-freshness signal. */
function getGitDate(sourceRelPath) {
  if (gitDateCache.has(sourceRelPath)) return gitDateCache.get(sourceRelPath);
  let result = null;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%aI', '--', sourceRelPath], {
      cwd: process.cwd(),
      encoding: 'utf8',
    }).trim();
    if (out) result = out;
  } catch {
    // git unavailable or file untracked — caller falls back to output mtime
  }
  gitDateCache.set(sourceRelPath, result);
  return result;
}

/** Best-effort mapping from a route back to the source file whose last real commit
 *  date should represent that page's lastmod. Falls back to null (caller uses the
 *  build output's mtime) when no confident mapping exists. */
function getSourceFileForRoute(route) {
  if (route === '/') return 'src/app/page.tsx';
  if (route.startsWith('/blog/tools/')) {
    // Dynamic route backed by shared data files — use whichever was touched more
    // recently, since individual guide entries aren't separate source files.
    const handwritten = getGitDate('src/data/tool-blogs.handwritten.ts');
    const generated = getGitDate('src/data/tool-blogs.generated.ts');
    if (handwritten && generated) return handwritten > generated ? 'src/data/tool-blogs.handwritten.ts' : 'src/data/tool-blogs.generated.ts';
    return handwritten ? 'src/data/tool-blogs.handwritten.ts' : 'src/data/tool-blogs.generated.ts';
  }
  if (route.startsWith('/calculators/')) return 'src/app/calculators/[slug]/page.tsx';
  const candidate = `src/app${route}/page.tsx`;
  if (fs.existsSync(path.join(process.cwd(), candidate))) return candidate;
  return null;
}

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

function getLastMod(route, filePath) {
  const sourceFile = getSourceFileForRoute(route);
  if (sourceFile) {
    const gitDate = getGitDate(sourceFile);
    if (gitDate) return gitDate;
  }
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
        const basename = file.replace('.html', '');
        if (basePath === '' && VERIFICATION_FILE_PATTERN.test(basename)) {
          continue;
        }

        const html = fs.readFileSync(fullPath, 'utf8');
        if (/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html)) {
          continue;
        }

        let route = `${basePath}/${basename}`;
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
    <lastmod>${getLastMod(route, filePath)}</lastmod>
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
