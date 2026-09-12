import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/home-energy-usage-calculator",
    navName: "Home Energy Usage Calculator",
    navDescription: "Whole-home electricity usage & cost estimate.",
    name: "Home Energy Usage Calculator",
    description: "Estimate whole-home monthly and annual electricity usage and cost from square footage, usage intensity, and electricity rate.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ElectricalServicesIcon fontSize="large" color="primary"/>,
    seoTitle: "Home Energy Usage Calculator - Whole-Home Electricity Cost",
    seoDescription: "Free home energy usage calculator. Enter your home's square footage, usage intensity, and electricity rate to estimate monthly and annual electricity cost.",
    keywords: ["home energy usage calculator", "whole home electricity cost calculator", "household energy calculator", "home electricity usage estimator", "monthly electricity cost calculator"],
    ogTitle: "Home Energy Usage Calculator - Whole-Home Electricity Cost | ToolZoneX",
    ogDescription: "Estimate whole-home monthly and annual electricity usage and cost.",
    schemaName: "Home Energy Usage Calculator",
    schemaDescription: "Estimate whole-home monthly and annual electricity usage and cost from square footage, usage intensity, and electricity rate.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How accurate is this estimate?", answer: "This is a rough, whole-home ballpark based on typical average kWh-per-square-foot figures — it is not an audit of your actual electricity bill. Real usage depends heavily on climate, insulation, appliance efficiency, occupancy patterns, and local utility rate structures (including tiered pricing), so treat the result as a planning estimate rather than a precise prediction." }, { question: "How is this different from the Appliance Running Cost Calculator?", answer: "The Appliance Running Cost Calculator estimates the cost of a single device from its wattage and daily hours of use — it's precise for one appliance but doesn't tell you anything about your whole home. This Home Energy Usage Calculator instead works at the whole-house level, estimating total electricity usage from square footage and a general usage-intensity level, without needing to know any individual appliance's wattage." }, { question: "How do I know if my home is Low, Medium, or High intensity?", answer: "Consider your climate and habits: homes with minimal air conditioning or heating, efficient appliances, and low occupancy tend toward Low; a typical family home with normal AC/heating use fits Medium; homes with electric heating, heavy AC use in a hot climate, a pool pump, or many electronics running constantly tend toward High." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
