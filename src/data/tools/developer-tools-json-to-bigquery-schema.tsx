import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-to-bigquery-schema",
    navName: "JSON to BigQuery Schema",
    navDescription: "Generate a BigQuery table schema from JSON.",
    name: "JSON to BigQuery Schema Converter",
    description: "Paste a JSON sample to instantly generate a matching Google BigQuery table schema, with nested RECORD fields and REPEATED/NULLABLE/REQUIRED modes inferred automatically. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON to BigQuery Schema Converter - Generate Table Schemas Online",
    seoDescription: "Free online JSON to BigQuery schema converter. Paste any JSON sample to instantly generate a matching BigQuery table schema with nested RECORD fields and modes.",
    keywords: ["json to bigquery schema", "json to bigquery", "generate bigquery schema from json", "bigquery table schema generator", "json2bigquery alternative"],
    ogTitle: "JSON to BigQuery Schema Converter - Generate Table Schemas Online | ToolZoneX",
    ogDescription: "Paste JSON to instantly generate a matching BigQuery table schema.",
    schemaName: "JSON to BigQuery Schema Converter",
    schemaDescription: "Paste a JSON sample to instantly generate a matching Google BigQuery table schema.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is the REPEATED mode chosen?", answer: "Any field backed by a JSON array is given BigQuery's REPEATED mode, since BigQuery's field mode is mutually exclusive — a repeated field can't also be marked NULLABLE or REQUIRED. Object and scalar fields get NULLABLE if they were ever missing or null, and REQUIRED otherwise." }, { question: "How are nested objects represented?", answer: "A nested object becomes a field with \"type\": \"RECORD\" and a nested \"fields\" array describing its own properties, matching BigQuery's native representation of struct-like columns." }, { question: "Is my JSON uploaded anywhere?", answer: "No — parsing and schema generation happen entirely client-side in your browser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
