import PublicIcon from '@mui/icons-material/Public';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-country-generator",
    navName: "Random Country Generator",
    navDescription: "Generate a random world country.",
    name: "Random Country Generator - Flag & Continent",
    description: "Generate a random country from around the world, complete with its flag emoji and continent.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <PublicIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Country Generator - Flag & Continent Included",
    seoDescription: "Generate a random country from around the world, complete with its flag emoji and continent. Free and instant, great for quizzes and games.",
    keywords: ["random country generator", "random country picker", "generate random country", "country name generator"],
    ogTitle: "Random Country Generator - Flag & Continent Included | ToolZoneX",
    ogDescription: "Generate a random country from around the world, complete with its flag emoji and continent.",
    schemaName: "Random Country Generator",
    schemaDescription: "Generate a random country from around the world, complete with its flag emoji and continent.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How many countries are included?", answer: "The generator draws from a curated list of well-known countries spanning all six populated continents, rather than the full list of every country and territory in the world." }, { question: "Can the same country come up twice in a row?", answer: "Yes — each generation is an independent random pick, so repeats are possible." }, { question: "Does it show the continent?", answer: "Yes — every result includes the country's flag emoji and its continent alongside the name." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
