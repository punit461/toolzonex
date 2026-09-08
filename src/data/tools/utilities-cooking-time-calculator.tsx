import LocalDiningIcon from '@mui/icons-material/LocalDining';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/cooking-time-calculator",
    navName: "Cooking Time Calculator",
    navDescription: "Estimated cook times by food, weight & method.",
    name: "Cooking Time Calculator",
    description: "Estimate cooking time for common foods by weight and cooking method, using standard reference guidelines.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocalDiningIcon fontSize="large" color="primary"/>,
    seoTitle: "Cooking Time Calculator - Estimate Cook Times by Weight",
    seoDescription: "Free cooking time calculator. Select a food type and weight to estimate cook time using standard reference guidelines for oven and stovetop cooking.",
    keywords: ["cooking time calculator", "how long to cook chicken", "roasting time calculator", "cook time by weight calculator", "baking time calculator"],
    ogTitle: "Cooking Time Calculator - Estimate Cook Times by Weight | ToolZoneX",
    ogDescription: "Estimate cooking time for common foods by weight and method using standard reference guidelines.",
    schemaName: "Cooking Time Calculator",
    schemaDescription: "Estimate cooking time for common foods by weight and cooking method, using standard reference guidelines.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why might my actual cooking time be different?", answer: "Actual cooking time varies by your exact oven or appliance (ovens can run hot or cold by 25°F or more), the starting temperature of the food (refrigerated vs. room temperature), the shape and thickness of the item, whether it's stuffed, and altitude. Treat these numbers as a planning estimate, not a guarantee." }, { question: "How do I know meat and poultry are actually done?", answer: "Always use a food thermometer to confirm doneness for meat and poultry — don't rely on time alone for food safety. Common safe minimum internal temperatures are 165°F for poultry, 145°F for whole cuts of beef/pork (with a rest time), and 160°F for ground meats. Check your local food safety guidelines for the most current recommendations." }, { question: "Does this account for resting time after cooking?", answer: "No — the estimates above are active cooking time only. Many meats (especially roasts and whole poultry) benefit from resting 10-20 minutes after cooking before carving, which isn't included in these numbers." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
