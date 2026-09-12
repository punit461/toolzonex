import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/current-ratio-calculator",
    navName: "Current Ratio Calculator",
    navDescription: "Liquidity ratio with health-band check.",
    name: "Current Ratio Calculator",
    description: "Calculate the current ratio from current assets and current liabilities, with a health-band interpretation of liquidity.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CompareArrowsIcon fontSize="large" color="primary"/>,
    seoTitle: "Current Ratio Calculator - Liquidity Ratio Calculator",
    seoDescription: "Free current ratio calculator. Enter current assets and current liabilities to get the current ratio and a liquidity health-band interpretation.",
    keywords: ["current ratio calculator", "current ratio formula", "liquidity ratio calculator", "current assets to liabilities", "financial ratio calculator"],
    ogTitle: "Current Ratio Calculator - Liquidity Ratio Calculator | ToolZoneX",
    ogDescription: "Calculate the current ratio from current assets and current liabilities.",
    schemaName: "Current Ratio Calculator",
    schemaDescription: "Calculate the current ratio from current assets and current liabilities, with a health-band interpretation.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is considered a good current ratio?", answer: "A ratio between 1.5 and 3.0 is generally considered healthy for most businesses. Below 1.0 can signal liquidity risk, while a very high ratio may indicate the business isn't deploying its assets efficiently." }, { question: "How is the current ratio different from working capital?", answer: "Working capital is the dollar difference between current assets and current liabilities, while the current ratio expresses the same relationship as a proportion. Use the Working Capital Calculator to see the dollar figure alongside this ratio." }, { question: "Does the current ratio account for how liquid assets actually are?", answer: "Not precisely — it treats inventory the same as cash, even though inventory can take longer to convert to cash. The quick ratio (which excludes inventory) offers a stricter, more conservative view of short-term liquidity." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
