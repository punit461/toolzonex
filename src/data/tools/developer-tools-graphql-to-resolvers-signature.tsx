import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/graphql-to-resolvers-signature",
    navName: "GraphQL to Resolvers Signature",
    navDescription: "Generate resolver map stubs from a GraphQL SDL schema.",
    name: "GraphQL Schema to Resolvers Signature Converter",
    description: "Paste a GraphQL SDL schema to instantly generate resolver map stubs for every field on your Query, Mutation, and Subscription root types. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "GraphQL to Resolvers Signature Converter - Generate Resolver Stubs Online",
    seoDescription: "Free online GraphQL to resolvers signature converter. Paste a GraphQL SDL schema to instantly generate resolver map stubs for every Query, Mutation, and Subscription field.",
    keywords: ["graphql to resolvers", "graphql resolver signature generator", "generate resolver stubs from graphql", "graphql resolver map", "graphql sdl to resolvers"],
    ogTitle: "GraphQL to Resolvers Signature Converter - Generate Resolver Stubs Online | ToolZoneX",
    ogDescription: "Paste a GraphQL SDL schema to instantly generate resolver map stubs.",
    schemaName: "GraphQL Schema to Resolvers Signature Converter",
    schemaDescription: "Paste a GraphQL SDL schema to instantly generate resolver map stubs for every root field.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this generate real resolver logic?", answer: "No — it generates signature stubs only. Each resolver body is left empty for you to fill in with your actual data-fetching or mutation logic; the tool's job is to make sure you don't miss a field and to show you each field's arguments and return type up front." }, { question: "What if my schema has no Mutation or Subscription type?", answer: "The tool only emits a block for root types that actually exist in your schema — if you have no Mutation or Subscription type defined, those sections are simply omitted." }, { question: "Is my schema uploaded anywhere?", answer: "No — parsing and stub generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
