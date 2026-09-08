import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/ev-vs-petrol-cost-calculator",
    navName: "EV vs Petrol Cost Calculator",
    navDescription: "Compare electricity cost vs gas cost by distance.",
    name: "EV vs Petrol Cost Calculator",
    description: "Compare the cost of driving an electric vehicle against a petrol vehicle over the same distance, bridging cost-per-kWh against cost-per-gallon or liter.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <ElectricBoltIcon fontSize="large" color="primary"/>,
    seoTitle: "EV vs Petrol Cost Calculator - Electric vs Gas Cost",
    seoDescription: "Free EV vs petrol cost calculator. Compare electricity cost per kWh against petrol cost per gallon or liter to see which is cheaper over a given distance.",
    keywords: ["ev vs petrol cost calculator", "electric vs gas car cost calculator", "ev vs gas cost comparison", "electric car savings calculator", "ev running cost calculator"],
    ogTitle: "EV vs Petrol Cost Calculator - Electric vs Gas Cost | ToolZoneX",
    ogDescription: "Compare the cost of driving an EV against a petrol vehicle over the same distance.",
    schemaName: "EV vs Petrol Cost Calculator",
    schemaDescription: "Compare EV electricity cost against petrol fuel cost over a given distance, supporting mi/kWh or kWh/100mi and mpg or L/100km efficiency units.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Fuel Savings Calculator?", answer: "The Fuel Savings Calculator compares two vehicles using the SAME fuel-type efficiency units — both in mpg or both in L/100km — which only works for comparing two gas or diesel vehicles. This tool specifically bridges electricity (cost-per-kWh) against petrol (cost-per-gallon or liter), the two fundamentally different unit systems needed to compare an EV against a gas vehicle." }, { question: "Which EV efficiency unit should I use?", answer: "Use whichever your EV's spec sheet lists — miles per kWh (higher is better) or kWh per 100 miles (lower is better). Either one is converted internally to the same underlying cost calculation, so the result is identical either way." }, { question: "Does this account for public charging costs, which are often higher than home charging?", answer: "No — enter whatever electricity price actually applies to your typical charging pattern. If you charge mostly at public stations at a higher rate, use that blended rate instead of a flat home electricity rate for a more accurate comparison." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
