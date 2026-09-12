import ScheduleIcon from '@mui/icons-material/Schedule';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/cron-expression-generator",
    navName: "Cron Expression Generator",
    navDescription: "Build cron schedules visually.",
    name: "Cron Expression Generator",
    description: "Build 5-field cron expressions from an easy visual schedule builder. Free online cron generator.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <ScheduleIcon fontSize="large" color="primary"/>,
    seoTitle: "Cron Expression Generator - Visual Cron Builder Online",
    seoDescription: "Free visual cron builder. Pick minute, hour, and day settings or use presets to instantly generate copyable 5-field cron expressions.",
    keywords: ["cron expression generator", "cron generator", "cron builder", "create cron job", "cron schedule generator"],
    ogTitle: "Cron Expression Generator - Visual Cron Builder Online | ToolZoneX",
    ogDescription: "Build 5-field cron expressions from a visual schedule builder.",
    schemaName: "Cron Expression Generator",
    schemaDescription: "Build 5-field cron expressions from a visual schedule builder.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
