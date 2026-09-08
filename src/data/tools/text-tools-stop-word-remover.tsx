import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/stop-word-remover",
    navName: "Stop Word Remover",
    navDescription: "Remove common stop words from text.",
    name: "Stop Word Remover",
    description: "Remove around 120 common English stop words (a, an, the, is, of, and, and more) from any text, leaving only the meaningful content words.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <CleaningServicesIcon fontSize="large" color="primary"/>,
    seoTitle: "Stop Word Remover - Remove Common Stop Words from Text",
    seoDescription: "Free online stop word remover. Strip common English stop words from text for keyword extraction and SEO content analysis.",
    keywords: ["stop word remover", "remove stop words", "stop word list", "keyword extraction tool", "SEO content analysis tool"],
    ogTitle: "Stop Word Remover - Remove Common Stop Words from Text | ToolZoneX",
    ogDescription: "Strip common English stop words from text, leaving only the content words.",
    schemaName: "Stop Word Remover",
    schemaDescription: "Remove around 120 common English stop words from any text, leaving only the meaningful content words.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What counts as a \"stop word\" here?", answer: "A curated list of roughly 120 of the most common English function words — articles, pronouns, prepositions, conjunctions, and common auxiliary verbs — that carry little meaning on their own and are typically filtered out before keyword or frequency analysis." }, { question: "Is matching case-sensitive?", answer: "No — matching is case-insensitive, so \"The\", \"THE\", and \"the\" are all removed as stop words regardless of capitalization." }, { question: "Does it remove partial matches inside longer words?", answer: "No — matching is whole-word only, so a stop word like \"is\" won't be removed from inside a longer word like \"island\" or \"this\"." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
