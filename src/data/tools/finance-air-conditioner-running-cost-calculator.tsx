import AcUnitIcon from '@mui/icons-material/AcUnit';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/air-conditioner-running-cost-calculator",
    navName: "Air Conditioner Running Cost Calculator",
    navDescription: "AC electricity cost by wattage or tonnage.",
    name: "Air Conditioner Running Cost Calculator",
    description: "Calculate the daily and monthly cost of running an air conditioner from its wattage, or estimate wattage from its tonnage, plus hours used and electricity price.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AcUnitIcon fontSize="large" color="primary"/>,
    seoTitle: "Air Conditioner Running Cost Calculator - AC Electricity Cost",
    seoDescription: "Free air conditioner running cost calculator. Enter AC wattage or tonnage, hours used per day, and electricity price for daily and monthly running cost.",
    keywords: ["air conditioner running cost calculator", "ac running cost calculator", "ac electricity cost calculator", "ac tonnage wattage calculator", "cost to run ac"],
    ogTitle: "Air Conditioner Running Cost Calculator - AC Electricity Cost | ToolZoneX",
    ogDescription: "Calculate the daily and monthly cost of running an air conditioner from its wattage or tonnage.",
    schemaName: "Air Conditioner Running Cost Calculator",
    schemaDescription: "Calculate the daily and monthly cost of running an air conditioner from its wattage, or estimate wattage from its tonnage, plus hours used and electricity price.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why does AC tonnage matter for power consumption?", answer: "Tonnage measures cooling capacity, not electrical power directly, but larger-capacity units generally draw more watts to produce that cooling. The roughly 1,200W-per-ton figure is a common rule of thumb for standard split ACs, though actual draw varies by efficiency rating (SEER/EER), brand, and model." }, { question: "Is this different from a generic appliance electricity calculator?", answer: "Yes — a generic appliance calculator needs you to already know the exact wattage. This tool adds an AC-specific path: if you only know your unit's tonnage (a very common way ACs are sized and sold), it estimates the wattage for you using the standard per-ton reference." }, { question: "How can I get a more accurate estimate?", answer: "Check your AC's nameplate or spec sheet for its actual rated power input in watts and enter that directly using the wattage input mode — this will always be more accurate than the tonnage-based estimate, since actual draw varies by efficiency and inverter technology." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
