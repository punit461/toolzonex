import CreditCardIcon from '@mui/icons-material/CreditCard';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/debt-payoff-calculator",
    navName: "Debt Payoff Calculator",
    navDescription: "Snowball vs. Avalanche payoff comparison.",
    name: "Debt Payoff Calculator - Snowball vs. Avalanche",
    description: "Compare the Snowball and Avalanche debt payoff strategies side by side, with months-to-debt-free and total interest paid for each.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CreditCardIcon fontSize="large" color="primary"/>,
    seoTitle: "Debt Payoff Calculator - Snowball vs. Avalanche Method",
    seoDescription: "Free debt payoff calculator. Compare the Snowball and Avalanche strategies side by side to see which pays off your debts faster and with less interest.",
    keywords: ["debt payoff calculator", "debt snowball calculator", "debt avalanche calculator", "pay off debt calculator", "debt free calculator"],
    ogTitle: "Debt Payoff Calculator - Snowball vs. Avalanche | ToolZoneX",
    ogDescription: "Compare the Snowball and Avalanche debt payoff strategies side by side.",
    schemaName: "Debt Payoff Calculator",
    schemaDescription: "Compare the Snowball and Avalanche debt payoff strategies side by side, with months-to-debt-free and total interest paid for each.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Which strategy saves more money?", answer: "Avalanche almost always results in less total interest paid, since it eliminates high-rate debt first. Snowball can take slightly longer and cost a bit more in interest, but many people find its quick wins easier to stick with." }, { question: "What does \"this debt load isn't payable\" mean?", answer: "It means that even after 600 months (50 years) of minimum plus extra payments, at least one balance never reaches zero — usually because the minimum payments don't cover the interest accruing each month. Increase the extra payment or renegotiate rates to fix this." }, { question: "Does the simulation account for changing interest rates?", answer: "No — each debt's rate is assumed to stay fixed for the entire simulation. If your actual rate is variable, treat the result as an estimate based on today's rate." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
