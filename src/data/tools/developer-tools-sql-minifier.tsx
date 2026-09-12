import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/sql-minifier",
    navName: "SQL Minifier",
    navDescription: "Compress SQL queries to reduce size.",
    name: "SQL Minifier",
    description: "Minify SQL queries by stripping comments and collapsing whitespace to reduce file size, with before/after character counts.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "SQL Minifier - Compress SQL Queries Online",
    seoDescription: "Free SQL minifier. Strip comments and collapse whitespace from SQL queries to reduce size, with before/after character counts and one-click copy.",
    keywords: ["sql minifier", "minify sql", "sql compressor", "compress sql", "remove sql comments", "sql size reducer", "minify sql online", "sql whitespace remover"],
    ogTitle: "SQL Minifier - Compress SQL Queries Online | ToolZoneX",
    ogDescription: "Strip comments and collapse whitespace from SQL queries to reduce size, with before/after character counts.",
    schemaName: "SQL Minifier",
    schemaDescription: "Minify SQL queries by stripping comments and collapsing whitespace to reduce file size.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Will minifying change how my query runs?", answer: "No. Removing comments and extra whitespace does not affect SQL execution. The database parser treats minified SQL identically to formatted SQL." }, { question: "Does it handle multi-line comments?", answer: "Yes — both single-line comments (-- style) and block comments (/* ... */) are removed by the minifier." }, { question: "What about string literals containing spaces?", answer: "The minifier does not parse string literals, so spaces inside quoted strings may be collapsed. For production use with complex SQL, a dedicated SQL parser is recommended." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
