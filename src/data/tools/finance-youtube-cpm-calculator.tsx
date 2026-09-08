import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/youtube-cpm-calculator",
    navName: "YouTube CPM Calculator",
    navDescription: "Calculate CPM from ad revenue.",
    name: "YouTube CPM Calculator",
    description: "Calculate CPM (cost per 1,000 ad impressions) from total ad revenue earned and the number of ad impressions or views.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <OndemandVideoIcon fontSize="large" color="primary"/>,
    seoTitle: "YouTube CPM Calculator - Calculate Cost Per Mille",
    seoDescription: "Free YouTube CPM calculator. Enter your ad revenue and ad impressions (or views) to calculate your CPM (cost per 1,000 ad impressions).",
    keywords: ["youtube cpm calculator", "cpm calculator", "cost per mille calculator", "youtube cpm", "calculate cpm youtube"],
    ogTitle: "YouTube CPM Calculator - Calculate Cost Per Mille | ToolZoneX",
    ogDescription: "Calculate CPM from your total ad revenue and ad impressions.",
    schemaName: "YouTube CPM Calculator",
    schemaDescription: "Calculate CPM (cost per 1,000 ad impressions) from total ad revenue earned and the number of ad impressions or views.",
    applicationCategory: "FinanceApplication",
    currency: "INR",
    faqs: [{ question: "What is the difference between CPM and RPM?", answer: "CPM is what advertisers pay per 1,000 ad impressions, before YouTube's revenue share. RPM (revenue per mille) is what a creator actually earns per 1,000 views, after YouTube's cut and accounting for videos that aren't fully monetized. If you want to estimate total earnings from views, use our separate YouTube Revenue Calculator, which is built around RPM." }, { question: "Why use impressions instead of views for CPM?", answer: "CPM is defined per ad impression, since that's what advertisers are actually billed for. A video can have more ad impressions than views if multiple ads play per view, or fewer if not every view triggers an ad — so using views as a stand-in gives only an approximate CPM." }, { question: "What is a good CPM for YouTube?", answer: "CPM varies enormously by content niche, audience country, time of year, and ad format — finance and business content, for example, typically commands a much higher CPM than gaming or entertainment content. There's no single \"good\" number; compare your own CPM over time and against similar channels in your niche instead." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
