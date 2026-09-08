import PaymentsIcon from '@mui/icons-material/Payments';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/bill-payment-checklist",
    navName: "Bill Payment Checklist",
    navDescription: "Sort bills by due date with a paid/unpaid summary.",
    name: "Bill Payment Checklist",
    description: "Add bills with amount, due date, and paid status, and get them automatically sorted by due date with a paid/unpaid summary and total still owed.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <PaymentsIcon fontSize="large" color="primary"/>,
    seoTitle: "Bill Payment Checklist - Track Due Dates & Balances",
    seoDescription: "Free bill payment checklist. Track bills sorted by due date, soonest first, with a paid/unpaid summary and total amount still owed.",
    keywords: ["bill payment checklist", "bill tracker", "bill due date organizer", "unpaid bills tracker", "monthly bill checklist"],
    ogTitle: "Bill Payment Checklist - Track Due Dates & Balances | ToolZoneX",
    ogDescription: "Track bills sorted by due date with a paid/unpaid summary.",
    schemaName: "Bill Payment Checklist",
    schemaDescription: "Add bills with amount, due date, and paid status, and get them automatically sorted by due date with a paid/unpaid summary and total still owed.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does the list re-sort automatically as I add or edit bills?", answer: "Yes — the sorted list on the right updates instantly by due date, soonest first, whenever you add, edit, or remove a bill." }, { question: "What happens to bills without a due date?", answer: "Bills with no due date are sorted to the end of the list, after every bill that has a due date." }, { question: "Is my bill list saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets on reload, so copy the list before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
