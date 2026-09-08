import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/capital-gains-tax-calculator",
    navName: "Capital Gains Tax Calculator",
    navDescription: "Federal, NIIT & state tax on short/long-term gains.",
    name: "Capital Gains Tax Calculator",
    description: "Estimate federal, NIIT, and state tax on a short-term or long-term capital gain using 2026 brackets.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TrendingUpIcon fontSize="large" color="primary"/>,
    seoTitle: "Capital Gains Tax Calculator - Short & Long-Term, by State",
    seoDescription: "Free capital gains tax calculator. Estimate federal, NIIT, and state tax on a short-term or long-term capital gain using 2026 IRS brackets.",
    keywords: ["capital gains tax calculator", "long term capital gains calculator", "short term capital gains tax", "capital gains tax by state", "niit calculator", "2026 capital gains brackets"],
    ogTitle: "Capital Gains Tax Calculator | ToolZoneX",
    ogDescription: "Estimate federal, NIIT, and state tax on a short-term or long-term capital gain using 2026 brackets.",
    schemaName: "Capital Gains Tax Calculator",
    schemaDescription: "Estimate federal, NIIT, and state tax on a short-term or long-term capital gain using 2026 brackets.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
