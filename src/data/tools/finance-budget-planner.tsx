import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/budget-planner",
    navName: "Budget Planner",
    navDescription: "Plan your monthly income and expenses.",
    name: "Budget Planner",
    description: "Plan your monthly budget by listing income and expense categories. See total expenses, remaining surplus, and a percentage breakdown of spending.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <DonutLargeIcon fontSize="large" color="primary"/>,
    seoTitle: "Budget Planner - Free Monthly Budget Calculator",
    seoDescription: "Free online budget planner. Enter your monthly income and expense categories to see total spending, remaining surplus, and a percentage breakdown.",
    keywords: ["budget planner", "monthly budget calculator", "budget calculator", "expense tracker calculator", "personal budget planner", "spending breakdown calculator"],
    ogTitle: "Budget Planner - Free Monthly Budget Calculator | ToolZoneX",
    ogDescription: "Plan your monthly budget with a clear breakdown of income, expenses, and surplus.",
    schemaName: "Budget Planner",
    schemaDescription: "Plan your monthly budget by listing income and expense categories, with a percentage breakdown of spending.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What if my expenses exceed my income?", answer: "The remaining amount will show as negative, meaning you're spending more than you earn. Review the percentage breakdown to identify which categories to trim first." }, { question: "Should I include savings as an expense category?", answer: "Yes — many budgeting methods (like \"pay yourself first\") treat savings and investments as a fixed line item, not just whatever is left over. Add a \"Savings\" row with your target amount." }, { question: "How many expense categories should I track?", answer: "There's no fixed number — start broad (housing, food, transport, utilities, discretionary) and split categories further only if you need more visibility into where money is going." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
