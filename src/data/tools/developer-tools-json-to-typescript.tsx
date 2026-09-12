import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-typescript",
    navName: "JSON to TypeScript",
    navDescription: "Generate TypeScript interfaces from JSON.",
    name: "JSON to TypeScript Converter",
    description: "Paste a JSON sample to instantly generate matching TypeScript interfaces, with nested objects, optional fields, and nullable fields inferred automatically. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to TypeScript Converter - Generate Interfaces Online",
    seoDescription: "Free online JSON to TypeScript converter. Paste any JSON sample to instantly generate matching TypeScript interface declarations, including nested types and optional/nullable fields.",
    keywords: ["json to typescript", "json to typescript interface", "generate typescript from json", "json to ts converter", "typescript interface generator"],
    ogTitle: "JSON to TypeScript Converter - Generate Interfaces Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate matching TypeScript interfaces.",
    schemaName: "JSON to TypeScript Converter",
    schemaDescription: "Paste a JSON sample to instantly generate matching TypeScript interfaces.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How are optional and nullable fields detected?", answer: "If you paste an array of objects, the tool merges the shape of every element — a property that's missing from at least one object becomes optional (?:), and a property that's ever null gets a | null union added to its type." }, { question: "What happens if a field's type is inconsistent across samples?", answer: "When the same property holds genuinely conflicting types across an array of samples (say, a string in one object and a boolean in another), the field falls back to unknown rather than guessing an inaccurate union — you can then refine it by hand." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and type generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
