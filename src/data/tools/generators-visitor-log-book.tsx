import DoorFrontIcon from '@mui/icons-material/DoorFront';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/visitor-log-book",
    navName: "Visitor Log Book",
    navDescription: "Running, chronologically sorted log of visitor entries.",
    name: "Visitor Log Book",
    description: "Add visitor entries with name, date, time in/out, purpose, and host, and get a running log automatically sorted chronologically.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <DoorFrontIcon fontSize="large" color="primary"/>,
    seoTitle: "Visitor Log Book - Front Desk Visitor Record",
    seoDescription: "Free visitor log book. Track visitor entries with date, time in/out, purpose, and host, sorted chronologically.",
    keywords: ["visitor log book", "front desk visitor log", "visitor sign in log", "office visitor tracker", "visitor record generator"],
    ogTitle: "Visitor Log Book - Front Desk Visitor Record | ToolZoneX",
    ogDescription: "Track visitor entries in a running, chronologically sorted log.",
    schemaName: "Visitor Log Book",
    schemaDescription: "Add visitor entries with name, date, time in/out, purpose, and host, and get a running log automatically sorted chronologically.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Name Badge/Visitor Pass Generator?", answer: "The Name Badge/Visitor Pass Generator creates a printable pass for a single visitor at check-in. This tool maintains a running log of multiple visitor entries over time, sorted chronologically — a record of everyone who's visited, not a one-time printable pass." }, { question: "Does the log re-sort automatically as I add entries?", answer: "Yes — the chronological log updates instantly whenever you add, edit, or remove a visitor entry." }, { question: "Is my visitor log saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets on reload, so copy the log before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
