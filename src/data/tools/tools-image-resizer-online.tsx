import CropIcon from '@mui/icons-material/Crop';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/image-resizer-online",
    navName: "Image Resizer Online",
    navDescription: "Resize images with preset dimensions or custom size.",
    name: "Image Resizer Online - Resize Images Free",
    description: "Resize JPG, PNG, and WEBP images online for free. Choose from social media presets or enter custom dimensions. Aspect ratio lock included. Runs entirely in your browser.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <CropIcon fontSize="large" color="primary"/>,
    seoTitle: "Image Resizer Online - Resize Images Free",
    seoDescription: "Resize images online for free. Choose social media presets or custom dimensions with aspect ratio lock. JPG, PNG, WEBP supported. No uploads.",
    keywords: ["image resizer", "resize image online", "photo resizer", "change image size"],
    ogTitle: "Image Resizer Online - Resize Images Free | ToolZoneX",
    ogDescription: "Resize images online for free with social media presets and aspect ratio lock. No uploads.",
    schemaName: "Image Resizer Online",
    schemaDescription: "Resize images with preset dimensions or custom size.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Does resizing reduce quality?", answer: "Scaling down is generally imperceptible. Scaling up may introduce slight softness, as the tool cannot invent detail that wasn't in the original." }, { question: "What formats are supported?", answer: "JPG, PNG, and WEBP — both as input and output." }, { question: "Is my file uploaded anywhere?", answer: "No — all resizing happens in your browser using the canvas API." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
