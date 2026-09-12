import StorageIcon from '@mui/icons-material/Storage';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/sql-validator",
    navName: "SQL Validator",
    navDescription: "Basic SQL sanity checker for common issues.",
    name: "SQL Sanity Checker",
    description: "Paste a SQL statement to run a quick sanity check for unbalanced parentheses, unterminated quotes, and common typos. Free online SQL validator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <StorageIcon fontSize="large" color="primary"/>,
    seoTitle: "SQL Validator - Free Online SQL Sanity Checker",
    seoDescription: "Free online SQL validator. Paste a SQL statement to check for unbalanced parentheses, unterminated quotes, missing keywords, and common typos.",
    keywords: ["sql validator", "sql syntax checker", "sql sanity checker online", "check sql query", "sql lint online"],
    ogTitle: "SQL Validator - Free Online SQL Sanity Checker | ToolZoneX",
    ogDescription: "Paste SQL to check for unbalanced brackets, quotes, and common typos.",
    schemaName: "SQL Sanity Checker",
    schemaDescription: "Paste a SQL statement to run a quick sanity check for unbalanced parentheses, unterminated quotes, and common typos.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this fully validate SQL syntax for my database?", answer: "No — this is a basic structural sanity-checker, not a full SQL parser. It can't validate every rule of every SQL dialect (MySQL, PostgreSQL, SQL Server, etc.) — it only checks for unbalanced parentheses/quotes, the presence of a recognized statement keyword, and a few common typos. Always test real queries against your actual database." }, { question: "Why did it flag my valid query?", answer: "Some warnings are heuristic (like the trailing-comma check) and can trigger on valid, unusual syntax. Treat flagged issues as things worth double-checking, not definitive errors." }, { question: "Is my SQL uploaded anywhere?", answer: "No — checking happens entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
