import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/graphql-to-typescript-mongodb",
    navName: "GraphQL to TypeScript MongoDB",
    navDescription: "Generate TypeScript interfaces with an approximate _id field.",
    name: "GraphQL Schema to TypeScript MongoDB Converter",
    description: "Paste a GraphQL SDL schema to generate TypeScript interfaces in the spirit of graphql-codegen-typescript-mongodb, with an approximate _id field added to every generated type. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "GraphQL to TypeScript MongoDB Converter - Generate Interfaces Online",
    seoDescription: "Free online GraphQL to TypeScript MongoDB converter. Paste a GraphQL SDL schema to generate TypeScript interfaces with an approximate _id field for MongoDB-backed types.",
    keywords: ["graphql to typescript mongodb", "graphql-codegen-typescript-mongodb alternative", "graphql mongodb typescript interfaces", "graphql sdl to mongodb types", "graphql typescript _id field"],
    ogTitle: "GraphQL to TypeScript MongoDB Converter - Generate Interfaces Online | ToolZoneX",
    ogDescription: "Paste a GraphQL SDL schema to generate TypeScript interfaces with an approximate _id field.",
    schemaName: "GraphQL Schema to TypeScript MongoDB Converter",
    schemaDescription: "Paste a GraphQL SDL schema to generate TypeScript interfaces with an approximate _id field added to every type.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is this an exact match for the real graphql-codegen-typescript-mongodb plugin?", answer: "No — this is explicitly a best-effort approximation. The real plugin only adds an _id field to types you've explicitly mapped to a MongoDB collection (typically typed as ObjectID rather than string), and supports additional configuration this tool doesn't attempt to replicate. This tool adds _id?: string; to every generated interface as a rough, best-effort stand-in — treat it as a starting point, not a drop-in replacement for running the real codegen plugin." }, { question: "How are custom scalars and nullability handled?", answer: "The same as the plain GraphQL to TypeScript converter — custom scalars map to any with a comment, and nullable fields become field?: T | null." }, { question: "Is my schema uploaded anywhere?", answer: "No — parsing and type generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
