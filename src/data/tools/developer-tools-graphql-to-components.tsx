import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/graphql-to-components",
    navName: "GraphQL to Components",
    navDescription: "Scaffold a React component from a GraphQL operation.",
    name: "GraphQL Operation to React Component Scaffold Generator",
    description: "Paste a GraphQL query or mutation to generate a starting-point React component scaffold with a props/data interface and an Apollo Client useQuery stub. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "GraphQL to Components Converter - Scaffold React Components Online",
    seoDescription: "Free online GraphQL to React component converter. Paste a GraphQL query or mutation to generate a starting-point component scaffold with a useQuery stub and typed props.",
    keywords: ["graphql to react component", "graphql operation to component", "apollo usequery scaffold generator", "graphql to jsx", "graphql component boilerplate"],
    ogTitle: "GraphQL to Components Converter - Scaffold React Components Online | ToolZoneX",
    ogDescription: "Paste a GraphQL query or mutation to generate a starting-point React component scaffold.",
    schemaName: "GraphQL Operation to React Component Scaffold Generator",
    schemaDescription: "Paste a GraphQL query or mutation to generate a starting-point React component scaffold.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is the generated component complete and ready to run?", answer: "No — this is intentionally a best-effort scaffold, not complete, runnable, or styled code. It assumes you're using Apollo Client and its useQuery hook; if you use a different GraphQL client (Relay, urql, raw fetch, etc.), you'll need to swap that part out entirely. The JSX placeholders (<div>{data?.fieldName}</div>) are unstyled stand-ins, loading and error handling are minimal, and you'll still need to build the actual UI, choose your GraphQL client if not Apollo, and handle loading/error states properly before shipping it." }, { question: "Why does it want an operation instead of a schema?", answer: "A component renders the result of running one specific query or mutation, not an entire schema — so this tool needs the actual operation (with its selection set) to know which fields the component should expect back in data." }, { question: "Is my operation uploaded anywhere?", answer: "No — parsing and scaffold generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
