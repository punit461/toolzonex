import ReceiptIcon from '@mui/icons-material/Receipt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/expense-category-organizer",
    navName: "Expense Category Organizer",
    navDescription: "Sort expenses into categories with subtotals & a grand total.",
    name: "Expense Category Organizer",
    description: "Add expenses with a category — Housing, Food, Transport, Entertainment, Utilities, or Other — and get them organized with a subtotal per category and a grand total.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ReceiptIcon fontSize="large" color="primary"/>,
    seoTitle: "Expense Category Organizer - Sort Spending by Category",
    seoDescription: "Free expense category organizer. Add expenses and see them sorted into categories with a subtotal per category and a grand total.",
    keywords: ["expense category organizer", "categorize expenses", "expense subtotal calculator", "spending by category tool", "expense tracker by category"],
    ogTitle: "Expense Category Organizer - Sort Spending by Category | ToolZoneX",
    ogDescription: "Add expenses and see them organized by category with subtotals and a grand total.",
    schemaName: "Expense Category Organizer",
    schemaDescription: "Add expenses with a category — Housing, Food, Transport, Entertainment, Utilities, or Other — and get them organized with a subtotal per category and a grand total.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I change an expense's category after adding it?", answer: "Yes — use the Category dropdown on any expense card to move it to a different category at any time; subtotals update automatically." }, { question: "How is the subtotal for each category calculated?", answer: "It's the sum of the amount entered for every expense assigned to that category, and the grand total is the sum of all category subtotals." }, { question: "Is my expense list saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets on reload, so copy the summary before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
