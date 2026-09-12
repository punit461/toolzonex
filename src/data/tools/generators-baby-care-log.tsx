import ChildCareIcon from '@mui/icons-material/ChildCare';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/baby-care-log",
    navName: "Baby Care Log",
    navDescription: "Feeding and sleep log with auto-calculated sleep duration.",
    name: "Baby Care Log",
    description: "Log feedings (time, type, amount) and sleep sessions (start, end) in one session-only log, with sleep duration calculated automatically.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ChildCareIcon fontSize="large" color="primary"/>,
    seoTitle: "Baby Care Log - Feeding & Sleep Tracker",
    seoDescription: "Free baby care log. Track feedings and sleep sessions in one place, with sleep duration calculated automatically.",
    keywords: ["baby care log", "baby feeding log", "baby sleep tracker", "infant feeding log", "baby daily log"],
    ogTitle: "Baby Care Log - Feeding & Sleep Tracker | ToolZoneX",
    ogDescription: "Track baby feedings and sleep sessions with automatic sleep duration calculation.",
    schemaName: "Baby Care Log",
    schemaDescription: "Log feedings (time, type, amount) and sleep sessions (start, end) in one session-only log, with sleep duration calculated automatically.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does this replace a dedicated baby-tracking app?", answer: "No — this is a session-only reference log kept in your browser, useful for jotting things down during the day or printing a daily summary. If you need ongoing, persistent history across days, a dedicated baby-tracking app is a better fit." }, { question: "How is sleep duration calculated for sessions that cross midnight?", answer: "If the end time is earlier than the start time, the tool assumes the session crossed midnight and adds 24 hours before calculating the duration." }, { question: "Is my baby care log saved anywhere?", answer: "No — everything resets when you reload the page, since it's kept only in your browser for the current session, so copy the summary before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
