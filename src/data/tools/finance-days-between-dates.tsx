import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/days-between-dates",
    navName: "Days Between Dates Calculator",
    navDescription: "Find the exact number of days between two dates.",
    name: "Days Between Dates Calculator",
    description: "Calculate the exact number of days, weeks, and months between any two calendar dates.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CalendarMonthIcon fontSize="large" color="primary"/>,
    seoTitle: "Days Between Dates Calculator - Date Difference Calculator",
    seoDescription: "Free days between dates calculator. Find the exact number of days, weeks, and months between any two calendar dates.",
    keywords: ["days between dates", "date difference calculator", "days between two dates", "date calculator", "time between dates", "days until"],
    ogTitle: "Days Between Dates Calculator - Date Difference Calculator | ToolZoneX",
    ogDescription: "Find the exact number of days, weeks, and months between any two calendar dates.",
    schemaName: "Days Between Dates Calculator",
    schemaDescription: "Calculate the exact number of days between two calendar dates.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Does it handle leap years?", answer: "Yes — the calculation is based on actual calendar dates, so leap years are counted correctly." }, { question: "What is the maximum date range?", answer: "There is no practical limit — any two valid calendar dates supported by the browser will work." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
