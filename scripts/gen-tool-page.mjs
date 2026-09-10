// Reusable new-tool scaffolder, matching the current registry-driven pattern
// (src/data/tools/<slug>.tsx + toolRegistry.tsx entry + a thin page.tsx built
// from buildToolMetadata/buildToolSchema) instead of the old inline-schema
// template. Does NOT write the calculator component itself -- write
// src/calculators/<category>/<Name>.tsx by hand, this only wires up the
// registry entry, the registry list, and the page.
//
// Usage: node scripts/gen-tool-page.mjs <config.json>
// config.json: an array of tool configs, each:
// {
//   "route": "/finance/example-calculator",
//   "slug": "finance-example-calculator",           // -> src/data/tools/<slug>.tsx
//   "iconImport": "@mui/icons-material/Calculate",
//   "iconName": "CalculateIcon",
//   "navName": "Example Calculator",
//   "navDescription": "Short nav/card description.",
//   "name": "Example Calculator",
//   "description": "Full on-page description shown under the H1.",
//   "navCategory": "Finance",                        // see toolRegistryTypes.ts for valid values
//   "shellCategory": "Finance",
//   "seoTitle": "Example Calculator - What It Does",
//   "seoDescription": "Free example calculator. ...",
//   "keywords": ["example calculator", "..."],
//   "applicationCategory": "FinanceApplication",
//   "currency": "USD",                                // INR | USD | GBP | AUD
//   "faqs": [{ "question": "...", "answer": "..." }], // optional
//   "calculatorImportPath": "../../../calculators/finance/ExampleCalculator",
//   "calculatorComponentName": "ExampleCalculator"
// }
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs';

const configPath = process.argv[2];
if (!configPath) {
  console.error('Usage: node scripts/gen-tool-page.mjs <config.json>');
  process.exit(1);
}
const configs = JSON.parse(readFileSync(configPath, 'utf8'));

const REGISTRY_PATH = 'src/data/toolRegistry.tsx';

function ogTitleFrom(seoTitle) {
  return `${seoTitle} | ToolZoneX`;
}

function writeRegistryEntry(cfg) {
  const {
    slug, route, iconImport, iconName, navName, navDescription, name, description,
    navCategory, shellCategory, seoTitle, seoDescription, keywords,
    applicationCategory, currency, faqs,
  } = cfg;

  const faqsLiteral = faqs && faqs.length > 0 ? JSON.stringify(faqs) : 'undefined';
  const ogTitle = ogTitleFrom(seoTitle);

  const content = `import ${iconName} from '${iconImport}';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "${route}",
    navName: "${navName}",
    navDescription: "${navDescription}",
    name: "${name}",
    description: "${description}",
    navCategory: "${navCategory}",
    shellCategory: "${shellCategory}",
    icon: <${iconName} fontSize="large" color="primary"/>,
    seoTitle: "${seoTitle}",
    seoDescription: "${seoDescription}",
    keywords: ${JSON.stringify(keywords)},
    ogTitle: "${ogTitle}",
    ogDescription: "${seoDescription}",
    schemaName: "${name}",
    schemaDescription: "${description}",
    applicationCategory: "${applicationCategory}",
    currency: "${currency ?? 'INR'}",
    faqs: ${faqsLiteral},
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
`;
  const filePath = `src/data/tools/${slug}.tsx`;
  writeFileSync(filePath, content);
  console.log(`Wrote ${filePath}`);
  return filePath;
}

function appendToRegistryList(slug) {
  let registry = readFileSync(REGISTRY_PATH, 'utf8');

  const importMatches = [...registry.matchAll(/^import tool_(\d+) from '\.\/tools\/[^']+';$/gm)];
  if (importMatches.length === 0) {
    throw new Error(`Could not find any "import tool_N from './tools/...'" lines in ${REGISTRY_PATH} -- has its format changed?`);
  }
  const maxIndex = Math.max(...importMatches.map((m) => Number(m[1])));
  const nextIndex = maxIndex + 1;
  const lastImport = importMatches[importMatches.length - 1][0];

  registry = registry.replace(
    lastImport,
    `${lastImport}\nimport tool_${nextIndex} from './tools/${slug}';`
  );

  // The array is a bare `tool_N,` per line ending in `];` -- insert before that closing bracket.
  registry = registry.replace(/\n\];\n/, `\n  tool_${nextIndex},\n];\n`);

  writeFileSync(REGISTRY_PATH, registry);
  console.log(`Appended tool_${nextIndex} (./tools/${slug}) to ${REGISTRY_PATH}`);
}

function writePage(cfg) {
  const { route, slug, calculatorImportPath, calculatorComponentName } = cfg;
  const dir = `src/app${route}`;
  const registryImportPath = `../../../data/tools/${slug}`; // adjust manually if route nests deeper than one level

  const content = `import type { Metadata } from "next";
import ${calculatorComponentName} from "${calculatorImportPath}";
import tool from "${registryImportPath}";
import { buildToolMetadata, buildToolSchema } from "../../../utils/toolSeo";

export const metadata: Metadata = buildToolMetadata(tool);

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildToolSchema(tool)) }}
      />
      <${calculatorComponentName} />
    </>
  );
}
`;
  mkdirSync(dir, { recursive: true });
  const filePath = `${dir}/page.tsx`;
  writeFileSync(filePath, content);
  console.log(`Wrote ${filePath}`);
  console.log(`  NOTE: registryImportPath is guessed as "${registryImportPath}" assuming a 1-segment route (e.g. /finance/x). Fix the import depth by hand if "${route}" nests deeper.`);
}

for (const cfg of configs) {
  const registryFile = `src/data/tools/${cfg.slug}.tsx`;
  if (existsSync(registryFile)) {
    console.error(`Skipping ${cfg.slug}: ${registryFile} already exists.`);
    continue;
  }
  writeRegistryEntry(cfg);
  appendToRegistryList(cfg.slug);
  writePage(cfg);
  console.log(`--- ${cfg.route} scaffolded. Still needed: write ${cfg.calculatorImportPath}.tsx by hand. ---\n`);
}
