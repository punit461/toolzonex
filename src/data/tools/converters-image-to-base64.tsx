import ImageIcon from '@mui/icons-material/Image';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/converters/image-to-base64",
    navName: "Image to Base64",
    navDescription: "Encode images to Base64 strings.",
    name: "Image to Base64 Converter - Encode Image Online",
    description: "Encode image files to Base64 strings instantly. Fast, free online image to data URI converter.",
    navCategory: "Converters",
    shellCategory: "Converters",
    icon: <ImageIcon fontSize="large" color="primary"/>,
    seoTitle: "Image to Base64 Converter - Encode Image Online",
    seoDescription: "Encode image files to Base64 strings instantly. Fast, free online image to data URI converter.",
    keywords: ["image to base64", "encode image to base64", "base64 encoder", "image to data uri", "image to string"],
    ogTitle: "Image to Base64 Converter - Encode Image Online | ToolZoneX",
    ogDescription: "Encode image files to Base64 strings instantly. Fast, free online image to data URI converter.",
    schemaName: "Image to Base64 Converter",
    schemaDescription: "Encode image files to Base64 strings instantly.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
