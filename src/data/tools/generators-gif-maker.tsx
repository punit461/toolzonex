import ImageIcon from '@mui/icons-material/Image';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/gif-maker",
    navName: "GIF Maker",
    navDescription: "Turn images and frames into shareable GIFs.",
    name: "GIF Maker",
    description: "Turn images and frames into smooth, shareable GIFs — entirely in your browser.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ImageIcon fontSize="large" color="primary"/>,
    seoTitle: "GIF Maker - Create Animated GIFs from Images",
    seoDescription: "Turn images and frames into smooth, shareable GIFs. Free browser-based GIF maker — no upload, no watermark.",
    keywords: ["gif maker", "create animated gif", "image to gif", "gif generator", "make a gif online"],
    ogTitle: "GIF Maker - Create Animated GIFs from Images | ToolZoneX",
    ogDescription: "Turn images and frames into smooth, shareable GIFs.",
    schemaName: "GIF Maker",
    schemaDescription: "Turn a sequence of images into an animated GIF entirely in the browser.",
    applicationCategory: "DesignApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
