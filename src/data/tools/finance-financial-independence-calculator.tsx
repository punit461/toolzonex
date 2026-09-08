import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/financial-independence-calculator",
    navName: "Financial Independence Calculator",
    navDescription: "FI number & years to reach it.",
    name: "Financial Independence Calculator",
    description: "Calculate your financial independence (FI) number from annual expenses and a safe withdrawal rate, plus estimated years to reach it from your savings and contributions.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AutoGraphIcon fontSize="large" color="primary"/>,
    seoTitle: "Financial Independence Calculator - FI Number & Years to FI",
    seoDescription: "Free financial independence calculator. Enter annual expenses and withdrawal rate to find your FI number and estimated years to reach it.",
    keywords: ["financial independence calculator", "fi number calculator", "fire number calculator", "safe withdrawal rate calculator", "years to financial independence"],
    ogTitle: "Financial Independence Calculator - FI Number & Years to FI | ToolZoneX",
    ogDescription: "Calculate your financial independence number and estimated years to reach it.",
    schemaName: "Financial Independence Calculator",
    schemaDescription: "Calculate a financial independence (FI) number from annual expenses and a safe withdrawal rate, plus estimated years to reach it.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why is 4% the default withdrawal rate?", answer: "The 4% rule comes from historical research (the Trinity study) suggesting a diversified portfolio could sustain a 4% inflation-adjusted annual withdrawal over a 30-year retirement with a low risk of running out of money. It's a widely used starting point, not a guarantee." }, { question: "Should I use a lower withdrawal rate for a longer retirement?", answer: "Many people planning an early retirement of 40+ years use a more conservative rate, like 3-3.5%, which raises the FI number but reduces the risk of depleting savings over a longer time horizon." }, { question: "Does this account for inflation?", answer: "The expected return you enter should ideally be a real (inflation-adjusted) return if you want the years-to-FI estimate to reflect purchasing power accurately. Using a nominal return without adjusting for inflation will understate how long it actually takes in real terms." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
