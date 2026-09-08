import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/emoji-category-browser",
    navName: "Emoji Category Browser",
    navDescription: "Browse emoji organized by standard category.",
    name: "Emoji Category Browser",
    description: "Browse a curated selection of emoji organized into the standard Unicode emoji categories, with a click-to-copy button on each one.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <EmojiEmotionsIcon fontSize="large" color="primary"/>,
    seoTitle: "Emoji Category Browser - Browse Emoji by Category",
    seoDescription: "Free online emoji category browser. Browse Smileys, Animals, Food, Travel, Symbols, Flags, and more emoji categories with click-to-copy.",
    keywords: ["emoji category browser", "browse emoji by category", "emoji picker categories", "emoji list by category", "click to copy emoji"],
    ogTitle: "Emoji Category Browser - Browse Emoji by Category | ToolZoneX",
    ogDescription: "Browse emoji organized into standard Unicode categories, with click-to-copy.",
    schemaName: "Emoji Category Browser",
    schemaDescription: "Browse a curated selection of emoji organized into the standard Unicode emoji categories, with a click-to-copy button on each one.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Unicode Character Finder?", answer: "Unicode Character Finder is a keyword-based search — you type a word like \"heart\" and it searches across a curated list by name. This Emoji Category Browser is organized for BROWSING instead: you pick a standard Unicode category tab and scroll through what's in it, without needing to know a search term at all." }, { question: "Does this include every emoji in each category?", answer: "No — each category shows a genuinely useful selection of 15-25 popular emoji rather than the complete Unicode emoji set, which numbers in the thousands." }, { question: "Does clicking an emoji copy it automatically?", answer: "Yes — clicking any emoji copies it directly to your clipboard and shows a brief confirmation." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
