import PoolIcon from '@mui/icons-material/Pool';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/swimming-pool-volume-calculator",
    navName: "Swimming Pool Volume Calculator",
    navDescription: "Pool volume in gallons or liters.",
    name: "Swimming Pool Volume Calculator - Gallons & Liters",
    description: "Calculate swimming pool volume for rectangular, circular, or oval pools, in gallons and liters, with average or sloped-depth support.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PoolIcon fontSize="large" color="primary"/>,
    seoTitle: "Swimming Pool Volume Calculator - Gallons & Liters",
    seoDescription: "Free swimming pool volume calculator. Enter your pool's shape and dimensions to calculate volume in gallons and liters, supporting sloped depths.",
    keywords: ["swimming pool volume calculator", "pool gallons calculator", "pool volume calculator gallons", "how many gallons in my pool", "pool water volume calculator"],
    ogTitle: "Swimming Pool Volume Calculator - Gallons & Liters | ToolZoneX",
    ogDescription: "Calculate your pool's volume in gallons and liters.",
    schemaName: "Swimming Pool Volume Calculator",
    schemaDescription: "Calculate swimming pool volume for rectangular, circular, or oval pools, in gallons and liters.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How do I measure an oval pool?", answer: "Enter the pool's longest length and its widest width — the calculator treats these as the two axes of an ellipse and computes the area accordingly, which is the standard approximation used for oval pool volume." }, { question: "Why average the shallow and deep end depths?", answer: "For a pool with a sloped bottom, the average of the shallow and deep depths gives a close approximation of the true average depth across the entire pool, since the slope is typically close to linear between the two ends." }, { question: "How many gallons are in a cubic foot of water?", answer: "1 cubic foot of water equals approximately 7.48 gallons — that's the standard conversion factor this calculator uses to turn your pool's volume in cubic feet into US gallons." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
