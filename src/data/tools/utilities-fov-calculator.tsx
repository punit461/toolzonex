import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/fov-calculator",
    navName: "FOV Calculator",
    navDescription: "Calculate camera field of view from sensor and focal length.",
    name: "FOV Calculator - Camera Field of View",
    description: "Calculate a camera's horizontal, vertical, and diagonal field of view from sensor size and focal length.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PhotoCameraIcon fontSize="large" color="primary"/>,
    seoTitle: "FOV Calculator - Camera Field of View",
    seoDescription: "Free camera field of view (FOV) calculator. Choose a sensor preset or custom size and a focal length to calculate horizontal, vertical, and diagonal FOV in degrees.",
    keywords: ["fov calculator", "camera field of view calculator", "lens fov calculator", "angle of view calculator", "full frame fov calculator"],
    ogTitle: "FOV Calculator - Camera Field of View | ToolZoneX",
    ogDescription: "Calculate camera field of view from sensor size and focal length.",
    schemaName: "FOV Calculator",
    schemaDescription: "Calculate a camera's horizontal, vertical, and diagonal field of view from sensor size and focal length.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Why do APS-C cameras have a \"crop factor\"?", answer: "A smaller sensor captures a narrower slice of the same lens's image circle, producing a narrower field of view than a full-frame sensor at the same focal length — this narrowing is commonly expressed as a crop factor multiplier, typically around 1.5x to 1.6x for APS-C sensors." }, { question: "Which FOV value matters most — horizontal, vertical, or diagonal?", answer: "Horizontal FOV is the most commonly cited figure for landscape-orientation shooting, vertical FOV matters more for portrait orientation, and diagonal FOV represents the sensor's true corner-to-corner angle of view, which is what lens focal length ratings are technically based on." }, { question: "Does lens distortion affect the actual field of view?", answer: "This formula assumes an ideal rectilinear lens. Real lenses — especially wide-angle and fisheye designs — introduce some distortion, which can make the practically perceived field of view differ slightly from this idealized trigonometric calculation." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
