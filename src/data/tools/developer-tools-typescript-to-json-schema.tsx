import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/typescript-to-json-schema",
    navName: "TypeScript to JSON Schema",
    navDescription: "Convert TypeScript interfaces to JSON Schema.",
    name: "TypeScript to JSON Schema Converter",
    description: "Paste a TypeScript interface or type to instantly generate a matching draft-07 JSON Schema document. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "TypeScript to JSON Schema Converter - Generate JSON Schema Online",
    seoDescription: "Free online TypeScript to JSON Schema converter. Paste a TypeScript interface or type to instantly generate a matching draft-07 JSON Schema document.",
    keywords: ["typescript to json schema", "convert typescript to json schema", "ts interface to json schema", "json schema generator from typescript", "typescript type to schema"],
    ogTitle: "TypeScript to JSON Schema Converter - Generate JSON Schema Online | ToolZoneX",
    ogDescription: "Paste a TypeScript interface or type to generate a matching JSON Schema.",
    schemaName: "TypeScript to JSON Schema Converter",
    schemaDescription: "Paste a TypeScript interface or type to instantly generate a matching draft-07 JSON Schema document.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this support more than one interface at a time?", answer: "The tool converts the first top-level interface or type in your input as the root schema. If that root type references other top-level interfaces from the same file by name (like address: Address), those are resolved and inlined as nested schemas automatically — but interfaces that aren't referenced from the root are ignored." }, { question: "How are optional and nullable fields represented?", answer: "An optional property (zip?: string) is simply left out of the schema's required array. A nullable property (a union with null) gets its type turned into an array like [\"string\", \"null\"], matching JSON Schema draft-07 conventions." }, { question: "Is my TypeScript uploaded anywhere?", answer: "No — parsing and schema generation happen entirely client-side in your browser, using the TypeScript compiler loaded on demand. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
