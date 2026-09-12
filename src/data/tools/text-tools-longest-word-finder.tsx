import SortIcon from '@mui/icons-material/Sort';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/longest-word-finder",
    navName: "Longest Word Finder",
    navDescription: "Find the longest word(s) in your text.",
    name: "Longest Word Finder - Find the Longest Word in Text",
    description: "Find the longest word in a block of text, including ties, plus its character count and a ranked list of the top 10 longest words.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <SortIcon fontSize="large" color="primary"/>,
    seoTitle: "Longest Word Finder - Find the Longest Word in Text",
    seoDescription: "Free online longest word finder. Paste text to find the longest word (including ties), its character count, and the top 10 longest words.",
    keywords: ["longest word finder", "find longest word in text", "longest word counter", "word length checker", "top longest words"],
    ogTitle: "Longest Word Finder - Find the Longest Word in Text | ToolZoneX",
    ogDescription: "Find the longest word in a block of text, including ties, plus its character count.",
    schemaName: "Longest Word Finder",
    schemaDescription: "Find the longest word in a block of text, including ties, plus its character count and a ranked list of the top 10 longest words.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How are words separated for counting?", answer: "Text is split on anything that isn't a letter, number, apostrophe, or hyphen, so hyphenated words like \"well-known\" and contractions like \"don't\" are counted as single words rather than being split apart." }, { question: "What happens if multiple words are tied for longest?", answer: "All words tied for the maximum length are shown together, rather than the tool arbitrarily picking just one — so you see every word that shares the top spot." }, { question: "Are duplicate words counted separately in the top 10 list?", answer: "No — the top 10 list shows unique words only, so a repeated long word appears once rather than taking up multiple slots in the ranking." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
