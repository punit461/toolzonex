import GridOnIcon from '@mui/icons-material/GridOn';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/csv-formatter",
    navName: "CSV Formatter",
    navDescription: "Clean up and align CSV data.",
    name: "CSV Formatter",
    description: "Format messy CSV into clean, aligned columns. Free online CSV formatter with delimiter selection.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <GridOnIcon fontSize="large" color="primary"/>,
    seoTitle: "CSV Formatter - Align & Clean Up CSV Online",
    seoDescription: "Free online CSV formatter. Paste CSV with comma, tab, or semicolon delimiters and get consistently aligned, readable columns.",
    keywords: ["csv formatter", "format csv", "csv align", "csv beautifier", "clean csv columns"],
    ogTitle: "CSV Formatter - Align & Clean Up CSV Online | ToolZoneX",
    ogDescription: "Format messy CSV into clean, aligned columns instantly.",
    schemaName: "CSV Formatter",
    schemaDescription: "Format CSV into clean, aligned columns.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
