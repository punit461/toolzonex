import CampaignIcon from '@mui/icons-material/Campaign';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/roas-calculator",
    navName: "ROAS Calculator",
    navDescription: "Return on ad spend ratio & %.",
    name: "ROAS Calculator",
    description: "Calculate Return on Ad Spend (ROAS) from total ad spend and revenue generated, expressed as both a ratio and a percentage.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CampaignIcon fontSize="large" color="primary"/>,
    seoTitle: "ROAS Calculator - Return on Ad Spend Calculator",
    seoDescription: "Free ROAS calculator. Enter ad spend and revenue generated to calculate Return on Ad Spend as a ratio and a percentage.",
    keywords: ["roas calculator", "return on ad spend calculator", "roas formula", "ad spend roi calculator", "marketing roas"],
    ogTitle: "ROAS Calculator - Return on Ad Spend Calculator | ToolZoneX",
    ogDescription: "Calculate Return on Ad Spend from total ad spend and revenue generated.",
    schemaName: "ROAS Calculator",
    schemaDescription: "Calculate Return on Ad Spend (ROAS) from total ad spend and revenue generated.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is a good ROAS?", answer: "A commonly cited baseline is 4:1 (400%), meaning $4 in revenue per $1 spent, but the right target depends on your profit margins. Low-margin businesses need a higher ROAS to be profitable than high-margin ones." }, { question: "Is ROAS the same as ROI?", answer: "No. ROAS compares revenue to ad spend only, while ROI (return on investment) typically factors in all costs, including product cost and overhead, to measure actual profit relative to total investment." }, { question: "Can ROAS be misleading?", answer: "Yes — a high ROAS doesn't guarantee profitability if your product margins are thin or if it ignores other costs like fulfillment and returns. Always check ROAS alongside your actual profit margins." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
