import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-emoji-generator",
    navName: "Random Emoji Generator",
    navDescription: "Generate random emoji by category.",
    name: "Random Emoji Generator - By Category",
    description: "Generate one or more random emoji with an optional category filter for faces, animals, food, or objects.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <EmojiEmotionsIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Emoji Generator - By Category",
    seoDescription: "Generate one or more random emoji with an optional category filter for faces, animals, food, or objects. Free and instant.",
    keywords: ["random emoji generator", "random emoji picker", "generate random emoji", "emoji generator by category"],
    ogTitle: "Random Emoji Generator - By Category | ToolZoneX",
    ogDescription: "Generate one or more random emoji with an optional category filter.",
    schemaName: "Random Emoji Generator",
    schemaDescription: "Generate one or more random emoji with an optional category filter for faces, animals, food, or objects.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I generate emoji from more than one category at once?", answer: "Yes — select \"All\" to draw randomly from every category's emoji combined." }, { question: "Can the same emoji repeat in one batch?", answer: "Yes — each position in the batch is chosen independently at random, so the same emoji can appear more than once." }, { question: "How do I copy the emoji?", answer: "Simply select the emoji text on the page and copy it like any other text, or tap and hold on mobile to bring up the copy option." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
