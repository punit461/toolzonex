import ShowChartIcon from '@mui/icons-material/ShowChart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/position-size-calculator",
    navName: "Position Size Calculator",
    navDescription: "Calculate optimal position size for trading.",
    name: "Position Size Calculator",
    description: "Calculate the optimal number of shares to buy while keeping your risk within a fixed percentage of your trading account.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <ShowChartIcon fontSize="large" color="primary"/>,
    seoTitle: "Position Size Calculator - Trading Risk Management Tool",
    seoDescription: "Free position size calculator for stock and forex trading. Determine the right number of shares to buy based on your risk tolerance and stop loss.",
    keywords: ["position size calculator", "trading calculator", "risk management calculator", "lot size calculator", "trading risk", "stock position size"],
    ogTitle: "Position Size Calculator - Trading Risk Management Tool | ToolZoneX",
    ogDescription: "Calculate the optimal position size for stock and forex trades based on your risk tolerance and stop loss.",
    schemaName: "Position Size Calculator",
    schemaDescription: "Calculate the optimal position size for stock and forex trading.",
    applicationCategory: "CalculatorApplication",
    currency: "USD",
    faqs: [{ question: "What if the result is 0 shares?", answer: "Your stop loss is too wide for the account size and risk percentage. Reduce the stop loss distance or increase your risk tolerance." }, { question: "Can I use this for options or forex?", answer: "Yes — the formula applies to any trade with a defined entry and stop loss." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
