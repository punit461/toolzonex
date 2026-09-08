import LocationCityIcon from '@mui/icons-material/LocationCity';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/time-zone-finder",
    navName: "Time Zone Finder",
    navDescription: "Look up a city's timezone and live local time.",
    name: "Time Zone Finder - City Timezone & Live Local Time Lookup",
    description: "Search a major world city to instantly find its current timezone name, UTC offset, and live local time.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <LocationCityIcon fontSize="large" color="primary"/>,
    seoTitle: "Time Zone Finder - City Timezone & Live Local Time Lookup",
    seoDescription: "Free time zone finder. Search a major world city to instantly see its current timezone name, UTC offset, and live local time.",
    keywords: ["time zone finder", "what timezone is a city in", "city timezone lookup", "current time in a city", "utc offset finder"],
    ogTitle: "Time Zone Finder - City Timezone & Live Local Time Lookup | ToolZoneX",
    ogDescription: "Search a major world city to instantly find its current timezone, UTC offset, and live local time.",
    schemaName: "Time Zone Finder",
    schemaDescription: "Search a major world city to instantly find its current timezone name, UTC offset, and live local time.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Time Zone Converter?", answer: "The Time Zone Converter takes a time you already have in one known timezone and converts it into another known timezone. This tool is a lookup instead — you search for a city and instantly see that city's current timezone name, UTC offset, and live local time, without needing to already know which timezone it uses." }, { question: "Does this account for daylight saving time?", answer: "Yes — the offset and abbreviation shown update automatically for daylight saving transitions, based on your browser's timezone database." }, { question: "Why do some cities share the same timezone?", answer: "Many countries and regions standardize on a single timezone across a wide area — for example, Mumbai and New Delhi both use India Standard Time, and Beijing and Shanghai both use China Standard Time, even though the cities are geographically distant." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
