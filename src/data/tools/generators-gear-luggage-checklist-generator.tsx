import LuggageIcon from '@mui/icons-material/Luggage';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/gear-luggage-checklist-generator",
    navName: "Gear & Luggage Checklist Generator",
    navDescription: "Luggage inventory, hiking gear & photography gear checklists.",
    name: "Gear & Luggage Checklist Generator",
    description: "Track luggage contents per bag, or check off Hiking Gear or Photography Gear essentials, in one combined gear checklist tool.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <LuggageIcon fontSize="large" color="primary"/>,
    seoTitle: "Gear & Luggage Checklist Generator - Packing Made Easy",
    seoDescription: "Free gear and luggage checklist generator. Track luggage contents per bag, or check off hiking and photography gear essentials.",
    keywords: ["luggage inventory list", "hiking gear checklist", "photography gear checklist", "packing checklist generator", "gear checklist tool"],
    ogTitle: "Gear & Luggage Checklist Generator - Packing Made Easy | ToolZoneX",
    ogDescription: "Track luggage contents per bag, or check off hiking and photography gear.",
    schemaName: "Gear & Luggage Checklist Generator",
    schemaDescription: "Track luggage contents per bag, or check off Hiking Gear or Photography Gear essentials, in one combined gear checklist tool.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Do the three categories share the same list?", answer: "No — Luggage Inventory, Hiking Gear, and Photography Gear each keep their own separate items and checked state, so switching categories doesn't affect the others." }, { question: "Can I have multiple bags in the Luggage Inventory?", answer: "Yes — just type a different bag name on each item, and the list on the right automatically groups items under their bag name." }, { question: "Is my list saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets on reload, so copy the list before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
