import DateRangeIcon from '@mui/icons-material/DateRange';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/weekly-planner-generator",
    navName: "Weekly Planner Generator",
    navDescription: "Build a 7-day planner grid with tasks per day.",
    name: "Weekly Planner Generator",
    description: "Create a Monday-through-Sunday weekly planner grid with a task list for each day, then copy it as plain text for printing.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <DateRangeIcon fontSize="large" color="primary"/>,
    seoTitle: "Weekly Planner Generator - Printable Weekly Planner Online",
    seoDescription: "Create a 7-day weekly planner grid with a task list for each day. Free online weekly planner generator with a printable text output.",
    keywords: ["weekly planner generator", "printable weekly planner", "weekly schedule maker", "weekly task planner", "week planner template"],
    ogTitle: "Weekly Planner Generator - Printable Weekly Planner Online | ToolZoneX",
    ogDescription: "Create a 7-day weekly planner grid with a task list for each day.",
    schemaName: "Weekly Planner Generator",
    schemaDescription: "Create a Monday-through-Sunday weekly planner grid with a task list for each day, then copy it as plain text for printing.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Is my weekly plan saved?", answer: "No — it only lives in your browser's memory for the current visit and resets on reload, so copy or print it out if you want to keep a copy." }, { question: "Why does the grid always start on Monday?", answer: "This follows the common weekly-planner convention of a Monday-to-Sunday week. If you prefer a Sunday start, just treat the Sunday column as your first day when filling it in." }, { question: "Can I add more than one task per day?", answer: "Yes — each day's box is a free-form text area, so add as many tasks as you like, one per line, and they'll all appear as separate bullet points in the printable preview." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
