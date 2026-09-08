import FlightIcon from '@mui/icons-material/Flight';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/flight-time-calculator",
    navName: "Flight Time Calculator",
    navDescription: "Estimate flight duration from distance & speed.",
    name: "Flight Time Calculator - Estimate Flight Duration",
    description: "Estimate flight duration from distance and cruising speed, with an adjustable taxi/takeoff/landing buffer.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <FlightIcon fontSize="large" color="primary"/>,
    seoTitle: "Flight Time Calculator - Estimate Flight Duration",
    seoDescription: "Free online flight time calculator. Enter distance and cruising speed to estimate total flight duration, including a takeoff/landing buffer.",
    keywords: ["flight time calculator", "flight duration calculator", "how long is my flight", "flight time estimator", "plane travel time calculator"],
    ogTitle: "Flight Time Calculator - Estimate Flight Duration | ToolZoneX",
    ogDescription: "Estimate flight duration from distance and cruising speed.",
    schemaName: "Flight Time Calculator",
    schemaDescription: "Estimate flight duration from distance and cruising speed, with a taxi/takeoff/landing buffer.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why isn't this the same as the flight time shown when booking a ticket?", answer: "Airlines factor in actual flight plans, wind patterns (tailwinds and headwinds), air traffic routing, and airport-specific taxi times, all of which can meaningfully shift the real duration. This calculator gives a simplified straight-line estimate using average cruising speed and a fixed buffer." }, { question: "Should I use great-circle distance or driving distance?", answer: "Use great-circle (straight-line) distance between the two airports, since aircraft fly roughly along that path rather than following ground routes. Many flight-distance lookup tools report this figure directly." }, { question: "Why does the buffer matter for short flights?", answer: "For short routes, the fixed taxi, takeoff, and landing time can be a large fraction of total flight time, since the aircraft spends less time at full cruising speed. This is why very short flights often feel disproportionately long relative to the distance covered." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
