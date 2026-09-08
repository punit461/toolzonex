import FavoriteIcon from '@mui/icons-material/Favorite';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/love-calculator",
    navName: "Love Calculator",
    navDescription: "Fun name compatibility percentage.",
    name: "Love Calculator - Name Compatibility Test",
    description: "Enter two names and get a fun compatibility percentage with a playful verdict. A lighthearted novelty tool, not a real relationship metric.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <FavoriteIcon fontSize="large" color="primary"/>,
    seoTitle: "Love Calculator - Fun Name Compatibility Test Online",
    seoDescription: "Free online love calculator. Enter two names and get a fun, deterministic compatibility percentage with a playful verdict. A novelty tool for entertainment.",
    keywords: ["love calculator", "love percentage calculator", "name compatibility test", "love compatibility test", "crush calculator", "relationship compatibility test"],
    ogTitle: "Love Calculator - Fun Name Compatibility Test Online | ToolZoneX",
    ogDescription: "Enter two names and get a fun compatibility percentage with a playful verdict.",
    schemaName: "Love Calculator",
    schemaDescription: "Calculate a fun, deterministic name compatibility percentage for two names.",
    applicationCategory: "EntertainmentApplication",
    currency: "INR",
    faqs: [{ question: "Is this a real measure of relationship compatibility?", answer: "No — this is a fun novelty tool, not a scientific or psychological compatibility test. The percentage is generated from a simple deterministic formula based on the letters in the two names and shouldn't be taken as relationship advice." }, { question: "Why do I get the same score every time for the same names?", answer: "The calculation is deterministic — it converts the combined names into a number using their character codes, so the same pair of names (in either order) always produces the same percentage." }, { question: "Does the order I enter the names matter?", answer: "No — the two names are sorted before scoring, so entering \"Alex, Sam\" or \"Sam, Alex\" gives you the exact same result either way." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
