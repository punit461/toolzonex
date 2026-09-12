import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/led-wattage-calculator",
    navName: "LED Wattage Calculator",
    navDescription: "Total LED power draw and running cost.",
    name: "LED Wattage Calculator",
    description: "Calculate total power consumption for a group of LEDs or an LED strip, plus estimated running cost from hours used and electricity price.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ElectricalServicesIcon fontSize="large" color="primary"/>,
    seoTitle: "LED Wattage Calculator - Total Power & Running Cost",
    seoDescription: "Free LED wattage calculator. Enter LED count and wattage, or strip length and watts per meter, to calculate total wattage and running cost.",
    keywords: ["led wattage calculator", "led strip wattage calculator", "led power consumption calculator", "total led wattage", "led running cost calculator"],
    ogTitle: "LED Wattage Calculator - Total Power & Running Cost | ToolZoneX",
    ogDescription: "Calculate total power consumption for LEDs or an LED strip, plus running cost.",
    schemaName: "LED Wattage Calculator",
    schemaDescription: "Calculate total power consumption for a group of LEDs or an LED strip, plus estimated running cost from hours used and electricity price.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from an LED resistor calculator?", answer: "An LED resistor calculator sizes the current-limiting resistor needed for a single LED circuit using Ohm's Law. This tool instead totals up power consumption across many LEDs or a whole strip, which is useful for power supply sizing and estimating running costs rather than circuit design." }, { question: "Where do I find watts-per-meter for my LED strip?", answer: "It's usually printed on the strip's packaging or spec sheet — common values range from about 4.8W/m for basic strips to 14.4W/m or higher for dense, high-brightness strips. Check your specific product for an accurate figure." }, { question: "Does this account for power supply efficiency losses?", answer: "No — this calculates the LEDs' own power draw. A power supply or driver isn't 100% efficient, so actual wall-outlet power consumption will be somewhat higher than the LED wattage alone, typically by 10-20% depending on the driver." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
