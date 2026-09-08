import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/sql-beautifier",
    navName: "SQL Beautifier",
    navDescription: "Format and pretty-print SQL queries.",
    name: "SQL Beautifier",
    description: "Format and pretty-print minified SQL queries with proper keyword indentation. Free online developer tool — runs entirely in your browser.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "SQL Beautifier - Format & Pretty Print SQL Online",
    seoDescription: "Free online SQL beautifier to format and pretty-print minified SQL queries with proper keyword indentation. Client-side only.",
    keywords: ["sql beautifier", "format sql", "sql formatter", "pretty print sql"],
    ogTitle: "SQL Beautifier - Format & Pretty Print SQL Online | ToolZoneX",
    ogDescription: "Format and pretty-print minified SQL queries with proper keyword indentation. Free online developer tool.",
    schemaName: "SQL Beautifier",
    schemaDescription: "Format and pretty-print minified SQL queries with proper keyword indentation.",
    applicationCategory: "DeveloperApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
