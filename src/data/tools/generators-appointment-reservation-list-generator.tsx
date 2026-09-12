import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/appointment-reservation-list-generator",
    navName: "Appointment/Reservation List Generator",
    navDescription: "Auto-sorted list of appointments or reservations.",
    name: "Appointment/Reservation List Generator - Chronological List",
    description: "Add appointments or reservations with client name, date, time, and service, and get them automatically sorted chronologically.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <EventAvailableIcon fontSize="large" color="primary"/>,
    seoTitle: "Appointment/Reservation List Generator - Chronological List",
    seoDescription: "Free appointment and reservation list generator. Organize bookings by client, date, time, and service, sorted automatically by date and time.",
    keywords: ["appointment list generator", "reservation list generator", "booking list maker", "appointment schedule organizer", "reservation schedule maker"],
    ogTitle: "Appointment/Reservation List Generator - Chronological List | ToolZoneX",
    ogDescription: "Organize appointments or reservations, sorted automatically by date and time.",
    schemaName: "Appointment/Reservation List Generator",
    schemaDescription: "Add appointments or reservations with client name, date, time, and service, and get them automatically sorted chronologically.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What happens if I leave the date or time blank?", answer: "Entries with a missing date or time are sorted to the end of the list, so incomplete entries don't accidentally appear as the earliest item." }, { question: "Can I use this for both appointments and reservations?", answer: "Yes — the fields (name, date, time, service/purpose, notes) work equally well for a service appointment or a table/venue reservation; just use the service/purpose field for whichever label fits your use case." }, { question: "Is my appointment list saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets on reload, so copy the list before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
