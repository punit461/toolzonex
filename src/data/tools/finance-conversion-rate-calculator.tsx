import PercentIcon from '@mui/icons-material/Percent';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/conversion-rate-calculator",
    navName: "Conversion Rate Calculator",
    navDescription: "Conversion rate, or reverse to find visitors.",
    name: "Conversion Rate Calculator",
    description: "Calculate conversion rate from conversions and visitors, or reverse it to find required conversions or required visitors for a target rate.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <PercentIcon fontSize="large" color="primary"/>,
    seoTitle: "Conversion Rate Calculator - Rate, Conversions & Visitors",
    seoDescription: "Free conversion rate calculator. Calculate conversion rate from conversions and visitors, or find required conversions or visitors for a target rate.",
    keywords: ["conversion rate calculator", "conversion rate formula", "required conversions calculator", "required visitors calculator", "cro calculator"],
    ogTitle: "Conversion Rate Calculator - Rate, Conversions & Visitors | ToolZoneX",
    ogDescription: "Calculate conversion rate, or reverse it to find required conversions or visitors.",
    schemaName: "Conversion Rate Calculator",
    schemaDescription: "Calculate conversion rate from conversions and visitors, or find required conversions or visitors for a target conversion rate.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What is a good conversion rate?", answer: "It varies enormously by industry and traffic source — e-commerce sites often see 1-4%, while a highly targeted email campaign or a strong landing page can convert well above 10%. Compare your rate against your own historical baseline more than a generic external benchmark." }, { question: "How do I increase visitors needed for a lower rate?", answer: "Use the \"Required Visitors\" mode: enter your current conversions and a lower target rate, and the calculator shows how much traffic you'd need to bring in to hit that easier rate with the same number of conversions." }, { question: "Does conversion rate account for traffic quality?", answer: "No — it's a simple ratio and doesn't distinguish between high-intent and low-intent traffic. Two campaigns with identical conversion rates can have very different revenue quality depending on the visitors they attract." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
