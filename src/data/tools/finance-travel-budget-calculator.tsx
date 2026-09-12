import PublicIcon from '@mui/icons-material/Public';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/travel-budget-calculator",
    navName: "Travel Budget Calculator",
    navDescription: "Total trip cost from per-day category spending.",
    name: "Travel Budget Calculator",
    description: "Estimate total trip cost from trip duration and per-day spending on lodging, food, transport, and activities.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PublicIcon fontSize="large" color="primary"/>,
    seoTitle: "Travel Budget Calculator - Total Trip Budget by Category",
    seoDescription: "Free travel budget calculator. Enter trip duration and per-day costs for lodging, food, transport, and activities to get your total trip budget.",
    keywords: ["travel budget calculator", "vacation budget calculator", "trip budget planner", "travel cost estimator", "daily travel budget calculator"],
    ogTitle: "Travel Budget Calculator - Total Trip Budget | ToolZoneX",
    ogDescription: "Estimate total trip cost from per-day spending across key categories.",
    schemaName: "Travel Budget Calculator",
    schemaDescription: "Estimate total trip cost from trip duration and per-day spending on lodging, food, transport, and activities.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Should I include flights in this budget?", answer: "This calculator focuses on per-day, on-the-ground costs. Flights, visas, and travel insurance are typically one-time costs that don't scale with trip length, so add them separately to the total this calculator gives you." }, { question: "How do I budget for a trip with very different costs by city?", answer: "Run the calculator once per city or leg of the trip using that city's per-day estimates and number of days there, then add the totals together for the full itinerary." }, { question: "What if my per-day spending isn't consistent every day?", answer: "Use an average per-day figure across the whole trip — a splurge day and a cheap day should roughly balance out. For very uneven trips (like a few nights in an expensive city followed by many budget days elsewhere), it's more accurate to calculate each portion separately." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
