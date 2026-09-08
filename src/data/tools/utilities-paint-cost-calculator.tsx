import PaletteIcon from '@mui/icons-material/Palette';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/paint-cost-calculator",
    navName: "Paint Cost Calculator",
    navDescription: "Estimate gallons and cost for a room.",
    name: "Paint Cost Calculator",
    description: "Estimate how many gallons of paint you need and the total cost to paint a room, including multiple coats and coverage rate.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PaletteIcon fontSize="large" color="primary"/>,
    seoTitle: "Paint Cost Calculator - Estimate Gallons & Cost",
    seoDescription: "Free paint cost calculator. Enter room dimensions, coats, and coverage to estimate the gallons of paint needed and the total cost for your project.",
    keywords: ["paint cost calculator", "paint calculator", "paint gallons needed", "how much paint do i need", "paint cost estimator", "painting cost calculator"],
    ogTitle: "Paint Cost Calculator - Estimate Gallons & Cost | ToolZoneX",
    ogDescription: "Estimate how many gallons of paint you need and the total project cost.",
    schemaName: "Paint Cost Calculator",
    schemaDescription: "Estimate gallons of paint needed and total cost for a painting project.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why do I need more paint than the wall area?", answer: "Most walls need two coats for even coverage, and you lose some paint to waste and touch ups. Always round the gallon count up, since paint is sold in whole cans." }, { question: "Does color affect coverage?", answer: "Yes — dark or bold colors often need extra coats, and a primer may be required for dramatic color changes, which adds cost." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
