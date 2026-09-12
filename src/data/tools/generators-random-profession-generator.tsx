import BadgeIcon from '@mui/icons-material/Badge';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-profession-generator",
    navName: "Random Profession Generator",
    navDescription: "Generate random job and profession ideas.",
    name: "Random Profession Generator",
    description: "Generate a random set of professions from a curated list of around 75 jobs spanning Medical, Tech, Creative, Trades, Education, Business, Science, and more.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <BadgeIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Profession Generator - Generate Random Job Ideas",
    seoDescription: "Free random profession generator. Instantly generate random jobs and occupations across Medical, Tech, Creative, Trades, Business, and more categories.",
    keywords: ["random profession generator", "random job generator", "profession picker", "random occupation generator", "job idea generator"],
    ogTitle: "Random Profession Generator - Generate Random Job Ideas | ToolZoneX",
    ogDescription: "Instantly generate random professions across a wide range of categories.",
    schemaName: "Random Profession Generator",
    schemaDescription: "Generate a random set of professions from a curated list of around 75 jobs spanning Medical, Tech, Creative, Trades, Education, Business, Science, and more.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can the same profession appear twice in one set?", answer: "No — each generated set of 5 professions is drawn without repeats from the full list, so every profession shown in a single click is unique." }, { question: "How many professions are in the list?", answer: "Around 75, spread across Medical, Tech, Creative, Trades, Education, Business, Science, and a general Other category." }, { question: "Is there a way to generate just one profession?", answer: "The tool always shows 5 at a time to give you options to choose from, but you can simply focus on the first result if you only need one." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
