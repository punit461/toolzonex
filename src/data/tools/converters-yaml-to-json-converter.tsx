import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/yaml-to-json-converter",
    navName: "YAML to JSON",
    navDescription: "Convert YAML to JSON format.",
    name: "YAML to JSON Converter - Free Developer Tool",
    description: "Convert YAML configurations to JSON format instantly online. Free developer utility.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "YAML to JSON Converter - Free Developer Tool",
    seoDescription: "Convert YAML configurations to JSON format instantly online. Free developer utility.",
    keywords: ["yaml to json", "yaml 2 json", "convert yaml to json", "yaml parser online"],
    ogTitle: "YAML to JSON Converter - Free Developer Tool | ToolZoneX",
    ogDescription: "Convert YAML configurations to JSON format instantly online. Free developer utility.",
    schemaName: "YAML to JSON Converter",
    schemaDescription: "Convert YAML configurations to JSON format instantly online.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
