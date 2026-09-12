import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/calories-burned-walking-calculator",
    navName: "Calories Burned Walking Calculator",
    navDescription: "Calories burned from weight, pace & duration.",
    name: "Calories Burned Walking Calculator",
    description: "Estimate calories burned while walking based on your weight, pace, and duration, using the standard MET formula.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <DirectionsWalkIcon fontSize="large" color="primary"/>,
    seoTitle: "Calories Burned Walking Calculator - MET-Based Estimate",
    seoDescription: "Free calories burned walking calculator. Enter your weight, walking pace, and duration to estimate calories burned using the standard MET formula.",
    keywords: ["calories burned walking calculator", "walking calorie calculator", "calories burned walking", "MET calculator walking", "calories per mile walking"],
    ogTitle: "Calories Burned Walking Calculator | ToolZoneX",
    ogDescription: "Estimate calories burned while walking based on weight, pace, and duration.",
    schemaName: "Calories Burned Walking Calculator",
    schemaDescription: "Estimate calories burned while walking using the standard MET formula.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "How accurate is this estimate?", answer: "MET-based formulas give a solid ballpark estimate for the average adult, but actual calorie burn varies with individual metabolism, terrain, incline, and fitness level. Wearable heart-rate monitors can offer a more personalized estimate, but this calculator is a reliable general guide." }, { question: "Does incline or terrain change the calorie burn?", answer: "Yes — walking uphill or on soft/uneven terrain (sand, trails) burns noticeably more calories than the same pace on a flat, paved surface. This calculator assumes flat-ground walking at the selected pace." }, { question: "Should I use this instead of medical advice?", answer: "No — this is a general estimate for fitness tracking, not a medical or clinical measurement. Consult a healthcare professional for guidance tailored to your health conditions." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
