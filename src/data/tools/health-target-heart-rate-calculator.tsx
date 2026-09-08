import FavoriteIcon from '@mui/icons-material/Favorite';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/target-heart-rate-calculator",
    navName: "Target Heart Rate Calculator",
    navDescription: "Karvonen-formula target heart rate zone.",
    name: "Target Heart Rate Calculator",
    description: "Calculate your personalized target heart rate zone using the Karvonen formula, based on age, resting heart rate, and intensity.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <FavoriteIcon fontSize="large" color="primary"/>,
    seoTitle: "Target Heart Rate Calculator - Karvonen Formula",
    seoDescription: "Free target heart rate calculator using the Karvonen formula. Enter your age, resting heart rate, and desired intensity to find your personalized training zone.",
    keywords: ["target heart rate calculator", "karvonen formula calculator", "heart rate reserve calculator", "training zone calculator", "personalized heart rate zone"],
    ogTitle: "Target Heart Rate Calculator - Karvonen Formula | ToolZoneX",
    ogDescription: "Calculate your personalized target heart rate zone using the Karvonen formula.",
    schemaName: "Target Heart Rate Calculator",
    schemaDescription: "Calculate a personalized target heart rate zone using the Karvonen formula.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "What is the Karvonen formula?", answer: "The Karvonen formula calculates a target heart rate using your Heart Rate Reserve (max heart rate minus resting heart rate): Target HR = ((Max HR − Resting HR) × %Intensity) + Resting HR. It is considered more accurate than simply taking a percentage of max heart rate because it accounts for individual fitness via resting heart rate." }, { question: "How do I find my resting heart rate?", answer: "Measure your pulse for a full minute right after waking up, before getting out of bed, on a day you feel well-rested. Average it over a few mornings for a more reliable number." }, { question: "Is this a substitute for medical advice?", answer: "No — this tool gives a statistical estimate based on standard exercise-physiology formulas, not a personalized medical assessment. If you have a heart condition or are new to exercise, consult a doctor before training in these zones." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
