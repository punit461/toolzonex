import GrainIcon from '@mui/icons-material/Grain';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/daily-carb-intake-calculator",
    navName: "Daily Carb Intake Calculator",
    navDescription: "Recommended daily carbs from calories & carb %.",
    name: "Daily Carb Intake Calculator - Recommended Carbs Per Day",
    description: "Calculate your recommended daily carbohydrate intake in grams from your total daily calories and desired carb percentage.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <GrainIcon fontSize="large" color="primary"/>,
    seoTitle: "Daily Carb Intake Calculator - Recommended Carbs Per Day",
    seoDescription: "Free daily carb intake calculator. Enter your daily calories and desired carb percentage to find your recommended daily carbohydrate intake in grams.",
    keywords: ["daily carb intake calculator", "carbs per day calculator", "how many carbs should i eat", "carbohydrate intake calculator", "daily carbohydrate needs"],
    ogTitle: "Daily Carb Intake Calculator - Recommended Carbs Per Day | ToolZoneX",
    ogDescription: "Calculate your recommended daily carbohydrate intake in grams from your calories and carb percentage.",
    schemaName: "Daily Carb Intake Calculator",
    schemaDescription: "Calculate recommended daily carbohydrate intake in grams from total daily calories and desired carb percentage of diet.",
    applicationCategory: "HealthApplication",
    currency: undefined,
    faqs: [{ question: "What percentage of calories should come from carbs?", answer: "Standard dietary guidelines recommend 45-65% of total calories from carbohydrates for most healthy adults. Athletes with high training volume often sit at the higher end, while people following lower-carb or ketogenic approaches intentionally go well below this range." }, { question: "How is this different from the Macro Calculator?", answer: "The Macro Calculator estimates your full daily calorie target from your stats and activity level, then splits it into protein, carbs, and fat all at once. This calculator is a focused, single-purpose tool for when you already know your calorie target (or want to enter one directly) and just want the carb number." }, { question: "Should I consult a professional before changing my carb intake significantly?", answer: "Yes — this tool is for general planning only. If you have diabetes, a metabolic condition, or are making a major dietary change, talk to a doctor or registered dietitian first." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
