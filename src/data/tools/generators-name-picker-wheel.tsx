import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/name-picker-wheel",
    navName: "Name Picker Wheel",
    navDescription: "Spin a wheel to pick a random name.",
    name: "Name Picker Wheel - Weighted Random Name Picker",
    description: "Spin a wheel to randomly pick a name from your list, with optional weighted entries using a simple ×N syntax.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <DonutLargeIcon fontSize="large" color="primary"/>,
    seoTitle: "Name Picker Wheel - Weighted Random Name Picker",
    seoDescription: "Spin a wheel to randomly pick a name from your list. Free online tool with optional weighted entries using a simple ×N syntax for extra chances.",
    keywords: ["name picker wheel", "random name wheel", "weighted random picker", "spin wheel to pick a name"],
    ogTitle: "Name Picker Wheel - Weighted Random Name Picker | ToolZoneX",
    ogDescription: "Spin a wheel to randomly pick a name from your list, with optional weighted entries.",
    schemaName: "Name Picker Wheel",
    schemaDescription: "Spin a wheel to randomly pick a name from your list, with optional weighted entries using a simple ×N syntax.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Wheel Spinner?", answer: "The Wheel Spinner treats every entry equally. This Name Picker Wheel adds support for weighted entries via the \"×N\" suffix, so you can give specific names a larger slice and a higher chance of winning." }, { question: "What happens if I don't add a weight?", answer: "Any name without a \"×N\" suffix is treated as a normal, single entry (weight of 1), exactly like a standard random name picker." }, { question: "Is the spin genuinely random?", answer: "Yes — the wheel lands on a random angle each spin, and each name's chance of winning is proportional to its slice size (which reflects its weight)." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
