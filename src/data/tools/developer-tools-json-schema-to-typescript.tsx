import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-schema-to-typescript",
    navName: "JSON Schema to TypeScript",
    navDescription: "Generate TypeScript interfaces from a JSON Schema document.",
    name: "JSON Schema to TypeScript Converter",
    description: "Paste an actual JSON Schema document to instantly generate matching TypeScript interfaces, reading type, properties, required, and items keywords directly. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON Schema to TypeScript Converter - Generate Interfaces Online",
    seoDescription: "Free online JSON Schema to TypeScript converter. Paste a JSON Schema document to instantly generate matching TypeScript interface declarations from its type and required keywords.",
    keywords: ["json schema to typescript", "json schema to interface", "generate typescript from json schema", "json-schema-to-typescript alternative", "json schema type generator"],
    ogTitle: "JSON Schema to TypeScript Converter - Generate Interfaces Online | ToolZoneX",
    ogDescription: "Paste a JSON Schema document to instantly generate matching TypeScript interfaces.",
    schemaName: "JSON Schema to TypeScript Converter",
    schemaDescription: "Paste a JSON Schema document to instantly generate matching TypeScript interfaces.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the JSON to TypeScript tool?", answer: "The JSON to TypeScript tool reads a plain JSON data sample and infers types from the actual values it finds. This tool instead reads a real JSON Schema document and uses its explicit type/required declarations — no data sample needed, since the schema already states the types directly." }, { question: "Which JSON Schema keywords are supported?", answer: "The converter reads type (as a string or as an array like [\"string\", \"null\"] for nullable fields), properties, required, and items. Other validation keywords like pattern or minimum don't have a TypeScript equivalent and are ignored." }, { question: "Is my schema uploaded anywhere?", answer: "No — parsing and type generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
