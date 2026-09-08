import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-yaml",
    navName: "JSON to YAML",
    navDescription: "Convert JSON to a YAML document.",
    name: "JSON to YAML Converter",
    description: "Paste a JSON sample to instantly convert it into valid, properly indented YAML. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to YAML Converter - Convert JSON to YAML Online",
    seoDescription: "Free online JSON to YAML converter. Paste any JSON sample to instantly convert it into valid, properly indented YAML.",
    keywords: ["json to yaml", "json to yaml converter", "convert json to yaml", "yaml generator", "json2yaml alternative"],
    ogTitle: "JSON to YAML Converter - Convert JSON to YAML Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly convert it into valid YAML.",
    schemaName: "JSON to YAML Converter",
    schemaDescription: "Paste a JSON sample to instantly convert it into valid, properly indented YAML.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why does this tool output values instead of type declarations?", answer: "Like TOML, YAML is a data-serialization format rather than a type/schema language, so this converter emits a real YAML document populated with your sample's actual values rather than type names." }, { question: "When does the converter quote a string value?", answer: "A string is quoted whenever leaving it bare would change its meaning in YAML — for example if it's empty, looks like a number or boolean, has leading/trailing whitespace, or contains a YAML special character like :, #, or -. Ordinary strings are left unquoted." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and YAML generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
