import LuggageIcon from '@mui/icons-material/Luggage';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/packing-list-generator",
    navName: "Packing List Generator",
    navDescription: "Generate a packing checklist based on trip type and length.",
    name: "Packing List Generator",
    description: "Generate a packing checklist based on trip type (Beach, Business, Camping, and more) and trip length, with quantities that scale automatically.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <LuggageIcon fontSize="large" color="primary"/>,
    seoTitle: "Packing List Generator - Trip Checklist Online",
    seoDescription: "Generate a packing checklist based on trip type and length, with quantities that scale automatically. Free online packing list maker.",
    keywords: ["packing list generator", "travel packing checklist", "packing list maker", "vacation packing list", "trip checklist generator"],
    ogTitle: "Packing List Generator - Trip Checklist Online | ToolZoneX",
    ogDescription: "Generate a packing checklist based on trip type and length, with quantities that scale automatically.",
    schemaName: "Packing List Generator",
    schemaDescription: "Generate a packing checklist based on trip type (Beach, Business, Camping, and more) and trip length, with quantities that scale automatically.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does the list update automatically when I change trip length?", answer: "Yes — quantity-based items like underwear and socks recalculate instantly whenever you change the number of days, using days + 1 as the quantity." }, { question: "Can I check off items as I pack?", answer: "Yes — click any item to mark it packed; checked items appear crossed out." }, { question: "Can I save my progress?", answer: "Checked items are only kept for your current browser session and reset on reload, so copy or print your list if you need a lasting copy." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
