import CampaignIcon from '@mui/icons-material/Campaign';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/finance/email-marketing-roi-calculator",
    navName: "Email Marketing ROI Calculator",
    navDescription: "ROI % and cost per email from a campaign.",
    name: "Email Marketing ROI Calculator",
    description: "Calculate the ROI percentage of an email marketing campaign from its cost and revenue generated, plus optional cost per email.",
    navCategory: "Finance",
    shellCategory: "Finance",
    icon: <CampaignIcon fontSize="large" color="primary"/>,
    seoTitle: "Email Marketing ROI Calculator - Campaign ROI %",
    seoDescription: "Free email marketing ROI calculator. Enter your campaign cost and revenue generated to calculate ROI percentage and cost per email sent.",
    keywords: ["email marketing roi calculator", "email campaign roi calculator", "email marketing return on investment", "cost per email calculator"],
    ogTitle: "Email Marketing ROI Calculator - Campaign ROI % | ToolZoneX",
    ogDescription: "Calculate the ROI percentage of an email marketing campaign from its cost and revenue generated.",
    schemaName: "Email Marketing ROI Calculator",
    schemaDescription: "Calculate the ROI percentage of an email marketing campaign from its cost and revenue generated, plus optional cost per email.",
    applicationCategory: "FinanceApplication",
    currency: "USD",
    faqs: [{ question: "What counts as \"revenue generated\" from a campaign?", answer: "Ideally, revenue directly attributable to that specific campaign — for example, sales tracked through a unique discount code, UTM-tagged link, or attribution window tied to clicks from that email. Mixing in revenue that would have happened anyway will overstate ROI." }, { question: "Is email marketing ROI usually this high?", answer: "Email marketing is often cited as one of the highest-ROI marketing channels because sending costs are low relative to potential revenue, especially for an engaged existing list — but actual results vary widely by industry, list quality, and offer." }, { question: "Should I include staff time as a cost?", answer: "This calculator only accounts for direct monetary costs (platform fees and ad spend). If you want a fully loaded ROI figure, you can add an estimated dollar value for the time spent creating and managing the campaign into the platform/tool cost field." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
