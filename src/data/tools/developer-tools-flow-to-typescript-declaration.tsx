import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/flow-to-typescript-declaration",
    navName: "Flow to TypeScript Declaration",
    navDescription: "Convert Flow types to a TypeScript declaration.",
    name: "Flow to TypeScript Declaration Converter",
    description: "Paste Flow-annotated source to generate a matching TypeScript declaration file, converting type aliases, interfaces, and function signatures. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "Flow to TypeScript Declaration Converter - Generate .d.ts Online",
    seoDescription: "Free online Flow to TypeScript declaration converter. Paste Flow-annotated source to generate a matching TypeScript declaration file for its types, interfaces, and functions.",
    keywords: ["flow to typescript declaration", "flow to d.ts", "convert flow types to typescript", "flow type alias to typescript interface", "flow to typescript types"],
    ogTitle: "Flow to TypeScript Declaration Converter - Generate .d.ts Online | ToolZoneX",
    ogDescription: "Paste Flow-annotated source to generate a matching TypeScript declaration file.",
    schemaName: "Flow to TypeScript Declaration Converter",
    schemaDescription: "Paste Flow-annotated source to generate a matching TypeScript declaration file for its types, interfaces, and functions.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is this an exact, byte-for-byte conversion?", answer: "No — this is a best-effort structural conversion. It handles the most common Flow constructs well (object types, optional and nullable fields, unions, arrays, tuples, interfaces, and function signatures), but it's a hand-built mapping rather than an official, fully-specified Flow-to-TypeScript compiler. Less common constructs — object spreads inside a type, exact/inexact object semantics, bounded or defaulted generics, and Flow utility types like $Diff or $Shape — are simplified, approximated, or left as any rather than causing the tool to fail. Review the output before relying on it for anything nontrivial." }, { question: "Why does it only convert some declarations and skip others?", answer: "Only top-level type aliases, interface declarations, and function declarations are converted — runtime-only code like variable assignments or class implementations is intentionally skipped, since a declaration file describes shapes, not runtime behavior." }, { question: "Is my code uploaded anywhere?", answer: "No — parsing and conversion happen entirely client-side in your browser, using Flow's parser loaded on demand. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
