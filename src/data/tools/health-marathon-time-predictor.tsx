import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/marathon-time-predictor",
    navName: "Marathon Time Predictor",
    navDescription: "Predict marathon finish time from a recent race.",
    name: "Marathon Time Predictor",
    description: "Predict your marathon finish time from a recent race result (like a 10K or half marathon) using Riegel's race-time-prediction formula.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <DirectionsRunIcon fontSize="large" color="primary"/>,
    seoTitle: "Marathon Time Predictor - Riegel's Race Prediction Formula",
    seoDescription: "Free marathon time predictor. Enter a recent race distance and finish time to predict your marathon finish time using Riegel's formula.",
    keywords: ["marathon time predictor", "marathon finish time calculator", "riegel formula calculator", "race time predictor", "predict marathon time from 10k"],
    ogTitle: "Marathon Time Predictor - Riegel's Race Prediction Formula | ToolZoneX",
    ogDescription: "Predict your marathon finish time from a recent race result using Riegel's formula.",
    schemaName: "Marathon Time Predictor",
    schemaDescription: "Predict your marathon finish time from a recent race result (like a 10K or half marathon) using Riegel's race-time-prediction formula.",
    applicationCategory: "HealthApplication",
    currency: undefined,
    faqs: [{ question: "How accurate is Riegel's formula?", answer: "It's a well-regarded estimate, especially when the reference distance is close to a marathon (like a half marathon), but it's still just a prediction. Actual performance depends on training specific to marathon distance, pacing discipline, nutrition, and race-day conditions." }, { question: "Which reference race gives the best prediction?", answer: "A half marathon result is generally the most reliable predictor of marathon performance, since the distance and effort profile are closer to a marathon than a 5K or 10K." }, { question: "Should I train differently for a marathon than for shorter races?", answer: "Yes — this calculator predicts a time based on your current fitness, but a marathon requires distance-specific endurance training (like long runs) that a 5K or 10K training plan may not include. Following a marathon-specific training plan will typically produce a better result than this prediction alone." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
