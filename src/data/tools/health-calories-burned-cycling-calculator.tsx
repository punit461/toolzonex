import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/calories-burned-cycling-calculator",
    navName: "Calories Burned Cycling Calculator",
    navDescription: "Calories burned from weight, intensity & duration.",
    name: "Calories Burned Cycling Calculator",
    description: "Estimate calories burned while cycling based on your weight, speed/intensity, and duration, using the standard MET formula.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <DirectionsBikeIcon fontSize="large" color="primary"/>,
    seoTitle: "Calories Burned Cycling Calculator - MET-Based Estimate",
    seoDescription: "Free calories burned cycling calculator. Enter your weight, cycling intensity/speed, and duration to estimate calories burned using the standard MET formula.",
    keywords: ["calories burned cycling calculator", "cycling calorie calculator", "calories burned biking", "MET calculator cycling", "calories burned bike riding"],
    ogTitle: "Calories Burned Cycling Calculator | ToolZoneX",
    ogDescription: "Estimate calories burned while cycling based on weight, intensity, and duration.",
    schemaName: "Calories Burned Cycling Calculator",
    schemaDescription: "Estimate calories burned while cycling using the standard MET formula.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "How accurate is this calorie estimate?", answer: "This MET-based method gives a solid estimate for flat-terrain cycling at a steady speed, but actual burn depends on wind resistance, hills, bike weight, and rider efficiency. A power-meter-based estimate would be more precise, but this calculator offers a reliable general figure." }, { question: "Does cycling uphill change the calorie burn?", answer: "Yes — climbing significantly increases energy cost compared to flat riding at the same speed. This calculator assumes flat terrain at the selected speed/intensity band." }, { question: "Is this a substitute for medical or professional coaching advice?", answer: "No — this is a general fitness estimate, not a clinical or medical measurement. Consult a doctor or coach for guidance tailored to your specific training or health goals." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
