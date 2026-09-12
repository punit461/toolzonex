import CelebrationIcon from '@mui/icons-material/Celebration';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/wedding-checklist-generator",
    navName: "Wedding Checklist Generator",
    navDescription: "Build a wedding planning checklist by timeline stage.",
    name: "Wedding Checklist Generator",
    description: "Build a wedding-planning checklist with genuinely useful tasks organized by timeline — 12 Months Before, 6 Months Before, 3 Months Before, 1 Month Before, and Week Of.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CelebrationIcon fontSize="large" color="primary"/>,
    seoTitle: "Wedding Checklist Generator - Timeline-Based Planning Checklist",
    seoDescription: "Free wedding checklist generator. Build a wedding-planning checklist organized by timeline, from 12 months before to the week of.",
    keywords: ["wedding checklist generator", "wedding planning checklist", "wedding timeline checklist", "wedding to-do list", "wedding planner checklist"],
    ogTitle: "Wedding Checklist Generator - Timeline-Based Planning Checklist | ToolZoneX",
    ogDescription: "Build a wedding-planning checklist organized by timeline stage.",
    schemaName: "Wedding Checklist Generator",
    schemaDescription: "Build a wedding-planning checklist with genuinely useful tasks organized by timeline — 12 Months Before, 6 Months Before, 3 Months Before, 1 Month Before, and Week Of.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What if my engagement is shorter than 12 months?", answer: "Start from whichever timeline stage matches your remaining time — the tasks are still relevant even if you compress several stages into a shorter window." }, { question: "Can I add tasks specific to my own wedding?", answer: "Yes — use the \"Add Custom Task\" field for anything not already listed, such as booking hotel blocks for out-of-town guests." }, { question: "Is my checklist saved between visits?", answer: "No — it resets on reload, so copy your checklist to a notes app or planning document if you want a lasting reference throughout your engagement." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
