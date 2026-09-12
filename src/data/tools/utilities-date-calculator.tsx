import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/date-calculator",
    navName: "Date Calculator",
    navDescription: "Add days to a date or find duration.",
    name: "Date Calculator",
    description: "Calculate days between two dates, or add and subtract days from a specific date.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CalendarMonthIcon fontSize="large" color="primary"/>,
    seoTitle: "Date Calculator - Days Between Dates & Date Operations",
    seoDescription: "Free date calculator to calculate days between two dates. Add or subtract days from any date with this easy-to-use date calculation tool.",
    keywords: ["date calculator", "days between dates", "date difference", "add days", "subtract days", "date math", "business days calculator"],
    ogTitle: "Date Calculator - Days Between Dates & Date Operations | ToolZoneX",
    ogDescription: "Calculate days between two dates. Add or subtract days from any date.",
    schemaName: "Date Calculator",
    schemaDescription: "Calculate days between dates. Add or subtract days.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
