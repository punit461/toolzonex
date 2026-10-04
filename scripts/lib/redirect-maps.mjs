import fs from 'fs';
import path from 'path';

// Each data file's export -> the URL prefix its keys live under.
const SOURCES = [
  { file: 'src/data/legacy-redirects.ts', exportName: 'toolsRedirectMap', prefix: '/tools/' },
  { file: 'src/data/legacy-redirects.ts', exportName: 'calculatorsRedirectMap', prefix: '/calculators/' },
  { file: 'src/data/blog-redirects.ts', exportName: 'blogRedirectMap', prefix: '/blog/' },
];

// Exact-path rules that have no data-file entry.
const EXACT = [['/blog', '/']];

function parseMap(source, exportName, file) {
  const block = source.match(new RegExp(`export const ${exportName}[^=]*=\\s*\\{([\\s\\S]*?)\\n\\};`));
  if (!block) throw new Error(`redirect-maps: ${exportName} not found in ${file}`);
  return [...block[1].matchAll(/"([^"]+)"\s*:\s*"([^"]+)"/g)].map(([, key, target]) => [key, target]);
}

/** Every permanent redirect the site serves, as [fromPath, toPath] pairs. */
export function readRedirects() {
  const sources = new Map();
  const rules = [];
  for (const { file, exportName, prefix } of SOURCES) {
    if (!sources.has(file)) sources.set(file, fs.readFileSync(path.join(process.cwd(), file), 'utf8'));
    for (const [key, target] of parseMap(sources.get(file), exportName, file)) {
      rules.push([`${prefix}${key}`, target]);
    }
  }
  return [...rules, ...EXACT];
}
