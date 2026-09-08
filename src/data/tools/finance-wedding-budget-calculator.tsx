import FavoriteIcon from '@mui/icons-material/Favorite';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/wedding-budget-calculator",
    navName: "Wedding Budget Calculator",
    navDescription: "Allocate a wedding budget by category.",
    name: "Wedding Budget Calculator",
    description: "Allocate your total wedding budget across categories like venue, catering, photography, and attire using adjustable default percentages, with a running total vs. your overall budget.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <FavoriteIcon fontSize="large" color="primary"/>,
    seoTitle: "Wedding Budget Calculator - Plan Your Wedding Spending",
    seoDescription: "Free wedding budget calculator. Enter your total budget and adjust category percentages for venue, catering, photography, and more to see per-category amounts.",
    keywords: ["wedding budget calculator", "wedding cost breakdown calculator", "wedding budget planner", "wedding expense calculator", "wedding budget percentages"],
    ogTitle: "Wedding Budget Calculator - Plan Your Spending | ToolZoneX",
    ogDescription: "Allocate your wedding budget across categories with adjustable percentages.",
    schemaName: "Wedding Budget Calculator",
    schemaDescription: "Allocate a total wedding budget across categories using adjustable default percentages, with per-category amounts and a running total.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why don't the default percentages add up exactly the way I want?", answer: "The defaults are a common starting template, not a rule — every wedding is different. Increase the percentage for what matters most to you (like photography or venue) and reduce others, just keep an eye on the \"Allocated\" total so your percentages still sum to 100%." }, { question: "What should go in the miscellaneous category?", answer: "Use it as a buffer for gratuities, transportation, favors, unexpected vendor fees, and last-minute additions. Weddings routinely run over their planned categories, so keeping 5-10% unallocated as a cushion is a common safeguard." }, { question: "Should the guest count change these percentages?", answer: "Guest count mainly affects the total budget itself (catering and venue costs scale with headcount) more than the percentage split — a larger guest list usually means increasing your total budget input rather than reallocating the percentages." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
