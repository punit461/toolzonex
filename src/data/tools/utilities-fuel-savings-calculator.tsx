import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/fuel-savings-calculator",
    navName: "Fuel Savings Calculator",
    navDescription: "Compare fuel cost between two vehicles.",
    name: "Fuel Savings Calculator",
    description: "Calculate fuel cost for two vehicles from their fuel efficiency (mpg or L/100km), distance driven, and fuel price, and see the savings from the more efficient one.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocalGasStationIcon fontSize="large" color="primary"/>,
    seoTitle: "Fuel Savings Calculator - Compare Two Vehicles",
    seoDescription: "Free fuel savings calculator. Compare fuel cost between two vehicles from mpg or L/100km, distance driven, and fuel price to see savings in dollars and percent.",
    keywords: ["fuel savings calculator", "compare car fuel cost", "mpg savings calculator", "fuel cost comparison calculator", "fuel efficiency savings"],
    ogTitle: "Fuel Savings Calculator - Compare Two Vehicles | ToolZoneX",
    ogDescription: "Compare fuel cost between two vehicles and see the savings from the more efficient one.",
    schemaName: "Fuel Savings Calculator",
    schemaDescription: "Calculate fuel cost for two vehicles from their fuel efficiency, distance driven, and fuel price, and see the savings from the more efficient one.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why does a lower L/100km number mean better efficiency?", answer: "L/100km measures how much fuel is used to travel a fixed distance, so using less fuel for the same distance is better — the opposite of mpg, where a higher number (more miles per gallon) is better." }, { question: "Does this account for differences in fuel type?", answer: "No — enter the fuel price each vehicle actually uses (regular, premium, or diesel) separately if they differ, since this calculator assumes a single fuel price applies to both vehicles' cost comparison." }, { question: "Should I use my real-world mileage or the manufacturer's rating?", answer: "Real-world fuel economy is often somewhat lower than official manufacturer ratings, especially in city driving or cold weather. Using your own tracked average, if available, gives a more accurate savings estimate than the sticker rating alone." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
