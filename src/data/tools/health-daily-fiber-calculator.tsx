import GrassIcon from '@mui/icons-material/Grass';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/daily-fiber-calculator",
    navName: "Daily Fiber Calculator",
    navDescription: "Recommended fiber intake by age & gender.",
    name: "Daily Fiber Calculator",
    description: "Calculate your recommended daily fiber intake in grams based on age, gender, and optionally daily calorie intake.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <GrassIcon fontSize="large" color="primary"/>,
    seoTitle: "Daily Fiber Calculator - Recommended Fiber Intake (g)",
    seoDescription: "Free daily fiber calculator. Enter your age and gender to get a recommended daily fiber intake in grams, based on standard dietary guidelines.",
    keywords: ["daily fiber calculator", "how much fiber do i need", "fiber intake calculator", "recommended daily fiber", "dietary fiber calculator"],
    ogTitle: "Daily Fiber Calculator - Recommended Fiber Intake (g) | ToolZoneX",
    ogDescription: "Calculate your recommended daily fiber intake based on age, gender, and calorie intake.",
    schemaName: "Daily Fiber Calculator",
    schemaDescription: "Calculate your recommended daily fiber intake in grams based on age, gender, and optionally daily calorie intake.",
    applicationCategory: "HealthApplication",
    currency: undefined,
    faqs: [{ question: "Is this personalized medical advice?", answer: "No — this calculator provides a general dietary guideline based on age and gender, not personalized medical advice. Individual fiber needs vary based on overall diet, digestive health, activity level, and other health conditions. Talk to a doctor or registered dietitian for guidance specific to you." }, { question: "What foods are good sources of fiber?", answer: "Whole grains, legumes (beans, lentils), fruits (especially with the skin on), vegetables, nuts, and seeds are all good sources of dietary fiber." }, { question: "Can I eat too much fiber?", answer: "Increasing fiber intake very quickly can cause bloating, gas, or digestive discomfort for some people. It's generally recommended to increase fiber gradually and drink plenty of water alongside it." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
