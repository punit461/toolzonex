import LightbulbIcon from '@mui/icons-material/Lightbulb';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/light-bulb-savings-calculator",
    navName: "Light Bulb Savings Calculator",
    navDescription: "Cost savings from switching to LED.",
    name: "Light Bulb Savings Calculator",
    description: "Calculate cost savings and payback period from switching a bulb from incandescent to LED, based on wattage difference and usage.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LightbulbIcon fontSize="large" color="primary"/>,
    seoTitle: "Light Bulb Savings Calculator - LED vs Incandescent Savings",
    seoDescription: "Free light bulb savings calculator. Compare incandescent and LED wattage to calculate cost savings and payback period.",
    keywords: ["light bulb savings calculator", "led savings calculator", "incandescent vs led savings calculator", "led payback period calculator", "led bulb cost savings calculator"],
    ogTitle: "Light Bulb Savings Calculator - LED vs Incandescent Savings | ToolZoneX",
    ogDescription: "Calculate cost savings and payback period from switching a bulb from incandescent to LED.",
    schemaName: "Light Bulb Savings Calculator",
    schemaDescription: "Calculate daily cost savings from the wattage difference between an incandescent bulb and its LED equivalent, hours used, and electricity rate, plus an optional payback period.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the LED Wattage Calculator?", answer: "The LED Wattage Calculator sums total power draw across many LEDs or an entire LED strip, useful for power supply sizing. This tool instead compares the cost savings from switching a single bulb from incandescent to its LED equivalent, including an optional payback-period estimate." }, { question: "Are LED bulbs really that much more efficient?", answer: "Yes — LEDs typically use roughly 75-85% less energy than incandescent bulbs to produce the same amount of light, which is why even a small per-bulb wattage difference adds up to meaningful savings over months and years of use." }, { question: "Does this account for LED bulb lifespan?", answer: "No — this only calculates energy cost savings. LED bulbs also typically last many times longer than incandescent bulbs, which means additional savings from not having to buy and replace incandescent bulbs as often, on top of the energy savings shown here." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
