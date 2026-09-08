import CodeIcon from '@mui/icons-material/Code';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/javascript-to-json",
    navName: "JavaScript to JSON",
    navDescription: "Convert a permissive JS object literal into strict JSON.",
    name: "JavaScript to JSON Converter",
    description: "Paste a permissive JavaScript object literal — with unquoted keys, single quotes, trailing commas, or comments — to instantly convert it into strict, valid JSON. Free online developer tool.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CodeIcon fontSize="large" color="primary"/>,
    seoTitle: "JavaScript to JSON Converter - Convert JS Object Literals to Strict JSON",
    seoDescription: "Free online JavaScript to JSON converter. Paste a permissive JS object literal with unquoted keys, single quotes, comments, or trailing commas to instantly generate strict, valid JSON.",
    keywords: ["javascript to json", "js object to json", "convert js object to json", "json5 to json", "fix invalid json"],
    ogTitle: "JavaScript to JSON Converter - Convert JS Object Literals to Strict JSON | ToolZoneX",
    ogDescription: "Paste a permissive JS object literal to instantly generate strict JSON.",
    schemaName: "JavaScript to JSON Converter",
    schemaDescription: "Paste a permissive JavaScript object literal to instantly convert it into strict, valid JSON.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What exactly counts as valid input?", answer: "Anything valid under the JSON5 specification — unquoted or single-quoted keys, single-quoted strings, trailing commas in objects and arrays, single-line and block comments, and a few extra numeric literals like leading + and hexadecimal numbers." }, { question: "What happens with functions or undefined values?", answer: "JSON5 (and JSON itself) doesn't support function values, undefined, or other non-serializable JavaScript values — if your input contains any of these, parsing will fail with an error rather than silently dropping them." }, { question: "Is my data uploaded anywhere?", answer: "No — parsing and conversion happen entirely client-side in your browser using the JSON5 library. Nothing you paste is sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
