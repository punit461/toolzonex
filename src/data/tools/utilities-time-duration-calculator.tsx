import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/time-duration-calculator",
    navName: "Time Duration Calculator",
    navDescription: "Duration between two clock times.",
    name: "Time Duration Calculator",
    description: "Calculate the duration in hours and minutes between a start clock time and an end clock time.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AccessTimeIcon fontSize="large" color="primary"/>,
    seoTitle: "Time Duration Calculator - Time Between Two Clock Times",
    seoDescription: "Free time duration calculator to find the hours and minutes between a start time and an end time, including overnight shifts that cross midnight.",
    keywords: ["time duration calculator", "time between two times calculator", "hours between times calculator", "duration calculator", "time difference calculator"],
    ogTitle: "Time Duration Calculator - Time Between Two Clock Times | ToolZoneX",
    ogDescription: "Find the hours and minutes between a start time and an end time.",
    schemaName: "Time Duration Calculator",
    schemaDescription: "Calculate the duration in hours and minutes between a start clock time and an end clock time.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the site's Time Calculator?", answer: "The Time Calculator adds or subtracts a duration (like 2 hours 30 minutes) from a starting duration. This tool instead takes two clock times — a start and an end — and tells you how much time elapsed between them, which is a different and more common everyday question." }, { question: "What happens if I enter the same start and end time?", answer: "With \"Ends Next Day\" off, identical start and end times return a duration of 0 hours 0 minutes. With it turned on, the calculator assumes a full 24 hours passed." }, { question: "Does this handle 12-hour (AM/PM) times?", answer: "Yes — the time fields use your browser's native time picker, which displays in either 12-hour (AM/PM) or 24-hour format depending on your device and locale settings, while the calculation itself always works correctly under the hood." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
