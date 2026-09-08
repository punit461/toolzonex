import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/fuel-cost-calculator",
    navName: "Fuel Cost Calculator",
    navDescription: "Trip fuel cost from distance, efficiency & price.",
    name: "Fuel Cost Calculator",
    description: "Calculate the total fuel cost of a trip from distance, vehicle fuel efficiency, and fuel price per unit.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <LocalGasStationIcon fontSize="large" color="primary"/>,
    seoTitle: "Fuel Cost Calculator - Trip Fuel Cost Estimator",
    seoDescription: "Free fuel cost calculator to estimate total trip fuel cost from distance, vehicle fuel efficiency (mpg or km/l), and fuel price per unit.",
    keywords: ["fuel cost calculator", "trip fuel cost calculator", "gas cost calculator", "road trip fuel calculator", "fuel cost per mile calculator"],
    ogTitle: "Fuel Cost Calculator - Trip Fuel Cost Estimator | ToolZoneX",
    ogDescription: "Estimate total trip fuel cost from distance, fuel efficiency, and fuel price.",
    schemaName: "Fuel Cost Calculator",
    schemaDescription: "Calculate total fuel cost of a trip from distance, fuel efficiency, and fuel price per unit.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Where do I find my vehicle's fuel efficiency?", answer: "Check your vehicle's manual or window sticker for the manufacturer's rated mpg or km/l, or use the Mileage Calculator to work out your actual real-world efficiency from a recent fill-up." }, { question: "Does this account for traffic, terrain, or driving style?", answer: "No — it assumes your vehicle achieves the fuel efficiency figure you enter for the entire trip. Heavy traffic, hills, high speeds, and aggressive driving all reduce real-world efficiency below the rated figure, so treat the estimate as a reasonable ballpark rather than an exact number." }, { question: "Can I use this for a round trip?", answer: "Yes — just enter the full round-trip distance (there and back) rather than the one-way distance, and the calculator will estimate the total fuel cost for the entire journey." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
