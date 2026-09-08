import ShuffleIcon from '@mui/icons-material/Shuffle';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/shuffle-text",
    navName: "Shuffle Text",
    navDescription: "Randomly shuffle characters, words, or lines.",
    name: "Shuffle Text",
    description: "Randomly shuffle text by character, word, or line using a proper Fisher-Yates shuffle.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <ShuffleIcon fontSize="large" color="primary"/>,
    seoTitle: "Shuffle Text - Randomize Characters, Words, or Lines",
    seoDescription: "Randomly shuffle text by character, word, or line using a proper Fisher-Yates shuffle. Free online text shuffler.",
    keywords: ["shuffle text", "randomize text online", "word shuffler", "line shuffler", "fisher-yates shuffle text"],
    ogTitle: "Shuffle Text - Randomize Characters, Words, or Lines | ToolZoneX",
    ogDescription: "Randomly shuffle text by character, word, or line using a proper Fisher-Yates shuffle.",
    schemaName: "Shuffle Text",
    schemaDescription: "Randomly shuffle text by character, word, or line using a proper Fisher-Yates shuffle.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Why does the tool use a Fisher-Yates shuffle instead of sorting with Math.random?", answer: "Sorting an array with a random comparator is a common shortcut, but it produces a statistically biased result where some orderings are far more likely than others. Fisher-Yates guarantees every possible ordering is equally likely, giving a genuinely fair shuffle." }, { question: "Is this random number generator secure enough for anything sensitive?", answer: "It uses JavaScript's standard Math.random(), which is fine for shuffling text, games, or raffles, but it isn't cryptographically secure — don't rely on it for anything security-sensitive like generating passwords or keys." }, { question: "What happens to spacing when shuffling words?", answer: "Words are extracted, shuffled, and rejoined with single spaces, so original multiple-space or line-break formatting between words isn't preserved in word mode — use line mode if you need to keep each line's internal formatting intact." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
