import BalanceIcon from '@mui/icons-material/Balance';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/debt-to-equity-calculator",
    navName: "Debt-to-Equity Calculator",
    navDescription: "D/E ratio from liabilities & shareholder equity.",
    name: "Debt-to-Equity Calculator",
    description: "Calculate the debt-to-equity ratio from total liabilities and total shareholder equity.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <BalanceIcon fontSize="large" color="primary"/>,
    seoTitle: "Debt-to-Equity Calculator - D/E Ratio Calculator",
    seoDescription: "Free debt-to-equity calculator. Enter total liabilities and total shareholder equity to calculate a company's D/E ratio.",
    keywords: ["debt to equity calculator", "debt to equity ratio calculator", "d/e ratio calculator", "leverage ratio calculator", "capital structure calculator"],
    ogTitle: "Debt-to-Equity Calculator - D/E Ratio Calculator | ToolZoneX",
    ogDescription: "Calculate the debt-to-equity ratio from total liabilities and total shareholder equity.",
    schemaName: "Debt-to-Equity Calculator",
    schemaDescription: "Calculate the debt-to-equity ratio (total liabilities divided by total shareholder equity).",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What does a high D/E ratio mean?", answer: "A high ratio means a company relies more heavily on debt than equity to finance its operations, which can amplify both returns and risk — heavier debt loads mean higher fixed interest obligations, regardless of how the business is performing." }, { question: "What does a D/E ratio below 1 mean?", answer: "A ratio below 1 means a company has more equity than debt financing its assets, generally considered more conservative — though very low debt can also mean a company isn't using leverage to help fund growth." }, { question: "Where do I find total liabilities and shareholder equity?", answer: "Both figures come from a company's balance sheet — total liabilities is usually the sum of current and long-term liabilities, and total shareholder equity (or stockholders' equity) is listed as its own section, typically at the bottom of the balance sheet." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
