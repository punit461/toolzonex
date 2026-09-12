import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/picnic-checklist-generator",
    navName: "Picnic Checklist Generator",
    navDescription: "Build a picnic checklist by Food, Drinks, Gear & Comfort.",
    name: "Picnic Checklist Generator",
    description: "Build a picnic checklist by checking common items organized by category — Food, Drinks, Equipment/Gear, and Comfort — plus your own custom items.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <BeachAccessIcon fontSize="large" color="primary"/>,
    seoTitle: "Picnic Checklist Generator - Food, Drinks & Gear Checklist",
    seoDescription: "Free picnic checklist generator. Build a picnic checklist from common items organized by Food, Drinks, Equipment/Gear, and Comfort.",
    keywords: ["picnic checklist generator", "picnic packing list", "picnic checklist", "what to bring to a picnic", "picnic planner"],
    ogTitle: "Picnic Checklist Generator - Food, Drinks & Gear Checklist | ToolZoneX",
    ogDescription: "Build a picnic checklist organized by Food, Drinks, Gear, and Comfort.",
    schemaName: "Picnic Checklist Generator",
    schemaDescription: "Build a picnic checklist by checking common items organized by category — Food, Drinks, Equipment/Gear, and Comfort — plus your own custom items.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I add items that aren't in the pre-set categories?", answer: "Yes — use the \"Add Custom Item\" field to add anything, and it will appear in the Other section of your final list." }, { question: "Is my checklist saved for next time?", answer: "No — it resets when you reload the page, since it's generated fresh in your browser each visit rather than stored anywhere." }, { question: "Can I share the list with people I'm picnicking with?", answer: "Yes — click the Copy button to copy your full grouped list as plain text, ready to paste into a group chat so everyone knows what to bring." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
