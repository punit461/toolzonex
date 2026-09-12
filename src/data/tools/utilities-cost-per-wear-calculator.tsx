import CheckroomIcon from '@mui/icons-material/Checkroom';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/cost-per-wear-calculator",
    navName: "Cost Per Wear Calculator",
    navDescription: "Find the real cost per use of an item.",
    name: "Cost Per Wear Calculator",
    description: "Calculate the cost per wear of an item from its purchase price and how many times you've worn or used it.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CheckroomIcon fontSize="large" color="primary"/>,
    seoTitle: "Cost Per Wear Calculator - Real Cost Per Use",
    seoDescription: "Free cost per wear calculator. Divide an item's purchase price by times worn to find its real cost per use, with a projected future cost per wear.",
    keywords: ["cost per wear calculator", "cost per use calculator", "cost per wear formula", "clothing cost per wear", "value per wear calculator"],
    ogTitle: "Cost Per Wear Calculator - Real Cost Per Use | ToolZoneX",
    ogDescription: "Find out the real cost per use of your purchases.",
    schemaName: "Cost Per Wear Calculator",
    schemaDescription: "Calculate cost per wear from purchase price and number of times worn or used, with a projected future cost per wear.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does a lower cost per wear always mean a better purchase?", answer: "Generally, yes, from a pure value standpoint — but it's only one factor. Comfort, quality, versatility, and how much you enjoy an item also matter, and cost per wear naturally improves the longer you keep using something, so it rewards items with staying power." }, { question: "What counts as a \"wear\" for non-clothing items?", answer: "The same idea works for any item you use repeatedly, not just clothing — count each use, session, or occasion the item serves its purpose, whether that's a kitchen gadget, a tool, or a piece of sports equipment." }, { question: "Why include estimated future uses?", answer: "Cost per wear so far only reflects your usage up to today. Adding an estimate of how many more times you'll realistically use the item projects the cost per wear over its full expected lifetime, which is often a fairer picture of long-term value." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
