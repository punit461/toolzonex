import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/sip-calculator",
    navName: "SIP Calculator",
    navDescription: "Estimate Mutual Fund SIP returns.",
    name: "SIP Calculator",
    description: "Estimate the future value of your Systematic Investment Plan.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TrendingUpIcon fontSize="large" color="primary"/>,
    seoTitle: "SIP Calculator - Estimate Mutual Fund Returns",
    seoDescription: "Free SIP calculator to calculate expected returns on mutual fund investments. Plan your SIP for wealth creation with detailed projections.",
    keywords: ["SIP calculator", "mutual fund calculator", "SIP returns", "systematic investment plan", "SIP investment", "wealth creation"],
    ogTitle: "SIP Calculator - Estimate Mutual Fund Returns | ToolZoneX",
    ogDescription: "Free SIP calculator to calculate expected returns on mutual fund investments.",
    schemaName: "SIP Calculator",
    schemaDescription: "Calculate expected returns on mutual fund SIP investments.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "Is the return rate guaranteed?", answer: "No — mutual fund SIP returns are market-linked and not guaranteed. The 10-12% figures used here are illustrative long-term averages for equity funds, not a promised return." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
