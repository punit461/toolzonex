import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/typescript-to-plain-javascript",
    navName: "TypeScript to Plain JavaScript",
    navDescription: "Strip types from TypeScript to plain JS.",
    name: "TypeScript to Plain JavaScript Converter",
    description: "Paste TypeScript source to instantly strip out its types and produce plain, runnable JavaScript using the TypeScript compiler's own type-stripping. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "TypeScript to Plain JavaScript Converter - Strip TS Types Online",
    seoDescription: "Free online TypeScript to plain JavaScript converter. Paste TypeScript source to instantly strip its types using the TypeScript compiler's own type-stripping.",
    keywords: ["typescript to javascript", "strip typescript types", "convert ts to js online", "typescript transpiler online", "remove typescript type annotations"],
    ogTitle: "TypeScript to Plain JavaScript Converter - Strip TS Types Online | ToolZoneX",
    ogDescription: "Paste TypeScript source to strip its types into plain JavaScript.",
    schemaName: "TypeScript to Plain JavaScript Converter",
    schemaDescription: "Paste TypeScript source to instantly strip out its types and produce plain, runnable JavaScript.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is this an approximation, or does it produce exact output?", answer: "It's exact — this tool runs the real TypeScript compiler's transpileModule function, the same type-stripping logic TypeScript itself uses, rather than a hand-written or best-effort approximation." }, { question: "Does this type-check my code first?", answer: "No — transpileModule transpiles a single file in isolation without full type-checking, so it will happily strip types from code that wouldn't actually pass tsc. If you need full type-checking, run your project through your normal TypeScript build instead." }, { question: "Is my TypeScript uploaded anywhere?", answer: "No — transpilation happens entirely client-side in your browser, using the TypeScript compiler loaded on demand. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
