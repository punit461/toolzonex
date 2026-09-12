import PublicIcon from '@mui/icons-material/Public';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/timezone-list-viewer",
    navName: "Timezone List Viewer",
    navDescription: "Browse every timezone with live local times.",
    name: "Timezone List Viewer",
    description: "Browse a searchable reference table of every IANA timezone with its current UTC offset and live local time, updating in real time.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PublicIcon fontSize="large" color="primary"/>,
    seoTitle: "Timezone List Viewer - All World Timezones & Live Time",
    seoDescription: "Free timezone list viewer. Browse a searchable table of every IANA timezone with its current UTC offset and live local time.",
    keywords: ["timezone list", "list of all timezones", "iana timezone list", "world timezones live time", "timezone reference table"],
    ogTitle: "Timezone List Viewer - All World Timezones & Live Time | ToolZoneX",
    ogDescription: "Browse a searchable reference table of every IANA timezone with its current UTC offset and live local time.",
    schemaName: "Timezone List Viewer",
    schemaDescription: "Browse a searchable reference table of every IANA timezone with its current UTC offset and live local time, updating in real time.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Time Zone Finder?", answer: "The Time Zone Finder helps you find ONE specific timezone by searching for a city — you type a place and get back that single zone's details. This Timezone List Viewer instead shows a browsable reference table of every IANA timezone at once, all with their current times live, so you can scan or filter across the whole list rather than looking up one place at a time." }, { question: "How is this different from the Time Zone Converter?", answer: "The Time Zone Converter takes a specific date and time and converts it between two timezones you choose. This tool doesn't convert a time you provide at all — it's a live reference list showing the current moment across every timezone simultaneously." }, { question: "Why do some rows show a dash instead of a time?", answer: "That happens only if your browser's built-in timezone database doesn't recognize a fallback-list entry it hasn't loaded — recognized zones, which is the vast majority, always render correctly." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
