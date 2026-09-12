import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/banner-size-calculator",
    navName: "Banner Size Calculator",
    navDescription: "Pixel dimensions for a banner at a target DPI.",
    name: "Banner Size Calculator - Print Pixel Dimensions",
    description: "Calculate the required pixel dimensions for a banner artwork file from its physical size and target print resolution (DPI).",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AspectRatioIcon fontSize="large" color="primary"/>,
    seoTitle: "Banner Size Calculator - Print Pixel Dimensions",
    seoDescription: "Free banner size calculator. Enter physical banner size and DPI to find the required pixel dimensions for your artwork file, plus estimated file size.",
    keywords: ["banner size calculator", "banner pixel dimensions calculator", "print resolution calculator", "banner dpi calculator", "large format print size calculator"],
    ogTitle: "Banner Size Calculator - Print Pixel Dimensions | ToolZoneX",
    ogDescription: "Calculate the required pixel dimensions for a banner artwork file from its physical size and DPI.",
    schemaName: "Banner Size Calculator",
    schemaDescription: "Calculate required pixel dimensions for banner artwork from physical size (width and height) and target print resolution (DPI).",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What DPI should I use for a large banner?", answer: "For banners viewed from a distance of several feet or more (trade show backdrops, billboards), 100 DPI is often sufficient and keeps file sizes manageable. For banners viewed up close or with small text, 150-300 DPI gives a sharper result." }, { question: "How accurate is the estimated file size?", answer: "The file size shown is a rough range only. The uncompressed figure assumes an uncompressed 24-bit RGB bitmap; real design files (PDF, TIFF, PSD, compressed JPEG/PNG) vary enormously based on compression, color depth, layers, and content complexity — use this as a ballpark planning figure, not an exact prediction." }, { question: "Do I need to convert my physical size to inches first?", answer: "No — enter your width and height in feet, inches, meters, or centimeters and pick the matching unit; the calculator converts to inches internally before applying the DPI." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
