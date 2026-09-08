import CakeIcon from '@mui/icons-material/Cake';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/birthday-party-checklist-generator",
    navName: "Birthday Party Checklist Generator",
    navDescription: "Build a birthday party checklist by category.",
    name: "Birthday Party Checklist Generator",
    description: "Build a birthday party checklist by checking common tasks and items organized by category — Invitations, Decorations, Food & Cake, Activities/Entertainment, and Favors.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CakeIcon fontSize="large" color="primary"/>,
    seoTitle: "Birthday Party Checklist Generator - Party Planning Checklist",
    seoDescription: "Free birthday party checklist generator. Build a party-planning checklist from common tasks organized by Invitations, Decorations, Food, and more.",
    keywords: ["birthday party checklist generator", "birthday party planning checklist", "party checklist", "birthday party planner", "party planning list"],
    ogTitle: "Birthday Party Checklist Generator - Party Planning Checklist | ToolZoneX",
    ogDescription: "Build a birthday party checklist organized by category.",
    schemaName: "Birthday Party Checklist Generator",
    schemaDescription: "Build a birthday party checklist by checking common tasks and items organized by category — Invitations, Decorations, Food & Cake, Activities/Entertainment, and Favors.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I add items that aren't in the pre-set categories?", answer: "Yes — use the \"Add Custom Item\" field to add anything, and it will appear in the Other section of your final list." }, { question: "Is my checklist saved for next time?", answer: "No — it resets when you reload the page, since it's generated fresh in your browser each visit rather than stored anywhere." }, { question: "Can I share this checklist with a co-host?", answer: "Yes — click the Copy button to copy your full grouped list as plain text, ready to paste into a message or shared document." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
