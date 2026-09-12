import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-schema-to-protobuf",
    navName: "JSON Schema to Protobuf",
    navDescription: "Generate a Protocol Buffers message from a JSON Schema document.",
    name: "JSON Schema to Protobuf Converter",
    description: "Paste an actual JSON Schema document to instantly generate a matching Protocol Buffers .proto message definition, with nested messages and sequential field numbers. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON Schema to Protobuf Converter - Generate .proto Files Online",
    seoDescription: "Free online JSON Schema to Protocol Buffers converter. Paste a JSON Schema document to instantly generate a matching .proto message definition with sequential field numbers.",
    keywords: ["json schema to protobuf", "json schema to proto", "generate protobuf from json schema", "json schema to protocol buffers", "proto message generator"],
    ogTitle: "JSON Schema to Protobuf Converter - Generate .proto Files Online | ToolZoneX",
    ogDescription: "Paste a JSON Schema document to instantly generate a matching Protobuf message.",
    schemaName: "JSON Schema to Protobuf Converter",
    schemaDescription: "Paste a JSON Schema document to instantly generate a matching Protocol Buffers .proto message definition.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How are JSON Schema types mapped to Protobuf types?", answer: "string maps to Protobuf's string, integer maps to int64, number maps to double, and boolean maps to bool. Fields with an unrecognized type fall back to string." }, { question: "Are field numbers stable if I reorder my schema's properties?", answer: "No — field numbers are assigned sequentially in the order properties appear in your schema. If you reorder properties after generating a message once already in production use, you'll break wire compatibility, so treat the generated numbers as a starting point to lock in, not something to regenerate on every schema change." }, { question: "Is my schema uploaded anywhere?", answer: "No — parsing and message generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
