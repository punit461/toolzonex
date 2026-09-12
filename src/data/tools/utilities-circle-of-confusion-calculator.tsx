import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/circle-of-confusion-calculator",
    navName: "Circle of Confusion Calculator",
    navDescription: "CoC value from sensor format.",
    name: "Circle of Confusion Calculator",
    description: "Calculate the standard circle of confusion (CoC) value for common camera sensor formats or a custom sensor diagonal.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PhotoCameraIcon fontSize="large" color="primary"/>,
    seoTitle: "Circle of Confusion Calculator - CoC by Sensor Format",
    seoDescription: "Free circle of confusion calculator. Pick a sensor format (full frame, APS-C, Micro Four Thirds, 1-inch) or enter a custom diagonal to find the standard CoC value.",
    keywords: ["circle of confusion calculator", "coc calculator", "sensor diagonal calculator", "photography circle of confusion", "depth of field coc value"],
    ogTitle: "Circle of Confusion Calculator - CoC by Sensor Format | ToolZoneX",
    ogDescription: "Calculate the standard circle of confusion value for common camera sensor formats.",
    schemaName: "Circle of Confusion Calculator",
    schemaDescription: "Calculate the standard circle of confusion (CoC) value from a camera sensor's diagonal size.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Depth of Field Calculator?", answer: "The Depth of Field Calculator computes near and far focus limits, and it needs a circle-of-confusion value as one of its inputs to do that. This tool is a companion calculator that figures out what that CoC value should actually be for your specific sensor format — use this one first, then feed the result into the depth-of-field calculation." }, { question: "Why isn't there one universal circle of confusion value for all cameras?", answer: "Because sensor size determines how much an image must be enlarged to reach a standard viewing size (like an 8x10 print), and more enlargement makes any given blur spot more visible — so smaller sensors are assigned a proportionally smaller, stricter CoC value." }, { question: "Can I use a custom circle of confusion value instead of the standard one?", answer: "Yes — some photographers use tighter custom CoC values for large prints or critical sharpness work. Enter your sensor's exact diagonal under \"Custom\" if you know it precisely, or adjust the resulting value manually for your own sharpness standard." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
