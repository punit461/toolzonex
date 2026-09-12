import PercentIcon from '@mui/icons-material/Percent';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/dividend-payout-ratio-calculator",
    navName: "Dividend Payout Ratio Calculator",
    navDescription: "Share of earnings paid out as dividends.",
    name: "Dividend Payout Ratio Calculator",
    description: "Calculate a company's dividend payout ratio and retention ratio from dividends per share and earnings per share.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PercentIcon fontSize="large" color="primary"/>,
    seoTitle: "Dividend Payout Ratio Calculator - Payout & Retention",
    seoDescription: "Free dividend payout ratio calculator. Enter dividends per share and EPS to calculate payout ratio and retention ratio.",
    keywords: ["dividend payout ratio calculator", "payout ratio calculator", "dividend payout formula", "retention ratio calculator", "dividends per share calculator"],
    ogTitle: "Dividend Payout Ratio Calculator - Payout & Retention | ToolZoneX",
    ogDescription: "Calculate a company's dividend payout ratio and retention ratio from dividends per share and EPS.",
    schemaName: "Dividend Payout Ratio Calculator",
    schemaDescription: "Calculate a company's dividend payout ratio and retention ratio from dividends per share and earnings per share.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What counts as a healthy payout ratio?", answer: "It varies by industry and company maturity — mature, stable companies often pay out 40-60% of earnings, while high-growth companies typically retain most or all earnings and pay a low or zero dividend. A payout ratio consistently above 100% (paying out more than is earned) is a warning sign that a dividend cut may be coming." }, { question: "How is this different from dividend yield?", answer: "Dividend yield divides the annual dividend by the current share price, measuring the cash return relative to what you'd pay for the stock today. Payout ratio instead divides the dividend by earnings per share, measuring what fraction of profit is being distributed — the two use completely different denominators and answer different questions." }, { question: "Can I use total dividends and net income instead of per-share figures?", answer: "Yes — the ratio comes out the same whether you use total dividends paid divided by net income, or dividends per share divided by earnings per share, as long as you're consistent and use the same share count basis for both figures." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
