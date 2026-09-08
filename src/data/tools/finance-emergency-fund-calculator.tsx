import SecurityIcon from '@mui/icons-material/Security';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/emergency-fund-calculator",
    navName: "Emergency Fund Calculator",
    navDescription: "How much you need, and monthly savings to get there.",
    name: "Emergency Fund Calculator",
    description: "Work out your target emergency fund based on monthly expenses and coverage months, plus the monthly savings needed to reach it.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <SecurityIcon fontSize="large" color="primary"/>,
    seoTitle: "Emergency Fund Calculator - How Much Should You Save?",
    seoDescription: "Free emergency fund calculator to work out your target savings based on monthly expenses and coverage months, plus how much to save each month to reach it.",
    keywords: ["emergency fund calculator", "how much emergency fund", "emergency savings calculator", "months of expenses saved", "emergency fund target", "how much should I save for emergencies"],
    ogTitle: "Emergency Fund Calculator - How Much Should You Save? | ToolZoneX",
    ogDescription: "Work out your target emergency fund and the monthly savings needed to reach it.",
    schemaName: "Emergency Fund Calculator",
    schemaDescription: "Calculate your target emergency fund and required monthly savings.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "How many months of expenses should I save?", answer: "3-6 months is the standard guideline for dual-income households with stable jobs. If you're self-employed, work on commission, are the sole income earner, or work in an industry prone to layoffs, aim higher — 6-12 months gives you a longer runway to find new income without touching long-term investments or going into debt." }, { question: "Where should I keep my emergency fund?", answer: "Keep it somewhere safe and easy to access on short notice — a high-yield savings account or a liquid/short-duration fund — rather than in stocks or locked-in fixed deposits. The goal is availability when you need it, not maximum returns." }, { question: "Does this calculator count only essential expenses?", answer: "It should. Base the \"Monthly Expenses\" field on rent/EMI, groceries, utilities, insurance, and minimum debt payments — the costs you'd still have to cover with no income — rather than your full monthly spending including discretionary items." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
