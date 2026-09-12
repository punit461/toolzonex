import EventIcon from '@mui/icons-material/Event';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/timer",
    navName: "Timer",
    navDescription: "Online countdown timer.",
    name: "Online Countdown Timer",
    description: "A simple, fast, and free online countdown timer. Perfect for studying, workouts, cooking, and productivity.",
    navCategory: "Time & Productivity",
    shellCategory: "Utilities",
    icon: <EventIcon fontSize="large" color="primary"/>,
    seoTitle: "Online Countdown Timer - Free Simple Timer",
    seoDescription: "A simple, fast, and free online countdown timer. Perfect for studying, workouts, cooking, and productivity.",
    keywords: ["online timer", "countdown timer", "free timer", "study timer", "workout timer"],
    ogTitle: "Online Countdown Timer - Free Simple Timer | ToolZoneX",
    ogDescription: "A simple, fast, and free online countdown timer. Perfect for studying, workouts, cooking, and productivity.",
    schemaName: "Online Countdown Timer",
    schemaDescription: "A simple, fast, and free online countdown timer. Perfect for studying, workouts, cooking, and productivity.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
