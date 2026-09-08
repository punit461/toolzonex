import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/online-image-editor",
    navName: "Online Image Editor",
    navDescription: "Edit images with filters & adjustments.",
    name: "Online Image Editor",
    description: "Free online image editor. Crop, adjust brightness, contrast, saturation, rotate and flip images instantly.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <PhotoCameraIcon fontSize="large" color="primary"/>,
    seoTitle: "Online Image Editor - Edit Photos in Browser",
    seoDescription: "Edit images online with filters, brightness, contrast, rotation, and more. Free browser-based image editor with no installation required.",
    keywords: ["online image editor", "edit photos online", "image filters", "photo editor", "brightness contrast", "image rotation", "crop images", "photo editing tools"],
    ogTitle: "Online Image Editor - Edit Photos in Browser | ToolZoneX",
    ogDescription: "Edit images online with filters, brightness, contrast, rotation, and more. Free browser-based image editor with no installation required.",
    schemaName: "Online Image Editor",
    schemaDescription: "Edit images online with filters, brightness, contrast, rotation, and more. Free browser-based image editor with no installation required.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
