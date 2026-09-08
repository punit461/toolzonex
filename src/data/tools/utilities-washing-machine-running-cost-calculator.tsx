import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/washing-machine-running-cost-calculator",
    navName: "Washing Machine Running Cost Calculator",
    navDescription: "Weekly, monthly & annual laundry running cost.",
    name: "Washing Machine Running Cost Calculator",
    description: "Estimate weekly, monthly, and annual washing machine electricity cost from wattage, cycle length, loads per week, and electricity rate.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocalLaundryServiceIcon fontSize="large" color="primary"/>,
    seoTitle: "Washing Machine Running Cost Calculator - Weekly, Monthly & Annual",
    seoDescription: "Free washing machine running cost calculator. Enter wattage, cycle length, loads per week, and electricity rate to estimate laundry running cost.",
    keywords: ["washing machine running cost calculator", "washing machine electricity cost calculator", "how much does it cost to run a washing machine", "laundry cost calculator", "washer energy cost calculator"],
    ogTitle: "Washing Machine Running Cost Calculator - Weekly, Monthly & Annual | ToolZoneX",
    ogDescription: "Estimate washing machine electricity cost from wattage, cycle length, loads per week, and electricity rate.",
    schemaName: "Washing Machine Running Cost Calculator",
    schemaDescription: "Estimate washing machine electricity cost as wattage converted to kWh times cycle hours times loads per week times electricity rate, shown weekly, monthly, and annually.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Where do I find my washing machine's wattage?", answer: "Check the rating label on the machine itself (usually inside the door or on the back panel) or the manufacturer's spec sheet — it's often listed in watts or as amps and volts, which you can multiply together to get watts." }, { question: "Does this include hot water heating cost?", answer: "No — this estimates only the washing machine's own electrical draw for the motor, pump, and controls. If you wash primarily on a hot or warm cycle, your water heater's energy use to heat that water is a separate cost not included here." }, { question: "Does cycle type affect wattage?", answer: "Yes — heavy-duty, sanitize, or extended cycles typically draw more power over a longer time than a quick or delicate cycle. Use the wattage and cycle length for your typical, most-used setting for the most representative estimate." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
