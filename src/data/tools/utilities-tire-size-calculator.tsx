import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/tire-size-calculator",
    navName: "Tire Size Calculator",
    navDescription: "Compare two tire sizes & speedo error.",
    name: "Tire Size Calculator",
    description: "Compare two tire sizes' overall diameter, percentage difference, and the resulting speedometer error when swapping.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <DirectionsCarIcon fontSize="large" color="primary"/>,
    seoTitle: "Tire Size Calculator - Compare Sizes & Speedometer Error",
    seoDescription: "Free tire size calculator. Compare two tire sizes (e.g. 205/55R16 vs 215/45R17) to find overall diameter, percentage difference, and speedometer error.",
    keywords: ["tire size calculator", "tire size comparison calculator", "speedometer error calculator", "tire diameter calculator", "tire size converter"],
    ogTitle: "Tire Size Calculator - Compare Sizes & Speedometer Error | ToolZoneX",
    ogDescription: "Compare two tire sizes' overall diameter and speedometer error.",
    schemaName: "Tire Size Calculator",
    schemaDescription: "Compare two tire sizes' overall diameter, percentage difference, and the resulting speedometer error when swapping.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How much tire size difference is considered safe?", answer: "A common rule of thumb among tire shops is to keep the overall diameter difference within about 3% of the original size, to avoid meaningfully affecting speedometer accuracy, gearing, and ABS/traction control systems that rely on wheel speed sensors." }, { question: "Why does my speedometer read wrong after changing tire size?", answer: "A speedometer is calibrated assuming a specific tire diameter and the resulting wheel rotations per mile. Fitting a larger-diameter tire means each rotation covers more real-world distance than the speedometer assumes, so it under-reads your actual speed — a smaller tire has the opposite effect and causes the speedometer to over-read." }, { question: "What does the tire size notation mean?", answer: "In \"205/55R16\": 205 is the tire's width in millimeters, 55 is the aspect ratio (sidewall height as a percentage of that width), \"R\" indicates radial construction, and 16 is the wheel rim diameter in inches that the tire is designed to fit." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
