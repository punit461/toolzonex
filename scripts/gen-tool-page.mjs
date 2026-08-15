// Reusable one-off page.tsx generator for new tools.
// Usage: node scripts/gen-tool-page.mjs <config.json>
// config.json: { route, componentImportPath, componentName, title, description, keywords[] }
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';

const configPath = process.argv[2];
const configs = JSON.parse(readFileSync(configPath, 'utf8'));

for (const cfg of configs) {
  const { route, componentImportPath, componentName, title, description, keywords, namedImport } = cfg;
  const importStatement = namedImport
    ? `import { ${componentName} } from "${componentImportPath}";`
    : `import ${componentName} from "${componentImportPath}";`;
  const content = `import type { Metadata } from "next";
${importStatement}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://toolzonex.com';

export const metadata: Metadata = {
  title: "${title}",
  description: "${description}",
  keywords: ${JSON.stringify(keywords)},
  alternates: { canonical: "${route}" },
  openGraph: {
    title: "${title} | ToolZoneX",
    description: "${description}",
    url: \`\${SITE_URL}${route}\`,
    type: "article",
    images: [{ url: \`\${SITE_URL}/og-image.jpg\`, width: 1200, height: 630, alt: "ToolZoneX" }],
  },
};

const toolSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "${componentName}",
  "description": "${description}",
  "url": \`\${SITE_URL}${route}\`,
  "applicationCategory": "UtilityApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <${componentName} />
    </>
  );
}
`;
  const dir = `src/app${route}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/page.tsx`, content);
  console.log(`Wrote ${dir}/page.tsx`);
}
