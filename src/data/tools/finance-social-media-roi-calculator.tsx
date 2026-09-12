import ShareIcon from '@mui/icons-material/Share';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/social-media-roi-calculator",
    navName: "Social Media ROI Calculator",
    navDescription: "ROI %, cost per engagement & cost per follower.",
    name: "Social Media ROI Calculator",
    description: "Calculate the ROI percentage of a social media campaign from spend and attributed revenue, plus optional cost per engagement and cost per follower.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <ShareIcon fontSize="large" color="primary"/>,
    seoTitle: "Social Media ROI Calculator - Campaign ROI %",
    seoDescription: "Free social media ROI calculator. Enter your campaign spend and attributed revenue to calculate ROI percentage, cost per engagement, and cost per follower.",
    keywords: ["social media roi calculator", "social media campaign roi", "cost per engagement calculator", "social media marketing roi", "cost per follower calculator"],
    ogTitle: "Social Media ROI Calculator - Campaign ROI % | ToolZoneX",
    ogDescription: "Calculate the ROI percentage of a social media campaign from spend and attributed revenue.",
    schemaName: "Social Media ROI Calculator",
    schemaDescription: "Calculate the ROI percentage of a social media campaign from spend and attributed revenue, plus optional cost per engagement and cost per follower.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "How do I attribute revenue to social media specifically?", answer: "Common methods include unique discount codes, UTM-tagged links, platform-reported conversion tracking (e.g. Meta or TikTok pixel data), or a dedicated landing page used only for that campaign. Mixing in revenue that would have happened anyway will overstate ROI." }, { question: "What's a good cost per engagement or follower?", answer: "This varies enormously by platform, industry, and audience size — there's no universal benchmark. These figures are most useful for comparing your own campaigns against each other over time, or against your own historical averages." }, { question: "Should organic (unpaid) social media efforts be included?", answer: "This calculator is built around a spend figure, so it's best suited to paid campaigns. For organic efforts, you could still estimate ROI by entering the value of staff/creator time as your \"spend\" figure." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
