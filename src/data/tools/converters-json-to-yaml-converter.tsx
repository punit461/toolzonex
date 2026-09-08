import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/json-to-yaml-converter",
    navName: "JSON to YAML",
    navDescription: "Convert JSON to YAML format.",
    name: "JSON to YAML Converter - Free Developer Tool",
    description: "Convert JSON to YAML format instantly online. Free developer utility for configs.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to YAML Converter - Free Developer Tool",
    seoDescription: "Convert JSON to YAML format instantly online. Free developer utility for configs.",
    keywords: ["json to yaml", "json 2 yaml", "convert json to yaml", "json parser online", "yaml generator"],
    ogTitle: "JSON to YAML Converter - Free Developer Tool | ToolZoneX",
    ogDescription: "Convert JSON to YAML format instantly online. Free developer utility for configs.",
    schemaName: "JSON to YAML Converter",
    schemaDescription: "Convert JSON to YAML format instantly online.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
