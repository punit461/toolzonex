import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/toml-to-yaml",
    navName: "TOML to YAML",
    navDescription: "Convert TOML config files to YAML.",
    name: "TOML to YAML Converter",
    description: "Paste a TOML document to instantly convert it into equivalent YAML, with tables becoming nested mappings and arrays becoming sequences. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "TOML to YAML Converter - Convert TOML Files Online",
    seoDescription: "Free online TOML to YAML converter. Paste any TOML config file to instantly get equivalent YAML, with tables, nested tables, and arrays mapped correctly.",
    keywords: ["toml to yaml", "toml to yaml converter", "convert toml to yaml online", "cargo.toml to yaml", "pyproject.toml to yaml"],
    ogTitle: "TOML to YAML Converter - Convert TOML Files Online | ToolZoneX",
    ogDescription: "Paste TOML to instantly generate equivalent YAML.",
    schemaName: "TOML to YAML Converter",
    schemaDescription: "Paste a TOML document to instantly convert it into equivalent YAML.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this handle arrays of tables and nested tables correctly?", answer: "Yes — standard TOML constructs like arrays of tables ([[items]]), nested tables, and inline tables convert reliably for typical configuration files. Very unusual or deeply exotic TOML structures are rare in practice, but it's worth a quick visual check of the output for anything highly nonstandard." }, { question: "How are TOML dates and times represented in YAML?", answer: "TOML date and datetime values are serialized using YAML's native timestamp representation, so tools that read the resulting YAML will typically parse them back into date objects automatically." }, { question: "Is my TOML uploaded anywhere?", answer: "No — parsing and conversion happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
