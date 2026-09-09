import SavingsIcon from '@mui/icons-material/Savings';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/ppf-calculator",
    navName: "PPF Calculator",
    navDescription: "Calculate PPF maturity with compounding.",
    name: "PPF Calculator",
    description: "Estimate the maturity amount of your Public Provident Fund (PPF) investments.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <SavingsIcon fontSize="large" color="primary"/>,
    seoTitle: "PPF Calculator - Public Provident Fund Returns",
    seoDescription: "Free PPF calculator to calculate Public Provident Fund maturity amount and interest earned. Plan your PPF investments for tax-free returns.",
    keywords: ["PPF calculator", "Public Provident Fund", "PPF returns", "PPF maturity", "PPF interest", "tax-free returns", "PPF investment"],
    ogTitle: "PPF Calculator - Public Provident Fund Returns | ToolZoneX",
    ogDescription: "Calculate PPF maturity amount and interest earned.",
    schemaName: "PPF Calculator",
    schemaDescription: "Calculate PPF maturity with compounding.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "Is PPF interest taxable?", answer: "No — PPF falls under the EEE (Exempt-Exempt-Exempt) category: contributions, interest earned, and the maturity amount are all tax-free." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
