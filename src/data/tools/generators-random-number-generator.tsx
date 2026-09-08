import NumbersIcon from '@mui/icons-material/Numbers';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-number-generator",
    navName: "Random Number",
    navDescription: "Generate random numbers.",
    name: "Random Number Generator",
    description: "Generate random numbers instantly between any range. Free online RNG tool for raffles, giveaways, and statistics.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <NumbersIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Number Generator - Pick Numbers Online for Free",
    seoDescription: "Generate random numbers instantly between any range. Free online RNG tool for raffles, giveaways, games, and statistics.",
    keywords: ["random number generator", "rng", "pick random number", "raffle number generator", "random digit generator"],
    ogTitle: "Random Number Generator - Pick Numbers Online for Free | ToolZoneX",
    ogDescription: "Generate random numbers instantly between any range. Free online RNG tool.",
    schemaName: "Random Number Generator",
    schemaDescription: "Generate random numbers instantly between any range.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
