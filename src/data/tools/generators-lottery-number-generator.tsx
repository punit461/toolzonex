import CasinoIcon from '@mui/icons-material/Casino';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/lottery-number-generator",
    navName: "Lottery Number Generator",
    navDescription: "Random numbers for common lottery formats.",
    name: "Lottery Number Generator - Multiple Formats",
    description: "Pick a common lottery format and generate a random, unique set of numbers matching that format in one click.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CasinoIcon fontSize="large" color="primary"/>,
    seoTitle: "Lottery Number Generator - Multiple Formats",
    seoDescription: "Pick a common lottery format and generate a random, unique set of numbers matching that format. Free online quick-pick tool for entertainment.",
    keywords: ["lottery number generator", "random lottery numbers", "lottery quick pick generator", "lottery number picker"],
    ogTitle: "Lottery Number Generator - Multiple Formats | ToolZoneX",
    ogDescription: "Pick a common lottery format and generate a random, unique set of numbers matching that format.",
    schemaName: "Lottery Number Generator",
    schemaDescription: "Pick a common lottery format and generate a random, unique set of numbers matching that format in one click.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Are these real winning numbers?", answer: "No — these are randomly generated for entertainment and planning purposes only. Check your lottery operator's official website for verified drawing results." }, { question: "Which format should I pick?", answer: "Pick whichever format matches the specific game you're playing — check your lottery ticket or official rules for the exact number ranges and count it uses." }, { question: "Does picking my own numbers improve my odds?", answer: "No — every number and every combination in an official drawing has exactly the same probability of being drawn, whether picked by you or generated randomly." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
