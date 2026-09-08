import EventIcon from '@mui/icons-material/Event';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/focus-timer",
    navName: "Focus Timer",
    navDescription: "Pomodoro technique timer.",
    name: "Pomodoro Focus Timer",
    description: "Boost productivity with this free online Pomodoro timer. Alternate between focused work sessions and short breaks to stay fresh.",
    navCategory: "Time & Productivity",
    shellCategory: "Utilities",
    icon: <EventIcon fontSize="large" color="primary"/>,
    seoTitle: "Pomodoro Focus Timer - Boost Productivity Online",
    seoDescription: "Boost productivity with this free online Pomodoro timer. Alternate between focused work sessions and short breaks to stay fresh.",
    keywords: ["pomodoro timer", "focus timer", "productivity timer", "pomodoro technique", "study timer online"],
    ogTitle: "Pomodoro Focus Timer - Boost Productivity Online | ToolZoneX",
    ogDescription: "Boost productivity with this free online Pomodoro timer. Alternate between focused work sessions and short breaks.",
    schemaName: "Pomodoro Focus Timer",
    schemaDescription: "Boost productivity with this free online Pomodoro timer. Alternate between focused work sessions and short breaks to stay fresh.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
