import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/ticket-stub-generator",
    navName: "Ticket Stub Generator",
    navDescription: "Printable ticket-stub layout for any event.",
    name: "Ticket Stub Generator - Printable Event Ticket Layout",
    description: "Enter an event name, date, time, venue, seat, and ticket number to generate a formatted, printable ticket-stub-style layout.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ConfirmationNumberIcon fontSize="large" color="primary"/>,
    seoTitle: "Ticket Stub Generator - Printable Event Ticket Layout",
    seoDescription: "Free ticket stub generator. Create a printable, ticket-stub-style layout with event name, date, venue, seat, and ticket number.",
    keywords: ["ticket stub generator", "event ticket maker", "printable ticket generator", "fake ticket maker", "custom ticket template"],
    ogTitle: "Ticket Stub Generator - Printable Event Ticket Layout | ToolZoneX",
    ogDescription: "Create a printable, ticket-stub-style layout for any event.",
    schemaName: "Ticket Stub Generator",
    schemaDescription: "Enter an event name, date, time, venue, seat, and ticket number to generate a formatted, printable ticket-stub-style layout.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Can I use this to print real, resellable event tickets?", answer: "This tool is meant for personal, informal, or decorative tickets — for an official event requiring secure or scannable tickets, use a dedicated ticketing platform that provides fraud protection and unique verification." }, { question: "Is the seat/section field required?", answer: "No — it's optional and simply won't appear on the ticket preview if left blank, which works well for general-admission events." }, { question: "Is my ticket information saved anywhere?", answer: "No — everything is generated live in your browser and isn't stored, so make sure to print or screenshot your ticket before leaving the page." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
