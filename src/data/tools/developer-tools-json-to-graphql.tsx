import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-graphql",
    navName: "JSON to GraphQL",
    navDescription: "Generate a GraphQL schema from JSON.",
    name: "JSON to GraphQL Schema Converter",
    description: "Paste a JSON sample to instantly generate matching GraphQL SDL type definitions, with nested types, list types, and non-null fields inferred automatically. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to GraphQL Converter - Generate GraphQL SDL Online",
    seoDescription: "Free online JSON to GraphQL converter. Paste any JSON sample to instantly generate matching GraphQL SDL type definitions with nested types and non-null fields.",
    keywords: ["json to graphql", "json to graphql schema", "generate graphql schema from json", "graphql sdl generator", "json2graphql alternative"],
    ogTitle: "JSON to GraphQL Converter - Generate GraphQL SDL Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate matching GraphQL SDL type definitions.",
    schemaName: "JSON to GraphQL Schema Converter",
    schemaDescription: "Paste a JSON sample to instantly generate matching GraphQL SDL type definitions.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "When does a field get the ! non-null suffix?", answer: "A field gets GraphQL's ! suffix only when it is both never missing (not optional) and never observed as null (not nullable) across your sample. If either condition fails, the field is left nullable, matching GraphQL's stricter definition of non-null." }, { question: "What type is used for fields with unknown or mixed types?", answer: "Since GraphQL has no built-in \"any\" scalar, fields with an unrecognized or mixed type map to a custom JSON scalar, and a scalar JSON declaration is added at the top of the output automatically whenever it's needed." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and schema generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
