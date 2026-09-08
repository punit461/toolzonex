import FlagIcon from '@mui/icons-material/Flag';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/savings-goal-calculator",
    navName: "Savings Goal Calculator",
    navDescription: "Required monthly contribution for a goal.",
    name: "Savings Goal Calculator",
    description: "Calculate the required monthly contribution to reach a savings goal from your current savings, timeframe, and expected annual return.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <FlagIcon fontSize="large" color="primary"/>,
    seoTitle: "Savings Goal Calculator - Required Monthly Savings",
    seoDescription: "Free savings goal calculator. Enter your goal amount, current savings, timeframe, and expected return to find the required monthly contribution.",
    keywords: ["savings goal calculator", "monthly savings calculator", "how much to save calculator", "savings target calculator", "required monthly contribution calculator"],
    ogTitle: "Savings Goal Calculator - Required Monthly Savings | ToolZoneX",
    ogDescription: "Calculate the required monthly contribution to reach your savings goal.",
    schemaName: "Savings Goal Calculator",
    schemaDescription: "Calculate the required monthly contribution to reach a savings goal from current savings, timeframe, and expected annual return.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What if I set the expected return to 0%?", answer: "With 0% return, the calculator simply divides the remaining gap to your goal evenly across the months remaining — appropriate for cash savings goals where you don't expect meaningful investment growth over the timeframe." }, { question: "Should I use a conservative or optimistic return rate?", answer: "For shorter-term goals (under 3-5 years), a conservative rate — or 0% — is safer, since market volatility could leave you short if you assume high growth. For longer-term goals, a moderate long-term average return may be reasonable." }, { question: "What if the required monthly contribution is negative or zero?", answer: "That means your current savings, projected forward with the expected return, are already enough to reach the goal without any further contributions — the calculator shows $0 as the required monthly amount in that case." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
