import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-mysql",
    navName: "JSON to MySQL",
    navDescription: "Generate MySQL CREATE TABLE statements from JSON.",
    name: "JSON to MySQL Converter",
    description: "Paste a JSON sample to instantly generate matching MySQL CREATE TABLE statements, with nested objects split into related tables and NULL/NOT NULL inferred automatically. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to MySQL Converter - Generate CREATE TABLE Statements Online",
    seoDescription: "Free online JSON to MySQL converter. Paste any JSON sample to instantly generate matching CREATE TABLE statements, with nested objects split into related tables.",
    keywords: ["json to mysql", "json to sql", "json to create table", "generate mysql schema from json", "json2sql alternative"],
    ogTitle: "JSON to MySQL Converter - Generate CREATE TABLE Statements Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate matching MySQL CREATE TABLE statements.",
    schemaName: "JSON to MySQL Converter",
    schemaDescription: "Paste a JSON sample to instantly generate matching MySQL CREATE TABLE statements.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does this tool fully normalize my data?", answer: "No — proper normalization (join tables for arrays, choosing the right key types, indexes, and so on) is out of scope for an automated converter. Nested objects get their own table with a clearly commented foreign-key relationship, and arrays of primitives get a SQL comment flagging that a join table would be needed, so you can finish the design by hand." }, { question: "How are column types chosen?", answer: "Strings map to VARCHAR(255) unless they look like an ISO-8601 timestamp, in which case they map to DATETIME. Whole numbers map to BIGINT, decimals map to DOUBLE, and booleans map to BOOLEAN." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and SQL generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
