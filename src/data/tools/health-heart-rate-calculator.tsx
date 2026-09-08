import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/heart-rate-calculator",
    navName: "Heart Rate Calculator",
    navDescription: "Max heart rate and training zones by age.",
    name: "Heart Rate Calculator",
    description: "Estimate your maximum heart rate and training zones from your age, using the 220-age and Tanaka formulas.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <MonitorHeartIcon fontSize="large" color="primary"/>,
    seoTitle: "Heart Rate Calculator - Max Heart Rate & Training Zones",
    seoDescription: "Free heart rate calculator to estimate your maximum heart rate using the 220-age and Tanaka formulas, plus your personal heart-rate training zones.",
    keywords: ["heart rate calculator", "max heart rate calculator", "maximum heart rate calculator", "heart rate zones calculator", "tanaka formula heart rate", "220 minus age calculator", "target heart rate zones"],
    ogTitle: "Heart Rate Calculator - Max Heart Rate & Training Zones | ToolZoneX",
    ogDescription: "Estimate your maximum heart rate and training zones from your age.",
    schemaName: "Heart Rate Calculator",
    schemaDescription: "Estimate maximum heart rate and training zones from age using the 220-age and Tanaka formulas.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "How do I calculate my maximum heart rate?", answer: "The simplest estimate is 220 minus your age. For a more accurate estimate, use the Tanaka formula: 208 − (0.7 × your age). Both are shown automatically above once you enter your age." }, { question: "What are heart rate training zones?", answer: "Training zones divide your max heart rate into percentage bands — roughly 50-60% for warm-up, 60-70% for fat burn, 70-80% for cardio, 80-90% for peak/anaerobic effort, and 90-100% for maximum short bursts. Each zone targets a different training benefit." }, { question: "Is this calculator a substitute for medical advice?", answer: "No — this tool provides a statistical estimate based on population-average formulas, not a personalized medical assessment. If you have a heart condition, are new to exercise, or are on medication that affects heart rate, consult a doctor before using these zones to guide your training." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
