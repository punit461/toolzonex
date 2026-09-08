import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/pizza-size-calculator",
    navName: "Pizza Size Calculator",
    navDescription: "Compare pizza sizes by price per square inch.",
    name: "Pizza Size Calculator - Which Size Is the Better Value?",
    description: "Compare two or more pizza sizes by diameter and price to find which one offers the better value per square inch.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocalPizzaIcon fontSize="large" color="primary"/>,
    seoTitle: "Pizza Size Calculator - Which Size Is the Better Value?",
    seoDescription: "Free pizza size calculator. Compare pizza diameters and prices to see which size gives you the most pizza per dollar.",
    keywords: ["pizza size calculator", "pizza value calculator", "pizza price per square inch", "which pizza size is the best deal", "pizza comparison calculator"],
    ogTitle: "Pizza Size Calculator - Which Size Is the Better Value? | ToolZoneX",
    ogDescription: "Compare pizza sizes by diameter and price to find which one offers the better value.",
    schemaName: "Pizza Size Calculator",
    schemaDescription: "Compare two or more pizza sizes by diameter and price to find the better value per square inch.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why is a bigger pizza almost always a better deal?", answer: "Because a circle's area scales with the square of its radius, while a pizzeria's price increase per size upgrade is usually much closer to linear — so larger pizzas typically deliver more area per dollar, even when the sticker price is higher." }, { question: "Does this account for the crust or number of slices?", answer: "No — this calculator compares raw area for the price, which is a good proxy for overall value but doesn't account for crust-to-topping ratio, slice count, or how filling the crust itself is." }, { question: "Can I compare more than two pizzas?", answer: "Yes — use the \"Add Pizza\" button to add as many sizes as you want to compare at once." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
