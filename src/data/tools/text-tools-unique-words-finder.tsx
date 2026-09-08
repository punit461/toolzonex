import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/unique-words-finder",
    navName: "Unique Words Finder",
    navDescription: "Words that occur exactly once.",
    name: "Unique Words Finder",
    description: "Find the words in a text that occur exactly once, shown separately from words that repeat, alongside a total distinct-word count.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FormatListNumberedIcon fontSize="large" color="primary"/>,
    seoTitle: "Unique Words Finder - Find Words Used Exactly Once",
    seoDescription: "Free unique words finder. Paste text to find every word that occurs exactly once, separated from repeated words, with a distinct-word count.",
    keywords: ["unique words finder", "find words used once", "word variety checker", "unique word counter", "distinct words in text"],
    ogTitle: "Unique Words Finder - Find Words Used Exactly Once | ToolZoneX",
    ogDescription: "Find the words in your text that occur exactly once.",
    schemaName: "Unique Words Finder",
    schemaDescription: "Find the words in a text that occur exactly once, shown separately from words that repeat, alongside a total distinct-word count.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Word Frequency Counter?", answer: "The Word Frequency Counter shows a full table of every distinct word sorted by how often it occurs, including words that repeat many times. This Unique Words Finder has a narrower purpose — it surfaces only the words that occur exactly once, which the frequency table doesn't call out on its own." }, { question: "Is word matching case-sensitive?", answer: "No — matching is case-insensitive, so \"The\" and \"the\" are treated as the same word when counting occurrences." }, { question: "Does punctuation affect the word count?", answer: "Words are matched using letters, numbers, and apostrophes, so surrounding punctuation like periods and commas doesn't affect matching, though it does mean a word directly followed by punctuation with no space is still correctly separated." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
