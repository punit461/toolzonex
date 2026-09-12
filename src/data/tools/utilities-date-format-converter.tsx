import DateRangeIcon from '@mui/icons-material/DateRange';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/date-format-converter",
    navName: "Date Format Converter",
    navDescription: "See one date in 5 common formats at once.",
    name: "Date Format Converter",
    description: "Convert a date into five common formats at once: MM/DD/YYYY, DD/MM/YYYY, ISO 8601, and two written-out styles.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <DateRangeIcon fontSize="large" color="primary"/>,
    seoTitle: "Date Format Converter - MM/DD/YYYY, ISO 8601 & More",
    seoDescription: "Free date format converter. See any date instantly in MM/DD/YYYY, DD/MM/YYYY, ISO 8601, and written-out formats.",
    keywords: ["date format converter", "date format changer", "iso 8601 date converter", "mm dd yyyy converter", "date format lookup"],
    ogTitle: "Date Format Converter - MM/DD/YYYY, ISO 8601 & More | ToolZoneX",
    ogDescription: "See any date instantly in five common formats.",
    schemaName: "Date Format Converter",
    schemaDescription: "Convert a date into five common formats at once: MM/DD/YYYY, DD/MM/YYYY, ISO 8601, and two written-out styles.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Why do MM/DD/YYYY and DD/MM/YYYY matter so much?", answer: "The same numeric date can mean two different days depending on the convention — 03/04/2026 is March 4th in the US format but April 3rd in the international format — which is exactly why seeing them side by side helps avoid mistakes." }, { question: "What is ISO 8601 format used for?", answer: "YYYY-MM-DD is an international standard designed to sort correctly as plain text and avoid regional ambiguity, which is why it's the standard format for databases, APIs, log files, and filenames." }, { question: "Does this account for time zones?", answer: "No — the date you pick is treated as a calendar date only, with no time-of-day or time zone component, so the formatted output is the same regardless of your location." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
