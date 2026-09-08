import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/pixel-density-calculator",
    navName: "Pixel Density Calculator",
    navDescription: "Calculate a screen's pixels per inch (PPI).",
    name: "Pixel Density Calculator - PPI Calculator",
    description: "Calculate a screen's pixels per inch (PPI) from its resolution and diagonal size.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AspectRatioIcon fontSize="large" color="primary"/>,
    seoTitle: "Pixel Density Calculator - PPI Calculator",
    seoDescription: "Free pixel density (PPI) calculator. Enter screen resolution and diagonal size to calculate pixels per inch.",
    keywords: ["pixel density calculator", "ppi calculator", "pixels per inch calculator", "screen resolution ppi calculator", "dpi vs ppi calculator"],
    ogTitle: "Pixel Density Calculator - PPI Calculator | ToolZoneX",
    ogDescription: "Calculate pixels per inch from resolution and screen size.",
    schemaName: "Pixel Density Calculator",
    schemaDescription: "Calculate a screen's pixels per inch (PPI) from its resolution and diagonal size.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What's the difference between PPI and DPI?", answer: "PPI (pixels per inch) describes a digital display's pixel density, while DPI (dots per inch) traditionally describes a printer's or scanner's output resolution in physical ink dots — the terms are often used interchangeably in casual conversation, but PPI is the technically correct term for screens." }, { question: "What PPI counts as sharp or \"retina\"?", answer: "It depends heavily on viewing distance: phones held close to the face typically need 300+ PPI to look sharp, while monitors and TVs viewed from farther away can look just as crisp at 90-110 PPI. There's no single universal threshold — it's a function of both PPI and how far away you view the screen." }, { question: "Can I enter the diagonal size in centimeters instead?", answer: "Convert centimeters to inches first (divide by 2.54) before entering the diagonal size, since PPI is inherently a per-inch measurement and the formula expects the diagonal size in inches." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
