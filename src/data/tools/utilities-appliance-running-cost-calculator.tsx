import BoltIcon from '@mui/icons-material/Bolt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/appliance-running-cost-calculator",
    navName: "Appliance Running Cost Calculator",
    navDescription: "Daily, monthly & annual cost for any appliance.",
    name: "Appliance Running Cost Calculator",
    description: "Calculate any appliance's daily, monthly, and annual electricity running cost from its wattage, hours used, and electricity rate.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <BoltIcon fontSize="large" color="primary"/>,
    seoTitle: "Appliance Running Cost Calculator - Electricity Cost",
    seoDescription: "Free appliance running cost calculator. Enter wattage, hours used per day, and electricity rate to find daily, monthly, and annual cost.",
    keywords: ["appliance running cost calculator", "electricity cost calculator", "how much does it cost to run an appliance", "kwh cost calculator", "appliance electricity cost"],
    ogTitle: "Appliance Running Cost Calculator - Electricity Cost | ToolZoneX",
    ogDescription: "Calculate any appliance's daily, monthly, and annual electricity running cost.",
    schemaName: "Appliance Running Cost Calculator",
    schemaDescription: "Calculate any appliance's daily, monthly, and annual electricity running cost from its wattage, hours used, and electricity rate.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Appliance Wattage Calculator?", answer: "The Appliance Wattage Calculator solves Ohm's Law (P = V × I) for whichever one of watts, volts, or amps you don't know — it doesn't compute a dollar cost. This calculator takes a known wattage and turns it into an estimated running cost in dollars." }, { question: "How is this different from the AC Running Cost or Computer Electricity Cost calculators?", answer: "Those are device-specific tools with built-in assumptions — for example, the computer calculator splits power draw into separate idle and load states. This is the generic, single-wattage version that works for any appliance: space heaters, hair dryers, dehumidifiers, and anything else with a fixed running wattage." }, { question: "Where do I find my electricity rate?", answer: "Check a recent electricity bill — it's usually listed as a per-kWh rate, sometimes broken into tiers. Use your average or marginal rate for the most realistic estimate." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
