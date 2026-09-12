import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/coffee-ratio-calculator",
    navName: "Coffee Ratio Calculator",
    navDescription: "Coffee-to-water brew ratios.",
    name: "Coffee Ratio Calculator",
    description: "Calculate the coffee or water amount needed for a given brew ratio, with results converted to grams, milliliters, and cups.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocalCafeIcon fontSize="large" color="primary"/>,
    seoTitle: "Coffee Ratio Calculator - Coffee to Water Brew Ratio",
    seoDescription: "Free coffee ratio calculator. Pick a brew ratio (1:15, 1:16, 1:17, 1:18, or custom) and solve for water or coffee amount in grams, ml, and cups.",
    keywords: ["coffee ratio calculator", "coffee to water ratio", "pour over coffee calculator", "coffee brewing ratio", "coffee dose calculator"],
    ogTitle: "Coffee Ratio Calculator - Coffee to Water Brew Ratio | ToolZoneX",
    ogDescription: "Calculate coffee or water amounts for any brew ratio, converted to grams, ml, and cups.",
    schemaName: "Coffee Ratio Calculator",
    schemaDescription: "Calculate the coffee or water amount needed for a chosen brew ratio, with results in grams, milliliters, and cups.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What ratio should I start with?", answer: "1:16 is a widely used starting point for drip and pour-over coffee. Use 1:15 for a stronger cup or 1:17-1:18 for a milder one, then adjust to taste." }, { question: "Does the ratio change for espresso?", answer: "Yes — espresso uses much tighter ratios (commonly around 1:2), well outside the drip-coffee presets here. This calculator is aimed at drip, pour-over, and immersion brewing ratios." }, { question: "Is 1 gram of water really equal to 1 milliliter?", answer: "Very close — water's density is almost exactly 1g/ml at typical brewing temperatures, so using a kitchen scale in grams for both coffee and water gives you an accurate, repeatable measurement without needing a separate liquid measuring cup." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
