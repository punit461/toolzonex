import DateRangeIcon from '@mui/icons-material/DateRange';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/date-difference-calculator",
    navName: "Date Difference Calculator",
    navDescription: "Days, weeks, months & years between two dates.",
    name: "Date Difference Calculator",
    description: "Find the exact difference between two dates in total days, weeks, and a years/months/days breakdown.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <DateRangeIcon fontSize="large" color="primary"/>,
    seoTitle: "Date Difference Calculator - Days Between Two Dates",
    seoDescription: "Free date difference calculator to find the exact number of days, weeks, months, and years between any two dates.",
    keywords: ["date difference calculator", "days between two dates", "date difference in days", "how many days between dates", "days weeks months calculator"],
    ogTitle: "Date Difference Calculator - Days Between Two Dates | ToolZoneX",
    ogDescription: "Find the exact difference between two dates in days, weeks, months, and years.",
    schemaName: "Date Difference Calculator",
    schemaDescription: "Find the exact difference between two dates in total days, weeks, and a years/months/days breakdown.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the site's Date Calculator?", answer: "The Date Calculator also supports adding or subtracting years/months/days from a date to find a new date. This tool is a lighter, single-purpose version focused purely on finding the difference between two dates you already have." }, { question: "Does the order I enter the dates matter?", answer: "No — the calculator automatically treats the earlier date as the start and the later date as the end, so entering them in either order gives the same result." }, { question: "Does this account for leap years?", answer: "Yes, leap years and varying month lengths are handled automatically in both the total day count and the years/months/days breakdown." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
