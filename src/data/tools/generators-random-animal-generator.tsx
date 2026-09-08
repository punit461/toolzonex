import PetsIcon from '@mui/icons-material/Pets';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-animal-generator",
    navName: "Random Animal Generator",
    navDescription: "Generate a random animal with a fun fact.",
    name: "Random Animal Generator - With Fun Facts",
    description: "Generate a random animal from a curated list, complete with an emoji and a fun fact about it.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <PetsIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Animal Generator - With Fun Facts",
    seoDescription: "Generate a random animal from a curated list, complete with an emoji and a fun fact. Free and instant, great for games and creative projects.",
    keywords: ["random animal generator", "random animal picker", "generate random animal", "animal name generator"],
    ogTitle: "Random Animal Generator - With Fun Facts | ToolZoneX",
    ogDescription: "Generate a random animal from a curated list, complete with an emoji and a fun fact.",
    schemaName: "Random Animal Generator",
    schemaDescription: "Generate a random animal from a curated list, complete with an emoji and a fun fact about it.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Are the facts accurate?", answer: "Yes — each fact is a commonly cited, general piece of trivia about that animal, though it's worth double-checking details for anything used in formal research." }, { question: "Can the same animal appear twice in a row?", answer: "Yes — each click is an independent random pick, so repeats are possible." }, { question: "How many animals are included?", answer: "The generator draws from a curated list of two dozen well-known animals, chosen to be recognizable and fun rather than an exhaustive database of every species." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
