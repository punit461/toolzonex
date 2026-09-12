import QueryStatsIcon from '@mui/icons-material/QueryStats';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/return-on-assets-calculator",
    navName: "Return on Assets Calculator",
    navDescription: "ROA from net income and total assets.",
    name: "Return on Assets (ROA) Calculator",
    description: "Calculate return on assets (ROA) from net income and total assets to measure how efficiently a company uses its assets to generate profit.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <QueryStatsIcon fontSize="large" color="primary"/>,
    seoTitle: "Return on Assets (ROA) Calculator - ROA Formula",
    seoDescription: "Free return on assets calculator. Enter net income and total assets to calculate ROA and see how efficiently a company uses its assets.",
    keywords: ["return on assets calculator", "roa calculator", "roa formula", "return on assets formula", "asset efficiency ratio calculator"],
    ogTitle: "Return on Assets (ROA) Calculator - ROA Formula | ToolZoneX",
    ogDescription: "Calculate return on assets (ROA) from net income and total assets.",
    schemaName: "Return on Assets Calculator",
    schemaDescription: "Calculate return on assets (ROA) as net income divided by total assets, expressed as a percentage.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How does ROA relate to Return on Equity (ROE)?", answer: "ROA measures return on ALL assets a company controls, regardless of whether they were financed with debt or equity. ROE measures return specifically on shareholders' equity — the portion owners actually funded. A leveraged company (one financed heavily with debt) typically shows a higher ROE than ROA, since debt-financed assets aren't counted in the equity base but still contribute to net income." }, { question: "What counts as a good ROA?", answer: "It varies significantly by industry — asset-light businesses like software companies often post ROAs well above 15-20%, while asset-heavy industries like utilities or manufacturing often run in the low single digits. Compare ROA against companies in the same industry rather than against a universal benchmark." }, { question: "Why use total assets instead of just equity?", answer: "Total assets capture everything a company uses to generate income, including assets funded by debt. This makes ROA a useful measure of operational efficiency independent of a company's financing choices, unlike ROE which is affected by leverage." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
