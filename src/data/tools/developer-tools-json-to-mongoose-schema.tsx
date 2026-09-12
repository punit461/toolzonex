import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-mongoose-schema",
    navName: "JSON to Mongoose Schema",
    navDescription: "Generate Mongoose schemas from JSON.",
    name: "JSON to Mongoose Schema Converter",
    description: "Paste a JSON sample to instantly generate a matching Mongoose Schema definition for MongoDB, with nested sub-documents and required fields inferred automatically. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to Mongoose Schema Converter - Generate MongoDB Schemas Online",
    seoDescription: "Free online JSON to Mongoose schema converter. Paste any JSON sample to instantly generate a matching mongoose.Schema definition with nested sub-documents and required fields.",
    keywords: ["json to mongoose schema", "json to mongodb schema", "generate mongoose schema from json", "mongoose schema generator", "json2mongoose alternative"],
    ogTitle: "JSON to Mongoose Schema Converter - Generate MongoDB Schemas Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate a matching Mongoose schema.",
    schemaName: "JSON to Mongoose Schema Converter",
    schemaDescription: "Paste a JSON sample to instantly generate a matching Mongoose schema definition.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How does the tool decide a string should be a Date?", answer: "If a string value in your sample looks like an ISO-8601 timestamp (for example 2024-01-15T10:00:00Z), the field is mapped to Mongoose's Date type instead of String. Ordinary strings always map to String." }, { question: "What type is used for fields with mixed or unknown types?", answer: "Fields whose type can't be confidently inferred fall back to mongoose.Schema.Types.Mixed, Mongoose's catch-all type for arbitrary values." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and schema generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
