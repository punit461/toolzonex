import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/cleaning-checklist-generator",
    navName: "Cleaning Checklist Generator",
    navDescription: "Build a cleaning checklist by Daily, Weekly, and Monthly tasks.",
    name: "Cleaning Checklist Generator",
    description: "Build a cleaning checklist by checking common tasks organized by frequency — Daily, Weekly, and Monthly — plus your own custom tasks.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CleaningServicesIcon fontSize="large" color="primary"/>,
    seoTitle: "Cleaning Checklist Generator - Daily, Weekly & Monthly Tasks",
    seoDescription: "Free cleaning checklist generator. Build a cleaning checklist from common tasks organized by Daily, Weekly, and Monthly frequency.",
    keywords: ["cleaning checklist generator", "house cleaning checklist", "weekly cleaning schedule", "cleaning schedule maker", "deep cleaning checklist"],
    ogTitle: "Cleaning Checklist Generator - Daily, Weekly & Monthly Tasks | ToolZoneX",
    ogDescription: "Build a cleaning checklist organized by Daily, Weekly, and Monthly frequency.",
    schemaName: "Cleaning Checklist Generator",
    schemaDescription: "Build a cleaning checklist by checking common tasks organized by frequency — Daily, Weekly, and Monthly — plus your own custom tasks.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I add tasks that aren't in the pre-set lists?", answer: "Yes — use the \"Add Custom Task\" field to add anything, and it will appear in the Other section of your final checklist." }, { question: "Is my checklist saved for next time?", answer: "No — it resets when you reload the page, since it's generated fresh in your browser each visit rather than stored anywhere." }, { question: "Why are tasks split by Daily, Weekly, and Monthly instead of by room?", answer: "Organizing by frequency makes it easier to build a realistic cleaning rhythm — you can see at a glance what needs attention today versus what only needs doing once a month." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
