import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { readRedirects } from './lib/redirect-maps.mjs';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

// Verification files (Google/Bing/Yandex/Pinterest site-ownership proofs) live at the
// domain root as static HTML but are not real content pages — they must never be
// submitted in the sitemap as indexable URLs.
const VERIFICATION_FILE_PATTERN = /^(google[a-f0-9]+|bingsiteauth|yandex_[a-f0-9]+|pinterest-[a-f0-9]+)$/i;

// lastmod stamped on every URL in sitemap-cleanup.xml. It only needs to be newer
// than Googlebot's last visit so the URL gets re-fetched and the noindex/301 is
// seen; bump it if another index sweep ships and the file is still published.
const CLEANUP_LASTMOD = '2026-09-26T00:00:00+00:00';

// lastmod for the retired blog's URLs in sitemap-cleanup.xml: the day they
// became 301s (see src/data/blog-redirects.ts).
const BLOG_RETIRED_LASTMOD = '2026-10-04T00:00:00+00:00';

/**
 * Cloudflare Pages builds from a one-commit-deep clone, where
 * `git log -1 -- <file>` answers with the deploy commit for every file, so all
 * 168 URLs shipped the identical lastmod and Google learns to ignore it.
 * Fetching the commit history without file contents takes a few seconds and
 * restores real per-file dates. Returns false if history is still unavailable,
 * in which case lastmod is omitted rather than faked.
 */
function ensureGitHistory() {
  const isShallow = () =>
    execFileSync('git', ['rev-parse', '--is-shallow-repository'], { encoding: 'utf8' }).trim() === 'true';
  try {
    if (!isShallow()) return true;
    const remote = execFileSync('git', ['remote'], { encoding: 'utf8' }).split('\n')[0].trim() || 'origin';
    execFileSync('git', ['fetch', '--quiet', '--unshallow', '--filter=blob:none', remote], {
      stdio: 'inherit',
      timeout: 120_000,
    });
    return !isShallow();
  } catch (err) {
    console.warn(`⚠️  git history unavailable (${err.message.split('\n')[0]}); sitemap lastmod omitted`);
    return false;
  }
}

let hasGitHistory = true;

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
    // git unavailable or file untracked: no date for this file
  }
  gitDateCache.set(sourceRelPath, result);
  return result;
}

/** Best-effort mapping from a route back to the page file behind it, or null
 *  when there is no confident mapping. */
function getSourceFileForRoute(route) {
  if (route === '/') return 'src/app/page.tsx';
  if (route.startsWith('/calculators/')) return 'src/app/calculators/[slug]/page.tsx';
  const candidate = `src/app${route}/page.tsx`;
  if (fs.existsSync(path.join(process.cwd(), candidate))) return candidate;
  return null;
}

// A tool's page.tsx is a thin wrapper that rarely changes. What the page shows
// comes from its registry entry (src/data/tools/) and calculator component
// (src/calculators/): the tip screen's page.tsx was last touched Sep 10, but
// the tool became interactive on Sep 26. Shared chrome (CalculatorShell, theme)
// is left out on purpose, or every page would change on every layout tweak.
const CONTENT_DIRS = ['src/data/tools/', 'src/calculators/'];

/** The page file plus the content files it directly imports. */
function getContentFiles(pageFile) {
  const files = [pageFile];
  const source = fs.readFileSync(path.join(process.cwd(), pageFile), 'utf8');
  for (const [, spec] of source.matchAll(/from\s+["'](\.{1,2}\/[^"']+)["']/g)) {
    const base = path.posix.join(path.posix.dirname(pageFile), spec);
    const resolved = ['.tsx', '.ts', '/index.tsx', '/index.ts']
      .map((ext) => base + ext)
      .find((p) => fs.existsSync(path.join(process.cwd(), p)));
    if (resolved && CONTENT_DIRS.some((dir) => resolved.startsWith(dir))) files.push(resolved);
  }
  return files;
}

/** True when the built page carries a `noindex` in the named robots meta ("robots" or "googlebot"). */
function hasNoindex(html, metaName) {
  return new RegExp(`<meta[^>]+name="${metaName}"[^>]+content="[^"]*noindex`, 'i').test(html);
}

function getPriority(route) {
  if (route === '/') return '1.0';
  if (route.startsWith('/finance/') || route.startsWith('/health/') || route.startsWith('/utilities/')) return '0.9';
  if (route.startsWith('/tools/') || route.startsWith('/converters/') || route.startsWith('/text-tools/') || route.startsWith('/generators/') || route.startsWith('/developer-tools/') || route.startsWith('/ai/')) return '0.9';
  return '0.6';
}

function getChangeFreq(route) {
  if (route === '/') return 'daily';
  return 'weekly';
}

/** Latest real commit date across the page's content files, or null when it
 *  can't be known. A missing lastmod is fine; a made-up one (the build's file
 *  mtimes, which are identical across a run) teaches Google to ignore it. */
function getLastMod(route) {
  if (!hasGitHistory) return null;
  const sourceFile = getSourceFileForRoute(route);
  if (!sourceFile) return null;
  const dates = getContentFiles(sourceFile).map(getGitDate).filter(Boolean);
  return dates.length ? dates.sort((a, b) => Date.parse(a) - Date.parse(b)).at(-1) : null;
}

const lastmodTag = (lastmod) => (lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '');

async function generateSitemap() {
  const outPath = path.join(process.cwd(), 'out');
  
  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath, { recursive: true });
  }

  hasGitHistory = ensureGitHistory();

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
          bingOnlyUrls.push({ route: toRoute(basePath, basename) });
          continue;
        }

        urls.push({ route: toRoute(basePath, basename) });
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
  .map(({ route }) => {
    return `  <url>
    <loc>${SITE_URL}${route}</loc>${lastmodTag(getLastMod(route))}
    <changefreq>${getChangeFreq(route)}</changefreq>
    <priority>${getPriority(route)}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  fs.writeFileSync(path.join(outPath, 'sitemap.xml'), sitemap);
  console.log(`✅ sitemap.xml generated with ${uniqueUrls.length} URLs`);

  // Every noindexed page (and every legacy /tools/ + /calculators/ URL, whose
  // stub HTML is noindexed and which _redirects now 301s), plus the retired
  // blog's URLs, which have no stub and exist only as 301s. Listing them with a
  // fresh lastmod gets Googlebot to re-crawl them and act on the noindex / 301
  // within weeks, instead of whenever it happens to wander back to pages that
  // are no longer in the main sitemap. Search Console will report these as
  // "Submitted URL marked 'noindex'" -- expected. Once the Pages report shows
  // them excluded, delete this block and its robots.txt line.
  const cleanupLastmod = new Map(noindexRoutes.map((route) => [route, CLEANUP_LASTMOD]));
  for (const [from] of readRedirects()) {
    if (from === '/blog' || from.startsWith('/blog/')) cleanupLastmod.set(from, BLOG_RETIRED_LASTMOD);
  }
  const cleanupRoutes = [...cleanupLastmod.keys()].sort();
  const cleanupSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${cleanupRoutes
  .map((route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${cleanupLastmod.get(route)}</lastmod>
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
  .map(({ route }) => `  <url>
    <loc>${SITE_URL}${route}</loc>${lastmodTag(getLastMod(route))}
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
