import HomeWorkIcon from '@mui/icons-material/HomeWork';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/house-affordability-calculator",
    navName: "House Affordability Calculator",
    navDescription: "Max home price using the 28/36 rule.",
    name: "House Affordability Calculator",
    description: "Estimate the maximum home price you can afford using the 28/36 debt-to-income rule, based on income, debts, down payment, rate, and loan term.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <HomeWorkIcon fontSize="large" color="primary"/>,
    seoTitle: "House Affordability Calculator - How Much Home Can I Afford",
    seoDescription: "Free house affordability calculator using the 28/36 debt-to-income rule. Enter income, debts, down payment, rate, and term to see your max home price.",
    keywords: ["house affordability calculator", "how much house can i afford", "home affordability calculator", "28/36 rule calculator", "mortgage affordability calculator"],
    ogTitle: "House Affordability Calculator - How Much Home Can I Afford | ToolZoneX",
    ogDescription: "Estimate your maximum affordable home price using the 28/36 debt-to-income rule.",
    schemaName: "House Affordability Calculator",
    schemaDescription: "Estimate the maximum affordable home price using the 28/36 debt-to-income ratio guideline.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is the 28/36 rule?", answer: "It's a widely used lending guideline: housing costs shouldn't exceed 28% of gross monthly income, and total debt payments (housing plus other debts like car loans and credit cards) shouldn't exceed 36%. Some lenders allow higher ratios depending on credit and loan type." }, { question: "Why did adjusting my other debts change the result?", answer: "The back-end ratio limit accounts for all monthly debt obligations, not just housing. Higher existing debts (car payments, student loans, credit cards) reduce how much room is left for a mortgage payment under the 36% ceiling." }, { question: "Does this include property taxes and insurance?", answer: "This estimate focuses on principal and interest capacity based on the debt-to-income ratios. Actual affordability should also factor in property taxes, homeowners insurance, and HOA fees, which lenders typically fold into the front-end ratio calculation." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
