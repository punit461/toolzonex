import LanguageIcon from '@mui/icons-material/Language';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-language-generator",
    navName: "Random Language Generator",
    navDescription: "A random world language with region and speakers.",
    name: "Random Language Generator - Discover World Languages",
    description: "Generate a random world language, along with the region it's spoken in and its approximate number of speakers as a fun fact.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <LanguageIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Language Generator - Discover World Languages",
    seoDescription: "Free random language generator. Click to discover a random world language, its region, and its approximate number of speakers.",
    keywords: ["random language generator", "random world language", "language picker", "language generator tool", "discover a new language"],
    ogTitle: "Random Language Generator - Discover World Languages | ToolZoneX",
    ogDescription: "Generate a random world language along with its region and approximate number of speakers.",
    schemaName: "Random Language Generator",
    schemaDescription: "Generate a random world language, along with the region it's spoken in and its approximate number of speakers as a fun fact.",
    applicationCategory: "EducationalApplication",
    currency: undefined,
    faqs: [{ question: "How many languages can this generate?", answer: "The tool draws from a curated list of around 50 widely spoken world languages, spanning every inhabited continent." }, { question: "Are the speaker counts exact?", answer: "No — speaker counts for world languages vary between sources and are constantly shifting, so the figures shown are rounded approximations meant as a fun fact rather than a precise, up-to-the-minute statistic." }, { question: "Can I get the same language twice in a row?", answer: "Yes — each click picks independently from the full list, so repeats are possible." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
