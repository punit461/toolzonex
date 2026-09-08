import LuggageIcon from '@mui/icons-material/Luggage';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/college-packing-checklist",
    navName: "College Packing Checklist",
    navDescription: "Dorm move-in checklist: bedding, storage, tech, bath & kitchen.",
    name: "College Packing Checklist",
    description: "Build a college dorm move-in checklist by checking common items organized by category — Bedding, Storage, Electronics, Bathroom, and Kitchen/Snacks — plus your own custom items.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <LuggageIcon fontSize="large" color="primary"/>,
    seoTitle: "College Packing Checklist - Dorm Move-In List",
    seoDescription: "Free college packing checklist. Build a dorm move-in list organized by Bedding, Storage, Electronics, Bathroom, and Kitchen.",
    keywords: ["college packing checklist", "dorm move in checklist", "college dorm packing list", "dorm essentials checklist", "college move in list"],
    ogTitle: "College Packing Checklist - Dorm Move-In List | ToolZoneX",
    ogDescription: "Build a college dorm move-in checklist organized by category.",
    schemaName: "College Packing Checklist",
    schemaDescription: "Build a college dorm move-in checklist by checking common items organized by category — Bedding, Storage, Electronics, Bathroom, and Kitchen/Snacks — plus your own custom items.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Packing List Generator?", answer: "The Packing List Generator covers short trips like Beach, Business, Camping, and Winter travel. This tool is specifically for a college dorm move-in — a semester-long living-setup context with dorm-specific categories like bedding and under-bed storage, genuinely different from packing for a short trip." }, { question: "Can I add items specific to my dorm's rules?", answer: "Yes — use the \"Add Custom Item\" field to add anything, and it will appear in the Other section of your final checklist." }, { question: "Is my checklist saved for next time?", answer: "No — the list resets when you reload the page, since it's generated fresh in your browser each visit rather than stored anywhere." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
