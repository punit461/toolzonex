import FindReplaceIcon from '@mui/icons-material/FindReplace';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/text-deduplicator",
    navName: "Text Deduplicator",
    navDescription: "Remove duplicate words from running text.",
    name: "Text Deduplicator",
    description: "Remove consecutive or all duplicate words from running text, keeping either only non-repeated words or the first occurrence of each word.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FindReplaceIcon fontSize="large" color="primary"/>,
    seoTitle: "Text Deduplicator - Remove Duplicate Words from Text",
    seoDescription: "Free online text deduplicator. Remove consecutive duplicate words, or all repeated words anywhere in your text, in one click.",
    keywords: ["text deduplicator", "remove duplicate words", "word deduplication tool", "remove repeated words", "duplicate word remover"],
    ogTitle: "Text Deduplicator - Remove Duplicate Words from Text | ToolZoneX",
    ogDescription: "Remove consecutive or all duplicate words from running text.",
    schemaName: "Text Deduplicator",
    schemaDescription: "Remove consecutive or all duplicate words from running text, keeping either only non-repeated words or the first occurrence of each word.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Remove Duplicate Lines tool?", answer: "Remove Duplicate Lines operates on whole LINES of text — it removes an entire line if it exactly repeats an earlier line. This Text Deduplicator instead operates on individual WORDS within running sentences and paragraphs, which is a completely different level of granularity." }, { question: "Is word matching case-sensitive?", answer: "No — matching is case-insensitive, so \"The\" and \"the\" are treated as the same word for deduplication purposes, though the first occurrence's original casing is preserved in the output." }, { question: "Does punctuation attached to a word affect matching in All Duplicates mode?", answer: "Punctuation is ignored when comparing words, so \"dog\" and \"dog,\" are treated as the same word, but the original punctuation is kept on whichever occurrence is retained." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
