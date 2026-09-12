import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/macro-calculator",
    navName: "Macro Calculator",
    navDescription: "Protein, carb & fat grams for your calorie goal.",
    name: "Macro Calculator",
    description: "Calculate your daily protein, carbohydrate, and fat targets in grams based on your calorie goal and chosen diet style.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <DonutLargeIcon fontSize="large" color="primary"/>,
    seoTitle: "Macro Calculator - Protein, Carbs & Fat Targets",
    seoDescription: "Free macro calculator. Get your daily protein, carb, and fat targets in grams based on your calories, goal, and diet style (balanced, high-protein, low-carb, keto).",
    keywords: ["macro calculator", "macronutrient calculator", "protein carbs fat calculator", "macros for weight loss", "keto macro calculator"],
    ogTitle: "Macro Calculator - Protein, Carbs & Fat Targets | ToolZoneX",
    ogDescription: "Get your daily protein, carb, and fat targets in grams.",
    schemaName: "Macro Calculator",
    schemaDescription: "Calculate daily protein, carbohydrate, and fat targets in grams based on calorie goal and diet style.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "What are macros?", answer: "\"Macros\" is short for macronutrients — protein, carbohydrates, and fat, the three nutrient groups that provide calories. Tracking macros (not just total calories) helps with goals like preserving muscle during weight loss or supporting muscle gain during a bulk." }, { question: "Which diet style should I choose?", answer: "There's no single best split — a balanced 40/30/30 works well for general health, higher protein supports muscle retention during a cut, and low-carb or keto styles suit people who respond well to reduced carbohydrate intake. This tool is for general planning only; consult a doctor or dietitian for medical nutrition advice." }, { question: "Why does fat use 9 kcal/gram instead of 4?", answer: "Fat is more energy-dense than protein or carbohydrates — it provides about 9 kilocalories per gram, compared to 4 kilocalories per gram for protein and carbs, which is why the same calorie amount converts to fewer grams of fat than of protein or carbs." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
