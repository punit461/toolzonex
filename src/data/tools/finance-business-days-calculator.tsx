import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/business-days-calculator",
    navName: "Business Days Calculator",
    navDescription: "Working days & date calculator.",
    name: "Business Days Calculator",
    description: "Calculate an end date from a number of business days, or count business days between two dates (weekends skipped).",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <EventAvailableIcon fontSize="large" color="primary"/>,
    seoTitle: "Business Days Calculator - Working Days Calculator",
    seoDescription: "Free business days calculator to add working days to a date or count business days between dates. Weekends excluded.",
    keywords: ["business days calculator", "working days calculator", "business days from date", "count business days", "workday calculator"],
    ogTitle: "Business Days Calculator - Working Days Calculator | ToolZoneX",
    ogDescription: "Calculate end dates and count working days easily.",
    schemaName: "Business Days Calculator",
    schemaDescription: "Calculate an end date from business days or count business days between dates.",
    applicationCategory: "FinanceApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
