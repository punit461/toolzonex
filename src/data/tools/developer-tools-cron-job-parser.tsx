import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/cron-job-parser",
    navName: "Cron Job Parser",
    navDescription: "Translate cron to plain English.",
    name: "Cron Job Parser - Cron to English Online",
    description: "Translate Cron expressions into human-readable plain English instantly. Free online cron parser.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "Cron Job Parser - Cron to English Online",
    seoDescription: "Translate Cron expressions into human-readable plain English instantly. Free online cron parser.",
    keywords: ["cron job parser", "cron to english", "cron expression reader", "cron translator", "explain cron job"],
    ogTitle: "Cron Job Parser - Cron to English Online | ToolZoneX",
    ogDescription: "Translate Cron expressions into human-readable plain English instantly. Free online cron parser.",
    schemaName: "Cron Job Parser",
    schemaDescription: "Translate Cron expressions into human-readable plain English instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
