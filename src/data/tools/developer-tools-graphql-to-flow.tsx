import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/graphql-to-flow",
    navName: "GraphQL to Flow",
    navDescription: "Generate Flow types from a GraphQL SDL schema.",
    name: "GraphQL Schema to Flow Converter",
    description: "Paste a GraphQL SDL schema to instantly generate matching Flow exact object types, with nullability mapped onto Flow's maybe-type syntax. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "GraphQL to Flow Converter - Generate Flow Types Online",
    seoDescription: "Free online GraphQL to Flow converter. Paste a GraphQL SDL schema to instantly generate matching Flow exact object types, enums, and nullable maybe-types.",
    keywords: ["graphql to flow", "graphql schema to flow", "generate flow types from graphql", "graphql codegen flow", "graphql sdl to flow type"],
    ogTitle: "GraphQL to Flow Converter - Generate Flow Types Online | ToolZoneX",
    ogDescription: "Paste a GraphQL SDL schema to instantly generate matching Flow exact object types.",
    schemaName: "GraphQL Schema to Flow Converter",
    schemaDescription: "Paste a GraphQL SDL schema to instantly generate matching Flow exact object types.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why are the generated object types \"exact\" ({| |})?", answer: "Exact object types ({| ... |}) reject extra properties that aren't declared, which matches how a GraphQL response is shaped — it only ever contains the fields your query selected, so an exact type is the more accurate default." }, { question: "How are custom scalars handled?", answer: "Any scalar beyond the five built-ins (String, Int, Float, Boolean, ID) maps to Flow's any, with a comment listing every custom scalar encountered so you can refine it by hand." }, { question: "Is my schema uploaded anywhere?", answer: "No — parsing and type generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
