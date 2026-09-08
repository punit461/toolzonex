import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/word-list-generator",
    navName: "Word List Generator",
    navDescription: "Random words for games like Pictionary.",
    name: "Word List Generator - For Games & Writing",
    description: "Generate a list of random words by category — nouns, adjectives, animals, or places — useful for games like Pictionary or Scattergories.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <FormatListNumberedIcon fontSize="large" color="primary"/>,
    seoTitle: "Word List Generator - Random Words for Games",
    seoDescription: "Generate a list of random words by category. Free online tool useful for Pictionary, Scattergories, and creative writing prompts.",
    keywords: ["word list generator", "random word generator", "word generator for pictionary", "scattergories word generator"],
    ogTitle: "Word List Generator - Random Words for Games | ToolZoneX",
    ogDescription: "Generate a list of random words by category — nouns, adjectives, animals, or places.",
    schemaName: "Word List Generator",
    schemaDescription: "Generate a list of random words by category — nouns, adjectives, animals, or places — useful for games like Pictionary or Scattergories.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can the same word appear twice in one list?", answer: "Words are shuffled and picked without repeats whenever possible. If you request more words than exist in a category, some repeats become unavoidable." }, { question: "Can I generate more than one list?", answer: "Yes — click \"Generate Word List\" again for a new, independently shuffled set of words." }, { question: "How many words are in each category?", answer: "Each category includes about two dozen curated words, chosen to be varied and useful for games rather than an exhaustive dictionary list." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
