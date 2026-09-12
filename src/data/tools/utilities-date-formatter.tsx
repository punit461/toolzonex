import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/date-formatter",
    navName: "Date Formatter",
    navDescription: "Format dates in multiple styles at once.",
    name: "Date Formatter - Format Dates in Any Style Online",
    description: "Select a date and see it formatted in eight common styles — ISO, US, European, and written-out formats — all rendered at once. Free, runs in your browser.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CalendarMonthIcon fontSize="large" color="primary"/>,
    seoTitle: "Date Formatter - Format Dates in Any Style Online",
    seoDescription: "Free online date formatter. Convert any date to ISO, US, European, and other common formats. See all formats at once. Client-side only.",
    keywords: ["date formatter", "format date", "date format converter", "change date format"],
    ogTitle: "Date Formatter - Format Dates in Any Style Online | ToolZoneX",
    ogDescription: "Select a date and see it in eight common formats at once. Free online date formatter.",
    schemaName: "Date Formatter",
    schemaDescription: "Select a date and see it formatted in eight common styles at once.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
