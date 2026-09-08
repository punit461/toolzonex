import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/home-maintenance-checklist",
    navName: "Home Maintenance Checklist",
    navDescription: "Seasonal structural upkeep tasks by Spring, Summer, Fall, Winter.",
    name: "Home Maintenance Checklist",
    description: "Build a seasonal home maintenance checklist by checking common structural and mechanical upkeep tasks organized by Spring, Summer, Fall, and Winter, plus your own custom tasks.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <HomeRepairServiceIcon fontSize="large" color="primary"/>,
    seoTitle: "Home Maintenance Checklist - Seasonal Upkeep Tasks",
    seoDescription: "Free home maintenance checklist. Build a seasonal upkeep checklist organized by Spring, Summer, Fall, and Winter.",
    keywords: ["home maintenance checklist", "seasonal home maintenance", "house maintenance schedule", "home upkeep checklist", "seasonal maintenance list"],
    ogTitle: "Home Maintenance Checklist - Seasonal Upkeep Tasks | ToolZoneX",
    ogDescription: "Build a seasonal home maintenance checklist organized by Spring, Summer, Fall, and Winter.",
    schemaName: "Home Maintenance Checklist",
    schemaDescription: "Build a seasonal home maintenance checklist by checking common structural and mechanical upkeep tasks organized by Spring, Summer, Fall, and Winter, plus your own custom tasks.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Cleaning Checklist Generator?", answer: "The Cleaning Checklist Generator covers routine cleaning and tidying tasks organized by Daily, Weekly, and Monthly frequency. This tool covers seasonal structural and mechanical upkeep — gutters, HVAC, weatherproofing, and safety checks — a different category of home care." }, { question: "Can I add maintenance tasks specific to my home?", answer: "Yes — use the \"Add Custom Task\" field to add anything, and it will appear in the Other section of your final checklist." }, { question: "Is my checklist saved for next time?", answer: "No — the list resets when you reload the page, since it's generated fresh in your browser each visit rather than stored anywhere." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
