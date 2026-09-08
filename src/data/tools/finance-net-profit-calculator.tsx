import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/net-profit-calculator",
    navName: "Net Profit Calculator",
    navDescription: "Net profit and net profit margin %.",
    name: "Net Profit Calculator",
    description: "Calculate net profit and net profit margin percentage from total revenue and total expenses.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TrendingUpIcon fontSize="large" color="primary"/>,
    seoTitle: "Net Profit Calculator - Net Profit & Margin Calculator",
    seoDescription: "Free net profit calculator. Enter total revenue and total expenses to calculate net profit and net profit margin percentage.",
    keywords: ["net profit calculator", "net profit margin calculator", "profit margin formula", "business profit calculator", "net income calculator"],
    ogTitle: "Net Profit Calculator - Net Profit & Margin Calculator | ToolZoneX",
    ogDescription: "Calculate net profit and net profit margin from total revenue and expenses.",
    schemaName: "Net Profit Calculator",
    schemaDescription: "Calculate net profit and net profit margin percentage from total revenue and total expenses.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What's the difference between net profit and gross profit?", answer: "Gross profit only subtracts the cost of goods sold (COGS) from revenue, ignoring operating expenses, interest, and taxes. Net profit subtracts all expenses, giving the true bottom-line result of the business." }, { question: "What counts as a total expense here?", answer: "Include everything that reduces your bottom line: cost of goods sold, rent, salaries, marketing, interest on debt, and taxes. Leaving out any major cost category will overstate your real net profit and margin." }, { question: "What is a good net profit margin?", answer: "It varies significantly by industry — software and services businesses often see margins above 15-20%, while retail and grocery businesses commonly operate on margins of just 2-5%. Compare your margin against similar businesses in your industry rather than a single universal target." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
