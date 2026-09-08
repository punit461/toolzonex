import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/whitespace-cleaner",
    navName: "Whitespace Cleaner",
    navDescription: "Remove extra spaces and empty lines.",
    name: "Whitespace Cleaner",
    description: "Remove extra spaces, tabs, and empty lines from text automatically. Free online text formatting tool.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Whitespace Cleaner - Remove Extra Spaces & Empty Lines",
    seoDescription: "Remove extra spaces, tabs, and empty lines from text automatically. Free online text formatting tool to clean up messy data.",
    keywords: ["whitespace cleaner", "remove extra spaces", "trim text", "remove empty lines", "clean text format", "remove tabs", "get rid of spaces"],
    ogTitle: "Whitespace Cleaner - Remove Extra Spaces & Empty Lines | ToolZoneX",
    ogDescription: "Remove extra spaces, tabs, and empty lines from text automatically. Free online text formatting tool.",
    schemaName: "Whitespace Cleaner",
    schemaDescription: "Remove extra spaces, tabs, and empty lines from text automatically.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How do I get rid of spaces in my text?", answer: "Paste your text in, tick \"Remove multiple spaces between words\" and \"Trim spaces at beginning and end of lines\", then click \"Clean Whitespace\" — that's the fastest way to get rid of spaces, double spaces, and stray tabs in one pass." }, { question: "Does this remove line breaks entirely?", answer: "No — it removes extra blank lines and trailing whitespace while keeping your paragraph structure intact." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
