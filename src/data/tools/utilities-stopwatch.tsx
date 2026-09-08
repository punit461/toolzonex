import EventIcon from '@mui/icons-material/Event';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/stopwatch",
    navName: "Stopwatch",
    navDescription: "Online stopwatch with laps.",
    name: "Online Stopwatch with Laps",
    description: "A simple, fast, and precise online stopwatch with millisecond tracking and lap times. Free productivity tool.",
    navCategory: "Time & Productivity",
    shellCategory: "Utilities",
    icon: <EventIcon fontSize="large" color="primary"/>,
    seoTitle: "Online Stopwatch - Free Timer with Laps",
    seoDescription: "A simple, fast, and precise online stopwatch with millisecond tracking and lap times. Free productivity tool.",
    keywords: ["online stopwatch", "stopwatch timer", "stopwatch with laps", "time tracking", "free stopwatch"],
    ogTitle: "Online Stopwatch - Free Timer with Laps | ToolZoneX",
    ogDescription: "A simple, fast, and precise online stopwatch with millisecond tracking and lap times. Free productivity tool.",
    schemaName: "Online Stopwatch",
    schemaDescription: "A simple, fast, and precise online stopwatch with millisecond tracking and lap times.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
