import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/json-to-csv",
    navName: "JSON to CSV",
    navDescription: "Convert JSON to CSV format.",
    name: "JSON to CSV Converter",
    description: "Convert JSON arrays into CSV format instantly. Free online data conversion tool for developers.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to CSV Converter - Free Online Data Tool",
    seoDescription: "Convert JSON arrays into CSV format instantly. Free online data conversion tool for developers with export functionality.",
    keywords: ["json to csv", "convert json to csv", "json to excel", "online json converter", "csv exporter"],
    ogTitle: "JSON to CSV Converter - Free Online Data Tool | ToolZoneX",
    ogDescription: "Convert JSON arrays into CSV format instantly.",
    schemaName: "JSON to CSV Converter",
    schemaDescription: "Convert JSON arrays into CSV format instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
