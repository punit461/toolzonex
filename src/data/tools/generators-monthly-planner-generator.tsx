import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/monthly-planner-generator",
    navName: "Monthly Planner Generator",
    navDescription: "Build a correct calendar grid for any month with notes.",
    name: "Monthly Planner Generator",
    description: "Generate a correct calendar grid for any month and year, computed from JavaScript's Date object, with a note field for each day.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CalendarMonthIcon fontSize="large" color="primary"/>,
    seoTitle: "Monthly Planner Generator - Printable Monthly Calendar Online",
    seoDescription: "Generate a correct calendar grid for any month and year with a note field for each day. Free online monthly planner generator.",
    keywords: ["monthly planner generator", "printable monthly calendar", "monthly calendar maker", "month planner template", "calendar grid generator"],
    ogTitle: "Monthly Planner Generator - Printable Monthly Calendar Online | ToolZoneX",
    ogDescription: "Generate a correct calendar grid for any month and year with a note field for each day.",
    schemaName: "Monthly Planner Generator",
    schemaDescription: "Generate a correct calendar grid for any month and year, computed from JavaScript's Date object, with a note field for each day.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does the calendar handle leap years correctly?", answer: "Yes — the number of days in the month is calculated directly from JavaScript's Date object rather than a hardcoded table, so February automatically shows 29 days in leap years and 28 otherwise." }, { question: "Is my monthly plan saved?", answer: "No — notes are kept only in your browser's memory for the current visit, and switching the month or year, or reloading the page, clears them, so copy the text version if you need to keep it." }, { question: "Why does the week start on Monday?", answer: "This follows the ISO/international convention of a Monday-first week, which is common on printable planners; the weekday header row shows Mon through Sun to make the alignment clear." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
