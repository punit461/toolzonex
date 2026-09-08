import DiamondIcon from '@mui/icons-material/Diamond';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/birthstone-finder",
    navName: "Birthstone Finder",
    navDescription: "Find your birth month's gemstone.",
    name: "Birthstone Finder - By Birth Month",
    description: "Select a birth month to find its traditional birthstone, with a brief description of the stone's color and history.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <DiamondIcon fontSize="large" color="primary"/>,
    seoTitle: "Birthstone Finder - By Birth Month",
    seoDescription: "Select a birth month to find its traditional birthstone, with a brief description. Free online reference for jewelry shopping and gift ideas.",
    keywords: ["birthstone finder", "birthstone by month", "birthstone chart", "find my birthstone"],
    ogTitle: "Birthstone Finder - By Birth Month | ToolZoneX",
    ogDescription: "Select a birth month to find its traditional birthstone, with a brief description.",
    schemaName: "Birthstone Finder",
    schemaDescription: "Select a birth month to find its traditional birthstone, with a brief description of the stone's color and history.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Why do some months have more than one associated gemstone elsewhere?", answer: "Different jewelry associations have published slightly varying birthstone lists over time. This tool uses the most widely recognized modern birthstone for each month." }, { question: "Are birthstones based on science?", answer: "No — birthstone traditions come from history and culture rather than science, tracing back centuries to various cultural and religious associations." }, { question: "Can a month have more than one traditional birthstone?", answer: "Some modern lists do assign alternate birthstones to certain months, but this tool shows the single most commonly recognized birthstone for each month." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
