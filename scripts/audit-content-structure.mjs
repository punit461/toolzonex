// Audits every tool component for the "Tool + Guide + FAQ + Examples + Use
// Cases" content structure by scanning its <Typography variant="h2"> headings.
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const files = execSync(`grep -rl "CalculatorShell" src/calculators --include="*.tsx"`)
  .toString()
  .trim()
  .split('\n')
  .filter(Boolean);

const PATTERNS = {
  guide: /\bhow\b|guide|what is|what (are|does)/i,
  faq: /faqs?\b|frequently asked/i,
  examples: /\bexample/i,
  useCases: /use case|common use|when (to|should)|why (use|check)/i,
};

const results = [];

for (const file of files) {
  const src = readFileSync(file, 'utf8');
  const headings = [...src.matchAll(/variant="h2"[^>]*>\s*([^<{]+)/g)].map((m) => m[1].trim());
  // Some headings are template-literal / JSX-expression based; fall back to a broader h2 sweep for those.
  const h2Blocks = [...src.matchAll(/<Typography variant="h2"[^>]*>([\s\S]*?)<\/Typography>/g)].map((m) =>
    m[1].replace(/[{}]/g, '').trim(),
  );
  const allHeadings = [...headings, ...h2Blocks].join(' | ');

  const has = {
    guide: PATTERNS.guide.test(allHeadings),
    faq: PATTERNS.faq.test(allHeadings),
    examples: PATTERNS.examples.test(allHeadings),
    useCases: PATTERNS.useCases.test(allHeadings),
  };

  results.push({ file, headingCount: headings.length + h2Blocks.length, headings: allHeadings, ...has });
}

const total = results.length;
const countGuide = results.filter((r) => r.guide).length;
const countFaq = results.filter((r) => r.faq).length;
const countExamples = results.filter((r) => r.examples).length;
const countUseCases = results.filter((r) => r.useCases).length;
const countAll4 = results.filter((r) => r.guide && r.faq && r.examples && r.useCases).length;
const countNone = results.filter((r) => !r.guide && !r.faq && !r.examples && !r.useCases).length;

console.log(`Total tool pages audited: ${total}`);
console.log(`Has Guide/How-to section:  ${countGuide} (${(countGuide/total*100).toFixed(0)}%)`);
console.log(`Has FAQ section:           ${countFaq} (${(countFaq/total*100).toFixed(0)}%)`);
console.log(`Has Examples section:      ${countExamples} (${(countExamples/total*100).toFixed(0)}%)`);
console.log(`Has Use Cases section:     ${countUseCases} (${(countUseCases/total*100).toFixed(0)}%)`);
console.log(`Has ALL FOUR sections:     ${countAll4} (${(countAll4/total*100).toFixed(0)}%)`);
console.log(`Has NONE of the four:      ${countNone} (${(countNone/total*100).toFixed(0)}%)`);

console.log(`\n--- Files missing FAQ (most commonly missing section) ---`);
const missingFaq = results.filter((r) => !r.faq);
console.log(`${missingFaq.length} files:`);
missingFaq.forEach((r) => console.log(`  ${r.file}`));

console.log(`\n--- ALL files missing at least one section (for retrofit planning) ---`);
const incomplete = results.filter(r => !(r.guide && r.faq && r.examples && r.useCases));
incomplete.sort((a,b) => a.file.localeCompare(b.file));
incomplete.forEach(r => {
  const missing = ['guide','faq','examples','useCases'].filter(k => !r[k]);
  console.log(`${r.file} -- missing: ${missing.join(',')}`);
});
