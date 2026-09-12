import EventSeatIcon from '@mui/icons-material/EventSeat';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/seating-list-generator",
    navName: "Seating List Generator",
    navDescription: "Assign named guests to numbered tables automatically.",
    name: "Seating List Generator - Assign Guests to Tables",
    description: "Enter guest names and seats per table to automatically assign guests to numbered tables, filling each table to capacity in sequence.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <EventSeatIcon fontSize="large" color="primary"/>,
    seoTitle: "Seating List Generator - Assign Guests to Tables",
    seoDescription: "Free online seating list generator. Enter guest names and seats per table to get an automatically assigned seating chart by table number.",
    keywords: ["seating list generator", "seating chart maker online", "assign guests to tables", "wedding seating chart generator", "table assignment tool"],
    ogTitle: "Seating List Generator - Assign Guests to Tables | ToolZoneX",
    ogDescription: "Enter guest names and seats per table to get an automatically assigned seating chart.",
    schemaName: "Seating List Generator",
    schemaDescription: "Enter guest names and seats per table to automatically assign guests to numbered tables, filling each table to capacity in sequence.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Wedding Seating Calculator?", answer: "The Wedding Seating Calculator only calculates how many tables you'd need from a total guest count across a few standard table sizes — it doesn't know any names. This Seating List Generator goes a step further and actually assigns your specific named guests to specific numbered tables." }, { question: "Can I control which specific guests sit together?", answer: "Not directly — assignment is purely sequential based on the order you list names, so reorder your guest list (grouping people who should sit together next to each other) before generating the chart to influence table groupings." }, { question: "What happens if the last table isn't full?", answer: "That's expected — the final table simply gets whatever names are left over, which may be fewer than your seats-per-table setting." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
