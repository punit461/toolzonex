import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-sarcastic",
    navName: "JSON to Sarcastic",
    navDescription: "Generate Sarcastic schemas from JSON.",
    name: "JSON to Sarcastic Schema Converter",
    description: "Paste a JSON sample to instantly generate a matching Sarcastic runtime type-checking schema, with nested shapes, arrays, and optional/nullable fields inferred automatically. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to Sarcastic Converter - Generate Runtime Schemas Online",
    seoDescription: "Free online JSON to Sarcastic converter. Paste any JSON sample to instantly generate a matching shape/arrayOf/optional/maybe runtime schema.",
    keywords: ["json to sarcastic", "sarcastic schema generator", "generate sarcastic schema from json", "json runtime validator generator", "json to shape"],
    ogTitle: "JSON to Sarcastic Converter - Generate Runtime Schemas Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate a matching Sarcastic schema.",
    schemaName: "JSON to Sarcastic Schema Converter",
    schemaDescription: "Paste a JSON sample to instantly generate a matching Sarcastic runtime schema.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What API convention does the generated output follow?", answer: "The output follows Sarcastic's documented shape/arrayOf/optional/maybe API convention, with bare string, number, and boolean validators for primitives (rather than function calls). If your installed version of Sarcastic differs slightly, adjust the generated names to match." }, { question: "How are optional and nullable fields combined?", answer: "A field that was ever null is wrapped in maybe(T), and a field that was missing from at least one sample is wrapped in optional(T). A field that's both gets wrapped in optional(maybe(T))." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and schema generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
