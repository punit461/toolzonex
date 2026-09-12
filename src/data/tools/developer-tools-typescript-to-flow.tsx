import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/typescript-to-flow",
    navName: "TypeScript to Flow",
    navDescription: "Convert TypeScript interfaces to Flow types.",
    name: "TypeScript to Flow Converter",
    description: "Paste a TypeScript interface or type to instantly generate matching Flow type declarations. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "TypeScript to Flow Converter - Convert TS Types to Flow Online",
    seoDescription: "Free online TypeScript to Flow converter. Paste a TypeScript interface or type to instantly generate matching Flow type declarations.",
    keywords: ["typescript to flow", "convert typescript to flow", "ts to flow types", "typescript interface to flow", "flow type generator"],
    ogTitle: "TypeScript to Flow Converter - Convert TS Types to Flow Online | ToolZoneX",
    ogDescription: "Paste a TypeScript interface or type to generate matching Flow types.",
    schemaName: "TypeScript to Flow Converter",
    schemaDescription: "Paste a TypeScript interface or type to instantly generate matching Flow type declarations.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this support more than one interface at a time?", answer: "The tool converts the first top-level interface or type in your input as the root type. If that root type references other top-level interfaces from the same file by name (like address: Address), those are resolved and inlined as nested Flow types automatically — but interfaces that aren't referenced from the root are ignored." }, { question: "What happens to unsupported TypeScript features?", answer: "Generics, mapped types, conditional types, and other advanced TypeScript features fall back to Flow's mixed type rather than an incorrect guess — you can refine those fields by hand afterward." }, { question: "Is my TypeScript uploaded anywhere?", answer: "No — parsing and type generation happen entirely client-side in your browser, using the TypeScript compiler loaded on demand. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
