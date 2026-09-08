import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-toml",
    navName: "JSON to TOML",
    navDescription: "Convert JSON to a TOML document.",
    name: "JSON to TOML Converter",
    description: "Paste a JSON sample to instantly convert it into a valid TOML document, with nested objects turned into table sections. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to TOML Converter - Convert JSON to TOML Online",
    seoDescription: "Free online JSON to TOML converter. Paste any JSON sample to instantly convert it into a valid TOML document with proper table sections and arrays.",
    keywords: ["json to toml", "json to toml converter", "convert json to toml", "toml generator", "json2toml alternative"],
    ogTitle: "JSON to TOML Converter - Convert JSON to TOML Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly convert it into a valid TOML document.",
    schemaName: "JSON to TOML Converter",
    schemaDescription: "Paste a JSON sample to instantly convert it into a valid TOML document.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why does this tool output values instead of type declarations?", answer: "TOML is a configuration file format, not a schema/type language — there's no TOML equivalent of a TypeScript interface. Instead, this converter produces a real, valid TOML document populated with the sample values from your JSON, which you can use directly as a config file or as a template." }, { question: "How are null values handled, since TOML has no null?", answer: "TOML has no native null/nil value, so any field that was null in your JSON is emitted as an empty string with a trailing comment noting it was null in the source, so you can decide how to represent it for your use case." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and TOML generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
