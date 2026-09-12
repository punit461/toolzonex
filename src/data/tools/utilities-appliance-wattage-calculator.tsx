import BoltIcon from '@mui/icons-material/Bolt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/appliance-wattage-calculator",
    navName: "Appliance Wattage Calculator",
    navDescription: "Solve for watts, volts, or amps.",
    name: "Appliance Wattage Calculator - Watts, Volts & Amps",
    description: "Calculate a single appliance's wattage, voltage, or amperage using the Ohm's Law power formula (P = V × I), solving for whichever value you don't know.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <BoltIcon fontSize="large" color="primary"/>,
    seoTitle: "Appliance Wattage Calculator - Watts, Volts & Amps",
    seoDescription: "Free appliance wattage calculator. Enter any two of voltage, amperage, or wattage to instantly solve for the third using P = V × I.",
    keywords: ["appliance wattage calculator", "watts volts amps calculator", "power formula calculator", "ohms law power calculator", "volts to watts calculator"],
    ogTitle: "Appliance Wattage Calculator - Watts, Volts & Amps | ToolZoneX",
    ogDescription: "Calculate a single appliance's wattage, voltage, or amperage using the Ohm's Law power formula.",
    schemaName: "Appliance Wattage Calculator",
    schemaDescription: "Calculate a single appliance's wattage, voltage, or amperage using the Ohm's Law power formula (P = V × I), solving for whichever value you don't know.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the LED Wattage Calculator?", answer: "The LED Wattage Calculator totals the combined power draw of many LEDs or an entire LED strip. This tool instead works with a single appliance and applies the basic Ohm's Law power formula (watts = volts × amps) to solve for whichever one of the three values you don't already know." }, { question: "How is this different from the Inverter Size Calculator?", answer: "The Inverter Size Calculator adds up the wattage of a whole list of appliances to size a backup power inverter, including a safety margin. This tool is a simple single-appliance electrical calculation — useful for finding one appliance's wattage before adding it to an inverter sizing list." }, { question: "Does this account for power factor on motor-driven appliances?", answer: "No — this uses the basic resistive-load power formula (watts = volts × amps), which is accurate for purely resistive loads like heaters and incandescent lighting. Motor-driven appliances have a power factor below 1, so their real wattage may be somewhat lower than volts × amps suggests." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
