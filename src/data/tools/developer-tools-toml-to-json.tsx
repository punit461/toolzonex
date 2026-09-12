import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/toml-to-json",
    navName: "TOML to JSON",
    navDescription: "Convert TOML config files to JSON.",
    name: "TOML to JSON Converter",
    description: "Paste a TOML document to instantly convert it into equivalent, pretty-printed JSON, with tables and nested tables mapped onto their JSON counterparts. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "TOML to JSON Converter - Convert TOML Files Online",
    seoDescription: "Free online TOML to JSON converter. Paste any TOML config file to instantly get equivalent, pretty-printed JSON, with tables, nested tables, and arrays mapped correctly.",
    keywords: ["toml to json", "toml to json converter", "convert toml to json online", "cargo.toml to json", "pyproject.toml to json"],
    ogTitle: "TOML to JSON Converter - Convert TOML Files Online | ToolZoneX",
    ogDescription: "Paste TOML to instantly generate equivalent, pretty-printed JSON.",
    schemaName: "TOML to JSON Converter",
    schemaDescription: "Paste a TOML document to instantly convert it into equivalent, pretty-printed JSON.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this handle arrays of tables and nested tables correctly?", answer: "Yes — standard TOML constructs like arrays of tables ([[items]]), nested tables, and inline tables convert reliably for typical configuration files. Very unusual or deeply exotic TOML structures are rare in practice, but it's worth a quick visual check of the output for anything highly nonstandard." }, { question: "How are TOML dates and times represented in JSON?", answer: "JSON has no native date type, so TOML date and datetime values are converted to their ISO 8601 string representation in the output." }, { question: "Is my TOML uploaded anywhere?", answer: "No — parsing and conversion happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
