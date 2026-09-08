import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/bitcoin-mining-calculator",
    navName: "Bitcoin Mining Calculator",
    navDescription: "Estimate mining profit after electricity costs.",
    name: "Bitcoin Mining Calculator",
    description: "Estimate daily and monthly Bitcoin mining revenue and profit after electricity costs and pool fees, based on your hash rate, power draw, BTC price, and network difficulty.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CurrencyBitcoinIcon fontSize="large" color="primary"/>,
    seoTitle: "Bitcoin Mining Calculator - Estimate Mining Profit",
    seoDescription: "Free Bitcoin mining calculator. Enter hash rate, power consumption, electricity cost, pool fee, BTC price, and network difficulty to estimate daily and monthly mining profit.",
    keywords: ["bitcoin mining calculator", "btc mining profit calculator", "mining profitability calculator", "bitcoin hash rate profit", "crypto mining calculator"],
    ogTitle: "Bitcoin Mining Calculator - Estimate Mining Profit | ToolZoneX",
    ogDescription: "Estimate daily and monthly Bitcoin mining profit after electricity costs and pool fees.",
    schemaName: "Bitcoin Mining Calculator",
    schemaDescription: "Estimate daily and monthly Bitcoin mining revenue and profit after electricity costs and pool fees.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why do I have to enter the BTC price and difficulty myself?", answer: "Both values change continuously — difficulty adjusts roughly every two weeks and price moves by the minute. Rather than showing a stale or misleading number, this calculator lets you plug in current figures from any live tracker or exchange so the estimate reflects today's conditions." }, { question: "How accurate is this estimate?", answer: "It's a simplified statistical average, not a guarantee. Actual mining income varies with luck (block finding is probabilistic), pool payout method, network hash rate growth, and BTC price volatility — treat the result as a rough planning figure, not a precise forecast." }, { question: "Does this account for hardware cost or depreciation?", answer: "No — it only estimates ongoing operating profit from electricity and pool fees. The upfront cost of mining hardware, cooling, and its depreciation over time are not included and should be factored in separately when judging overall return on investment." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
