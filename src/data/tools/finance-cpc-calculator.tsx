import AdsClickIcon from '@mui/icons-material/AdsClick';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/cpc-calculator",
    navName: "CPC Calculator",
    navDescription: "Cost per click, forward or reverse.",
    name: "CPC Calculator",
    description: "Calculate cost per click (CPC) from ad spend and clicks, or reverse it to estimate total spend from a target CPC and click count.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <AdsClickIcon fontSize="large" color="primary"/>,
    seoTitle: "CPC Calculator - Cost Per Click Calculator",
    seoDescription: "Free CPC calculator. Enter ad spend and clicks to calculate cost per click, or enter a CPC and click count to estimate total ad spend.",
    keywords: ["cpc calculator", "cost per click calculator", "cpc formula", "ad spend per click", "ppc cost calculator"],
    ogTitle: "CPC Calculator - Cost Per Click Calculator | ToolZoneX",
    ogDescription: "Calculate cost per click from ad spend and clicks, or estimate spend from CPC.",
    schemaName: "CPC Calculator",
    schemaDescription: "Calculate cost per click (CPC) from ad spend and clicks, or estimate total spend from a target CPC.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is a good CPC?", answer: "It varies enormously by industry and platform — some keywords cost cents, while highly competitive ones (like legal or insurance terms) can cost tens of dollars per click. Compare CPC against your conversion rate and average order value to judge whether it's profitable." }, { question: "Is CPC the same as cost per acquisition (CPA)?", answer: "No. CPC only measures the cost of a click, not whether that click leads to a sale or sign-up. CPA divides total spend by conversions instead of clicks, giving a more direct measure of acquisition cost." }, { question: "How does CPC relate to ROAS?", answer: "A lower CPC generally makes it easier to achieve a higher Return on Ad Spend (ROAS), since you're paying less to generate the same amount of traffic and potential revenue." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
