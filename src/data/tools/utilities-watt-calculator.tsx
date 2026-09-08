import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/watt-calculator",
    navName: "Watt Calculator",
    navDescription: "Calculate watts, amps or volts.",
    name: "Watt Calculator - Calculate Watts, Amps & Volts",
    description: "Calculate watts, amps, or volts from any two values using W = V × I. Free online electrical power calculator.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ElectricBoltIcon fontSize="large" color="primary"/>,
    seoTitle: "Watt Calculator - Calculate Watts, Amps & Volts Online",
    seoDescription: "Free online watt calculator. Enter any two of watts, amps, or volts to calculate the third, with resistance and energy per hour shown.",
    keywords: ["watt calculator", "watts to amps calculator", "amps to watts calculator", "volts to watts calculator", "power calculator", "electrical calculator"],
    ogTitle: "Watt Calculator - Calculate Watts, Amps & Volts Online | ToolZoneX",
    ogDescription: "Calculate watts, amps, or volts from any two values using W = V × I.",
    schemaName: "Watt Calculator",
    schemaDescription: "Calculate watts, amps, or volts from any two electrical values.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is the difference between watts and watt-hours?", answer: "Watts measure instantaneous power. Watt-hours measure energy consumed over time. A 100W bulb running for 3 hours uses 300 Wh." }, { question: "Can I use this for DC and AC circuits?", answer: "The basic formulas work for DC circuits and for AC circuits with a pure resistive load. For AC with reactive loads, you would need to account for power factor." }, { question: "What is resistance and why is it shown?", answer: "Resistance (ohms) is the opposition to current flow, calculated using R = V / I. It is useful for understanding the electrical characteristics of the circuit." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
