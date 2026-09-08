import SavingsIcon from '@mui/icons-material/Savings';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/fire-calculator",
    navName: "FIRE Calculator",
    navDescription: "Calculate years to financial independence.",
    name: "FIRE Calculator",
    description: "Calculate your FIRE number and years to financial independence using the 4% rule. See a progress bar and yearly projections.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <SavingsIcon fontSize="large" color="primary"/>,
    seoTitle: "FIRE Calculator - Years to Financial Independence",
    seoDescription: "Free FIRE calculator to find your FIRE number and years to financial independence using the 4% rule. See yearly projections.",
    keywords: ["fire calculator", "financial independence calculator", "retire early calculator", "fire number calculator", "4% rule calculator"],
    ogTitle: "FIRE Calculator - Years to Financial Independence | ToolZoneX",
    ogDescription: "Calculate your FIRE number and years to financial independence.",
    schemaName: "FIRE Calculator",
    schemaDescription: "Calculate your FIRE number and years to financial independence using the 4% rule.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is the 4% rule?", answer: "The 4% rule suggests you can safely withdraw 4% of your portfolio annually in retirement without running out of money over 30 years. Multiply expenses by 25 to get your target." }, { question: "Is FIRE realistic for everyone?", answer: "FIRE requires a high savings rate. The higher your savings rate relative to expenses, the faster you reach independence." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
