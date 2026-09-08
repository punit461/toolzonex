import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-flow",
    navName: "JSON to Flow",
    navDescription: "Generate Flow types from JSON.",
    name: "JSON to Flow Type Converter",
    description: "Paste a JSON sample to instantly generate matching Flow exact object types, with nested objects, optional fields, and nullable fields inferred automatically. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to Flow Converter - Generate Flow Types Online",
    seoDescription: "Free online JSON to Flow converter. Paste any JSON sample to instantly generate matching Flow exact object types, including nested types and optional/nullable fields.",
    keywords: ["json to flow", "json to flow type", "generate flow from json", "json to flowtype converter", "flow type generator"],
    ogTitle: "JSON to Flow Converter - Generate Flow Types Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate matching Flow exact object types.",
    schemaName: "JSON to Flow Type Converter",
    schemaDescription: "Paste a JSON sample to instantly generate matching Flow exact object types.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why does the output use exact object types ({| ... |})?", answer: "Exact object types reject extra properties that aren't declared, which best matches what was actually observed in your sample. If you need Flow's more permissive inexact objects instead, just remove the | from each opening and closing brace after copying the output." }, { question: "How are optional and nullable fields different in Flow?", answer: "A trailing ? on the property name (e.g. zip?: string) marks a field optional — it can be entirely missing. A leading ? on the type itself (e.g. ?string) marks it nullable — the key is present but its value can be null. This tool applies each based on what it actually saw in your sample." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and type generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
