import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/sql-formatter",
    navName: "SQL Formatter",
    navDescription: "Beautify messy SQL queries.",
    name: "SQL Formatter - Beautify SQL Online",
    description: "Format and beautify minified SQL queries online. Supports MySQL, PostgreSQL, SQL Server and SQLite.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "SQL Formatter - Beautify SQL Online",
    seoDescription: "Format and beautify minified SQL queries online. Supports MySQL, PostgreSQL, SQL Server and SQLite.",
    keywords: ["sql formatter", "format sql online", "sql beautifier", "mysql formatter", "postgresql formatter"],
    ogTitle: "SQL Formatter - Beautify SQL Online | ToolZoneX",
    ogDescription: "Format and beautify minified SQL queries online. Supports MySQL, PostgreSQL, SQL Server and SQLite.",
    schemaName: "SQL Formatter",
    schemaDescription: "Format and beautify minified SQL queries online.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
