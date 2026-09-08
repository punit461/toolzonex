// Companion to split-tool-registry.mjs: rewrites every page.tsx that does
//   import { getTool } from "<prefix>/data/toolRegistry";
//   const tool = getTool("/some/route");
// to import its own small per-tool file directly instead of going through
// the full toolRegistry assembler (which still transitively pulls in every
// tool). Only touches files matching that exact, verified-uniform pattern;
// anything else is left untouched and reported.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const files = execSync('git ls-files src/app -- "*.tsx"', { cwd: ROOT, encoding: 'utf8' })
  .split('\n')
  .filter(Boolean)
  .filter((f) => f.endsWith('page.tsx'));

const importRe = /^import \{ getTool \} from "([^"]*)\/toolRegistry";\n/m;
const constRe = /^const tool = getTool\("([^"]+)"\);\n/m;

let changed = 0;
let skipped = [];

for (const rel of files) {
  const abs = path.join(ROOT, rel);
  const text = fs.readFileSync(abs, 'utf8');

  const importMatch = text.match(importRe);
  const constMatch = text.match(constRe);
  if (!importMatch || !constMatch) {
    if (text.includes('getTool(')) skipped.push(rel);
    continue;
  }

  const prefix = importMatch[1];
  const route = constMatch[1];
  const slug = route.replace(/^\//, '').replace(/\//g, '-');

  let next = text.replace(importRe, `import tool from "${prefix}/data/tools/${slug}";\n`);
  next = next.replace(constRe, '');

  fs.writeFileSync(abs, next);
  changed++;
}

console.log(`Rewrote ${changed} page files.`);
if (skipped.length) {
  console.log(`Skipped ${skipped.length} files using getTool() in a non-standard way:`);
  skipped.forEach((f) => console.log(`  ${f}`));
}
