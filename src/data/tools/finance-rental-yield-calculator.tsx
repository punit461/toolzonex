import HomeWorkIcon from '@mui/icons-material/HomeWork';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/rental-yield-calculator",
    navName: "Rental Yield Calculator",
    navDescription: "Gross & net return from a rental.",
    name: "Rental Yield Calculator",
    description: "Calculate the gross and net rental yield of an investment property. Free online rental yield calculator for landlords and investors.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <HomeWorkIcon fontSize="large" color="primary"/>,
    seoTitle: "Rental Yield Calculator - Gross & Net Yield",
    seoDescription: "Free online rental yield calculator. Enter the property price, monthly rent, and annual expenses to get gross yield, net yield, and income comparison.",
    keywords: ["rental yield calculator", "rental property yield", "gross yield", "net yield", "rental return calculator", "property yield calculator"],
    ogTitle: "Rental Yield Calculator - Property Return | ToolZoneX",
    ogDescription: "Measure the percentage return your rental property generates.",
    schemaName: "Rental Yield Calculator",
    schemaDescription: "Calculate the gross and net rental yield of an investment property.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is the difference between gross and net yield?", answer: "Gross yield is just annual rent ÷ purchase price × 100. Net yield subtracts operating expenses — maintenance, property taxes, insurance, and vacancy — so it reflects actual income." }, { question: "What is a good rental yield?", answer: "It varies by market. In India a gross yield of 3–4% is common in metros, while 5–8% is strong in tier-2/3 cities. Compare against local rates before deciding." }, { question: "Should I include property appreciation?", answer: "Rental yield measures income only. Total return adds price appreciation (and deducts buying/selling costs) — a property can have a low yield but strong long-term appreciation, and vice versa." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
