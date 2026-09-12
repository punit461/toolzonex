import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/dpi-calculator",
    navName: "DPI Calculator",
    navDescription: "Find pixels per inch for printing.",
    name: "DPI Calculator",
    description: "Calculate the DPI (pixels per inch) of an image from its pixel dimensions and physical print size.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PhotoCameraIcon fontSize="large" color="primary"/>,
    seoTitle: "DPI Calculator - Pixels Per Inch for Printing",
    seoDescription: "Free DPI calculator to find the pixels per inch of an image from its pixel dimensions and print size, with print quality recommendations.",
    keywords: ["dpi calculator", "pixels per inch calculator", "print resolution calculator", "image resolution calculator", "ppi calculator", "print size calculator"],
    ogTitle: "DPI Calculator - Pixels Per Inch for Printing | ToolZoneX",
    ogDescription: "Calculate the DPI of an image and get print quality recommendations.",
    schemaName: "DPI Calculator",
    schemaDescription: "Calculate the DPI (pixels per inch) of an image from pixel dimensions and print size.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is the difference between DPI and PPI?", answer: "PPI (pixels per inch) refers to a digital image's pixel density, while DPI (dots per inch) refers to the physical dots a printer produces. They are often used interchangeably for print resolution." }, { question: "What DPI should I print at?", answer: "300 DPI is the standard for high-quality photos, 150 DPI is acceptable for larger posters, and 72 DPI is fine for web-only content." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
