import ReceiptIcon from '@mui/icons-material/Receipt';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/self-employment-tax-calculator",
    navName: "Self-Employment Tax Calculator",
    navDescription: "Social Security, Medicare & income tax for 1099 income.",
    name: "Self-Employment Tax Calculator (1099)",
    description: "Estimate your self-employment tax (Social Security + Medicare) and income tax on freelance or 1099 profit.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <ReceiptIcon fontSize="large" color="primary"/>,
    seoTitle: "Self-Employment Tax Calculator (1099) - Freelance & Contractor Tax",
    seoDescription: "Free self-employment tax calculator for freelancers and 1099 contractors. Estimate Social Security, Medicare, and income tax on your net profit.",
    keywords: ["self employment tax calculator", "1099 tax calculator", "freelance tax calculator", "se tax calculator", "quarterly estimated tax calculator", "independent contractor tax"],
    ogTitle: "Self-Employment Tax Calculator (1099) | ToolZoneX",
    ogDescription: "Estimate your self-employment tax (Social Security + Medicare) and income tax on freelance or 1099 profit.",
    schemaName: "Self-Employment Tax Calculator (1099)",
    schemaDescription: "Estimate your self-employment tax (Social Security + Medicare) and income tax on freelance or 1099 profit.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Do I owe SE tax on every dollar of profit?", answer: "SE tax applies to net profit (revenue minus business expenses), not gross revenue — and only above $400 of net earnings does SE tax apply at all. Track business expenses carefully; they reduce both your income tax and your SE tax." }, { question: "What if I also have a W-2 job?", answer: "Your W-2 wages count first against the Social Security wage base — if your W-2 income alone already exceeds the cap, none of your self-employment earnings owe the 12.4% Social Security portion, only the uncapped 2.9% Medicare portion." }, { question: "Is the income tax estimate exact?", answer: "No — it's a simplified estimate using the federal standard deduction and brackets only, and doesn't account for state tax, the Qualified Business Income (QBI) deduction, retirement plan contributions (SEP-IRA, Solo 401(k)), health insurance premiums, or other above-the-line deductions that commonly apply to self-employed filers and can meaningfully lower this number." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
