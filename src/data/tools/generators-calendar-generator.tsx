import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/calendar-generator",
    navName: "Calendar Generator",
    navDescription: "Print a clean calendar for any month.",
    name: "Calendar Generator - Any Month & Year",
    description: "Generate a clean, standard 7-column calendar grid for any month and year, with a print-friendly layout.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CalendarMonthIcon fontSize="large" color="primary"/>,
    seoTitle: "Calendar Generator - Print Any Month & Year",
    seoDescription: "Generate a clean, standard calendar grid for any month and year, with a print-friendly layout. Free online tool, no signup required.",
    keywords: ["calendar generator", "printable calendar generator", "monthly calendar maker", "blank calendar generator"],
    ogTitle: "Calendar Generator - Print Any Month & Year | ToolZoneX",
    ogDescription: "Generate a clean, standard 7-column calendar grid for any month and year.",
    schemaName: "Calendar Generator",
    schemaDescription: "Generate a clean, standard 7-column calendar grid for any month and year, with a print-friendly layout.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I generate a calendar for any year?", answer: "Yes — enter any year, past or future, and the calendar grid recalculates automatically, including correctly accounting for leap years." }, { question: "Does this tool support adding events or reminders?", answer: "No — this tool focuses purely on displaying a clean, standard calendar grid for a chosen month." }, { question: "Can I print the calendar?", answer: "Yes — click \"Print\" to open your browser's print dialog, from which you can print directly or save the calendar as a PDF." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
