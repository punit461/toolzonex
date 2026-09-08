import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/graphql-to-schema-ast",
    navName: "GraphQL to Schema AST",
    navDescription: "Parse a GraphQL SDL schema into a clean, readable AST.",
    name: "GraphQL Schema to AST Converter",
    description: "Paste a GraphQL SDL schema to parse it into an abstract syntax tree and see a clean, readable JSON view of every type definition. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "GraphQL to Schema AST Converter - Parse SDL to JSON Online",
    seoDescription: "Free online GraphQL to schema AST converter. Paste a GraphQL SDL schema to parse it into a clean, readable JSON view of every type definition's kind, name, and fields.",
    keywords: ["graphql to ast", "graphql schema ast", "graphql sdl parser online", "graphql ast json", "parse graphql schema"],
    ogTitle: "GraphQL to Schema AST Converter - Parse SDL to JSON Online | ToolZoneX",
    ogDescription: "Paste a GraphQL SDL schema to parse it into a clean, readable JSON AST view.",
    schemaName: "GraphQL Schema to AST Converter",
    schemaDescription: "Paste a GraphQL SDL schema to parse it into a clean, readable JSON view of every type definition.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why isn't this the full raw AST from the parser?", answer: "The raw AST that GraphQL.js produces includes a loc object with source line/column offsets on every single node, which adds a lot of noise without adding insight for most use cases. This tool strips that out and keeps only the parts you usually care about: type kind, name, and field/value structure." }, { question: "Does this validate my schema, or just parse it?", answer: "Only parsing — syntactic validity is checked, but semantic rules (like whether an interface's fields are actually implemented) are not. Use the GraphQL to Introspection JSON tool if you need a fully built and validated schema." }, { question: "Is my schema uploaded anywhere?", answer: "No — parsing happens entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
