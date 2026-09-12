import SavingsIcon from '@mui/icons-material/Savings';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/extra-payment-savings-calculator",
    navName: "Extra Payment Savings Calculator",
    navDescription: "Time and interest saved from extra payments.",
    name: "Extra Payment Savings Calculator",
    description: "Simulate a loan with and without a recurring extra monthly payment to see how much time and interest a consistent extra payment saves.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <SavingsIcon fontSize="large" color="primary"/>,
    seoTitle: "Extra Payment Savings Calculator - Time & Interest Saved",
    seoDescription: "Free extra payment savings calculator. See how much time and interest a recurring extra monthly payment saves on a loan versus the standard payment schedule.",
    keywords: ["extra payment savings calculator", "extra loan payment calculator", "pay off loan faster calculator", "extra monthly payment interest savings", "loan extra payment calculator"],
    ogTitle: "Extra Payment Savings Calculator - Time & Interest Saved | ToolZoneX",
    ogDescription: "See how much time and interest a recurring extra monthly payment saves on a loan.",
    schemaName: "Extra Payment Savings Calculator",
    schemaDescription: "Simulate a loan's standard payoff versus a payoff with a recurring extra monthly payment to show months saved and interest saved.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Mortgage Recast Calculator?", answer: "Mortgage recasting is a ONE-TIME lump-sum payment that lowers your monthly PAYMENT while keeping the original term the same. This tool instead models a RECURRING extra amount added every month on top of your existing payment — the payment stays higher than the minimum, but the loan pays off FASTER and saves interest, rather than lowering the payment." }, { question: "How is this different from the Debt Payoff Calculator?", answer: "The Debt Payoff Calculator handles MULTIPLE debts at once using Snowball or Avalanche strategies to decide which debt gets extra payments first. This tool is for a SINGLE loan only, showing the direct effect of adding one extra amount to that one loan's payment every month." }, { question: "Does the extra payment need to stay the same every month?", answer: "This calculator assumes a fixed extra amount every month for simplicity. In reality, even irregular extra payments will still shorten your payoff time and save interest — just re-run the calculator with an average extra amount for a rough estimate." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
