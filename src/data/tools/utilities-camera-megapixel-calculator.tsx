import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/camera-megapixel-calculator",
    navName: "Camera Megapixel Calculator",
    navDescription: "Megapixels from pixel dimensions, or reverse.",
    name: "Camera Megapixel Calculator",
    description: "Calculate a camera or image's megapixel count from its pixel width and height, or find the pixel dimensions for a target megapixel count and aspect ratio.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PhotoCameraIcon fontSize="large" color="primary"/>,
    seoTitle: "Camera Megapixel Calculator - Pixels to Megapixels",
    seoDescription: "Free camera megapixel calculator. Enter pixel width and height to find megapixels, or work backward from a target megapixel count and aspect ratio.",
    keywords: ["camera megapixel calculator", "megapixel calculator", "pixels to megapixels", "image resolution calculator", "sensor resolution calculator"],
    ogTitle: "Camera Megapixel Calculator - Pixels to Megapixels | ToolZoneX",
    ogDescription: "Calculate megapixels from pixel dimensions, or find the pixel dimensions for a target megapixel count.",
    schemaName: "Camera Megapixel Calculator",
    schemaDescription: "Calculate megapixels from image pixel width and height, or find pixel dimensions for a target megapixel count and aspect ratio.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Does more megapixels always mean a better photo?", answer: "No — megapixels only measure resolution (detail and print/crop size), not image quality. Sensor size, lens quality, and pixel size affect noise and dynamic range far more than raw megapixel count." }, { question: "Why doesn't my camera's exact pixel count match its advertised megapixels?", answer: "Manufacturers round the true pixel count to the nearest whole megapixel for marketing, and some pixels around the sensor edge are used for calibration rather than the final image, so the effective count is often slightly lower than the total count." }, { question: "How do I pick the right aspect ratio for the reverse calculation?", answer: "Use 3:2 for typical DSLR/mirrorless photos, 4:3 for most smartphone and compact camera photos, 16:9 for widescreen video frames, and 1:1 for square formats like some social media posts." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
