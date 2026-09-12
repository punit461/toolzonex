import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/used-car-cost-calculator",
    navName: "Used Car Cost Calculator",
    navDescription: "Total cost of ownership for a used car.",
    name: "Used Car Cost Calculator",
    description: "Calculate the total cost of owning a used car from its purchase price and estimated annual insurance, maintenance, registration, and fuel costs.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <DirectionsCarIcon fontSize="large" color="primary"/>,
    seoTitle: "Used Car Cost Calculator - Total Cost of Ownership",
    seoDescription: "Free used car cost calculator. Enter purchase price and annual insurance, maintenance, registration, and fuel costs to find total cost of ownership.",
    keywords: ["used car cost calculator", "total cost of ownership calculator car", "used car ownership cost calculator", "cost of owning a used car", "car cost per year calculator"],
    ogTitle: "Used Car Cost Calculator - Total Cost of Ownership | ToolZoneX",
    ogDescription: "Calculate the total cost of owning a used car over your ownership period.",
    schemaName: "Used Car Cost Calculator",
    schemaDescription: "Calculate total cost of ownership for a used car from purchase price and estimated annual running costs.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why do used cars typically have higher maintenance costs?", answer: "Older vehicles are more likely to need wear-item replacements (brakes, tires, belts, batteries) and unexpected repairs, and they usually aren't covered by a full manufacturer warranty anymore, so it's realistic to budget noticeably more for maintenance than you would for a new car." }, { question: "Does this include depreciation?", answer: "No — this calculator treats the purchase price as a fixed cost and doesn't estimate resale value at the end of ownership. If you plan to sell the car afterward, subtract your expected resale value from the total cost of ownership to get a more complete picture." }, { question: "How can I use this to compare against a different vehicle?", answer: "Run the calculator once per vehicle with each car's own purchase price and estimated annual costs, then compare the total cost of ownership or cost-per-year figures side by side — the cheaper purchase price doesn't always win once running costs are included." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
