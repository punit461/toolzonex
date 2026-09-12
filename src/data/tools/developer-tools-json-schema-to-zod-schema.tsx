import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-schema-to-zod-schema",
    navName: "JSON Schema to Zod",
    navDescription: "Generate a Zod schema from a JSON Schema document.",
    name: "JSON Schema to Zod Converter",
    description: "Paste an actual JSON Schema document to instantly generate a matching Zod validation schema, reading type, properties, required, and items keywords directly. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON Schema to Zod Converter - Generate Zod Schemas Online",
    seoDescription: "Free online JSON Schema to Zod converter. Paste a JSON Schema document to instantly generate a matching z.object() validation schema from its type and required keywords.",
    keywords: ["json schema to zod", "json schema to zod schema", "generate zod from json schema", "json-schema-to-zod alternative", "json schema validator generator"],
    ogTitle: "JSON Schema to Zod Converter - Generate Zod Schemas Online | ToolZoneX",
    ogDescription: "Paste a JSON Schema document to instantly generate a matching Zod schema.",
    schemaName: "JSON Schema to Zod Converter",
    schemaDescription: "Paste a JSON Schema document to instantly generate a matching Zod validation schema.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the JSON to Zod Schema tool?", answer: "The JSON to Zod Schema tool reads a plain JSON data sample and infers types from the actual values it finds. This tool instead reads a real JSON Schema document and uses its explicit type/required declarations — no data sample needed, since the schema already states the types directly." }, { question: "Which JSON Schema keywords are supported?", answer: "The converter reads type (as a string or as an array like [\"string\", \"null\"] for nullable fields), properties, required, and items. Other validation keywords like pattern or minimum don't automatically become Zod refinements and are ignored — add those by hand if you need them." }, { question: "Is my schema uploaded anywhere?", answer: "No — parsing and schema generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
