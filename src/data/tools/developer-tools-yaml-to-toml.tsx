import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/yaml-to-toml",
    navName: "YAML to TOML",
    navDescription: "Convert YAML config files to TOML.",
    name: "YAML to TOML Converter",
    description: "Paste a YAML document to instantly convert it into equivalent TOML, with nested mappings becoming tables and sequences becoming arrays. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "YAML to TOML Converter - Convert YAML Files Online",
    seoDescription: "Free online YAML to TOML converter. Paste any YAML config file to instantly get equivalent TOML, with nested mappings, sequences, and lists of mappings mapped correctly.",
    keywords: ["yaml to toml", "yaml to toml converter", "convert yaml to toml online", "yaml to cargo.toml", "yaml to pyproject.toml"],
    ogTitle: "YAML to TOML Converter - Convert YAML Files Online | ToolZoneX",
    ogDescription: "Paste YAML to instantly generate equivalent TOML.",
    schemaName: "YAML to TOML Converter",
    schemaDescription: "Paste a YAML document to instantly convert it into equivalent TOML.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this handle nested mappings and lists correctly?", answer: "Yes — standard YAML mappings, nested mappings, and lists (including lists of mappings, which become TOML arrays of tables) convert reliably for typical configuration files. Very unusual YAML features like anchors, aliases, or multi-document streams are uncommon in practice, but it's worth a quick visual check of the output for anything highly nonstandard." }, { question: "What happens to YAML null values?", answer: "TOML has no native null type, so keys with a null value in the YAML source cannot be represented as-is — review the output for any such keys and decide how you want them handled in the TOML version." }, { question: "Is my YAML uploaded anywhere?", answer: "No — parsing and conversion happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
