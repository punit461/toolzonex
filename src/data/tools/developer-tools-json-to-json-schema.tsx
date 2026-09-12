import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-json-schema",
    navName: "JSON to JSON Schema",
    navDescription: "Generate a JSON Schema from JSON.",
    name: "JSON to JSON Schema Converter",
    description: "Paste a JSON sample to instantly generate a matching JSON Schema (draft-07) document with types, nested objects, and required fields. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to JSON Schema Converter - Generate Schemas Online",
    seoDescription: "Free online JSON to JSON Schema converter. Paste any JSON sample to instantly generate a matching draft-07 JSON Schema document with types and required fields.",
    keywords: ["json to json schema", "generate json schema from json", "json schema generator online", "json schema draft-07 generator", "infer json schema"],
    ogTitle: "JSON to JSON Schema Converter - Generate Schemas Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate a matching JSON Schema document.",
    schemaName: "JSON to JSON Schema Converter",
    schemaDescription: "Paste a JSON sample to instantly generate a matching JSON Schema (draft-07) document.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why draft-07 instead of a newer JSON Schema version?", answer: "Draft-07 remains the most widely supported version across validators and tooling (including Ajv and many OpenAPI-adjacent tools), so it's the safest default for a generated schema meant to be broadly compatible." }, { question: "Are nested objects defined with $ref?", answer: "No — to keep the output simple and self-contained, nested objects are described inline as nested schema objects rather than extracted into $defs/definitions and referenced with $ref." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and schema generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
