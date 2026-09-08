import CallSplitIcon from '@mui/icons-material/CallSplit';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/sentence-splitter",
    navName: "Sentence Splitter",
    navDescription: "Split a paragraph into a numbered list of sentences.",
    name: "Sentence Splitter",
    description: "Split a paragraph of text into a numbered list of individual sentences using sentence-ending punctuation.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <CallSplitIcon fontSize="large" color="primary"/>,
    seoTitle: "Sentence Splitter - Extract Sentences from Text",
    seoDescription: "Split a paragraph of text into a numbered list of individual sentences. Free online sentence splitter with a copy-all button.",
    keywords: ["sentence splitter", "split text into sentences", "extract sentences from text", "sentence extractor", "split paragraph into sentences"],
    ogTitle: "Sentence Splitter - Extract Sentences from Text | ToolZoneX",
    ogDescription: "Split a paragraph of text into a numbered list of individual sentences.",
    schemaName: "Sentence Splitter",
    schemaDescription: "Split a paragraph of text into a numbered list of individual sentences using sentence-ending punctuation.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Sentence Counter?", answer: "The Sentence Counter only reports how many sentences, words, and characters are in your text — it doesn't show you the individual sentences themselves. This Sentence Splitter's entire purpose is the opposite: producing the actual list of extracted sentences, one per line, ready to copy or review." }, { question: "Does it handle abbreviations like \"Dr.\" or \"e.g.\" correctly?", answer: "Not perfectly — this tool uses a simple punctuation rule without any special handling for abbreviations, so a period inside an abbreviation may cause an early split. This keeps the logic fast and predictable for typical writing without heavy abbreviation use." }, { question: "Can I copy just one sentence instead of all of them?", answer: "The Copy All button copies every extracted sentence at once, one per line; to copy just one, simply select and copy that sentence's text directly from the list." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
