import PaidIcon from '@mui/icons-material/Paid';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/commission-calculator",
    navName: "Commission Calculator",
    navDescription: "Calculate sales commission and splits.",
    name: "Commission Calculator",
    description: "Calculate sales commission amounts and split them between salesperson and company. Supports custom rates and split percentages.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PaidIcon fontSize="large" color="primary"/>,
    seoTitle: "Commission Calculator - Sales Commission Split Tool",
    seoDescription: "Free commission calculator to calculate sales commission and split between salesperson and company. Supports custom rates and percentages.",
    keywords: ["commission calculator", "sales commission", "commission split", "real estate commission", "commission rate calculator"],
    ogTitle: "Commission Calculator - Sales Commission Split Tool | ToolZoneX",
    ogDescription: "Calculate sales commission amounts and split them between salesperson and company.",
    schemaName: "Commission Calculator",
    schemaDescription: "Calculate sales commission amounts and split them between salesperson and company.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is a typical commission split?", answer: "Commission splits vary widely by industry. In real estate, a common split is 50/50 to 70/30 favoring the agent. In SaaS sales, the split is often 50/50 or tiered based on quota attainment." }, { question: "Is commission calculated on gross or net revenue?", answer: "It depends on the agreement. Some companies calculate commission on gross revenue (before discounts/returns), while others use net revenue." }, { question: "Do commission rates change based on deal size?", answer: "Many companies use tiered commission rates where larger deals earn a higher percentage. For example, 5% on deals under $50K and 10% on deals over $200K." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
