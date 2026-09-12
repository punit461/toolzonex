import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/resting-heart-rate-calculator",
    navName: "Resting Heart Rate Calculator",
    navDescription: "Classify your resting pulse by age and gender.",
    name: "Resting Heart Rate Calculator",
    description: "Classify your measured resting heart rate into a fitness category using published resting-heart-rate-by-age-and-gender bands.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <MonitorHeartIcon fontSize="large" color="primary"/>,
    seoTitle: "Resting Heart Rate Calculator - Fitness Level by Age & Gender",
    seoDescription: "Free resting heart rate calculator. Enter your measured resting pulse, age, and gender to see your cardiovascular fitness category.",
    keywords: ["resting heart rate calculator", "resting heart rate chart", "resting pulse calculator", "resting heart rate by age", "fitness level heart rate calculator"],
    ogTitle: "Resting Heart Rate Calculator - Fitness Level by Age & Gender | ToolZoneX",
    ogDescription: "Classify your measured resting heart rate into a fitness category.",
    schemaName: "Resting Heart Rate Calculator",
    schemaDescription: "Classify a measured resting heart rate into a fitness category using age-and-gender-based bands.",
    applicationCategory: "HealthApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Heart Rate Calculator?", answer: "The Heart Rate Calculator estimates your maximum heart rate and training zones from a formula based only on your age (220 − age, or the Tanaka formula) — it doesn't use a measured pulse at all. This Resting Heart Rate Calculator does the opposite: it takes a pulse number you actually measured at rest and classifies it into a fitness category. It calculates no maximum or target values." }, { question: "How is this different from the Target Heart Rate Calculator?", answer: "The Target Heart Rate Calculator uses the Karvonen formula to compute a target training zone (a range of bpm to aim for during exercise) from your age, resting heart rate, and desired intensity. This tool doesn't calculate any target or training zone — it only classifies your already-measured resting pulse into a fitness category like Excellent, Good, or Average." }, { question: "How do I measure my resting heart rate accurately?", answer: "Take your pulse for a full 60 seconds right after waking up, while still lying down, before coffee, exercise, or checking your phone. Measuring on a few different mornings and averaging the results gives a more reliable number than a single reading, since resting heart rate can fluctuate day to day with sleep, stress, and hydration." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
