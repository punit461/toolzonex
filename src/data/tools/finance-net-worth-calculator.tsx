import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/net-worth-calculator",
    navName: "Net Worth Calculator",
    navDescription: "Calculate your total net worth from assets and liabilities.",
    name: "Net Worth Calculator",
    description: "Calculate your total net worth by subtracting liabilities from assets. Track your financial health with a clear breakdown of savings, investments, property, and debts.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AccountBalanceWalletIcon fontSize="large" color="primary"/>,
    seoTitle: "Net Worth Calculator - Track Your Financial Health",
    seoDescription: "Free net worth calculator to total your assets and liabilities. See your financial snapshot with a clear breakdown of savings, investments, and debts.",
    keywords: ["net worth calculator", "calculate net worth", "asset liability calculator", "financial health calculator", "personal net worth"],
    ogTitle: "Net Worth Calculator - Track Your Financial Health | ToolZoneX",
    ogDescription: "Calculate your total net worth by subtracting liabilities from assets.",
    schemaName: "Net Worth Calculator",
    schemaDescription: "Calculate your total net worth by subtracting liabilities from assets.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Can net worth be negative?", answer: "Yes. If your debts exceed your assets, your net worth is negative. This is common early in life and can improve over time with saving and debt repayment." }, { question: "How often should I calculate my net worth?", answer: "Most advisors recommend monthly or quarterly to track progress toward financial goals." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
