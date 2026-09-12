import SavingsIcon from '@mui/icons-material/Savings';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/fixed-deposit-maturity-calculator",
    navName: "Fixed Deposit Maturity Calculator",
    navDescription: "FD maturity amount, date & tenure comparison.",
    name: "Fixed Deposit Maturity Calculator",
    description: "Calculate a fixed deposit's maturity amount, interest earned, and estimated maturity date, with a comparison across different tenure lengths.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <SavingsIcon fontSize="large" color="primary"/>,
    seoTitle: "Fixed Deposit Maturity Calculator - FD Maturity Amount & Date",
    seoDescription: "Free FD maturity calculator. Enter principal, interest rate, tenure, and compounding frequency to see maturity amount, interest earned, and maturity date.",
    keywords: ["fixed deposit maturity calculator", "fd maturity calculator", "fd maturity amount", "fd maturity date calculator", "fixed deposit interest calculator"],
    ogTitle: "Fixed Deposit Maturity Calculator - FD Maturity Amount & Date | ToolZoneX",
    ogDescription: "Calculate fixed deposit maturity amount, interest earned, and estimated maturity date.",
    schemaName: "Fixed Deposit Maturity Calculator",
    schemaDescription: "Calculate a fixed deposit's maturity amount, interest earned, and estimated maturity date across different tenure lengths.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is the maturity date estimated?", answer: "The calculator adds the tenure — in whole years and remaining months — to today's date. Your actual bank-issued maturity date will be based on the exact date you open the deposit, not today, so treat this as an approximate planning reference." }, { question: "Why does maturity value grow faster over longer tenures?", answer: "Compound interest earns returns on previously accumulated interest, not just the original principal. The longer the money stays deposited, the more compounding cycles occur, so the growth accelerates rather than staying linear." }, { question: "Are the maturity figures shown before or after tax?", answer: "These are pre-tax figures. Banks may deduct tax at source on interest earned above an exemption threshold, and interest income is generally taxable per your applicable tax bracket." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
