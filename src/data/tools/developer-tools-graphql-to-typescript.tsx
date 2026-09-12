import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/graphql-to-typescript",
    navName: "GraphQL to TypeScript",
    navDescription: "Generate TypeScript interfaces from a GraphQL SDL schema.",
    name: "GraphQL Schema to TypeScript Converter",
    description: "Paste a GraphQL SDL schema to instantly generate matching TypeScript interfaces and string-literal union types, with nullability mapped onto optional and nullable fields. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "GraphQL to TypeScript Converter - Generate Interfaces Online",
    seoDescription: "Free online GraphQL to TypeScript converter. Paste a GraphQL SDL schema to instantly generate matching TypeScript interfaces, enums, and nullable/optional fields.",
    keywords: ["graphql to typescript", "graphql schema to typescript", "generate typescript from graphql", "graphql codegen typescript", "graphql sdl to interface"],
    ogTitle: "GraphQL to TypeScript Converter - Generate Interfaces Online | ToolZoneX",
    ogDescription: "Paste a GraphQL SDL schema to instantly generate matching TypeScript interfaces.",
    schemaName: "GraphQL Schema to TypeScript Converter",
    schemaDescription: "Paste a GraphQL SDL schema to instantly generate matching TypeScript interfaces.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How are custom scalars handled?", answer: "Any scalar beyond the five built-ins (String, Int, Float, Boolean, ID) maps to TypeScript's any, and the tool adds a comment above the generated interfaces naming every custom scalar it encountered so you can refine the type by hand." }, { question: "Why does a nullable field get both ? and | null?", answer: "GraphQL's nullable fields can be two different things: absent from the response entirely, or present with an explicit null value. TypeScript's optional marker (?) only covers the first case, so the tool adds | null as well to cover both." }, { question: "Is my schema uploaded anywhere?", answer: "No — parsing and type generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
