import EventIcon from '@mui/icons-material/Event';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/time-calculator",
    navName: "Time Calculator",
    navDescription: "Add/subtract time durations.",
    name: "Time Calculator",
    description: "Add or subtract days, hours, minutes, and seconds easily. Free online time duration calculator.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <EventIcon fontSize="large" color="primary"/>,
    seoTitle: "Time Calculator - Add & Subtract Hours, Minutes, Seconds",
    seoDescription: "Add or subtract days, hours, minutes, and seconds easily. Free online time duration calculator.",
    keywords: ["time calculator", "add time", "subtract time", "time duration calculator", "hours and minutes calculator"],
    ogTitle: "Time Calculator - Add & Subtract Hours, Minutes, Seconds | ToolZoneX",
    ogDescription: "Add or subtract days, hours, minutes, and seconds easily.",
    schemaName: "Time Calculator",
    schemaDescription: "Add or subtract days, hours, minutes, and seconds easily.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
