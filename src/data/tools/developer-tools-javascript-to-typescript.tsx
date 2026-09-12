import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/javascript-to-typescript",
    navName: "JavaScript to TypeScript",
    navDescription: "Add best-effort type annotations to JS.",
    name: "JavaScript to TypeScript Converter (Best-Effort)",
    description: "Paste JavaScript source to get back the same code with obvious type annotations added to untyped parameters and literal-initialized declarations. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JavaScript to TypeScript Converter - Add Type Annotations Online",
    seoDescription: "Free online JavaScript to TypeScript converter. Paste JavaScript source to get back the same code with obvious, best-effort type annotations added.",
    keywords: ["javascript to typescript", "convert js to ts online", "add typescript types to javascript", "js to ts converter", "typescript type annotation generator"],
    ogTitle: "JavaScript to TypeScript Converter - Add Type Annotations Online | ToolZoneX",
    ogDescription: "Paste JavaScript source to get back the same code with obvious type annotations added.",
    schemaName: "JavaScript to TypeScript Converter (Best-Effort)",
    schemaDescription: "Paste JavaScript source to get back the same code with obvious, best-effort type annotations added.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this do real, full type inference?", answer: "No — this is explicitly a best-effort tool, not real control-flow type inference. It only adds obvious, syntactic annotations: any for untyped parameters, primitive types inferred from literal parameter defaults, and primitive/array types inferred from literal variable initializers. Complex logic, conditional types, object literal shapes, and any type that depends on how a value is actually used elsewhere in your code are left untouched and will need manual typing afterward." }, { question: "Why did some declarations get a type and others didn't?", answer: "Only declarations initialized with a literal value the tool recognizes — numbers, strings, booleans, and array literals for variables, plus literal defaults for parameters — get an inferred annotation. Object literals, function calls, and anything else are left as-is rather than risk an incorrect guess." }, { question: "Is my JavaScript uploaded anywhere?", answer: "No — parsing and annotation happen entirely client-side in your browser, using the TypeScript compiler loaded on demand. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
