import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-minifier",
    navName: "JSON Minifier",
    navDescription: "Minify JSON by removing whitespace.",
    name: "JSON Minifier - Minify JSON Online",
    description: "Paste JSON and instantly minify it by stripping all whitespace, newlines, and indentation. Also validates JSON syntax.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON Minifier - Minify JSON Online",
    seoDescription: "Free online JSON minifier. Paste JSON to instantly strip whitespace, newlines, and indentation. Validates JSON syntax and shows byte savings.",
    keywords: ["JSON minifier", "minify JSON", "compress JSON", "JSON compressor", "remove whitespace JSON", "JSON validator"],
    ogTitle: "JSON Minifier - Minify JSON Online | ToolZoneX",
    ogDescription: "Paste JSON and instantly minify it by stripping all whitespace. Free online JSON minifier with validation.",
    schemaName: "JSON Minifier",
    schemaDescription: "Minify JSON by removing whitespace and indentation, with syntax validation.",
    applicationCategory: "DeveloperApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
