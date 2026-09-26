import fs from 'fs';
import path from 'path';

/**
 * Writes out/_redirects (Cloudflare Pages) from src/data/legacy-redirects.ts, so
 * the old /tools/<slug> and /calculators/<slug> URLs answer with a real 301
 * instead of a 200 page carrying a meta refresh.
 *
 * Under GitHub Pages the meta-refresh stubs were the only option, and Google
 * treated each old URL as its own page: /tools/crossword-puzzle-generator and
 * /generators/crossword-puzzle-generator were both collecting impressions for
 * the same queries. Cloudflare Pages applies _redirects before serving any
 * static asset, so the stubs are still built (harmless fallback if the site
 * ever moves hosts) but are never served while this file exists.
 */

const SOURCE = path.join(process.cwd(), 'src/data/legacy-redirects.ts');
const OUT_DIR = path.join(process.cwd(), 'out');

// Export name in legacy-redirects.ts -> the URL prefix its keys live under.
const MAPS = {
  toolsRedirectMap: '/tools/',
  calculatorsRedirectMap: '/calculators/',
};

function parseMap(source, exportName) {
  const block = source.match(new RegExp(`export const ${exportName}[^=]*=\\s*\\{([\\s\\S]*?)\\n\\};`));
  if (!block) throw new Error(`generate-redirects: ${exportName} not found in legacy-redirects.ts`);
  return [...block[1].matchAll(/"([^"]+)"\s*:\s*"([^"]+)"/g)].map(([, slug, target]) => [slug, target]);
}

const source = fs.readFileSync(SOURCE, 'utf8');
const lines = [];
for (const [exportName, prefix] of Object.entries(MAPS)) {
  for (const [slug, target] of parseMap(source, exportName)) {
    lines.push(`${prefix}${slug} ${target} 301`);
  }
}

if (lines.length === 0) throw new Error('generate-redirects: parsed zero redirects, refusing to write an empty _redirects');

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, '_redirects'), `${lines.join('\n')}\n`);
console.log(`✅ _redirects generated with ${lines.length} permanent redirects`);
