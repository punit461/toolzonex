import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/sql-keywords-uppercase",
    navName: "SQL Keywords Uppercase",
    navDescription: "Convert SQL keywords to UPPERCASE.",
    name: "SQL Keywords Uppercase",
    description: "Convert every recognized SQL keyword in a query to UPPERCASE while leaving identifiers, string literals, and formatting untouched.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "SQL Keywords Uppercase - Capitalize SQL Keywords Online",
    seoDescription: "Free online tool to convert SQL keywords to UPPERCASE. Capitalizes SELECT, FROM, WHERE, JOIN, and more while leaving everything else untouched.",
    keywords: ["sql keywords uppercase", "capitalize sql keywords", "sql to uppercase", "uppercase sql online", "sql keyword case converter"],
    ogTitle: "SQL Keywords Uppercase - Capitalize SQL Keywords Online | ToolZoneX",
    ogDescription: "Convert every recognized SQL keyword in a query to UPPERCASE.",
    schemaName: "SQL Keywords Uppercase",
    schemaDescription: "Convert every recognized SQL keyword in a query to UPPERCASE while leaving identifiers, string literals, and formatting untouched.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the SQL Formatter or SQL Beautifier?", answer: "Our SQL Formatter and SQL Beautifier reformat whitespace and indentation, restructuring the query onto multiple lines. This tool ONLY changes keyword casing — every other character, including line breaks and spacing, is left exactly as you typed it." }, { question: "Will this change text inside string literals?", answer: "No — content inside single-quoted strings is detected and skipped, so a value like 'select all rows' stays exactly as written even though it contains words that would otherwise be recognized as keywords." }, { question: "Does it recognize every SQL keyword from every database dialect?", answer: "It covers roughly 70 of the most common standard SQL keywords used across MySQL, PostgreSQL, SQLite, and SQL Server. Highly dialect-specific keywords not on that list are left in their original case." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
