import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-rust-serde",
    navName: "JSON to Rust Serde",
    navDescription: "Generate Rust structs from JSON.",
    name: "JSON to Rust Serde Struct Converter",
    description: "Paste a JSON sample to instantly generate matching Rust structs annotated with #[derive(Serialize, Deserialize)] and serde rename attributes. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to Rust Serde Converter - Generate Structs Online",
    seoDescription: "Free online JSON to Rust converter. Paste any JSON sample to instantly generate matching Rust structs with serde derive attributes, snake_case fields, and rename tags.",
    keywords: ["json to rust", "json to rust struct", "json to serde struct", "generate rust from json", "rust serde struct generator"],
    ogTitle: "JSON to Rust Serde Converter - Generate Structs Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate matching Rust serde structs.",
    schemaName: "JSON to Rust Serde Struct Converter",
    schemaDescription: "Paste a JSON sample to instantly generate matching Rust structs annotated with #[derive(Serialize, Deserialize)].",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why does the output need the serde crate?", answer: "The generated structs rely on serde::{Serialize, Deserialize} for the derive macros and, for unknown/mixed-type fields, on serde_json::Value to hold arbitrary JSON — add serde (with the derive feature) and serde_json to your Cargo.toml." }, { question: "When does a field get a #[serde(rename)] attribute?", answer: "Only when converting the original key to snake_case actually changes it — for example, a JSON key userId becomes the Rust field user_id with #[serde(rename = \"userId\")] so serialization still round-trips to the exact original key." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and struct generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
