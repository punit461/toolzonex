import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/sentence-counter",
    navName: "Sentence Counter",
    navDescription: "Count sentences, words, and characters.",
    name: "Sentence Counter",
    description: "Count sentences, words, and characters in text in real time by splitting on sentence-ending punctuation.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FormatListNumberedIcon fontSize="large" color="primary"/>,
    seoTitle: "Sentence Counter - Count Sentences, Words & Characters",
    seoDescription: "Count sentences, words, and characters in text in real time. Free online sentence counter that updates live as you type.",
    keywords: ["sentence counter", "count sentences online", "sentence count tool", "how many sentences"],
    ogTitle: "Sentence Counter - Count Sentences, Words & Characters | ToolZoneX",
    ogDescription: "Count sentences, words, and characters in text in real time.",
    schemaName: "Sentence Counter",
    schemaDescription: "Count sentences, words, and characters in text in real time by splitting on sentence-ending punctuation.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does it handle abbreviations correctly?", answer: "Not perfectly — this is a known limitation of splitting on punctuation. Abbreviations like \"Dr.\", \"e.g.\", or \"U.S.\" contain a period but aren't sentence endings, so text with many abbreviations may show a slightly higher sentence count than a human reader would count. For most everyday writing without heavy abbreviation use, the count is accurate." }, { question: "Does it count as I type?", answer: "Yes — sentence, word, and character counts all update live as you type or paste text." }, { question: "What counts as a sentence-ending punctuation mark?", answer: "Periods, exclamation marks, and question marks are treated as sentence endings. Ellipses (\"...\") and repeated punctuation (\"?!\") are treated as a single ending, not multiple sentences." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
