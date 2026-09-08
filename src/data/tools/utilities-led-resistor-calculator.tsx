import LightbulbIcon from '@mui/icons-material/Lightbulb';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/led-resistor-calculator",
    navName: "LED Resistor Calculator",
    navDescription: "Find the right series resistor for an LED.",
    name: "LED Resistor Calculator - Series Resistor Value",
    description: "Calculate the required series resistor for an LED from supply voltage, LED forward voltage, and forward current, with nearest standard value.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LightbulbIcon fontSize="large" color="primary"/>,
    seoTitle: "LED Resistor Calculator - Series Resistor Value",
    seoDescription: "Free online LED resistor calculator. Enter supply voltage, LED forward voltage, and current to find the required resistor and nearest standard value.",
    keywords: ["led resistor calculator", "led series resistor calculator", "resistor for led calculator", "ohms law led calculator", "led current limiting resistor"],
    ogTitle: "LED Resistor Calculator - Series Resistor Value | ToolZoneX",
    ogDescription: "Find the right series resistor for your LED circuit instantly.",
    schemaName: "LED Resistor Calculator",
    schemaDescription: "Calculate the required series resistor for an LED using Ohm's Law, with nearest standard resistor value.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What forward voltage should I use for my LED?", answer: "Forward voltage varies by LED color and type: roughly 1.8-2.2V for red/yellow, 3.0-3.4V for green/blue/white LEDs. Check your LED's datasheet for the exact value, since using an incorrect forward voltage will throw off the resistor calculation." }, { question: "What is the E12 series, and why round to it?", answer: "The E12 series is a standardized set of 12 resistor values per decade (1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2, and their multiples of 10) that resistor manufacturers actually stock, so rounding your calculated value to the nearest E12 value gives you a resistor you can realistically buy." }, { question: "What wattage rating does the resistor need?", answer: "Power dissipated is I² × R. Most small-signal LED circuits need well under a quarter watt, so a standard 1/4W resistor is usually sufficient, but always check the calculated power against your resistor's rated wattage, especially at higher currents." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
