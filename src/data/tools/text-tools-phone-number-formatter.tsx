import PhoneIcon from '@mui/icons-material/Phone';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/phone-number-formatter",
    navName: "Phone Number Formatter",
    navDescription: "Clean messy numbers into US, intl, or dotted format.",
    name: "Phone Number Formatter - Clean & Format Any Style",
    description: "Strip a messy phone number down to digits, then format it as US standard, international, or dotted style, handling both 10 and 11-digit inputs.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <PhoneIcon fontSize="large" color="primary"/>,
    seoTitle: "Phone Number Formatter - Clean & Format Any Style",
    seoDescription: "Free phone number formatter and cleaner. Strip messy formatting and reformat into US, international, or dotted phone number styles.",
    keywords: ["phone number formatter", "phone number cleaner", "format phone number online", "clean phone number tool", "phone number style converter"],
    ogTitle: "Phone Number Formatter - Clean & Format Any Style | ToolZoneX",
    ogDescription: "Clean a messy phone number and format it into US, international, or dotted style.",
    schemaName: "Phone Number Formatter",
    schemaDescription: "Strip a messy phone number down to digits, then format it as US standard, international, or dotted style, handling both 10 and 11-digit inputs.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Does this tool also clean up messy phone numbers, or just format them?", answer: "Both — it strips all non-digit characters (spaces, dots, dashes, parentheses, letters) down to the raw digits first as a cleaning step, then applies your chosen formatting style, so there's no need for a separate cleaning tool." }, { question: "What happens with an 11-digit number?", answer: "If the number is 11 digits and starts with a leading 1 (the US/Canada country code), that leading 1 is automatically dropped before formatting the remaining 10 digits, and re-added for the International style." }, { question: "What if my number doesn't have exactly 10 or 11 digits?", answer: "The tool shows a warning telling you how many digits it found, since a number with the wrong digit count can't be reliably split into area code, prefix, and line number." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
