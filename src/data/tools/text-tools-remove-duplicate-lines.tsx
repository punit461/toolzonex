import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/remove-duplicate-lines",
    navName: "Remove Duplicate Lines",
    navDescription: "Keep only the first occurrence of each line.",
    name: "Remove Duplicate Lines",
    description: "Remove duplicate lines from text, keeping only the first occurrence of each unique line, with a case-sensitivity toggle.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Remove Duplicate Lines from Text Online",
    seoDescription: "Remove duplicate lines from text, keeping only the first occurrence of each unique line, with a case-sensitivity toggle. Free and instant.",
    keywords: ["remove duplicate lines", "deduplicate text online", "remove duplicate rows from list", "unique lines tool"],
    ogTitle: "Remove Duplicate Lines from Text Online | ToolZoneX",
    ogDescription: "Remove duplicate lines from text, keeping only the first occurrence of each.",
    schemaName: "Remove Duplicate Lines",
    schemaDescription: "Remove duplicate lines from text, keeping only the first occurrence of each unique line, with a case-sensitivity toggle.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Which occurrence of a duplicate is kept?", answer: "The first occurrence of each unique line is kept; every later repeat of that exact line is removed." }, { question: "Is matching case-sensitive?", answer: "By default, yes — \"Apple\" and \"apple\" are treated as different lines. Untick the case-sensitive option to treat them as duplicates of each other." }, { question: "Does it trim whitespace before comparing lines?", answer: "No — lines are compared exactly as typed, so a line with trailing spaces is treated as different from the same line without them. Run the Text Cleaner tool first if you need to normalize whitespace before deduplicating." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
