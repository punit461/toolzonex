import NightlightIcon from '@mui/icons-material/Nightlight';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/zodiac-calculator",
    navName: "Zodiac Calculator",
    navDescription: "Find your Western zodiac sign from birth date.",
    name: "Zodiac Calculator - Find Your Western Zodiac Sign",
    description: "Find your Western zodiac sign from your birth date, with a full reference table of zodiac sign date ranges.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <NightlightIcon fontSize="large" color="primary"/>,
    seoTitle: "Zodiac Calculator - Find Your Western Zodiac Sign",
    seoDescription: "Free online zodiac calculator. Enter your birth date to instantly find your Western zodiac sign, with the full 12-sign date range chart.",
    keywords: ["zodiac calculator", "zodiac sign calculator", "what is my zodiac sign", "zodiac sign dates", "astrology sign calculator"],
    ogTitle: "Zodiac Calculator - Find Your Western Zodiac Sign | ToolZoneX",
    ogDescription: "Find your Western zodiac sign instantly from your birth date.",
    schemaName: "Zodiac Calculator",
    schemaDescription: "Find your Western zodiac sign from your birth date using standard date ranges.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What if my birthday falls right on a cusp date?", answer: "The date ranges used here are the most widely cited standard boundaries, but some astrologers use slightly different cusp dates depending on the year (since the sun's position shifts by about a day over time). If your birthday is exactly on a boundary date, you may see slightly different signs listed elsewhere." }, { question: "Is this the same as my Chinese zodiac sign?", answer: "No — this calculator covers the Western (tropical) zodiac, based on the sun's position relative to Earth on your birth date. The Chinese zodiac instead assigns a 12-year cycle of animal signs based on birth year, which is a completely separate system." }, { question: "Does the year of birth matter for the Western zodiac sign?", answer: "No — only the month and day matter. The sign date ranges repeat identically every calendar year, so two people born on the same month and day always share the same Western zodiac sign regardless of birth year." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
