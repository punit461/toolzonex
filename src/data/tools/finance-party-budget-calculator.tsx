import CelebrationIcon from '@mui/icons-material/Celebration';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/party-budget-calculator",
    navName: "Party Budget Calculator",
    navDescription: "Percentage-split budget for a celebration.",
    name: "Party Budget Calculator",
    description: "Split a total party budget across venue, food and drinks, decorations, entertainment, and favors using adjustable percentage allocations.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CelebrationIcon fontSize="large" color="primary"/>,
    seoTitle: "Party Budget Calculator - Percentage-Based Budget Split",
    seoDescription: "Free party budget calculator. Enter your total budget and adjust category percentages for venue, food, decorations, entertainment, and favors.",
    keywords: ["party budget calculator", "birthday party budget calculator", "party planning budget", "celebration budget calculator", "party cost calculator"],
    ogTitle: "Party Budget Calculator - Percentage-Based Budget Split | ToolZoneX",
    ogDescription: "Split a total party budget across categories using adjustable percentages.",
    schemaName: "Party Budget Calculator",
    schemaDescription: "Split a total party budget across venue, food, decorations, entertainment, and favors using percentage allocations.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Event Cost Calculator?", answer: "This calculator splits one overall budget into percentages across a handful of broad categories — a quick, casual approach that suits birthdays and family celebrations. The Event Cost Calculator instead adds up individual, itemized line items (like a specific catering headcount or an AV rental quote) and is better suited to larger, more formal events where you already have detailed vendor costs to enter." }, { question: "Why don't the default percentages add up exactly the way I want?", answer: "The defaults are a common starting template, not a rule — every celebration is different. Increase the percentage for what matters most (like food or entertainment) and reduce others, just keep an eye on the \"Allocated\" total so your percentages still sum to 100%." }, { question: "What should I do if I go over budget?", answer: "Try lowering the percentage on a lower-priority category like decorations or favors first, since these are usually easier to scale back than food or venue costs without significantly changing the party." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
