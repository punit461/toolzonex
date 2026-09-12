import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/gross-profit-calculator",
    navName: "Gross Profit Calculator",
    navDescription: "Revenue minus cost of goods sold.",
    name: "Gross Profit Calculator",
    description: "Calculate gross profit and gross margin percentage from revenue and cost of goods sold (COGS).",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TrendingUpIcon fontSize="large" color="primary"/>,
    seoTitle: "Gross Profit Calculator - Gross Profit & Margin",
    seoDescription: "Free gross profit calculator. Enter revenue and cost of goods sold (COGS) to calculate gross profit and gross margin percentage.",
    keywords: ["gross profit calculator", "gross margin calculator", "gross profit formula", "cogs calculator", "revenue minus cogs"],
    ogTitle: "Gross Profit Calculator - Gross Profit & Margin | ToolZoneX",
    ogDescription: "Calculate gross profit and gross margin percentage from revenue and COGS.",
    schemaName: "Gross Profit Calculator",
    schemaDescription: "Calculate gross profit and gross margin percentage from revenue and cost of goods sold.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What counts as cost of goods sold?", answer: "COGS includes direct costs tied to producing what's sold — raw materials, direct labor, and manufacturing overhead. It excludes indirect costs like marketing, rent, and administrative salaries." }, { question: "What's the difference between gross profit and net profit?", answer: "Gross profit only subtracts COGS from revenue. Net profit goes further, deducting operating expenses, interest, and taxes to arrive at the actual bottom-line earnings." }, { question: "What is a good gross margin?", answer: "It varies widely by industry — software companies often see 70-90% margins, while retailers and grocers may run 20-30%. Compare your margin against businesses in the same sector." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
