import SchoolIcon from '@mui/icons-material/School';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/education-loan-calculator",
    navName: "Education Loan Calculator",
    navDescription: "Calculate education loan EMI online.",
    name: "Education Loan Calculator",
    description: "Calculate EMI, total interest, and total payment for an education loan including the moratorium period.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <SchoolIcon fontSize="large" color="primary"/>,
    seoTitle: "Education Loan Calculator - Calculate EMI Online",
    seoDescription: "Free education loan calculator to calculate EMI, total interest, and payment including moratorium period. Plan student loan repayment.",
    keywords: ["education loan calculator", "student loan EMI", "education loan EMI", "loan moratorium calculator", "study loan calculator"],
    ogTitle: "Education Loan Calculator - Calculate EMI Online | ToolZoneX",
    ogDescription: "Calculate education loan EMI, interest, and payment online.",
    schemaName: "Education Loan Calculator",
    schemaDescription: "Calculate EMI, total interest, and total payment for an education loan.",
    applicationCategory: "FinanceApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
