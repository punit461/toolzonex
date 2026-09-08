import QueryStatsIcon from '@mui/icons-material/QueryStats';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/price-to-earnings-ratio-calculator",
    navName: "P/E Ratio Calculator",
    navDescription: "Price-to-earnings ratio from price and EPS.",
    name: "Price-to-Earnings (P/E) Ratio Calculator",
    description: "Calculate a stock's price-to-earnings (P/E) ratio from its share price and earnings per share (EPS), with general education on what a higher or lower P/E can suggest.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <QueryStatsIcon fontSize="large" color="primary"/>,
    seoTitle: "P/E Ratio Calculator - Price-to-Earnings Ratio Calculator",
    seoDescription: "Free P/E ratio calculator. Enter share price and earnings per share (EPS) to instantly calculate the price-to-earnings ratio.",
    keywords: ["P/E ratio calculator", "price to earnings ratio calculator", "how to calculate P/E ratio", "stock valuation calculator", "earnings per share ratio calculator"],
    ogTitle: "P/E Ratio Calculator - Price-to-Earnings Ratio Calculator | ToolZoneX",
    ogDescription: "Enter share price and EPS to instantly calculate the price-to-earnings ratio.",
    schemaName: "Price-to-Earnings (P/E) Ratio Calculator",
    schemaDescription: "Calculate a stock's price-to-earnings (P/E) ratio from its share price and earnings per share (EPS), with general education on what a higher or lower P/E can suggest.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What counts as a \"good\" P/E ratio?", answer: "There's no single universal answer — reasonable P/E ranges vary a lot by industry and sector, and a ratio that looks high in one industry might be perfectly normal in a faster-growing one. Always compare against similar companies rather than a fixed number." }, { question: "What does a negative P/E ratio mean?", answer: "A negative P/E happens when a company has negative earnings (a net loss), which makes the ratio less meaningful as a valuation tool for that period — investors often look at other metrics for unprofitable companies." }, { question: "Is this financial advice?", answer: "No — this tool is for general education only. It doesn't account for growth expectations, debt, industry context, or any other factors that go into a real investment decision, and shouldn't be used as the sole basis for buying or selling a stock." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
