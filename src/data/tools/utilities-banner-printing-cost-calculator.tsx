import CampaignIcon from '@mui/icons-material/Campaign';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/banner-printing-cost-calculator",
    navName: "Banner Printing Cost Calculator",
    navDescription: "Printing cost from banner size & price per sq ft.",
    name: "Banner Printing Cost Calculator",
    description: "Calculate banner printing cost from width, height, price per square foot, and quantity.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CampaignIcon fontSize="large" color="primary"/>,
    seoTitle: "Banner Printing Cost Calculator - Cost by Size & Quantity",
    seoDescription: "Free banner printing cost calculator. Enter banner width, height, price per square foot, and quantity to calculate total printing cost.",
    keywords: ["banner printing cost calculator", "how much does it cost to print a banner", "vinyl banner cost calculator", "banner cost per square foot", "banner price calculator"],
    ogTitle: "Banner Printing Cost Calculator - Cost by Size & Quantity | ToolZoneX",
    ogDescription: "Calculate banner printing cost from width, height, price per square foot, and quantity.",
    schemaName: "Banner Printing Cost Calculator",
    schemaDescription: "Calculate banner printing cost as width times height for area, times price per square foot for cost per banner, times quantity for total cost.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Banner Size Calculator?", answer: "The Banner Size Calculator recommends appropriate banner dimensions based on how far away it will typically be viewed from. This tool assumes you already know the dimensions you want and calculates the printing cost for a banner of that size — the two tools are complementary steps in planning a banner." }, { question: "Does price per square foot vary by material?", answer: "Yes — vinyl, mesh, fabric, and other banner materials all have different typical price points per square foot, and finishing options (grommets, hemming, pole pockets) can add to the base cost. Use your specific print shop's quoted rate for the material and finish you want." }, { question: "Does ordering more banners lower the per-square-foot price?", answer: "Often yes in practice — many print shops offer volume discounts at higher quantities. This calculator uses a flat rate you enter, so if your printer offers a bulk discount, adjust the price per square foot to reflect that lower rate." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
