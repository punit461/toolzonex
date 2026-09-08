import SortIcon from '@mui/icons-material/Sort';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/shortest-word-finder",
    navName: "Shortest Word Finder",
    navDescription: "Find the shortest word(s) in your text.",
    name: "Shortest Word Finder - Find the Shortest Word in Text",
    description: "Find the shortest word in a block of text, including ties, plus its character count and a ranked list of the shortest 10 words.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <SortIcon fontSize="large" color="primary"/>,
    seoTitle: "Shortest Word Finder - Find the Shortest Word in Text",
    seoDescription: "Free online shortest word finder. Paste text to find the shortest word (including ties), its character count, and the shortest 10 words.",
    keywords: ["shortest word finder", "find shortest word in text", "shortest word counter", "word length checker", "shortest words list"],
    ogTitle: "Shortest Word Finder - Find the Shortest Word in Text | ToolZoneX",
    ogDescription: "Find the shortest word in a block of text, including ties, plus its character count.",
    schemaName: "Shortest Word Finder",
    schemaDescription: "Find the shortest word in a block of text, including ties, plus its character count and a ranked list of the shortest 10 words.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How are words separated for counting?", answer: "Text is split on anything that isn't a letter, number, apostrophe, or hyphen, so hyphenated words like \"well-known\" and contractions like \"don't\" are counted as single words rather than being split apart." }, { question: "What happens if multiple words are tied for shortest?", answer: "All words tied for the minimum length are shown together, rather than the tool arbitrarily picking just one — so you see every word that shares the shortest spot." }, { question: "Are duplicate words counted separately in the shortest 10 list?", answer: "No — the list shows unique words only, so a repeated short word appears once rather than taking up multiple slots in the ranking." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
