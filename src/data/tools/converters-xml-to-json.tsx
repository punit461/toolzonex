import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/xml-to-json",
    navName: "XML to JSON",
    navDescription: "Parse XML to JSON data.",
    name: "XML to JSON Converter",
    description: "Convert XML strings and files into formatted JSON instantly. Free online data converter.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "XML to JSON Converter - Free Online Data Tool",
    seoDescription: "Convert XML strings and files into formatted JSON instantly. Free online data converter with copy and download.",
    keywords: ["xml to json", "convert xml to json", "online xml converter", "parse xml to json"],
    ogTitle: "XML to JSON Converter - Free Online Data Tool | ToolZoneX",
    ogDescription: "Convert XML strings and files into formatted JSON instantly.",
    schemaName: "XML to JSON Converter",
    schemaDescription: "Convert XML strings and files into formatted JSON instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
