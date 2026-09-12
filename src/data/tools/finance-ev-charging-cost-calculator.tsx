import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/ev-charging-cost-calculator",
    navName: "EV Charging Cost Calculator",
    navDescription: "Cost to charge & estimated added range.",
    name: "EV Charging Cost Calculator",
    description: "Calculate the cost to charge an EV from current to target charge percentage, accounting for charger efficiency, plus estimated added driving range.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <ElectricBoltIcon fontSize="large" color="primary"/>,
    seoTitle: "EV Charging Cost Calculator - Cost to Charge Your EV",
    seoDescription: "Free EV charging cost calculator. Enter battery capacity, current and target charge, electricity price, and charger efficiency to get your charging cost.",
    keywords: ["ev charging cost calculator", "electric car charging cost calculator", "ev charging price calculator", "cost to charge electric vehicle", "ev electricity cost calculator"],
    ogTitle: "EV Charging Cost Calculator - Cost to Charge | ToolZoneX",
    ogDescription: "Calculate the cost to charge your EV and the estimated added range.",
    schemaName: "EV Charging Cost Calculator",
    schemaDescription: "Calculate the cost to charge an EV from current to target charge percentage, accounting for charger efficiency, plus estimated added driving range.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why is the energy drawn from the wall more than what reaches the battery?", answer: "Charging involves converting AC power from the wall into DC power stored in the battery, and that conversion isn't perfectly efficient — some energy is lost as heat. A 90% efficiency figure means you draw about 11% more energy from the wall than actually ends up stored." }, { question: "What efficiency should I use for my charger?", answer: "Most modern Level 2 home chargers run around 85-95% efficient; fast DC chargers can vary more. If you don't know your charger's exact rating, 90% is a reasonable default estimate." }, { question: "Does this include demand charges or time-of-use rates?", answer: "No — this calculator uses a single flat electricity price. If your utility charges different rates by time of day, run the calculation using the rate that applies during your actual charging window for a more accurate cost." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
