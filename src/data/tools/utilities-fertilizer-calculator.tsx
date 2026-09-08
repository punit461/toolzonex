import GrassIcon from '@mui/icons-material/Grass';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/fertilizer-calculator",
    navName: "Fertilizer Calculator",
    navDescription: "Calculate fertilizer needed for your lawn.",
    name: "Fertilizer Calculator",
    description: "Calculate how much fertilizer your lawn or garden needs based on area and the product's application rate.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <GrassIcon fontSize="large" color="primary"/>,
    seoTitle: "Fertilizer Calculator - How Much Fertilizer Do You Need?",
    seoDescription: "Free fertilizer calculator. Enter your lawn or garden area and the product's application rate (lbs per 1,000 sq ft) to find the total fertilizer needed.",
    keywords: ["fertilizer calculator", "lawn fertilizer calculator", "how much fertilizer do i need", "fertilizer application rate calculator", "garden fertilizer calculator"],
    ogTitle: "Fertilizer Calculator - How Much Fertilizer Do You Need? | ToolZoneX",
    ogDescription: "Calculate how much fertilizer your lawn or garden needs.",
    schemaName: "Fertilizer Calculator",
    schemaDescription: "Calculate how much fertilizer your lawn or garden needs based on area and the product's application rate.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Where do I find the application rate for my fertilizer?", answer: "It's printed on the product's label or bag, usually phrased as something like \"apply 3 lbs per 1,000 sq ft\" — enter that number directly into the calculator's application rate field." }, { question: "Does this account for nitrogen (N), phosphorus (P), or potassium (K) percentages separately?", answer: "No — this calculator works from the bag's overall recommended application rate (lbs of product per 1,000 sq ft), which the manufacturer has already calculated to deliver the right amount of N-P-K for your area at that dose. It doesn't recompute nutrient percentages independently." }, { question: "Should I split the total amount into multiple applications?", answer: "Many fertilizer programs recommend splitting the season's total fertilizer across 2-4 applications rather than applying it all at once — check your specific product's label or a regional lawn care guide for a recommended schedule." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
