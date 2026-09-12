import EventIcon from '@mui/icons-material/Event';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/day-name-finder",
    navName: "Day Name Finder",
    navDescription: "Find what day of the week any date falls on.",
    name: "Day Name Finder",
    description: "Find the day of the week (Monday, Tuesday, etc.) for any past, present, or future date.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <EventIcon fontSize="large" color="primary"/>,
    seoTitle: "Day Name Finder - What Day of the Week Was/Is That Date?",
    seoDescription: "Find the day of the week for any date, past or future. Free online day name finder using JavaScript's native date calculation.",
    keywords: ["day name finder", "what day of the week", "day of week calculator", "find day from date", "weekday finder"],
    ogTitle: "Day Name Finder - What Day of the Week Was/Is That Date? | ToolZoneX",
    ogDescription: "Find the day of the week for any date, past or future.",
    schemaName: "Day Name Finder",
    schemaDescription: "Find the day of the week (Monday, Tuesday, etc.) for any past, present, or future date.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How far back or forward can I check?", answer: "Any date supported by JavaScript's Date object works, which covers a range of roughly ±270,000 years from today — far beyond any practical need." }, { question: "Does this account for the switch from the Julian to Gregorian calendar?", answer: "No — this tool calculates purely using the modern Gregorian calendar system for every date, so very old historical dates (particularly before the Gregorian calendar's adoption in a given region) may not match the day of the week recorded in historical sources using the older Julian calendar." }, { question: "Does the result depend on my time zone?", answer: "No — the date you pick is treated as a calendar date rather than a specific moment in time, so the day-of-week result is the same regardless of which time zone you're in." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
