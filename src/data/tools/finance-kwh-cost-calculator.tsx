import TvIcon from '@mui/icons-material/Tv';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/kwh-cost-calculator",
    navName: "kWh Cost Calculator",
    navDescription: "Daily, monthly & annual appliance running cost.",
    name: "kWh Cost Calculator",
    description: "Calculate the daily, monthly, and annual cost of running an appliance from its wattage, hours used per day, and electricity price.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TvIcon fontSize="large" color="primary"/>,
    seoTitle: "kWh Cost Calculator - Appliance Electricity Cost",
    seoDescription: "Free kWh cost calculator. Enter appliance wattage, hours used per day, and electricity price to get daily, monthly, and annual running cost.",
    keywords: ["kwh cost calculator", "electricity cost calculator", "appliance running cost calculator", "cost to run appliance calculator", "kwh to dollars calculator"],
    ogTitle: "kWh Cost Calculator - Appliance Electricity Cost | ToolZoneX",
    ogDescription: "Calculate the daily, monthly, and annual cost of running an appliance.",
    schemaName: "kWh Cost Calculator",
    schemaDescription: "Calculate the daily, monthly, and annual cost of running an appliance from its wattage, hours used per day, and electricity price.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Where do I find an appliance's wattage?", answer: "Check the label or nameplate on the appliance itself, its manual, or the manufacturer's spec sheet — it's usually listed in watts (W). If only amps and voltage are given, wattage equals amps × voltage." }, { question: "Does this account for standby power when the appliance is off?", answer: "No — this calculator only estimates active-use cost based on the hours you specify. Many electronics draw a small amount of standby (\"phantom\") power even when off or idle, which isn't included here." }, { question: "Where do I find my electricity price per kWh?", answer: "Check a recent utility bill — it's usually listed as a per-kWh rate, sometimes broken into tiers or time-of-use periods. Use your average or peak rate depending on when the appliance typically runs." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
