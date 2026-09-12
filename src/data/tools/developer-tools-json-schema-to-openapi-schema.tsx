import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-schema-to-openapi-schema",
    navName: "JSON Schema to OpenAPI",
    navDescription: "Generate an OpenAPI schema fragment from a JSON Schema document.",
    name: "JSON Schema to OpenAPI Converter",
    description: "Paste an actual JSON Schema document to instantly generate a matching OpenAPI 3.0 components.schemas fragment, with nested objects extracted into named, referenced schemas. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON Schema to OpenAPI Converter - Generate Schemas Online",
    seoDescription: "Free online JSON Schema to OpenAPI converter. Paste a JSON Schema document to instantly generate a matching OpenAPI 3.0 components.schemas fragment.",
    keywords: ["json schema to openapi", "json schema to openapi schema", "generate openapi from json schema", "json schema to swagger", "openapi component generator"],
    ogTitle: "JSON Schema to OpenAPI Converter - Generate Schemas Online | ToolZoneX",
    ogDescription: "Paste a JSON Schema document to instantly generate a matching OpenAPI schema fragment.",
    schemaName: "JSON Schema to OpenAPI Converter",
    schemaDescription: "Paste a JSON Schema document to instantly generate a matching OpenAPI 3.0 components.schemas fragment.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How does JSON Schema nullability map to OpenAPI?", answer: "JSON Schema commonly expresses \"nullable\" with a type array like [\"string\", \"null\"]. OpenAPI 3.0 doesn't support type arrays, so this converter instead adds a nullable: true sibling key next to the resolved type, which is the standard OpenAPI 3.0 convention." }, { question: "Are $schema and $id kept in the output?", answer: "No — $schema and $id are JSON-Schema-specific metadata keywords that don't belong in an OpenAPI schema object, so they're dropped from the generated components.schemas fragment." }, { question: "Is my schema uploaded anywhere?", answer: "No — parsing and schema generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
