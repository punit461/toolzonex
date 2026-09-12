import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/return-on-equity-calculator",
    navName: "Return on Equity Calculator",
    navDescription: "ROE from net income and shareholder equity.",
    name: "Return on Equity (ROE) Calculator",
    description: "Calculate return on equity (ROE) from net income and shareholder equity to measure how much profit a company generates per dollar of shareholder investment.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AutoGraphIcon fontSize="large" color="primary"/>,
    seoTitle: "Return on Equity (ROE) Calculator - ROE Formula",
    seoDescription: "Free return on equity calculator. Enter net income and shareholder equity to calculate ROE and measure profitability relative to shareholder investment.",
    keywords: ["return on equity calculator", "roe calculator", "roe formula", "return on equity formula", "shareholder equity return calculator"],
    ogTitle: "Return on Equity (ROE) Calculator - ROE Formula | ToolZoneX",
    ogDescription: "Calculate return on equity (ROE) from net income and shareholder equity.",
    schemaName: "Return on Equity Calculator",
    schemaDescription: "Calculate return on equity (ROE) as net income divided by shareholder equity, expressed as a percentage.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How does ROE relate to Return on Assets (ROA)?", answer: "ROE measures return specifically on shareholders' equity — the portion of financing owners actually contributed. ROA measures return on ALL assets a company controls, regardless of financing source. Because debt-financed assets still generate income but aren't counted in the equity base, a leveraged company (one financed heavily with debt) typically shows a higher ROE than ROA — leverage amplifies ROE without necessarily improving underlying asset efficiency." }, { question: "Can a high ROE be a warning sign?", answer: "Yes — an unusually high ROE can sometimes result from heavy debt financing (leverage) rather than genuinely strong operations, or from a company with very little equity due to buybacks or accumulated losses. Compare ROE alongside ROA and debt levels to get the full picture." }, { question: "What's a typical \"good\" ROE?", answer: "It varies by industry, but ROE in the 15-20% range is often considered strong for many sectors. Compare a company's ROE against close industry peers rather than a single universal benchmark, since capital intensity differs widely across industries." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
