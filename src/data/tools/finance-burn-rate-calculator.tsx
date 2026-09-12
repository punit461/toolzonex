import WhatshotIcon from '@mui/icons-material/Whatshot';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/burn-rate-calculator",
    navName: "Burn Rate Calculator",
    navDescription: "Estimate monthly burn rate and cash runway.",
    name: "Burn Rate Calculator",
    description: "Calculate your average monthly burn rate from recent expenses and estimate how many months of runway your cash balance provides.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <WhatshotIcon fontSize="large" color="primary"/>,
    seoTitle: "Burn Rate Calculator - Estimate Startup Runway",
    seoDescription: "Free burn rate calculator. Enter your cash balance and recent monthly expenses to estimate your average monthly burn rate and cash runway in months.",
    keywords: ["burn rate calculator", "startup runway calculator", "cash runway calculator", "monthly burn rate", "startup burn rate"],
    ogTitle: "Burn Rate Calculator - Estimate Startup Runway | ToolZoneX",
    ogDescription: "Calculate your average monthly burn rate and estimate your cash runway.",
    schemaName: "Burn Rate Calculator",
    schemaDescription: "Calculate your average monthly burn rate from recent expenses and estimate how many months of runway your cash balance provides.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "What is the difference between gross and net burn rate?", answer: "Gross burn rate is total monthly operating expenses. Net burn rate subtracts any monthly revenue from that figure. This calculator computes gross burn from the expense figures you enter — if you want net burn, subtract your monthly revenue from each month's expenses before entering them." }, { question: "Why average several months instead of using just one?", answer: "Monthly expenses often fluctuate due to one-off costs or timing of payments. Averaging several recent months smooths out those bumps and gives a more realistic ongoing burn rate than any single month might show." }, { question: "How much runway should a startup aim to keep?", answer: "Many investors and operators suggest keeping at least 12-18 months of runway, giving enough time to hit milestones and raise a next round comfortably rather than fundraising under time pressure. Your ideal target depends on your stage, growth trajectory, and how quickly you could raise more capital." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
