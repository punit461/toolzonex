import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/retirement-calculator",
    navName: "Retirement Calculator",
    navDescription: "Plan your retirement corpus.",
    name: "Retirement Calculator",
    description: "Calculate the exact corpus you need to retire and how much you need to save every month.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AccountBalanceIcon fontSize="large" color="primary"/>,
    seoTitle: "Retirement Calculator - Plan Your Retirement Corpus",
    seoDescription: "Free retirement calculator to calculate the corpus needed for retirement and monthly SIP required. Plan for a secure retirement with accurate projections.",
    keywords: ["retirement calculator", "retirement corpus", "retirement planning", "retirement SIP", "retirement savings", "pension planning", "retire early", "when i can retire calculator", "calculating retirement needs", "how much i need to retire"],
    ogTitle: "Retirement Calculator - Plan Your Retirement Corpus | ToolZoneX",
    ogDescription: "Calculate retirement corpus and required SIP for secure retirement.",
    schemaName: "Retirement Calculator",
    schemaDescription: "Calculate retirement corpus and required SIP.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "How do I calculate when I can retire?", answer: "Enter your current age, target retirement age, and current monthly expenses, and this calculator projects the retirement corpus you'll need at that age (accounting for inflation) alongside the monthly SIP required to reach it from your existing savings. If the required monthly SIP looks unaffordable, try pushing the retirement age later or trimming projected expenses to see when the numbers become realistic." }, { question: "How do I calculate my retirement needs?", answer: "Retirement needs are calculated by inflating your current monthly expenses forward to your retirement age, then working out how large a corpus is needed so that corpus (invested at a safer post-retirement return) can cover those inflated expenses for the rest of your expected lifespan. This calculator does that math automatically from the inputs above." }, { question: "How much money do I need to retire?", answer: "It depends on your current expenses, years until retirement, inflation, and how long retirement needs to last — there's no single number that applies to everyone. Use the 'Retirement Corpus Needed' figure above as your personalized estimate based on the details you enter." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
