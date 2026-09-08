import ShowChartIcon from '@mui/icons-material/ShowChart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/stock-average-calculator",
    navName: "Stock Average Calculator",
    navDescription: "Weighted average cost across multiple buy trades.",
    name: "Stock Average Calculator",
    description: "Calculate your weighted average cost per share and total invested amount across multiple buy transactions.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <ShowChartIcon fontSize="large" color="primary"/>,
    seoTitle: "Stock Average Calculator - Weighted Average Share Price",
    seoDescription: "Free stock average calculator to work out your weighted average cost per share and total invested amount across multiple buy transactions.",
    keywords: ["stock average calculator", "average share price calculator", "stock average price calculator", "cost basis calculator", "average down calculator", "weighted average stock price"],
    ogTitle: "Stock Average Calculator - Weighted Average Share Price | ToolZoneX",
    ogDescription: "Work out your weighted average cost per share across multiple buy transactions.",
    schemaName: "Stock Average Calculator",
    schemaDescription: "Calculate weighted average cost per share and total invested amount across multiple buy transactions.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "Is average price the same as breakeven price?", answer: "Roughly, yes, before accounting for brokerage fees and taxes — selling all your shares exactly at your average price would return your original invested amount. Include any transaction charges separately if you need an exact breakeven figure." }, { question: "Does \"averaging down\" always help?", answer: "It lowers your average cost, but only makes sense if you still believe in the stock's long-term prospects — buying more of a falling stock purely to lower your average, without reassessing why it fell, can increase your losses if the decline continues." }, { question: "Can I use this for a stock I've partially sold?", answer: "This calculator only totals buy transactions. If you've sold part of a position, most brokers use FIFO (first-in-first-out) accounting to determine which lot was sold, which can change your remaining average cost — check your broker's statement for the post-sale average rather than recomputing it here." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
