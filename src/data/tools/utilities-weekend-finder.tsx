import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/weekend-finder",
    navName: "Weekend Finder",
    navDescription: "List every weekend date within a date range.",
    name: "Weekend Finder",
    description: "Find every Saturday and Sunday that falls within a chosen date range.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <EventAvailableIcon fontSize="large" color="primary"/>,
    seoTitle: "Weekend Finder - List Every Weekend in a Date Range",
    seoDescription: "Free weekend finder. Enter a start and end date to list every Saturday and Sunday within that range.",
    keywords: ["weekend finder", "find weekends in date range", "list saturdays and sundays", "weekend calculator", "weekend date range tool"],
    ogTitle: "Weekend Finder - List Every Weekend in a Date Range | ToolZoneX",
    ogDescription: "List every Saturday and Sunday within a chosen date range.",
    schemaName: "Weekend Finder",
    schemaDescription: "Find every Saturday and Sunday that falls within a chosen date range.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Day Name Finder?", answer: "The Day Name Finder tells you the day of the week for one specific date you enter. This Weekend Finder instead works over an entire date range and lists every Saturday and Sunday within it — a different question with a different kind of answer." }, { question: "Is there a limit to how large a range I can search?", answer: "Yes — the range is capped at roughly 10 years to keep the results list manageable and the calculation fast." }, { question: "Does this account for public holidays?", answer: "No — this tool only identifies calendar weekends (Saturdays and Sundays). It doesn't know about holidays, which vary by country and region." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
