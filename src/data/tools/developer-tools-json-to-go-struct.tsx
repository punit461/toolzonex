import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-go-struct",
    navName: "JSON to Go Struct",
    navDescription: "Generate Go structs from JSON.",
    name: "JSON to Go Struct Converter",
    description: "Paste a JSON sample to instantly generate matching Go structs with json struct tags, nested types, and pointer types for optional/nullable fields. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to Go Struct Converter - Generate Go Types Online",
    seoDescription: "Free online JSON to Go struct converter. Paste any JSON sample to instantly generate matching Go struct declarations with json tags, nested structs, and pointer types.",
    keywords: ["json to go struct", "json to golang struct", "generate go struct from json", "json2go alternative", "go struct generator"],
    ogTitle: "JSON to Go Struct Converter - Generate Go Types Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate matching Go struct declarations.",
    schemaName: "JSON to Go Struct Converter",
    schemaDescription: "Paste a JSON sample to instantly generate matching Go structs with json struct tags.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why are some fields pointer types?", answer: "Go's zero values (like 0 or \"\") are indistinguishable from a field that was never sent. For any property that's missing from at least one sample object or was ever null, the generator uses a pointer (*string, *int, etc.) so nil unambiguously means \"not present.\"" }, { question: "Does it use the standard library's encoding/json?", answer: "The generated json:\"...\" tags work with Go's standard encoding/json package directly — no extra dependency required." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and struct generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
