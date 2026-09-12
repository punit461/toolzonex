import KitchenIcon from '@mui/icons-material/Kitchen';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/refrigerator-energy-cost-calculator",
    navName: "Refrigerator Energy Cost Calculator",
    navDescription: "Running cost from wattage & duty cycle.",
    name: "Refrigerator Energy Cost Calculator",
    description: "Estimate daily, monthly, and annual refrigerator electricity cost from wattage, compressor duty cycle, and electricity rate.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <KitchenIcon fontSize="large" color="primary"/>,
    seoTitle: "Refrigerator Energy Cost Calculator - Daily, Monthly & Annual",
    seoDescription: "Free refrigerator energy cost calculator. Enter wattage, duty cycle, and electricity rate to estimate daily, monthly, and annual running cost.",
    keywords: ["refrigerator energy cost calculator", "refrigerator electricity cost calculator", "how much does it cost to run a fridge", "fridge running cost calculator", "refrigerator power usage calculator"],
    ogTitle: "Refrigerator Energy Cost Calculator - Daily, Monthly & Annual | ToolZoneX",
    ogDescription: "Estimate refrigerator electricity cost from wattage, duty cycle, and electricity rate.",
    schemaName: "Refrigerator Energy Cost Calculator",
    schemaDescription: "Estimate refrigerator electricity cost as wattage converted to kWh times duty cycle percentage times electricity rate, shown daily, monthly, and annually.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Refrigerator Size Calculator?", answer: "The Refrigerator Size Calculator recommends a capacity in cubic feet based on your household size — it's about how big a fridge you need. This tool instead estimates the ongoing electricity cost of running a refrigerator you already have (or are considering), based on its wattage and duty cycle." }, { question: "Why isn't the refrigerator running at full wattage all the time?", answer: "The rated wattage on a refrigerator's label reflects peak draw when the compressor is actively running, not a continuous draw. Once the interior reaches its target temperature, the compressor shuts off until temperature rises again, so actual average power use is much lower than the rated wattage over a full day." }, { question: "Where can I find my refrigerator's actual duty cycle?", answer: "It's rarely listed directly — the default of 30-40% used here is a reasonable estimate for a typical household refrigerator. For a more precise figure, a plug-in electricity usage monitor over a few days will give you your specific unit's real-world average." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
