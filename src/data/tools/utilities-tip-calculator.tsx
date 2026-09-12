import PercentIcon from '@mui/icons-material/Percent';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/tip-calculator",
    navName: "Tip Calculator",
    navDescription: "Calculate restaurant tips & split bills.",
    name: "Tip Calculator",
    description: "Quickly calculate restaurant tips and split the bill among friends. Free online tip calculator with custom percentages.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PercentIcon fontSize="large" color="primary"/>,
    seoTitle: "Tip Calculator - Split the Bill & Calculate Gratuity Online",
    seoDescription: "Quickly calculate restaurant tips and split the bill among friends. Free online tip calculator with custom percentages.",
    keywords: ["tip calculator", "gratuity calculator", "split bill calculator", "restaurant tip calculator"],
    ogTitle: "Tip Calculator - Split the Bill & Calculate Gratuity Online | ToolZoneX",
    ogDescription: "Quickly calculate restaurant tips and split the bill among friends.",
    schemaName: "Tip Calculator",
    schemaDescription: "Quickly calculate restaurant tips and split the bill among friends.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
