import HomeWorkIcon from '@mui/icons-material/HomeWork';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/rent-affordability-calculator",
    navName: "Rent Affordability Calculator",
    navDescription: "Find your recommended maximum rent.",
    name: "Rent Affordability Calculator",
    description: "Calculate your recommended maximum monthly rent based on your gross income using the standard 30% guideline, plus a stricter 25% alternative.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <HomeWorkIcon fontSize="large" color="primary"/>,
    seoTitle: "Rent Affordability Calculator - How Much Rent Can I Afford",
    seoDescription: "Free rent affordability calculator. Enter your monthly income to see your recommended maximum rent using the standard 30% of income guideline.",
    keywords: ["rent affordability calculator", "how much rent can i afford", "rent calculator", "30 percent rent rule", "rent to income calculator"],
    ogTitle: "Rent Affordability Calculator - How Much Rent Can I Afford | ToolZoneX",
    ogDescription: "Find your recommended maximum rent based on your monthly income.",
    schemaName: "Rent Affordability Calculator",
    schemaDescription: "Calculate your recommended maximum monthly rent based on your gross income using the standard 30% guideline, plus a stricter 25% alternative.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "Why 30% of income specifically?", answer: "The 30% guideline traces back to US federal housing policy from the 1980s, which defined \"cost-burdened\" households as those spending more than 30% of income on housing. It has since become a common budgeting rule of thumb, though it's a general guideline rather than a strict limit tailored to your full financial picture." }, { question: "Should I use gross income or take-home pay?", answer: "This calculator uses gross (pre-tax) income, matching how the 30% guideline and most landlords calculate rent-to-income ratios. Since your actual spendable income is lower after taxes, some renters prefer to budget more conservatively than the guideline suggests." }, { question: "Does this account for other debts or expenses?", answer: "No — this is a simple rent-to-income guideline based on income alone. If you carry significant debt payments or other large fixed costs, you may want to budget for a lower rent than either figure shown here to keep your overall finances comfortable." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
