import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/resistance-calculator",
    navName: "Resistance Calculator",
    navDescription: "Find ohms from voltage and current.",
    name: "Resistance Calculator",
    description: "Calculate electrical resistance, voltage, or current using Ohm's law, plus the power dissipated by the circuit.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ElectricBoltIcon fontSize="large" color="primary"/>,
    seoTitle: "Resistance Calculator - Ohm's Law & Power",
    seoDescription: "Free resistance calculator using Ohm's law. Find resistance, voltage, or current, see the power dissipated, and use the resistor color code reference.",
    keywords: ["resistance calculator", "ohms law calculator", "voltage current resistance", "ohm calculator", "resistor calculator", "electrical resistance"],
    ogTitle: "Resistance Calculator - Ohm's Law & Power | ToolZoneX",
    ogDescription: "Calculate resistance, voltage, or current using Ohm's law, plus power.",
    schemaName: "Resistance Calculator",
    schemaDescription: "Calculate electrical resistance, voltage, or current using Ohm's law.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What does Ohm's law state?", answer: "Ohm's law states that the current through a conductor is directly proportional to the voltage and inversely proportional to the resistance: V = I × R." }, { question: "How do I read a resistor color code?", answer: "Each color represents a digit (0-9), with the first two bands spelling the significant digits, the third being the multiplier, and the fourth the tolerance." }, { question: "Why does power matter when choosing a resistor?", answer: "A resistor converts electrical energy to heat. If the power (P = V × I) exceeds the resistor's rating, it will overheat and can burn out." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
