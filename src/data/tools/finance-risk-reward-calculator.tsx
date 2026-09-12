import BalanceIcon from '@mui/icons-material/Balance';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/risk-reward-calculator",
    navName: "Risk Reward Calculator",
    navDescription: "Risk:reward ratio from entry, stop & target.",
    name: "Risk Reward Calculator",
    description: "Calculate the risk amount, reward amount, and risk:reward ratio for a trade from its entry price, stop-loss price, and take-profit price.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <BalanceIcon fontSize="large" color="primary"/>,
    seoTitle: "Risk Reward Calculator - Risk:Reward Ratio Calculator",
    seoDescription: "Free risk:reward calculator. Enter entry, stop-loss, and take-profit prices to calculate risk, reward, and the risk:reward ratio for a trade.",
    keywords: ["risk reward calculator", "risk reward ratio calculator", "trading risk reward", "stop loss take profit calculator", "risk to reward ratio"],
    ogTitle: "Risk Reward Calculator - Risk:Reward Ratio Calculator | ToolZoneX",
    ogDescription: "Calculate risk, reward, and risk:reward ratio from entry, stop-loss, and take-profit prices.",
    schemaName: "Risk Reward Calculator",
    schemaDescription: "Calculate risk amount, reward amount, and risk:reward ratio from entry price, stop-loss price, and take-profit price.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is considered a good risk:reward ratio?", answer: "Many traders look for at least 1:2 or 1:3, meaning the potential reward is two to three times the risk. A favorable ratio means the trade can still be profitable over time even if it wins less than half the time." }, { question: "Does a good ratio guarantee a profitable trade?", answer: "No — the ratio only measures the potential payoff structure, not the probability of the trade hitting the target versus the stop. A favorable ratio combined with a reasonable win rate is what produces long-term profitability." }, { question: "How does this work for a short trade?", answer: "The calculator uses absolute distances, so it works the same way whether the take-profit is above the entry (a long trade) or below it (a short trade) — just make sure the stop-loss and take-profit are entered on the correct sides of your entry price." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
