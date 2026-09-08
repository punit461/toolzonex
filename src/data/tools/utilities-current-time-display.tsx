import PublicIcon from '@mui/icons-material/Public';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/current-time-display",
    navName: "Current Time Display",
    navDescription: "World clock and local time.",
    name: "Current Time Display",
    description: "View the exact current local time and track timezones across the world with our interactive world clock.",
    navCategory: "Time & Productivity",
    shellCategory: "Utilities",
    icon: <PublicIcon fontSize="large" color="primary"/>,
    seoTitle: "Current Time Display - World Clock & Local Time",
    seoDescription: "View the exact current local time and track timezones across the world with our interactive world clock.",
    keywords: ["current time", "world clock", "local time", "what time is it", "timezone tracker"],
    ogTitle: "Current Time Display - World Clock & Local Time | ToolZoneX",
    ogDescription: "View the exact current local time and track timezones across the world with our interactive world clock.",
    schemaName: "Current Time Display",
    schemaDescription: "View the exact current local time and track timezones across the world with our interactive world clock.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
