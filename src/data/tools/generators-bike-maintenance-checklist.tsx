import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/bike-maintenance-checklist",
    navName: "Bike Maintenance Checklist",
    navDescription: "Bike upkeep tasks by Before Every Ride, Monthly & Seasonally.",
    name: "Bike Maintenance Checklist",
    description: "Build a bike maintenance checklist by checking common tasks organized by frequency — Before Every Ride, Monthly, and Seasonally — plus your own custom tasks.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <DirectionsBikeIcon fontSize="large" color="primary"/>,
    seoTitle: "Bike Maintenance Checklist - Ride-Ready Upkeep Tasks",
    seoDescription: "Free bike maintenance checklist. Build a checklist from common bike upkeep tasks organized by Before Every Ride, Monthly, and Seasonally.",
    keywords: ["bike maintenance checklist", "bicycle maintenance schedule", "bike upkeep checklist", "cycling maintenance list", "bike tune up checklist"],
    ogTitle: "Bike Maintenance Checklist - Ride-Ready Upkeep Tasks | ToolZoneX",
    ogDescription: "Build a bike maintenance checklist organized by Before Every Ride, Monthly, and Seasonally.",
    schemaName: "Bike Maintenance Checklist",
    schemaDescription: "Build a bike maintenance checklist by checking common tasks organized by frequency — Before Every Ride, Monthly, and Seasonally — plus your own custom tasks.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I add maintenance tasks specific to my bike model?", answer: "Yes — use the \"Add Custom Task\" field to add anything, and it will appear in the Other section of your final checklist." }, { question: "Is my checklist saved for next time?", answer: "No — the list resets when you reload the page, since it's generated fresh in your browser each visit rather than stored anywhere." }, { question: "Why are tasks split by frequency instead of by bike part?", answer: "Organizing by how often each task needs doing — before every ride, monthly, or seasonally — makes it easier to build a realistic maintenance routine you'll actually stick to." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
