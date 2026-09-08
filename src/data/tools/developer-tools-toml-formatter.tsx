import DescriptionIcon from '@mui/icons-material/Description';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/toml-formatter",
    navName: "TOML Formatter",
    navDescription: "Reformat TOML into clean, consistent TOML.",
    name: "TOML Formatter",
    description: "Reformat TOML input into clean, consistently formatted TOML output, with friendly error messages for invalid syntax.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <DescriptionIcon fontSize="large" color="primary"/>,
    seoTitle: "TOML Formatter - Clean Up & Reformat TOML Online",
    seoDescription: "Free online TOML formatter. Paste TOML and get back clean, consistently formatted TOML output.",
    keywords: ["toml formatter", "format toml online", "toml beautifier", "clean up toml", "toml pretty print"],
    ogTitle: "TOML Formatter - Clean Up & Reformat TOML Online | ToolZoneX",
    ogDescription: "Reformat TOML input into clean, consistently formatted TOML output.",
    schemaName: "TOML Formatter",
    schemaDescription: "Reformat TOML input into clean, consistently formatted TOML output, with friendly error messages for invalid syntax.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the TOML to JSON or JSON to TOML converters?", answer: "Our TOML to JSON and JSON to TOML tools convert TOML TO or FROM a completely different format. This TOML Formatter stays within TOML the whole time — it just reformats your TOML input back into clean, consistent TOML output, without ever changing formats." }, { question: "Does formatting change the data or key order?", answer: "No — parsing and re-serializing preserves all keys, values, and their nesting structure exactly. Only whitespace, indentation, and table-header presentation are normalized for consistency." }, { question: "Is my TOML uploaded anywhere?", answer: "No — parsing and formatting happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
