import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/palindrome-checker",
    navName: "Palindrome Checker",
    navDescription: "Check if text is a palindrome.",
    name: "Palindrome Checker",
    description: "Check if a word or phrase is a palindrome. Free online text analysis tool.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Palindrome Checker - Check Text Online for Free",
    seoDescription: "Check if a word or phrase is a palindrome. Free online text analysis tool to test if text reads the same forward and backward.",
    keywords: ["palindrome checker", "is it a palindrome", "palindrome word", "palindrome phrase", "reverse text checker"],
    ogTitle: "Palindrome Checker - Check Text Online for Free | ToolZoneX",
    ogDescription: "Check if a word or phrase is a palindrome. Free online text analysis tool.",
    schemaName: "Palindrome Checker",
    schemaDescription: "Check if a word or phrase is a palindrome.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
