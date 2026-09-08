import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/gold-loan-calculator",
    navName: "Gold Loan Calculator",
    navDescription: "Eligible loan amount by gold weight, purity & LTV.",
    name: "Gold Loan Calculator",
    description: "Calculate your eligible gold loan amount based on gold weight, purity, current rate, and loan-to-value ratio, plus estimated EMI.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AccountBalanceWalletIcon fontSize="large" color="primary"/>,
    seoTitle: "Gold Loan Calculator - Eligible Loan Amount & EMI",
    seoDescription: "Free gold loan calculator to estimate your eligible loan amount based on gold weight, karat purity, current gold rate, and LTV ratio, plus EMI.",
    keywords: ["gold loan calculator", "gold loan eligibility calculator", "gold loan EMI calculator", "loan against gold calculator", "gold loan LTV calculator", "gold loan interest calculator"],
    ogTitle: "Gold Loan Calculator - Eligible Loan Amount & EMI | ToolZoneX",
    ogDescription: "Estimate your eligible gold loan amount based on weight, purity, rate, and LTV.",
    schemaName: "Gold Loan Calculator",
    schemaDescription: "Calculate eligible gold loan amount based on gold weight, purity, current rate, and loan-to-value ratio.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "What is LTV in a gold loan?", answer: "Loan-to-Value is the percentage of your gold's appraised value that a lender will actually lend you. In India, RBI regulations cap gold loan LTV at 75%, meaning if your gold is worth ₹1,00,000, the maximum loan is ₹75,000 — lenders may offer less depending on their own risk policies." }, { question: "Does gold purity really change how much I can borrow?", answer: "Yes — purity directly scales the appraised value. The same weight of 24K gold is worth more than 22K or 18K gold of identical weight, so higher-purity gold yields a proportionally higher eligible loan amount at the same LTV." }, { question: "Are gold loan EMIs always amortizing like a regular loan?", answer: "Not always — many gold loans let you pay interest-only each month (or even upfront) and repay the principal as a lump sum (bullet payment) at the end of the tenure. This calculator estimates a standard amortizing EMI; check your lender's specific repayment structure, since your actual monthly payment may differ." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
