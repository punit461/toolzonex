import ShowChartIcon from '@mui/icons-material/ShowChart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/crypto-profit-calculator",
    navName: "Crypto Profit Calculator",
    navDescription: "Profit or loss on a crypto trade.",
    name: "Crypto Profit Calculator",
    description: "Calculate your profit or loss when selling cryptocurrency. Free online crypto profit calculator with buy/sell fees.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <ShowChartIcon fontSize="large" color="primary"/>,
    seoTitle: "Crypto Profit Calculator - P&L on a Coin Trade",
    seoDescription: "Free online crypto profit calculator. Enter buy price, sell price, and quantity to get profit, profit percentage, ROI, and the effect of fees.",
    keywords: ["crypto profit calculator", "cryptocurrency profit", "bitcoin profit calculator", "crypto rocachancalculator", "coin pnl", "crypto gain calculator"],
    ogTitle: "Crypto Profit Calculator - Coin P&L | ToolZoneX",
    ogDescription: "Calculate profit, loss, and ROI on any cryptocurrency trade.",
    schemaName: "Crypto Profit Calculator",
    schemaDescription: "Calculate profit and loss on a cryptocurrency trade.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How is crypto profit calculated?", answer: "Profit = (sell price − buy price) × quantity, minus any buy and sell fees you specify. The calculator also reports the profit percentage relative to your total investment." }, { question: "Should I include fees?", answer: "Yes — exchange trading fees, network (gas) fees, and withdrawal fees all reduce real profit. Small per-trade fees can erode a large fraction of gains for frequent traders." }, { question: "Does it handle shorts or leverage?", answer: "This covers simple spot trades — buy at one price, sell at another. Leveraged and short positions introduce liquidation and funding costs that a plain buy/sell model does not capture." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
