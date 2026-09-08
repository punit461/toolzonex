import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/word-counter",
    navName: "Word Counter",
    navDescription: "Count words, characters, and reading time.",
    name: "Word Count Calculator",
    description: "Count words, characters, sentences, and paragraphs in real time. Free online word counter for writers and students.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Word Count Calculator - Free Word Counter Online",
    seoDescription: "Use this free online word count tool to count words, characters, sentences, and paragraphs in real time. Just paste your text and see the count instantly.",
    keywords: ["word counter", "word count calculator", "online word count calculator", "words counter online", "word count typer", "words count calculator", "online word count tool", "online word count", "count the word", "how many words is this", "words calculation", "word count text", "word count", "words and characters count", "letter word counter", "words to characters", "character counter", "count words", "count characters", "letter count", "text stats", "word calculator", "words calculator", "calculate words"],
    ogTitle: "Word Count Calculator - Free Word Counter Online | ToolZoneX",
    ogDescription: "Count words, characters, sentences, and paragraphs in real time with a free word count calculator.",
    schemaName: "Word Counter",
    schemaDescription: "Count words, characters, sentences, and paragraphs in real-time. Free online word count tool.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does it count words as I type?", answer: "Yes — the word, character, sentence, and paragraph counts update live as you type or paste text." }, { question: "Is this the same as a word calculator?", answer: "Yes — \"word calculator\" and \"word counter\" describe the same thing here. This tool calculates the exact word, character, sentence, and paragraph totals for whatever text you paste in." }, { question: "How do I calculate the number of words in a document?", answer: "Paste the full text into the box above — there's no length limit, and the word count updates instantly without needing to open Word or Google Docs." }, { question: "How many words is this text?", answer: "Paste it into the box above — the word count (along with character, sentence, and paragraph counts) appears immediately, updating live as you edit." }, { question: "How do I convert words to characters?", answer: "There's no fixed ratio since word length varies, but English averages roughly 5-6 characters per word including the space after it — so 300 words is typically around 1,500-1,800 characters. For an exact count of your own text, paste it above and read the word and character counts side by side." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
