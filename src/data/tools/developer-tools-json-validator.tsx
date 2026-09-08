import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/json-validator",
    navName: "JSON Validator",
    navDescription: "Check JSON syntax and see errors.",
    name: "JSON Validator - Check JSON Syntax Online",
    description: "Paste JSON to instantly check whether it's syntactically valid, with the exact parser error message shown when it isn't.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CheckCircleIcon fontSize="large" color="primary"/>,
    seoTitle: "JSON Validator - Check JSON Syntax Online Free",
    seoDescription: "Free online JSON validator. Paste JSON to check if it's valid, with a clear valid/invalid badge and the exact syntax error message when it isn't.",
    keywords: ["json validator", "validate json", "json syntax checker", "check json online", "is my json valid", "json error checker"],
    ogTitle: "JSON Validator - Check JSON Syntax Online Free | ToolZoneX",
    ogDescription: "Paste JSON to instantly check whether it's syntactically valid, with the exact error message shown when it isn't.",
    schemaName: "JSON Validator",
    schemaDescription: "Check whether JSON is syntactically valid and see the exact parser error message when it isn't.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Does it tell me the exact line or column of the error?", answer: "The tool displays the exact error message your browser's JSON parser produces, as-is. Modern browsers often include a position (and sometimes a line/column) directly in that message — but this isn't guaranteed for every syntax error, since JavaScript's built-in JSON parser doesn't formally expose structured line/column data." }, { question: "What counts as \"invalid\" JSON?", answer: "Anything that fails strict JSON syntax — trailing commas, single quotes instead of double quotes, unquoted keys, comments, or missing brackets/braces are all common causes, since JSON is stricter than JavaScript object literal syntax." }, { question: "Is my data uploaded anywhere?", answer: "No — validation runs entirely in your browser using the built-in JSON parser. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
