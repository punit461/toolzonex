import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/lot-size-calculator",
    navName: "Lot Size Calculator",
    navDescription: "Calculate forex lot size for your risk budget.",
    name: "Lot Size Calculator",
    description: "Calculate the correct lot size for forex trades based on your account balance, risk percentage, and stop loss in pips.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AccountBalanceWalletIcon fontSize="large" color="primary"/>,
    seoTitle: "Lot Size Calculator - Forex Lot Size Calculator",
    seoDescription: "Free lot size calculator for forex trading. Determine the correct lot size based on your risk tolerance, stop loss, and pip value.",
    keywords: ["lot size calculator", "forex lot size", "trading lot calculator", "position size forex", "forex risk calculator", "pip calculator"],
    ogTitle: "Lot Size Calculator - Forex Lot Size Calculator | ToolZoneX",
    ogDescription: "Calculate the correct forex lot size based on your risk budget, stop loss, and pip value.",
    schemaName: "Lot Size Calculator",
    schemaDescription: "Calculate the correct lot size for forex trading.",
    applicationCategory: "CalculatorApplication",
    currency: "USD",
    faqs: [{ question: "What is a pip?", answer: "A pip (percentage in point) is the smallest standard price move in forex. For most pairs it is 0.0001." }, { question: "Does this work for crypto CFDs?", answer: "Yes — substitute the tick size and per-tick value for the specific crypto instrument." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
