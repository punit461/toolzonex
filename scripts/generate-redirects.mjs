import fs from 'fs';
import path from 'path';
import { readRedirects } from './lib/redirect-maps.mjs';

/**
 * Writes out/_redirects (Cloudflare Pages) from the redirect maps in src/data/
 * (see scripts/lib/redirect-maps.mjs), so old URLs answer with a real 301
 * instead of a 200 page carrying a meta refresh.
 *
 * Under GitHub Pages the meta-refresh stubs were the only option, and Google
 * treated each old URL as its own page: /tools/crossword-puzzle-generator and
 * /generators/crossword-puzzle-generator were both collecting impressions for
 * the same queries. Cloudflare Pages applies _redirects before serving any
 * static asset, so the /tools/ and /calculators/ stubs are still built (harmless
 * fallback if the site ever moves hosts) but are never served while this file
 * exists. The retired blog has no stubs at all; its URLs exist only as rules here.
 */

const OUT_DIR = path.join(process.cwd(), 'out');

const lines = readRedirects().map(([from, to]) => `${from} ${to} 301`);

if (lines.length === 0) throw new Error('generate-redirects: parsed zero redirects, refusing to write an empty _redirects');

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, '_redirects'), `${lines.join('\n')}\n`);
console.log(`✅ _redirects generated with ${lines.length} permanent redirects`);
