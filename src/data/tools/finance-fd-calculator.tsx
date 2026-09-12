import SavingsIcon from '@mui/icons-material/Savings';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/fd-calculator",
    navName: "FD Calculator",
    navDescription: "Calculate fixed deposit maturity amount.",
    name: "Fixed Deposit (FD) Calculator",
    description: "Calculate the maturity amount and interest earned on a fixed deposit, with quarterly, monthly, half-yearly, or annual compounding.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <SavingsIcon fontSize="large" color="primary"/>,
    seoTitle: "FD Calculator - Fixed Deposit Maturity Calculator",
    seoDescription: "Free FD calculator to find your fixed deposit maturity amount and interest earned. Supports quarterly, monthly, half-yearly, and annual compounding.",
    keywords: ["fd calculator", "fixed deposit calculator", "fd maturity calculator", "fd interest calculator", "fixed deposit interest rate calculator"],
    ogTitle: "FD Calculator - Fixed Deposit Maturity Calculator | ToolZoneX",
    ogDescription: "Calculate your fixed deposit maturity amount and interest earned instantly.",
    schemaName: "FD Calculator",
    schemaDescription: "Calculate the maturity amount and interest earned on a fixed deposit.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "Why is quarterly compounding the default?", answer: "Most Indian banks compound fixed deposit interest quarterly, so it's used as the default — switch to monthly, half-yearly, or annual if your bank's scheme differs." }, { question: "Are taxes deducted from the maturity amount?", answer: "This calculator shows pre-tax figures. Banks may deduct TDS on interest earned above the annual exemption threshold." }, { question: "Does the rate stay fixed for the whole tenure?", answer: "The calculator assumes a fixed rate throughout, which matches how bank FDs normally work." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
