import EventSeatIcon from '@mui/icons-material/EventSeat';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/wedding-seating-calculator",
    navName: "Wedding Seating Calculator",
    navDescription: "Tables needed by guest count and table size.",
    name: "Wedding Seating Calculator",
    description: "Calculate tables needed for a wedding or event across common round table sizes (8, 10, and 12 seats) from total guest count.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <EventSeatIcon fontSize="large" color="primary"/>,
    seoTitle: "Wedding Seating Calculator - Tables Needed by Guest Count",
    seoDescription: "Free wedding seating calculator. Enter total guest count to calculate tables needed at 8, 10, and 12 seats per table.",
    keywords: ["wedding seating calculator", "how many tables for wedding calculator", "wedding table calculator", "event seating calculator", "tables needed calculator"],
    ogTitle: "Wedding Seating Calculator - Tables Needed by Guest Count | ToolZoneX",
    ogDescription: "Calculate tables needed for a wedding or event across common round table sizes.",
    schemaName: "Wedding Seating Calculator",
    schemaDescription: "Calculate tables needed as the ceiling of total guests divided by seats per table, for 8, 10, and 12 seat table sizes.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why does the calculator round up the table count?", answer: "You can't book a partial table — if 120 guests need 15.4 tables at some seat count, you still need a full 16th table to seat everyone, even if it isn't completely full." }, { question: "Which table size should I choose?", answer: "It depends on your venue's floor plan and desired atmosphere — smaller tables (8 seats) tend to encourage more intimate conversation, while larger tables (12 seats) fit more guests into a smaller footprint but can make cross-table conversation harder." }, { question: "Does this account for a head table or sweetheart table?", answer: "No — this calculates seating for your general guest count only. Subtract the head table, sweetheart table, or kids' table guest count from your total first if you're seating those separately." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
