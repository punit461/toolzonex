import ColorLensIcon from '@mui/icons-material/ColorLens';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/cmyk-to-rgb-converter",
    navName: "CMYK to RGB",
    navDescription: "Convert CMYK colors to RGB.",
    name: "CMYK to RGB Converter",
    description: "Convert CMYK percentages to RGB color values instantly using the standard CMYK to RGB formula.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ColorLensIcon fontSize="large" color="primary"/>,
    seoTitle: "CMYK to RGB Converter - Free Online Color Tool",
    seoDescription: "Convert CMYK percentages to RGB color values instantly with this free cmyk to rgb converter. Get accurate on-screen RGB and hex values from print CMYK ink percentages.",
    keywords: ["cmyk to rgb", "cmyk to rgb converter", "cmyk to rgb color converter", "convert cmyk to rgb", "cmyk rgb converter", "color converter cmyk to rgb", "cmyk to rgb formula"],
    ogTitle: "CMYK to RGB Converter - Free Online Color Tool | ToolZoneX",
    ogDescription: "Convert CMYK percentages to RGB color values instantly.",
    schemaName: "CMYK to RGB Converter",
    schemaDescription: "Convert CMYK percentages to RGB color values instantly using the standard CMYK to RGB formula.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Why might the RGB result look slightly different on screen than the printed CMYK color?", answer: "CMYK printing depends on ink, paper, and printer calibration, none of which this formula accounts for — it gives a mathematically consistent approximation, not a color-managed print preview." }, { question: "What is the formula for CMYK to RGB conversion?", answer: "R = 255 × (1 − C) × (1 − K), G = 255 × (1 − M) × (1 − K), and B = 255 × (1 − Y) × (1 − K), where C, M, Y, and K are each expressed as a fraction between 0 and 1 (i.e. the percentage divided by 100)." }, { question: "Does this tool also convert RGB back to CMYK?", answer: "This page converts CMYK to RGB only. Use our separate RGB to CMYK converter if you need to go the opposite direction." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
