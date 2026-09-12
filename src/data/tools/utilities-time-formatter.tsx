import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/time-formatter",
    navName: "Time Formatter",
    navDescription: "Format time in 24h, 12h, epoch & words.",
    name: "Time Formatter",
    description: "Format a time in multiple ways — 24-hour, 12-hour AM/PM, epoch seconds, ISO 8601, and written-out words — live as you type.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AccessTimeIcon fontSize="large" color="primary"/>,
    seoTitle: "Time Formatter - 24h, 12h, Epoch & Words Converter",
    seoDescription: "Free time formatter. Convert hours, minutes, and seconds into 24-hour, 12-hour AM/PM, epoch, ISO 8601, and written-words formats instantly.",
    keywords: ["time formatter", "24 hour time converter", "12 hour time converter", "time to epoch", "time format converter", "time to words", "epoch from time", "time in words"],
    ogTitle: "Time Formatter - 24h, 12h, Epoch & Words Converter | ToolZoneX",
    ogDescription: "Format a time in multiple ways — 24-hour, 12-hour AM/PM, epoch seconds, ISO 8601, and written-out words — live as you type.",
    schemaName: "Time Formatter",
    schemaDescription: "Format hours, minutes, and seconds into 24-hour, 12-hour, epoch, ISO 8601, and written-words formats.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is an epoch timestamp?", answer: "An epoch timestamp is the number of seconds elapsed since midnight UTC on January 1, 1970 (the Unix epoch). This tool calculates the offset from midnight for the entered time, not the full date-based timestamp." }, { question: "Does this handle midnight (00:00 or 12:00 AM)?", answer: "Yes. In 24-hour format, midnight is 00:00:00. In 12-hour format, it displays as 12:00:00 AM." }, { question: "Why use words format?", answer: "The words format is useful for screen readers, voice assistants, natural-language text, and any UI where a human-friendly time display is preferred over digital notation." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
