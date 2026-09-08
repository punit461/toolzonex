import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/calories-burned-running-calculator",
    navName: "Calories Burned Running Calculator",
    navDescription: "Calories burned from weight, pace & duration.",
    name: "Calories Burned Running Calculator",
    description: "Estimate calories burned while running based on your weight, pace, and duration, using the standard MET formula.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <DirectionsRunIcon fontSize="large" color="primary"/>,
    seoTitle: "Calories Burned Running Calculator - MET-Based Estimate",
    seoDescription: "Free calories burned running calculator. Enter your weight, running pace, and duration to estimate calories burned using the standard MET formula.",
    keywords: ["calories burned running calculator", "running calorie calculator", "calories burned running", "MET calculator running", "calories per mile running"],
    ogTitle: "Calories Burned Running Calculator | ToolZoneX",
    ogDescription: "Estimate calories burned while running based on weight, pace, and duration.",
    schemaName: "Calories Burned Running Calculator",
    schemaDescription: "Estimate calories burned while running using the standard MET formula.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "How accurate is this calorie estimate?", answer: "MET-based estimates are a widely used approximation and work well for the average runner on flat ground, but actual burn varies with body composition, running efficiency, and terrain. Treat the result as a reliable estimate rather than an exact measurement." }, { question: "Does running uphill burn more calories?", answer: "Yes — this calculator assumes flat terrain at a steady pace. Hills, trail running, and wind resistance all increase the energy cost above what the flat-ground MET value predicts." }, { question: "Is this a substitute for a fitness tracker or medical advice?", answer: "No — this is a general fitness estimate, not a clinical measurement. If you're training for a specific health or medical goal, consult a doctor or certified coach." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
