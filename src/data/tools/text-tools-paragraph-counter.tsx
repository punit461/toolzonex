import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/paragraph-counter",
    navName: "Paragraph Counter",
    navDescription: "Count paragraphs, words & sentences.",
    name: "Paragraph Counter",
    description: "Count paragraphs, words, sentences, and characters in your text in real time, splitting paragraphs on blank lines.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <FormatLineSpacingIcon fontSize="large" color="primary"/>,
    seoTitle: "Paragraph Counter - Free Online Paragraph Count Tool",
    seoDescription: "Free paragraph counter. Paste your text to instantly count paragraphs, words, sentences, and characters, updating live as you type.",
    keywords: ["paragraph counter", "count paragraphs", "paragraph count tool", "how many paragraphs", "paragraph calculator"],
    ogTitle: "Paragraph Counter - Free Online Paragraph Count Tool | ToolZoneX",
    ogDescription: "Count paragraphs, words, sentences, and characters in your text.",
    schemaName: "Paragraph Counter",
    schemaDescription: "Count paragraphs, words, sentences, and characters in your text in real time, splitting paragraphs on blank lines.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How does the counter decide where a paragraph ends?", answer: "It looks for a blank line — that is, two or more consecutive line breaks — between blocks of text. Text separated by only a single line break within a block isn't treated as a new paragraph, since that's commonly just a line wrap rather than a true paragraph break." }, { question: "Why does my paragraph count look wrong?", answer: "If your text was copied from a source that doesn't preserve blank lines between paragraphs (like some PDFs or web pages), paragraph breaks may be lost in the paste, causing everything to count as one paragraph. Try adding a blank line manually between paragraphs if this happens." }, { question: "Is my text sent anywhere?", answer: "No — all counting happens directly in your browser. Your text is never uploaded or sent to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
