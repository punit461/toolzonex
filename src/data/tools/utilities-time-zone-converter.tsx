import PublicIcon from '@mui/icons-material/Public';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/time-zone-converter",
    navName: "Time Zone Converter",
    navDescription: "Convert local time globally.",
    name: "Time Zone Converter",
    description: "Convert your local time to global timezones instantly. Free online time zone calculator.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PublicIcon fontSize="large" color="primary"/>,
    seoTitle: "Time Zone Converter - Convert Local Time Globally",
    seoDescription: "Convert your local time to global timezones instantly. Free online time zone calculator for international scheduling.",
    keywords: ["time zone converter", "world clock", "convert time", "est to ist", "pst to gmt"],
    ogTitle: "Time Zone Converter - Convert Local Time Globally | ToolZoneX",
    ogDescription: "Convert your local time to global timezones instantly.",
    schemaName: "Time Zone Converter",
    schemaDescription: "Convert your local time to global timezones instantly.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
