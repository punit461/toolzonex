import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-zod-schema",
    navName: "JSON to Zod Schema",
    navDescription: "Generate Zod schemas from JSON.",
    name: "JSON to Zod Schema Converter",
    description: "Paste a JSON sample to instantly generate a matching Zod schema for runtime validation in TypeScript or JavaScript. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to Zod Schema Converter - Generate Zod Validators Online",
    seoDescription: "Free online JSON to Zod schema converter. Paste any JSON sample to instantly generate a matching Zod schema with nested schemas, arrays, optional, and nullable fields.",
    keywords: ["json to zod", "json to zod schema", "generate zod schema from json", "zod schema generator", "json2zod alternative"],
    ogTitle: "JSON to Zod Schema Converter - Generate Zod Validators Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate a matching Zod schema.",
    schemaName: "JSON to Zod Schema Converter",
    schemaDescription: "Paste a JSON sample to instantly generate a matching Zod schema for runtime validation.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why are nested schemas defined before the root schema?", answer: "JavaScript evaluates const declarations top to bottom, and the root schema references its nested schemas by name — so those need to be defined earlier in the file, or you'd get a \"used before it was defined\" error at runtime." }, { question: "Does the generated code include a Zod import?", answer: "No — only the schema declarations are generated. Add import { z } from \"zod\"; at the top of the file where you paste the output." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and schema generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
