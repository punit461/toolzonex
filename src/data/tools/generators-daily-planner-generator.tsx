import ScheduleIcon from '@mui/icons-material/Schedule';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/daily-planner-generator",
    navName: "Daily Planner Generator",
    navDescription: "Build a printable daily planner with priorities and schedule.",
    name: "Daily Planner Generator",
    description: "Create a printable daily planner with a date field, top 3 priorities, an hour-by-hour schedule, and a notes section, then copy it as plain text.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ScheduleIcon fontSize="large" color="primary"/>,
    seoTitle: "Daily Planner Generator - Printable Daily Planner Online",
    seoDescription: "Create a printable daily planner with top priorities, an hour-by-hour schedule, and notes. Free online daily planner generator.",
    keywords: ["daily planner generator", "printable daily planner", "daily schedule maker", "hourly planner template", "daily planner template"],
    ogTitle: "Daily Planner Generator - Printable Daily Planner Online | ToolZoneX",
    ogDescription: "Create a printable daily planner with top priorities, an hour-by-hour schedule, and notes.",
    schemaName: "Daily Planner Generator",
    schemaDescription: "Create a printable daily planner with a date field, top 3 priorities, an hour-by-hour schedule, and a notes section, then copy it as plain text.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Is my planner saved anywhere?", answer: "No — everything is kept only in your browser's memory for the current visit. Copy the text version out or print it if you want to keep it, since reloading the page clears it." }, { question: "Can I change the hour range?", answer: "Yes — set any start and end hour (0-23 for start, 1-24 for end) to plan a shorter block like a workday, or a longer one covering early morning to late night." }, { question: "Can I print this directly?", answer: "Yes — use the \"Copy as Text\" button to copy the plain-text version, then paste it into a document or note app and print from there for a clean, ready-to-fill layout." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
