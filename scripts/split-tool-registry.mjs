// One-time/rerunnable codegen: splits the monolithic src/data/toolRegistry.tsx
// (30k+ lines, ~1350 tool objects in one array) into one small file per tool
// under src/data/tools/, plus a lean assembler that re-exports the same
// toolRegistry/getTool/getToolOrNull API. This exists because ~1350 of the
// ~1400 static pages were importing the *entire* array just to read their
// own single entry, which was the dominant contributor to CI build OOMs
// (see next.config.ts and git history around 2026-09-08).
//
// Run with: node scripts/split-tool-registry.mjs
// Safe to rerun: fully regenerates src/data/tools/ and toolRegistry.tsx from
// the current toolRegistry.tsx contents (run BEFORE this script has already
// rewritten it, or point SOURCE_FILE at a backup).

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCE_FILE = path.join(ROOT, 'src/data/toolRegistry.tsx');
const TOOLS_DIR = path.join(ROOT, 'src/data/tools');
const TYPES_FILE = path.join(ROOT, 'src/data/toolRegistryTypes.ts');

const sourceText = fs.readFileSync(SOURCE_FILE, 'utf8');
const sourceFile = ts.createSourceFile(
  'toolRegistry.tsx',
  sourceText,
  ts.ScriptTarget.Latest,
  true,
  ts.ScriptKind.TSX
);

const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

// 1. Collect icon import specifiers: local name -> module specifier.
const iconImports = new Map();
let reactNodeImport = null;
let interfaceNode = null;
let toolRegistryArray = null;

sourceFile.forEachChild((node) => {
  if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
    const spec = node.moduleSpecifier.text;
    if (spec === 'react') {
      reactNodeImport = node;
      return;
    }
    const clause = node.importClause;
    if (clause && clause.name) {
      iconImports.set(clause.name.text, spec);
    }
  } else if (ts.isInterfaceDeclaration(node) && node.name.text === 'ToolRegistryEntry') {
    interfaceNode = node;
  } else if (ts.isVariableStatement(node)) {
    const decl = node.declarationList.declarations[0];
    if (decl && ts.isIdentifier(decl.name) && decl.name.text === 'toolRegistry' && decl.initializer && ts.isArrayLiteralExpression(decl.initializer)) {
      toolRegistryArray = decl.initializer;
    }
  }
});

if (!interfaceNode) throw new Error('Could not find ToolRegistryEntry interface');
if (!toolRegistryArray) throw new Error('Could not find toolRegistry array literal');

// 2. Write the standalone types file (ToolRegistryEntry, no JSX).
const interfaceText = printer.printNode(ts.EmitHint.Unspecified, interfaceNode, sourceFile);
fs.writeFileSync(
  TYPES_FILE,
  `import type { ReactNode } from 'react';\n\n${interfaceText}\n`
);

// 3. Split each array element into its own file.
fs.rmSync(TOOLS_DIR, { recursive: true, force: true });
fs.mkdirSync(TOOLS_DIR, { recursive: true });

function slugify(route) {
  return route.replace(/^\//, '').replace(/\//g, '-');
}

function collectIconNames(node, found) {
  if (ts.isJsxOpeningLikeElement(node) && ts.isIdentifier(node.tagName)) {
    if (iconImports.has(node.tagName.text)) found.add(node.tagName.text);
  }
  node.forEachChild((child) => collectIconNames(child, found));
}

const assemblerImports = [];
const assemblerEntries = [];
const usedSlugs = new Set();

toolRegistryArray.elements.forEach((element, index) => {
  if (!ts.isObjectLiteralExpression(element)) {
    throw new Error(`toolRegistry element ${index} is not an object literal`);
  }
  const routeProp = element.properties.find(
    (p) => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === 'route'
  );
  if (!routeProp || !ts.isStringLiteral(routeProp.initializer)) {
    throw new Error(`toolRegistry element ${index} has no literal 'route' string`);
  }
  const route = routeProp.initializer.text;
  const slug = slugify(route);
  if (usedSlugs.has(slug)) throw new Error(`Duplicate slug derived from route: ${route}`);
  usedSlugs.add(slug);

  const iconNames = new Set();
  collectIconNames(element, iconNames);

  const iconImportLines = [...iconNames]
    .sort()
    .map((name) => `import ${name} from '@mui/icons-material/${iconImports.get(name).split('/').pop()}';`);

  const objectText = printer.printNode(ts.EmitHint.Unspecified, element, sourceFile);

  const fileContent = [
    ...iconImportLines,
    `import type { ToolRegistryEntry } from '../toolRegistryTypes';`,
    '',
    `const tool: ToolRegistryEntry = ${objectText};`,
    '',
    'export default tool;',
    '',
  ].join('\n');

  fs.writeFileSync(path.join(TOOLS_DIR, `${slug}.tsx`), fileContent);

  const varName = `tool_${index}`;
  assemblerImports.push(`import ${varName} from './tools/${slug}';`);
  assemblerEntries.push(varName);
});

// 4. Write the new lean toolRegistry.tsx assembler.
const assembler = [
  `import type { ToolRegistryEntry } from './toolRegistryTypes';`,
  `export type { ToolRegistryEntry };`,
  '',
  ...assemblerImports,
  '',
  `export const toolRegistry: ToolRegistryEntry[] = [`,
  ...assemblerEntries.map((n) => `  ${n},`),
  `];`,
  '',
  `const routeIndex = new Map(toolRegistry.map((t) => [t.route, t]));`,
  '',
  `export function getTool(route: string): ToolRegistryEntry {`,
  `  const tool = routeIndex.get(route);`,
  `  if (!tool) throw new Error(\`No tool registered for route "\${route}"\`);`,
  `  return tool;`,
  `}`,
  '',
  `export function getToolOrNull(route: string): ToolRegistryEntry | null {`,
  `  return routeIndex.get(route) ?? null;`,
  `}`,
  '',
].join('\n');

fs.writeFileSync(SOURCE_FILE, assembler);

console.log(`Split ${assemblerEntries.length} tools into ${TOOLS_DIR}`);
console.log(`Wrote types to ${TYPES_FILE}`);
console.log(`Rewrote assembler at ${SOURCE_FILE}`);
