import PaidIcon from '@mui/icons-material/Paid';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/dividend-yield-calculator",
    navName: "Dividend Yield Calculator",
    navDescription: "Annual dividend as a % of share price.",
    name: "Dividend Yield Calculator",
    description: "Calculate a stock's dividend yield percentage from its annual dividend per share and current share price.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PaidIcon fontSize="large" color="primary"/>,
    seoTitle: "Dividend Yield Calculator - Free Stock Dividend Yield",
    seoDescription: "Free dividend yield calculator. Enter annual dividend per share and current share price to calculate dividend yield percentage.",
    keywords: ["dividend yield calculator", "dividend yield formula", "stock dividend calculator", "dividend per share calculator", "annual dividend yield", "dividend percentage calculator", "div yield calculator", "portfolio dividend yield calculator"],
    ogTitle: "Dividend Yield Calculator - Free Stock Dividend Yield | ToolZoneX",
    ogDescription: "Calculate a stock's dividend yield from dividend per share and share price.",
    schemaName: "Dividend Yield Calculator",
    schemaDescription: "Calculate a stock's dividend yield percentage from its annual dividend per share and current share price.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why does dividend yield change without the dividend changing?", answer: "Yield is calculated against the current share price, so it moves inversely with price even if the dividend payment itself stays flat. A falling stock price pushes the yield up, and a rising price pushes it down." }, { question: "Is a higher dividend yield always better?", answer: "Not necessarily. An unusually high yield can signal that the market expects the dividend to be cut, or that the share price has dropped sharply due to underlying business problems. Check the company's payout ratio and financial health before assuming a high yield is a bargain." }, { question: "Does dividend yield include stock buybacks?", answer: "No — dividend yield only reflects cash dividends paid per share. Buybacks return value to shareholders differently and aren't part of this calculation." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
