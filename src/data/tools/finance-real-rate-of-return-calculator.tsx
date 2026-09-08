import QueryStatsIcon from '@mui/icons-material/QueryStats';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/real-rate-of-return-calculator",
    navName: "Real Rate of Return Calculator",
    navDescription: "Inflation-adjusted return using the Fisher equation.",
    name: "Real Rate of Return Calculator",
    description: "Calculate the inflation-adjusted real rate of return on an investment from its nominal return and the inflation rate, using the Fisher equation.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <QueryStatsIcon fontSize="large" color="primary"/>,
    seoTitle: "Real Rate of Return Calculator - Fisher Equation",
    seoDescription: "Free real rate of return calculator. Enter nominal investment return and inflation rate to calculate the inflation-adjusted real return using the Fisher equation.",
    keywords: ["real rate of return calculator", "fisher equation calculator", "inflation adjusted return calculator", "real return calculator", "nominal vs real return"],
    ogTitle: "Real Rate of Return Calculator - Fisher Equation | ToolZoneX",
    ogDescription: "Calculate the inflation-adjusted real rate of return on an investment using the Fisher equation.",
    schemaName: "Real Rate of Return Calculator",
    schemaDescription: "Calculate the inflation-adjusted real rate of return on an investment from its nominal return and the inflation rate, using the Fisher equation.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why use the Fisher equation instead of simple subtraction?", answer: "Simple subtraction ignores the fact that inflation also eats into the return earned on top of the original investment, not just the principal. The Fisher equation divides by (1 + inflation) to capture that compounding effect, making it more accurate — especially when nominal returns or inflation are high." }, { question: "Can the real rate of return be negative?", answer: "Yes — if inflation is higher than your nominal return, the real rate of return is negative, meaning your money is losing purchasing power even though its dollar value grew." }, { question: "What inflation rate should I use?", answer: "Use the inflation rate for the same period as your nominal return, typically measured by a consumer price index (CPI) for that year or timeframe, so the two figures line up correctly." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
