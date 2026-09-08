import Inventory2Icon from '@mui/icons-material/Inventory2';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/household-inventory-list",
    navName: "Household Inventory List",
    navDescription: "Track items by location: Pantry, Fridge, Freezer, Medicine & more.",
    name: "Household Inventory List",
    description: "Track items by location — Pantry, Refrigerator, Freezer, Medicine Cabinet, or General Household — with quantity and expiry date, grouped into one organized inventory.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <Inventory2Icon fontSize="large" color="primary"/>,
    seoTitle: "Household Inventory List - Pantry, Fridge & Medicine Tracker",
    seoDescription: "Free household inventory list generator. Track pantry, fridge, freezer, and medicine cabinet items with quantity and expiry date.",
    keywords: ["household inventory list", "pantry inventory list", "refrigerator inventory tracker", "freezer inventory list", "medicine cabinet inventory"],
    ogTitle: "Household Inventory List - Pantry, Fridge & Medicine Tracker | ToolZoneX",
    ogDescription: "Track pantry, fridge, freezer, and medicine cabinet items grouped by location.",
    schemaName: "Household Inventory List",
    schemaDescription: "Track items by location — Pantry, Refrigerator, Freezer, Medicine Cabinet, or General Household — with quantity and expiry date, grouped into one organized inventory.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I track multiple locations at once?", answer: "Yes — items you add stay assigned to whichever location was selected when you added them, and the full inventory panel groups everything by location automatically." }, { question: "Does every location show an expiry date field?", answer: "No — Pantry, Refrigerator, Freezer, and Medicine Cabinet show an expiry date field since those items are most likely to expire; General Household does not." }, { question: "Is my inventory saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets on reload, so copy the list before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
