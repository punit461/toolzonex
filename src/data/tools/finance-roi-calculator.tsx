import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/roi-calculator",
    navName: "ROI Calculator",
    navDescription: "Calculate return on investment & annualized ROI.",
    name: "ROI Calculator",
    description: "Calculate the return on investment (ROI) and annualized ROI for any investment over a holding period.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <TrendingUpIcon fontSize="large" color="primary"/>,
    seoTitle: "ROI Calculator - Return on Investment Calculator",
    seoDescription: "Free ROI calculator to calculate return on investment and annualized ROI. Measure profitability of any investment over time.",
    keywords: ["ROI calculator", "return on investment", "annualized ROI", "investment return", "ROI formula", "profit calculator"],
    ogTitle: "ROI Calculator - Return on Investment Calculator | ToolZoneX",
    ogDescription: "Calculate ROI and annualized ROI for any investment instantly.",
    schemaName: "ROI Calculator",
    schemaDescription: "Calculate the return on investment (ROI) and annualized ROI for any investment.",
    applicationCategory: "FinanceApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
