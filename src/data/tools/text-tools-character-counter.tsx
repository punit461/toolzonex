import NumbersIcon from '@mui/icons-material/Numbers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/character-counter",
    navName: "Character Counter",
    navDescription: "Live character count, with & without spaces.",
    name: "Character Counter",
    description: "Count characters in your text live, with and without spaces, plus word, sentence, and paragraph counts.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <NumbersIcon fontSize="large" color="primary"/>,
    seoTitle: "Character Counter - Count Characters Online Free",
    seoDescription: "Free online character counter. Instantly count characters with and without spaces, plus words, sentences, and paragraphs, as you type.",
    keywords: ["character counter", "character count", "count characters online", "character count tool", "how many characters", "character counter with spaces"],
    ogTitle: "Character Counter - Count Characters Online Free | ToolZoneX",
    ogDescription: "Instantly count characters with and without spaces, plus words, sentences, and paragraphs.",
    schemaName: "Character Counter",
    schemaDescription: "Count characters with and without spaces, plus words, sentences, and paragraphs, live as you type.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does the character count include spaces?", answer: "This tool shows both — the character count with spaces included, and a separate count with all spaces removed — since different platforms and forms count characters differently." }, { question: "Does it count characters as I type?", answer: "Yes — the character, word, sentence, and paragraph counts update live as you type or paste text, with no need to click a button." }, { question: "How is this different from a word counter?", answer: "This tool is focused specifically on character counting — with-spaces and without-spaces totals shown front and center — while still including word, sentence, and paragraph counts for convenience." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
