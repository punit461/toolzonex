import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/duplicates-remover",
    navName: "Duplicates Remover",
    navDescription: "Remove duplicate lines from text.",
    name: "Duplicates Remover",
    description: "Remove duplicate lines from text lists instantly. Clean up email lists, keywords, and data entries online for free.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Duplicates Remover - Remove Duplicate Lines Online",
    seoDescription: "Remove duplicate lines from text lists instantly. Clean up email lists, keywords, and data entries online for free.",
    keywords: ["remove duplicates", "duplicate line remover", "clean list", "remove repeated lines", "unique lines extractor", "duplicate remove online", "delete duplicates online", "remove duplicates from list online", "online remove duplicates from list", "remove duplicate numbers", "duplicates remove"],
    ogTitle: "Duplicates Remover - Remove Duplicate Lines Online | ToolZoneX",
    ogDescription: "Remove duplicate lines from text lists instantly. Clean up email lists, keywords, and data entries online for free.",
    schemaName: "Duplicates Remover",
    schemaDescription: "Remove duplicate lines from text lists instantly.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How do I remove duplicates from a list online?", answer: "Paste your list into the input box (one item per line) and click \"Remove Duplicate Lines\". This tool works entirely in your browser, so there's nothing to install and nothing is uploaded — it's a fast way to remove duplicates from a list online for free." }, { question: "How do I delete duplicates online for free?", answer: "This page is free to use with no sign-up: paste your text, click the button, and copy the cleaned result. It works for any plain-text list — names, emails, keywords, or codes." }, { question: "Can I remove duplicate numbers with this tool?", answer: "Yes — put one number per line and the tool removes duplicate numbers the same way it removes duplicate words or lines, keeping only the first occurrence of each." }, { question: "Is this case-sensitive?", answer: "By default duplicates are matched exactly as typed — \"Apple\" and \"apple\" are treated as different lines unless case-insensitive matching is selected." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
