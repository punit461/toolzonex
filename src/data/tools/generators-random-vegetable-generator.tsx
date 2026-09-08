import GrassIcon from '@mui/icons-material/Grass';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-vegetable-generator",
    navName: "Random Vegetable Generator",
    navDescription: "Generate random vegetables with fun facts.",
    name: "Random Vegetable Generator",
    description: "Generate a random set of vegetables from a list of around 48, each shown with a short fun fact or usage tip.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <GrassIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Vegetable Generator - Generate Random Vegetables",
    seoDescription: "Free random vegetable generator. Instantly generate random vegetables with fun facts and cooking tips for recipes and meal inspiration.",
    keywords: ["random vegetable generator", "vegetable picker", "random vegetable idea", "vegetable name generator", "what vegetable should I cook"],
    ogTitle: "Random Vegetable Generator - Generate Random Vegetables | ToolZoneX",
    ogDescription: "Instantly generate random vegetables with fun facts and usage tips.",
    schemaName: "Random Vegetable Generator",
    schemaDescription: "Generate a random set of vegetables from a list of around 48, each shown with a short fun fact or usage tip.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can the same vegetable show up twice in one set?", answer: "No — each set of 4 vegetables is chosen without repeats, so every result in a single generation is different." }, { question: "Are the facts scientifically verified?", answer: "They're short, generally accurate cooking or trivia tips meant to be fun and useful rather than a botanical reference." }, { question: "Does the list include fruits that are technically vegetables in cooking, like tomatoes?", answer: "Yes — a few entries like tomato and corn are botanically fruits or grains but are included because they're universally treated as vegetables in the kitchen." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
