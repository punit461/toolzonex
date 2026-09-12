import ImageIcon from '@mui/icons-material/Image';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/base64-to-image",
    navName: "Base64 to Image",
    navDescription: "Decode Base64 strings to images.",
    name: "Base64 to Image Converter - Decode Image Online",
    description: "Decode Base64 strings to image files instantly online. Preview and download PNG/JPEG from Base64 data.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ImageIcon fontSize="large" color="primary"/>,
    seoTitle: "Base64 to Image Converter - Decode Image Online",
    seoDescription: "Decode Base64 strings to image files instantly online. Preview and download PNG/JPEG from Base64 data.",
    keywords: ["base64 to image", "decode base64 image", "base64 decoder", "data uri to image", "base64 image viewer"],
    ogTitle: "Base64 to Image Converter - Decode Image Online | ToolZoneX",
    ogDescription: "Decode Base64 strings to image files instantly online. Preview and download PNG/JPEG from Base64 data.",
    schemaName: "Base64 to Image Converter",
    schemaDescription: "Decode Base64 strings to image files instantly online.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
