import TagIcon from '@mui/icons-material/Tag';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/keyword-extractor",
    navName: "Keyword Extractor",
    navDescription: "Rank frequent words after removing stopwords.",
    name: "Keyword Extractor",
    description: "Extract the most significant keywords from text by removing a built-in list of common English stopwords and ranking what remains by frequency.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TagIcon fontSize="large" color="primary"/>,
    seoTitle: "Keyword Extractor - Extract Top Keywords from Text",
    seoDescription: "Extract the most significant keywords from any text by removing common stopwords and ranking what remains by frequency. Free and instant.",
    keywords: ["keyword extractor", "extract keywords from text", "keyword extraction tool", "find keywords online"],
    ogTitle: "Keyword Extractor - Extract Top Keywords from Text | ToolZoneX",
    ogDescription: "Extract the most significant keywords from text by removing common stopwords.",
    schemaName: "Keyword Extractor",
    schemaDescription: "Extract the most significant keywords from text by removing a built-in list of common English stopwords and ranking what remains by frequency.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What stopwords are filtered out?", answer: "A built-in list of over 100 common English words — articles, pronouns, prepositions, conjunctions, and auxiliary verbs like \"the\", \"is\", \"and\", \"you\", and \"would\" — is excluded before ranking the remaining words by frequency." }, { question: "How is this different from the Keyword Density Analyzer?", answer: "The Keyword Density Analyzer reports each word's percentage share of the total text, aimed at SEO over-optimization checks. This tool focuses purely on ranking the most frequent non-stopword terms as a simple keyword list, which is more suited to tagging or quick topic identification." }, { question: "Does it understand synonyms or context?", answer: "No — this is a straightforward frequency-count approach after stopword removal. It doesn't merge synonyms, understand grammar, or weigh a word's importance by anything other than how often it appears." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
