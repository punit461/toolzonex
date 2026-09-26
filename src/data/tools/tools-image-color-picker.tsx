import ColorLensIcon from '@mui/icons-material/ColorLens';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/image-color-picker",
    navName: "Image Color Picker",
    navDescription: "Create custom color palettes from any image.",
    name: "Image Color Picker",
    description: "Create custom color palettes from any image by picking exact HEX colors from its pixels.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <ColorLensIcon fontSize="large" color="primary"/>,
    seoTitle: "Image Color Picker - Extract Colors from Photos",
    seoDescription: "Create custom color palettes from any image. Upload a photo and pick exact HEX colors straight from the pixels.",
    keywords: ["image color picker", "extract colors from image", "eyedropper tool", "color picker from photo", "image palette generator"],
    ogTitle: "Image Color Picker - Extract Colors from Photos | ToolZoneX",
    ogDescription: "Create custom color palettes from any image.",
    schemaName: "Image Color Picker",
    schemaDescription: "Pick exact HEX colors from any uploaded image.",
    applicationCategory: "DesignApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
