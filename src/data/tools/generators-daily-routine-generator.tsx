import ScheduleIcon from '@mui/icons-material/Schedule';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/daily-routine-generator",
    navName: "Daily Routine Generator",
    navDescription: "Build a Morning, Afternoon, and Evening daily routine.",
    name: "Daily Routine Generator",
    description: "Build a structured daily routine with editable Morning, Afternoon, and Evening sections, exportable as a copyable or printable plan.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ScheduleIcon fontSize="large" color="primary"/>,
    seoTitle: "Daily Routine Generator - Morning, Afternoon & Evening Planner",
    seoDescription: "Free daily routine generator. Build a structured Morning, Afternoon, and Evening routine and export it as a copyable, printable plan.",
    keywords: ["daily routine generator", "morning routine generator", "evening routine generator", "daily schedule maker", "daily routine planner"],
    ogTitle: "Daily Routine Generator - Morning, Afternoon & Evening Planner | ToolZoneX",
    ogDescription: "Build a structured daily routine covering morning, afternoon, and evening.",
    schemaName: "Daily Routine Generator",
    schemaDescription: "Build a structured daily routine with editable Morning, Afternoon, and Evening sections, exportable as a copyable or printable plan.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Why is this one tool instead of separate morning and evening routine builders?", answer: "Structuring Morning, Afternoon, and Evening into a single page lets you see and plan your whole day at once, rather than jumping between three separate near-identical tools." }, { question: "Is my routine saved between visits?", answer: "No — it's generated fresh in your browser each time and resets on reload, so copy or print it if you want to keep a lasting copy." }, { question: "Can I have more than three items in a section?", answer: "Yes — click Add Item as many times as you like in any section; there's no fixed limit on how many routine items each time of day can hold." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
