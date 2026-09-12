import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/step-to-distance-calculator",
    navName: "Step to Distance Calculator",
    navDescription: "Convert step count into walking distance.",
    name: "Step to Distance Calculator",
    description: "Convert a number of steps into a walking distance using your stride length or an estimate from your height.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <DirectionsWalkIcon fontSize="large" color="primary"/>,
    seoTitle: "Step to Distance Calculator - Steps to Miles & Km",
    seoDescription: "Free step to distance calculator. Convert your step count into miles and kilometers using your stride length, or auto-estimate stride from your height.",
    keywords: ["step to distance calculator", "steps to miles calculator", "steps to km calculator", "stride length calculator", "how far is 10000 steps"],
    ogTitle: "Step to Distance Calculator - Steps to Miles & Km | ToolZoneX",
    ogDescription: "Convert steps walked into a distance in miles or kilometers.",
    schemaName: "Step to Distance Calculator",
    schemaDescription: "Convert a number of steps into a walking distance using stride length or an estimate from height.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How accurate is the height-based stride estimate?", answer: "The 0.415× height ratio is a widely used average that works reasonably well for typical walking pace, but actual stride length varies with leg length, walking speed, and terrain. For a more accurate result, measure your own stride length directly and switch to manual entry." }, { question: "How do I measure my own stride length?", answer: "Walk 10 normal steps in a straight line, measure the total distance covered, and divide by 10. Enter that value in the manual stride length field for a more personalized distance conversion." }, { question: "Does running change the stride length?", answer: "Yes — running strides are typically longer than walking strides. This calculator's default estimate is tuned for walking pace, so for running distance, measure your running stride length manually and use the manual mode instead." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
