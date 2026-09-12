import FenceIcon from '@mui/icons-material/Fence';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/fence-calculator",
    navName: "Fence Calculator",
    navDescription: "Fence panels & posts needed for a yard.",
    name: "Fence Calculator",
    description: "Calculate the number of fence panels and posts needed from your fence's total length and panel width.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <FenceIcon fontSize="large" color="primary"/>,
    seoTitle: "Fence Calculator - Panels & Posts Needed",
    seoDescription: "Free fence calculator. Enter your yard dimensions or fence run length and panel width to find how many fence panels and posts you need.",
    keywords: ["fence calculator", "fence panels calculator", "fence posts calculator", "how many fence panels do i need", "fencing materials calculator"],
    ogTitle: "Fence Calculator - Panels & Posts Needed | ToolZoneX",
    ogDescription: "Calculate the number of fence panels and posts needed for your project.",
    schemaName: "Fence Calculator",
    schemaDescription: "Calculate the number of fence panels and posts needed from total fence length and panel width.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why does a fully enclosed layout need fewer posts per panel?", answer: "In a closed loop, every post is shared between two adjacent panels, so the number of posts equals the number of panels. In an open, straight run, the two ends aren't shared with another panel, so you need one extra post beyond the panel count." }, { question: "Does this account for gates?", answer: "No — gate openings typically use different hardware and post spacing than standard panels. Subtract the gate width from your total perimeter before entering it here, and add gate posts and the gate itself separately." }, { question: "What panel width should I use?", answer: "Most residential wood and vinyl fence panels come in standard 6 ft or 8 ft widths, though chain-link and some metal fencing use different post spacing — check your chosen fencing product's spec sheet for the exact panel or spacing width." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
