import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-formatter",
    navName: "JSON Formatter",
    navDescription: "Format and validate JSON data.",
    name: "JSON Formatter & Validator",
    description: "Format, validate, and minify JSON data instantly in your browser. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON Formatter & Validator - Free Online Developer Tool",
    seoDescription: "Format, validate, and minify JSON data instantly in your browser. Free online developer tool.",
    keywords: ["json formatter", "json validator", "json parser", "json beautifier", "minify json"],
    ogTitle: "JSON Formatter & Validator - Free Online Developer Tool | ToolZoneX",
    ogDescription: "Format, validate, and minify JSON data instantly in your browser.",
    schemaName: "JSON Formatter & Validator",
    schemaDescription: "Format, validate, and minify JSON data instantly in your browser.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
