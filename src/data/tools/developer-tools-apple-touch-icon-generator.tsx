import CropSquareIcon from '@mui/icons-material/CropSquare';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/apple-touch-icon-generator",
    navName: "Apple Touch Icon Generator",
    navDescription: "Crop and resize an image into a 180x180 apple-touch-icon.",
    name: "Apple Touch Icon Generator",
    description: "Upload an image and crop/resize it into a 180x180 apple-touch-icon.png, entirely in your browser, ready to download.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <CropSquareIcon fontSize="large" color="primary"/>,
    seoTitle: "Apple Touch Icon Generator - 180x180 Icon Maker",
    seoDescription: "Upload an image and crop/resize it into a 180x180 apple-touch-icon.png, entirely in your browser. Free online tool, nothing uploaded to a server.",
    keywords: ["apple touch icon generator", "apple-touch-icon generator", "180x180 icon maker", "ios home screen icon generator", "apple touch icon maker"],
    ogTitle: "Apple Touch Icon Generator - 180x180 Icon Maker | ToolZoneX",
    ogDescription: "Upload an image and crop/resize it into a 180x180 apple-touch-icon.png.",
    schemaName: "Apple Touch Icon Generator",
    schemaDescription: "Upload an image and crop/resize it into a 180x180 apple-touch-icon.png, entirely in your browser, ready to download.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "Is my image uploaded anywhere?", answer: "No — the crop and resize happen entirely in your browser using a canvas element; the image file never leaves your device." }, { question: "Why 180x180 specifically?", answer: "Apple's Human Interface Guidelines specify 180x180 pixels as the ideal size for the apple-touch-icon used on modern iPhones and iPads with Retina displays, though iOS will scale a correctly-named icon of this size for older devices too." }, { question: "What if my image isn't already square?", answer: "The tool automatically center-crops non-square images to a square before resizing, so the most important part of your image should ideally be centered." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
