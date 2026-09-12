import ShowChartIcon from '@mui/icons-material/ShowChart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/earnings-per-share-calculator",
    navName: "Earnings Per Share (EPS) Calculator",
    navDescription: "EPS from net income and shares outstanding.",
    name: "Earnings Per Share (EPS) Calculator",
    description: "Calculate earnings per share from net income, preferred dividends, and weighted average shares outstanding.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <ShowChartIcon fontSize="large" color="primary"/>,
    seoTitle: "EPS Calculator - Earnings Per Share Calculator",
    seoDescription: "Free earnings per share (EPS) calculator. Enter net income, preferred dividends, and shares outstanding to calculate EPS.",
    keywords: ["eps calculator", "earnings per share calculator", "how to calculate eps", "basic eps calculator", "net income per share calculator"],
    ogTitle: "EPS Calculator - Earnings Per Share Calculator | ToolZoneX",
    ogDescription: "Calculate earnings per share from net income, preferred dividends, and weighted average shares outstanding.",
    schemaName: "Earnings Per Share (EPS) Calculator",
    schemaDescription: "Calculate EPS as net income minus preferred dividends, divided by weighted average shares outstanding.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why subtract preferred dividends?", answer: "Preferred shareholders have a priority claim on dividends before common shareholders. EPS specifically measures earnings attributable to common stock, so preferred dividends are removed from net income first." }, { question: "What is \"weighted average shares outstanding\"?", answer: "It's the average number of shares outstanding over the reporting period, weighted by how long each share count was in effect — this accounts for shares issued or repurchased partway through the period rather than just using the ending share count." }, { question: "What is the difference between basic and diluted EPS?", answer: "Basic EPS uses actual shares outstanding, as calculated here. Diluted EPS also factors in potential shares from options, warrants, and convertible securities, which typically makes diluted EPS slightly lower than basic EPS." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
