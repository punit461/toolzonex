import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/epoch-converter",
    navName: "Epoch Converter",
    navDescription: "Unix timestamp to date, and back again.",
    name: "Epoch Converter",
    description: "Convert Unix timestamps to human-readable dates (UTC and local), or convert a date and time to a Unix timestamp. Includes a live current timestamp.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <AccessTimeIcon fontSize="large" color="primary"/>,
    seoTitle: "Epoch Converter - Unix Timestamp to Date Converter",
    seoDescription: "Free epoch converter to convert Unix timestamps to human-readable dates in UTC and local time, or convert any date to a Unix timestamp. Live current timestamp included.",
    keywords: ["epoch converter", "unix timestamp converter", "unix time converter", "timestamp to date", "date to unix timestamp", "current unix timestamp", "epoch time converter"],
    ogTitle: "Epoch Converter - Unix Timestamp to Date Converter | ToolZoneX",
    ogDescription: "Convert Unix timestamps to human-readable dates and back, with a live current timestamp.",
    schemaName: "Epoch Converter",
    schemaDescription: "Convert Unix timestamps to human-readable dates and back, with a live current timestamp display.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Seconds or milliseconds — how do I know which one I have?", answer: "A timestamp in seconds for a recent date has 10 digits (e.g. 1704067200), while the same moment in milliseconds has 13 digits (e.g. 1704067200000). If your conversion produces a date far in the past or future, try switching the unit toggle." }, { question: "Why do I see two different times — UTC and local?", answer: "A Unix timestamp itself has no timezone; it's the same absolute moment everywhere. UTC shows that moment in Coordinated Universal Time, while Local Time shows it converted to your browser's detected timezone, so you can read it either way." }, { question: "Does the current timestamp update automatically?", answer: "Yes — the current Unix timestamp shown at the top refreshes every second, so it always reflects the current time." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
