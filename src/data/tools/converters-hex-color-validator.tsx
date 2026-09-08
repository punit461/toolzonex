import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/hex-color-validator",
    navName: "Hex Color Validator",
    navDescription: "Check whether a hex color value is valid.",
    name: "Hex Color Validator",
    description: "Validate whether a string is syntactically correct hex color notation (3, 4, 6, or 8 digits), with a specific explanation of what's wrong if invalid.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <CheckCircleIcon fontSize="large" color="primary"/>,
    seoTitle: "Hex Color Validator - Check If a Hex Color Is Valid",
    seoDescription: "Free online hex color validator. Check whether a hex color string is syntactically valid, with a clear explanation if it isn't.",
    keywords: ["hex color validator", "validate hex color", "is this a valid hex code", "hex code checker", "hex color syntax check"],
    ogTitle: "Hex Color Validator - Check If a Hex Color Is Valid | ToolZoneX",
    ogDescription: "Check whether a hex color string is syntactically valid.",
    schemaName: "Hex Color Validator",
    schemaDescription: "Validate whether a string is syntactically correct hex color notation (3, 4, 6, or 8 digits), with a specific explanation of what's wrong if invalid.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What hex digit counts are considered valid?", answer: "3 digits (shorthand RGB), 4 digits (shorthand RGB with alpha), 6 digits (full RGB), or 8 digits (full RGB with alpha) — any other count is flagged as invalid." }, { question: "Is the leading \"#\" required?", answer: "No — the tool accepts hex values both with and without a leading \"#\" symbol, since both forms are commonly used depending on context." }, { question: "What characters are valid in a hex color?", answer: "Only the digits 0-9 and the letters A-F (case-insensitive) — any other character, including spaces or symbols, makes the value invalid." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
