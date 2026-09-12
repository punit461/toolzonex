import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/json-to-xml",
    navName: "JSON to XML",
    navDescription: "Convert JSON to XML format.",
    name: "JSON to XML Converter",
    description: "Convert JSON strings and files into formatted XML instantly. Free online data converter.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to XML Converter - Free Online Data Tool",
    seoDescription: "Convert JSON strings and files into formatted XML instantly. Free online data converter with copy and download.",
    keywords: ["json to xml", "convert json to xml", "online json converter", "parse json to xml"],
    ogTitle: "JSON to XML Converter - Free Online Data Tool | ToolZoneX",
    ogDescription: "Convert JSON strings and files into formatted XML instantly.",
    schemaName: "JSON to XML Converter",
    schemaDescription: "Convert JSON strings and files into formatted XML instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
