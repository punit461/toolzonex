import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-fruit-generator",
    navName: "Random Fruit Generator",
    navDescription: "A random fruit with emoji and fun fact.",
    name: "Random Fruit Generator - Discover a Random Fruit",
    description: "Generate a random fruit name, complete with an emoji and a short fun fact about it.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <LocalFloristIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Fruit Generator - Discover a Random Fruit",
    seoDescription: "Free random fruit generator. Click to discover a random fruit, complete with an emoji and a fun fact about it.",
    keywords: ["random fruit generator", "random fruit picker", "fruit name generator", "fruit generator tool", "fun fruit facts"],
    ogTitle: "Random Fruit Generator - Discover a Random Fruit | ToolZoneX",
    ogDescription: "Generate a random fruit name, complete with an emoji and a fun fact about it.",
    schemaName: "Random Fruit Generator",
    schemaDescription: "Generate a random fruit name, complete with an emoji and a short fun fact about it.",
    applicationCategory: "EntertainmentApplication",
    currency: undefined,
    faqs: [{ question: "How many fruits can this generate?", answer: "The tool draws from a curated list of around 40 common and lesser-known fruits from around the world." }, { question: "Are the fun facts accurate?", answer: "They're based on generally accepted facts about each fruit, presented as lighthearted trivia rather than a scientific reference." }, { question: "Can I get the same fruit twice in a row?", answer: "Yes — each click picks independently from the full list, so repeats are possible." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
