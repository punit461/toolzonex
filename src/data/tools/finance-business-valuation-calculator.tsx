import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/business-valuation-calculator",
    navName: "Business Valuation Calculator",
    navDescription: "Estimated value from revenue/earnings multiple.",
    name: "Business Valuation Calculator",
    description: "Estimate a business's value from annual revenue or net income and an adjustable industry valuation multiple, with common industry presets.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <BusinessCenterIcon fontSize="large" color="primary"/>,
    seoTitle: "Business Valuation Calculator - Revenue & Earnings Multiple",
    seoDescription: "Free business valuation calculator. Enter annual revenue or net income and a valuation multiple to estimate business value, with industry presets.",
    keywords: ["business valuation calculator", "business worth calculator", "revenue multiple calculator", "earnings multiple calculator", "how to value a business"],
    ogTitle: "Business Valuation Calculator - Revenue & Earnings Multiple | ToolZoneX",
    ogDescription: "Estimate a business's value from revenue or earnings and a valuation multiple.",
    schemaName: "Business Valuation Calculator",
    schemaDescription: "Estimate a business's value from annual revenue or net income and an adjustable industry valuation multiple.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "Why do multiples vary so much by industry?", answer: "Multiples reflect growth potential, profit margins, risk, and how easily a business can scale. High-growth software companies often command higher revenue multiples than low-margin, capital-intensive businesses like retail or manufacturing, which are typically valued closer to their earnings." }, { question: "Should I use revenue or earnings for my valuation?", answer: "Use earnings multiples for profitable, stable businesses where net income is a meaningful number. Use revenue multiples for early-stage or high-growth businesses that may not yet be profitable but have strong top-line growth investors are willing to pay for." }, { question: "Is this a substitute for a professional valuation?", answer: "No — this multiple-based method gives a quick estimate for planning purposes. A formal business valuation typically also considers assets, liabilities, discounted cash flows, comparable transactions, and other factors a simple multiple doesn't capture." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
