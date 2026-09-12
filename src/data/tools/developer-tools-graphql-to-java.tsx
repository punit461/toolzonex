import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/graphql-to-java",
    navName: "GraphQL to JAVA",
    navDescription: "Generate Java POJO classes from a GraphQL SDL schema.",
    name: "GraphQL Schema to Java Converter",
    description: "Paste a GraphQL SDL schema to instantly generate matching Java POJO classes and enums, with getters and setters stubbed out for every field. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "GraphQL to JAVA Converter - Generate POJO Classes Online",
    seoDescription: "Free online GraphQL to Java converter. Paste a GraphQL SDL schema to instantly generate matching Java POJO classes and enums with getters and setters.",
    keywords: ["graphql to java", "graphql schema to java", "generate java pojo from graphql", "graphql codegen java", "graphql sdl to java class"],
    ogTitle: "GraphQL to JAVA Converter - Generate POJO Classes Online | ToolZoneX",
    ogDescription: "Paste a GraphQL SDL schema to instantly generate matching Java POJO classes.",
    schemaName: "GraphQL Schema to Java Converter",
    schemaDescription: "Paste a GraphQL SDL schema to instantly generate matching Java POJO classes and enums.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Are GraphQL non-null and list rules reflected in the Java output?", answer: "List types become List<T> regardless of nullability, since Java has no built-in non-null type annotation without an extra dependency — the tool keeps the generated classes simple and lets you add validation or @NonNull annotations yourself where needed." }, { question: "How are custom scalars handled?", answer: "Any scalar beyond the five built-ins (String, Int, Float, Boolean, ID) maps to Java's Object as a safe fallback — replace it with your actual scalar's Java representation by hand." }, { question: "Is my schema uploaded anywhere?", answer: "No — parsing and code generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
