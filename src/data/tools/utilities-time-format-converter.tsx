import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/time-format-converter",
    navName: "Time Format Converter",
    navDescription: "Convert between 12-hour and 24-hour time.",
    name: "Time Format Converter",
    description: "Convert times bidirectionally between 12-hour format with AM/PM and 24-hour format.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AccessTimeIcon fontSize="large" color="primary"/>,
    seoTitle: "Time Format Converter - 12-Hour to 24-Hour & Back",
    seoDescription: "Free time format converter. Convert between 12-hour AM/PM format and 24-hour format instantly, in either direction.",
    keywords: ["time format converter", "12 hour to 24 hour converter", "24 hour to 12 hour converter", "military time converter", "am pm time converter"],
    ogTitle: "Time Format Converter - 12-Hour to 24-Hour & Back | ToolZoneX",
    ogDescription: "Convert between 12-hour and 24-hour time formats instantly.",
    schemaName: "Time Format Converter",
    schemaDescription: "Convert times bidirectionally between 12-hour format with AM/PM and 24-hour format.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What does 12:00 AM and 12:00 PM mean in 24-hour time?", answer: "12:00 AM (midnight) is 00:00 in 24-hour format, and 12:00 PM (noon) is 12:00 — a common point of confusion this converter handles automatically." }, { question: "Does this handle seconds?", answer: "No — this converter works with hours and minutes only, which covers the vast majority of everyday time conversion needs." }, { question: "Why is 24-hour format also called \"military time\"?", answer: "It's the standard time format used by militaries and many countries worldwide specifically because it removes any AM/PM ambiguity — each hour of the day has one unique number from 00 to 23." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
