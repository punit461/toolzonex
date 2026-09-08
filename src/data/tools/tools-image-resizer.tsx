import CropIcon from '@mui/icons-material/Crop';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/image-resizer",
    navName: "Image Resizer",
    navDescription: "Resize images online easily.",
    name: "Image Resizer Tool",
    description: "Resize images online for free. Change dimensions of any image while maintaining aspect ratio.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <CropIcon fontSize="large" color="primary"/>,
    seoTitle: "Image Resizer - Resize Photos in Browser",
    seoDescription: "Resize images online instantly while maintaining aspect ratio, with no uploads to servers.",
    keywords: ["image resizer", "resize photos online", "photo editor", "change image dimensions"],
    ogTitle: "Image Resizer - Resize Photos in Browser | ToolZoneX",
    ogDescription: "Resize images online instantly while maintaining aspect ratio, with no uploads to servers.",
    schemaName: "Image Resizer",
    schemaDescription: "Resize images online instantly while maintaining aspect ratio, with no uploads to servers.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
