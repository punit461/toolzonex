import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/typescript-to-typescript-declaration",
    navName: "TypeScript to Declaration (.d.ts)",
    navDescription: "Generate .d.ts files from TypeScript source.",
    name: "TypeScript to Declaration (.d.ts) Converter",
    description: "Paste TypeScript source, implementation included, to instantly generate its real .d.ts declaration file using the TypeScript compiler's own declaration emitter. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "TypeScript to Declaration Converter - Generate .d.ts Files Online",
    seoDescription: "Free online TypeScript to .d.ts converter. Paste TypeScript source to instantly generate its real declaration file using the TypeScript compiler's own emitter.",
    keywords: ["typescript to d.ts", "generate declaration file online", "typescript declaration emit", "ts to dts converter", "emitDeclarationOnly online"],
    ogTitle: "TypeScript to Declaration Converter - Generate .d.ts Files Online | ToolZoneX",
    ogDescription: "Paste TypeScript source to generate its real .d.ts declaration file.",
    schemaName: "TypeScript to Declaration (.d.ts) Converter",
    schemaDescription: "Paste TypeScript source to instantly generate its real .d.ts declaration file.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is this a real declaration emit, or an approximation?", answer: "It's a real emit — this tool runs an actual TypeScript compiler program against your source with declaration: true and emitDeclarationOnly: true, the same flags tsc uses to generate .d.ts files, rather than a hand-written approximation." }, { question: "Why did I get an error instead of output?", answer: "Declaration emit requires syntactically valid TypeScript. If your input has a syntax error, the tool surfaces the compiler's own diagnostic message so you can fix the specific issue." }, { question: "Is my TypeScript uploaded anywhere?", answer: "No — compilation happens entirely client-side in your browser, using the TypeScript compiler loaded on demand. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
