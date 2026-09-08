import CropIcon from '@mui/icons-material/Crop';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/aspect-ratio-calculator",
    navName: "Aspect Ratio",
    navDescription: "Find proportional dimensions.",
    name: "Aspect Ratio Calculator",
    description: "Calculate proportional dimensions and aspect ratios for images and videos instantly. Free online aspect ratio tool.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CropIcon fontSize="large" color="primary"/>,
    seoTitle: "Aspect Ratio Calculator - Proportional Dimensions",
    seoDescription: "Calculate proportional dimensions and aspect ratios for images and videos instantly. Free online aspect ratio tool for designers.",
    keywords: ["aspect ratio calculator", "image resize calculator", "proportional dimensions", "16:9 ratio calculator"],
    ogTitle: "Aspect Ratio Calculator - Find Proportional Dimensions Online | ToolZoneX",
    ogDescription: "Calculate proportional dimensions and aspect ratios for images and videos instantly.",
    schemaName: "Aspect Ratio Calculator",
    schemaDescription: "Calculate proportional dimensions and aspect ratios for images and videos instantly.",
    applicationCategory: "DesignApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
