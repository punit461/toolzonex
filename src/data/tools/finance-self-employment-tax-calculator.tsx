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
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
