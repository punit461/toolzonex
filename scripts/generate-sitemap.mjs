import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

// Verification files (Google/Bing/Yandex/Pinterest site-ownership proofs) live at the
// domain root as static HTML but are not real content pages — they must never be
// submitted in the sitemap as indexable URLs.
const VERIFICATION_FILE_PATTERN = /^(google[a-f0-9]+|bingsiteauth|yandex_[a-f0-9]+|pinterest-[a-f0-9]+)$/i;

// lastmod stamped on every URL in sitemap-cleanup.xml. It only needs to be newer
// than Googlebot's last visit so the URL gets re-fetched and the noindex/301 is
// seen; bump it if another index sweep ships and the file is still published.
const CLEANUP_LASTMOD = '2026-09-26T00:00:00+00:00';

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

/** True when the built page carries a `noindex` in the named robots meta ("robots" or "googlebot"). */
function hasNoindex(html, metaName) {
  return new RegExp(`<meta[^>]+name="${metaName}"[^>]+content="[^"]*noindex`, 'i').test(html);
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
  const noindexRoutes = [];
  const bingOnlyUrls = [];

  function toRoute(basePath, basename) {
    let route = `${basePath}/${basename}`;
    if (route.endsWith('/index')) {
      route = route.replace('/index', '');
    }
    return route === '' ? '/' : route;
  }

  function crawlDir(directory, basePath = '') {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const fullPath = path.join(directory, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        crawlDir(fullPath, `${basePath}/${file}`);
      } else if (file.endsWith('.html') && file !== '404.html') {
        const basename = file.replace('.html', '');
        // Next's internal pages (_not-found.html) carry a noindex meta and would
        // otherwise land in sitemap-cleanup.xml as if they were real content.
        if (basename.startsWith('_')) {
          continue;
        }
        if (basePath === '' && VERIFICATION_FILE_PATTERN.test(basename)) {
          continue;
        }

        const html = fs.readFileSync(fullPath, 'utf8');
        if (hasNoindex(html, 'robots')) {
          noindexRoutes.push(toRoute(basePath, basename));
          continue;
        }
        // `bingIndexable` tools: `robots` allows indexing but the googlebot meta
        // doesn't. They stay out of sitemap.xml, remain in the cleanup sitemap
        // (Google must keep seeing the noindex), and go to sitemap-bing.xml.
        if (hasNoindex(html, 'googlebot')) {
          noindexRoutes.push(toRoute(basePath, basename));
          bingOnlyUrls.push({ route: toRoute(basePath, basename), filePath: fullPath });
          continue;
        }

        urls.push({ route: toRoute(basePath, basename), filePath: fullPath });
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

  // Every noindexed page (and every legacy /tools/ + /calculators/ URL, whose
  // stub HTML is noindexed and which _redirects now 301s). Listing them with a
  // fresh lastmod gets Googlebot to re-crawl them and act on the noindex / 301
  // within weeks, instead of whenever it happens to wander back to pages that
  // are no longer in the main sitemap. Search Console will report these as
  // "Submitted URL marked 'noindex'" -- expected. Once the Pages report shows
  // them excluded, delete this block and its robots.txt line.
  const cleanupRoutes = [...new Set(noindexRoutes)].sort();
  const cleanupSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${cleanupRoutes
  .map((route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${CLEANUP_LASTMOD}</lastmod>
  </url>`)
  .join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(outPath, 'sitemap-cleanup.xml'), cleanupSitemap);
  console.log(`✅ sitemap-cleanup.xml generated with ${cleanupRoutes.length} noindexed/redirected URLs`);

  // Pages that only Bing may index. Deliberately left out of robots.txt, which
  // Google also reads: submit it in Bing Webmaster Tools (Sitemaps) instead.
  const bingSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${bingOnlyUrls
  .map(({ route, filePath }) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${getLastMod(route, filePath)}</lastmod>
  </url>`)
  .join('\n')}
</urlset>`;
  fs.writeFileSync(path.join(outPath, 'sitemap-bing.xml'), bingSitemap);
  console.log(`✅ sitemap-bing.xml generated with ${bingOnlyUrls.length} Bing-only URLs`);

  // /_next/ must stay crawlable: it holds every page's CSS and JS, and blocking
  // it made Googlebot render every tool as an unstyled, non-working form.
  const robots = `# ToolZoneX robots.txt
User-agent: *
Allow: /
Disallow: /api/

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml
Sitemap: ${SITE_URL}/sitemap-cleanup.xml
`;
  fs.writeFileSync(path.join(outPath, 'robots.txt'), robots);
  console.log('✅ robots.txt generated');
}

generateSitemap();
