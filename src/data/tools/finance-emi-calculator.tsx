import CalculateIcon from '@mui/icons-material/Calculate';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/emi-calculator",
    navName: "EMI Calculator",
    navDescription: "Calculate Home, Car & Personal Loan EMI.",
    name: "EMI Calculator",
    description: "Calculate your monthly EMI for home, car, or personal loans.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CalculateIcon fontSize="large" color="primary"/>,
    seoTitle: "EMI Calculator - Calculate Home, Car & Personal Loan EMI",
    seoDescription: "Free online EMI calculator to calculate monthly installments for home, car, and personal loans with detailed amortization schedule and interest breakdown.",
    keywords: ["EMI calculator", "loan EMI", "home loan EMI", "car loan EMI", "personal loan EMI", "EMI calculation", "loan calculator India"],
    ogTitle: "EMI Calculator - Calculate Home, Car & Personal Loan EMI | ToolZoneX",
    ogDescription: "Free online EMI calculator to calculate monthly installments for home, car, and personal loans with detailed amortization schedule.",
    schemaName: "EMI Calculator",
    schemaDescription: "Calculate your monthly EMI for home, car, or personal loans.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "What happens if interest rates change?", answer: "If you have a floating rate loan, your bank may either increase your EMI amount or extend your loan tenure when interest rates rise." }, { question: "Does a longer tenure always mean I pay more?", answer: "Yes — a longer tenure lowers your monthly EMI but increases the total interest paid over the life of the loan, since interest accrues for longer." }],
    extraSchemaFields: { calculateCost: { "@type": "PriceSpecification", priceCurrency: "INR" } } as Record<string, unknown>,
    isHub: false,
};

export default tool;
