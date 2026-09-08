import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/graphql-to-introspection-json",
    navName: "GraphQL to Introspection JSON",
    navDescription: "Run a real introspection query against your GraphQL SDL.",
    name: "GraphQL Schema to Introspection JSON Converter",
    description: "Paste a GraphQL SDL schema to instantly run a real introspection query against it and get back the standard introspection JSON result. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "GraphQL to Introspection JSON Converter - Run Introspection Online",
    seoDescription: "Free online GraphQL to introspection JSON converter. Paste a GraphQL SDL schema to instantly run a real introspection query and get the standard introspection JSON result.",
    keywords: ["graphql to introspection json", "graphql introspection query online", "graphql schema introspection", "generate introspection json", "graphql sdl to introspection"],
    ogTitle: "GraphQL to Introspection JSON Converter - Run Introspection Online | ToolZoneX",
    ogDescription: "Paste a GraphQL SDL schema to instantly run a real introspection query.",
    schemaName: "GraphQL Schema to Introspection JSON Converter",
    schemaDescription: "Paste a GraphQL SDL schema to instantly run a real introspection query against it.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is this real introspection or a hand-rolled approximation?", answer: "It's real — the tool builds an actual GraphQLSchema from your SDL and executes the standard getIntrospectionQuery() query against it with the reference GraphQL.js engine, so the output matches exactly what a live GraphQL server would return." }, { question: "What happens if my SDL has a syntax error?", answer: "The schema build step will fail with a descriptive error message shown above the input, telling you roughly where the SDL is invalid, rather than producing partial or incorrect output." }, { question: "Is my schema uploaded anywhere?", answer: "No — parsing and introspection happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
