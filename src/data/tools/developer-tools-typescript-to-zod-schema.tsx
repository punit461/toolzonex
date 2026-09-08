import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/typescript-to-zod-schema",
    navName: "TypeScript to Zod Schema",
    navDescription: "Convert TypeScript interfaces to Zod schemas.",
    name: "TypeScript to Zod Schema Converter",
    description: "Paste a TypeScript interface or type to instantly generate a matching Zod schema for runtime validation. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "TypeScript to Zod Schema Converter - Generate Zod Validators Online",
    seoDescription: "Free online TypeScript to Zod schema converter. Paste a TypeScript interface or type to instantly generate a matching Zod schema for runtime validation.",
    keywords: ["typescript to zod", "convert typescript to zod schema", "ts interface to zod", "zod schema generator from typescript", "generate zod from type"],
    ogTitle: "TypeScript to Zod Schema Converter - Generate Zod Validators Online | ToolZoneX",
    ogDescription: "Paste a TypeScript interface or type to generate a matching Zod schema.",
    schemaName: "TypeScript to Zod Schema Converter",
    schemaDescription: "Paste a TypeScript interface or type to instantly generate a matching Zod schema for runtime validation.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this support more than one interface at a time?", answer: "The tool converts the first top-level interface or type in your input as the root schema. If that root type references other top-level interfaces from the same file by name (like address: Address), those are resolved and inlined as nested schemas automatically — but interfaces that aren't referenced from the root are ignored." }, { question: "Does the generated code include a Zod import?", answer: "No — only the schema declarations are generated. Add import { z } from \"zod\"; at the top of the file where you paste the output." }, { question: "Is my TypeScript uploaded anywhere?", answer: "No — parsing and schema generation happen entirely client-side in your browser, using the TypeScript compiler loaded on demand. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
