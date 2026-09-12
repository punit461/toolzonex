import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/csv-to-json",
    navName: "CSV to JSON",
    navDescription: "Convert CSV to JSON arrays.",
    name: "CSV to JSON Converter",
    description: "Convert CSV data into a JSON array instantly. Free online data conversion tool with type inference.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "CSV to JSON Converter - Free Online Data Tool",
    seoDescription: "Convert CSV data into a JSON array instantly. Free online data conversion tool for developers with export functionality.",
    keywords: ["csv to json", "convert csv to json", "excel to json", "online csv converter", "json exporter"],
    ogTitle: "CSV to JSON Converter - Free Online Data Tool | ToolZoneX",
    ogDescription: "Convert CSV data into a JSON array instantly.",
    schemaName: "CSV to JSON Converter",
    schemaDescription: "Convert CSV data into a JSON array instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
