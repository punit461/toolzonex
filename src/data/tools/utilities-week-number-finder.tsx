import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/week-number-finder",
    navName: "Week Number Finder",
    navDescription: "Find the ISO 8601 week number for any date.",
    name: "Week Number Finder",
    description: "Find the ISO 8601 week number (1-53) for any date, correctly handling year-boundary edge cases per the ISO week-numbering standard.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <EventAvailableIcon fontSize="large" color="primary"/>,
    seoTitle: "Week Number Finder - ISO 8601 Week Number Calculator",
    seoDescription: "Find the ISO 8601 week number for any date, with correct handling of year-boundary edge cases. Free online week number finder.",
    keywords: ["week number finder", "iso week number calculator", "what week number is it", "iso 8601 week number", "week of year calculator"],
    ogTitle: "Week Number Finder - ISO 8601 Week Number Calculator | ToolZoneX",
    ogDescription: "Find the ISO 8601 week number for any date, with correct handling of year-boundary edge cases.",
    schemaName: "Week Number Finder",
    schemaDescription: "Find the ISO 8601 week number (1-53) for any date, correctly handling year-boundary edge cases per the ISO week-numbering standard.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Why can a date in December show a week number from \"next year\"?", answer: "Because ISO week 1 is defined as the week containing the year's first Thursday, a Monday, Tuesday, or Wednesday in very late December can belong to the week that contains the following year's first Thursday — making it \"week 1\" of that next ISO year rather than a week of the current one." }, { question: "Why do weeks start on Monday instead of Sunday?", answer: "ISO 8601 specifically defines Monday as the first day of the week, unlike the Sunday-first convention used in some calendars and countries — this tool follows the ISO standard exactly." }, { question: "Can a year have 53 weeks?", answer: "Yes — most years have 52 ISO weeks, but years where the extra day(s) push the first Thursday's week to align differently (and leap years in particular) can have 53 ISO weeks instead." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
