import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/trip-cost-calculator",
    navName: "Trip Cost Calculator",
    navDescription: "Total fuel & extra costs for a road trip.",
    name: "Trip Cost Calculator",
    description: "Calculate the total cost of a road trip from distance, fuel efficiency, and fuel price, plus any extra costs like tolls, parking, and food.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <LocalGasStationIcon fontSize="large" color="primary"/>,
    seoTitle: "Trip Cost Calculator - Road Trip Fuel & Total Cost",
    seoDescription: "Free trip cost calculator. Enter distance, fuel efficiency, fuel price, and extra costs like tolls and food to get your total road trip cost.",
    keywords: ["trip cost calculator", "road trip cost calculator", "gas cost calculator for trip", "fuel cost calculator", "travel cost calculator"],
    ogTitle: "Trip Cost Calculator - Road Trip Cost | ToolZoneX",
    ogDescription: "Calculate the total cost of a road trip including fuel and extra expenses.",
    schemaName: "Trip Cost Calculator",
    schemaDescription: "Calculate the total cost of a road trip from distance, fuel efficiency, fuel price, and extra costs.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Does this account for round trips?", answer: "Enter the total distance you'll actually drive — if it's a round trip, double your one-way distance before entering it, or enter the full round-trip mileage directly." }, { question: "What if my vehicle's fuel efficiency varies by driving conditions?", answer: "Use a conservative (lower) mpg figure for highway-and-city mixed driving, or your vehicle's combined EPA rating, to avoid underestimating fuel cost. Aggressive driving, cargo weight, and terrain can all reduce real-world efficiency below the rated figure." }, { question: "Can I use this for an electric vehicle?", answer: "Not directly — this calculator is built around gallons and fuel price. For an EV, use a dedicated EV charging cost calculator that works in kWh and electricity price instead." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
