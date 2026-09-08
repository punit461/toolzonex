import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/power-consumption-calculator",
    navName: "Power Consumption Calculator",
    navDescription: "Estimate appliance kWh usage + cost.",
    name: "Power Consumption Calculator",
    description: "Estimate the electricity an appliance uses and what it costs. Free online power consumption calculator with appliance quick-picks.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ElectricBoltIcon fontSize="large" color="primary"/>,
    seoTitle: "Power Consumption Calculator - kWh Usage & Electricity Cost",
    seoDescription: "Free online power consumption calculator. Enter watts, hours of use, and your tariff to get kWh per day, monthly cost, and annual cost.",
    keywords: ["power consumption calculator", "electricity usage calculator", "kwh calculator", "appliance power consumption", "how many watts", "watts to kwh"],
    ogTitle: "Power Consumption Calculator - kWh & Cost | ToolZoneX",
    ogDescription: "See exactly how much power your appliances use and how much they cost to run.",
    schemaName: "Power Consumption Calculator",
    schemaDescription: "Estimate the electricity an appliance uses and what it costs.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How do I convert watts to kWh?", answer: "Multiply watts by hours of use and divide by 1000. A 100 W bulb on for 10 hours uses 100 × 10 / 1000 = 1 kWh." }, { question: "What is a realistic tariff to use?", answer: "Household tariffs vary by country, state, and slab. The ₹6.5/kWh default is a typical Indian residential rate; adjust it to match your latest electricity bill." }, { question: "Does running watts equal rated watts?", answer: "Not always — devices with motors or compressors (fridges, ACs) cycle on and off, so actual usage is usually lower than the rated watts. The rated value gives a good upper-bound estimate." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
