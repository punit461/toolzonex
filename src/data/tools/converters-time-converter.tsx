import ScheduleIcon from '@mui/icons-material/Schedule';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/time-converter",
    navName: "Time Converter",
    navDescription: "Convert seconds, minutes, hours, days & more.",
    name: "Time Converter",
    description: "Convert seconds, minutes, hours, days & more.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ScheduleIcon fontSize="large" color="primary"/>,
    seoTitle: "Time Converter - Seconds, Minutes, Hours, Days & More",
    seoDescription: "Free time unit converter. Convert between seconds, minutes, hours, days, weeks, months, and years.",
    keywords: ["time converter", "seconds to minutes", "hours to days", "time unit converter", "days to weeks"],
    ogTitle: "Time Converter - Seconds, Minutes, Hours, Days & More | ToolZoneX",
    ogDescription: "Free time unit converter. Convert between seconds, minutes, hours, days, weeks, months, and years.",
    schemaName: "TimeConverter",
    schemaDescription: "Free time unit converter. Convert between seconds, minutes, hours, days, weeks, months, and years.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
