import ImageIcon from '@mui/icons-material/Image';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/image-converter",
    navName: "Image Converter",
    navDescription: "Convert images between PNG, JPEG, WebP.",
    name: "Image Converter",
    description: "Convert images between PNG, JPEG, and WebP formats. Free online image converter tool.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <ImageIcon fontSize="large" color="primary"/>,
    seoTitle: "Image Converter - Convert PNG, JPEG, WebP Images",
    seoDescription: "Convert images between PNG, JPEG, and WebP formats. Free online image converter tool with quality settings and batch conversion.",
    keywords: ["image converter", "convert images", "png to jpeg", "jpeg to png", "webp converter", "image format converter", "batch image conversion", "image quality converter"],
    ogTitle: "Image Converter - Convert PNG, JPEG, WebP Images | ToolZoneX",
    ogDescription: "Convert images between PNG, JPEG, and WebP formats. Free online image converter tool with quality settings and batch conversion.",
    schemaName: "Image Converter",
    schemaDescription: "Convert images between PNG, JPEG, and WebP formats. Free online image converter tool with quality settings and batch conversion.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
