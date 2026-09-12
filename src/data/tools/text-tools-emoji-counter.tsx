import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/emoji-counter",
    navName: "Emoji Counter",
    navDescription: "Count and break down emoji in text.",
    name: "Emoji Counter",
    description: "Count the total number of emoji in text and see a breakdown of each distinct emoji found and how many times it occurs.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <EmojiEmotionsIcon fontSize="large" color="primary"/>,
    seoTitle: "Emoji Counter - Count & Analyze Emoji in Text",
    seoDescription: "Free emoji counter. Paste text to count the total number of emoji and see a breakdown table of each distinct emoji found and its occurrence count.",
    keywords: ["emoji counter", "count emojis in text", "emoji analyzer", "emoji frequency counter", "how many emojis in text"],
    ogTitle: "Emoji Counter - Count & Analyze Emoji in Text | ToolZoneX",
    ogDescription: "Count the total number of emoji in text and see a breakdown of each one found.",
    schemaName: "Emoji Counter",
    schemaDescription: "Count the total number of emoji in text and see a breakdown of each distinct emoji found and how many times it occurs.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from Remove Emojis?", answer: "Remove Emojis strips emoji characters out of your text (or extracts them into a separate string) — it changes your text. This Emoji Counter only counts and analyzes the emoji already present; it never modifies your input." }, { question: "How is this different from the Random Emoji Generator?", answer: "The Random Emoji Generator creates new random emoji for you to use. This tool does the opposite — it analyzes emoji that already exist in text you provide, rather than generating anything new." }, { question: "Does it catch every possible emoji?", answer: "It covers a broad set of standard emoji Unicode ranges, which handles the large majority of emoji in everyday use. A very small number of newer or unusual composite emoji sequences may not be perfectly separated in the breakdown." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
