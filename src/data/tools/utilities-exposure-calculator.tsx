import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/exposure-calculator",
    navName: "Exposure Calculator",
    navDescription: "Solve the exposure triangle (aperture, shutter, ISO).",
    name: "Photography Exposure Calculator",
    description: "Solve for aperture, shutter speed, or ISO from the other two exposure triangle values and a target exposure value (EV).",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PhotoCameraIcon fontSize="large" color="primary"/>,
    seoTitle: "Exposure Calculator - Aperture, Shutter Speed & ISO (EV)",
    seoDescription: "Free photography exposure calculator. Enter two exposure triangle values (aperture, shutter speed, ISO) plus a target EV to solve for the third.",
    keywords: ["exposure calculator", "exposure value calculator", "EV calculator photography", "aperture shutter speed calculator", "exposure triangle calculator"],
    ogTitle: "Exposure Calculator - Aperture, Shutter Speed & ISO (EV) | ToolZoneX",
    ogDescription: "Solve for aperture, shutter speed, or ISO using the standard photographic exposure value formula.",
    schemaName: "Photography Exposure Calculator",
    schemaDescription: "Solve for aperture, shutter speed, or ISO from the other two exposure triangle values and a target exposure value (EV).",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What is Exposure Value (EV)?", answer: "EV is a number that combines aperture and shutter speed into a single value representing the total amount of light reaching the sensor at ISO 100. The same EV can be achieved with many different aperture/shutter combinations — a stop faster shutter with a stop wider aperture gives the same EV (this is called an \"equivalent exposure\")." }, { question: "Do I need to know the exact EV for my scene?", answer: "Not exactly — most cameras display an exposure meter reading (often relative to 0, meaning \"correctly exposed\" for the camera's current settings) which you can use as a starting point, or use common EV reference guides for lighting conditions (e.g. EV 15 for bright sun, EV 5 for typical indoor lighting)." }, { question: "Why does my shutter speed input need a slash, like 1/125?", answer: "Shutter speeds are usually written as a fraction of a second. You can enter it as a fraction (like 1/125) or as a decimal number of seconds (like 2 for a 2-second exposure) — both formats work." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
