import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/holiday-list-generator",
    navName: "Holiday List Generator",
    navDescription: "Compute US federal holiday dates for any year.",
    name: "Holiday List Generator",
    description: "Compute the dates of major US federal holidays for any year, correctly calculating both fixed-date and Nth-weekday-of-month holidays.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CalendarMonthIcon fontSize="large" color="primary"/>,
    seoTitle: "Holiday List Generator - US Federal Holidays by Year",
    seoDescription: "Free holiday list generator. Compute the dates of major US federal holidays for any year, including floating holidays like Thanksgiving and Memorial Day.",
    keywords: ["holiday list generator", "us federal holidays by year", "holiday calendar generator", "memorial day date calculator", "thanksgiving date calculator"],
    ogTitle: "Holiday List Generator - US Federal Holidays by Year | ToolZoneX",
    ogDescription: "Compute major US federal holiday dates for any year.",
    schemaName: "Holiday List Generator",
    schemaDescription: "Compute the dates of major US federal holidays for any year, correctly calculating both fixed-date and Nth-weekday-of-month holidays.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Why do some holidays fall on a different date every year?", answer: "Holidays defined as \"the Nth weekday of a month\" (like the 3rd Monday of January for MLK Day) depend on which day of the week the month starts on, so the specific date shifts from year to year even though the underlying rule stays the same." }, { question: "Does this include state or religious holidays?", answer: "No — this tool covers only the major US federal holidays. State-specific observances and religious or cultural holidays aren't included." }, { question: "What happens if a fixed-date holiday falls on a weekend?", answer: "This tool always shows the holiday's actual calendar date. Many employers observe a substitute day off (the nearest Friday or Monday) when a fixed holiday lands on a weekend, but that observed date is a separate employer policy, not shown here." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
