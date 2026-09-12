import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/leap-year-checker",
    navName: "Leap Year Checker",
    navDescription: "Check if a year is a leap year.",
    name: "Leap Year Checker",
    description: "Enter any year to instantly find out whether it's a leap year, plus the next 5 leap years that follow. Free online leap year checker.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CalendarMonthIcon fontSize="large" color="primary"/>,
    seoTitle: "Leap Year Checker - Is This Year a Leap Year?",
    seoDescription: "Free online leap year checker. Enter any year to instantly find out whether it's a leap year, plus a list of the next 5 leap years that follow it.",
    keywords: ["leap year checker", "is this a leap year", "leap year calculator", "check leap year", "next leap year"],
    ogTitle: "Leap Year Checker - Is This Year a Leap Year? | ToolZoneX",
    ogDescription: "Enter any year to instantly find out whether it's a leap year.",
    schemaName: "Leap Year Checker",
    schemaDescription: "Enter any year to instantly find out whether it's a leap year, plus the next 5 leap years that follow.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why are century years treated differently?", answer: "The extra \"divisible by 100, except by 400\" rule corrects a small drift in the basic every-4-years rule so the calendar stays aligned with Earth's actual orbit over long periods — this is the Gregorian calendar's leap year rule." }, { question: "Does this work for years before 1582?", answer: "The calculation applies the modern Gregorian rule to any year you enter, including negative or ancient years, though the Gregorian calendar wasn't actually in use before 1582." }, { question: "What years are the next few leap years after 2024?", answer: "2028, 2032, 2036, 2040, and 2044 are all leap years — enter any starting year above to see its own next five." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
