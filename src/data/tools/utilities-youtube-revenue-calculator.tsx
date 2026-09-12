import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/youtube-revenue-calculator",
    navName: "YouTube Revenue Calculator",
    navDescription: "Estimate AdSense earnings from views.",
    name: "YouTube Revenue Calculator",
    description: "Estimate your YouTube AdSense revenue from monthly views, RPM, and CPM, with monthly, yearly, and daily breakdowns.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <OndemandVideoIcon fontSize="large" color="primary"/>,
    seoTitle: "YouTube Revenue Calculator - Estimate AdSense Earnings",
    seoDescription: "Free YouTube revenue calculator. Estimate your AdSense earnings from monthly views, RPM, and CPM, with daily, monthly, and yearly breakdowns.",
    keywords: ["youtube revenue calculator", "youtube earnings calculator", "youtube money calculator", "ad revenue calculator", "rpm calculator", "youtube ad revenue"],
    ogTitle: "YouTube Revenue Calculator - Estimate Earnings | ToolZoneX",
    ogDescription: "Estimate your YouTube AdSense revenue from views, RPM, and CPM.",
    schemaName: "YouTube Revenue Calculator",
    schemaDescription: "Estimate YouTube AdSense revenue from monthly views, RPM, and CPM.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is the difference between RPM and CPM?", answer: "RPM is your actual revenue per 1,000 views (after YouTube's cut). CPM is what advertisers pay per 1,000 ad impressions. RPM directly reflects what you earn." }, { question: "Why does YouTube take a 45% cut?", answer: "YouTube keeps roughly 45% of ad revenue for infrastructure and operating costs, leaving about 55% for the creator. Not every view is monetized, which is why RPM is lower than CPM." }, { question: "Is this a guaranteed amount?", answer: "No — this is an estimate. Actual earnings depend on your audience, ad fill rate, geography, video length, and niche." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
