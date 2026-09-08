import OpacityIcon from '@mui/icons-material/Opacity';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/daily-fat-intake-calculator",
    navName: "Daily Fat Intake Calculator",
    navDescription: "Recommended daily fat from calories & fat %.",
    name: "Daily Fat Intake Calculator - Recommended Fat Per Day",
    description: "Calculate your recommended daily fat intake in grams from your total daily calories and desired fat percentage.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <OpacityIcon fontSize="large" color="primary"/>,
    seoTitle: "Daily Fat Intake Calculator - Recommended Fat Per Day",
    seoDescription: "Free daily fat intake calculator. Enter your daily calories and desired fat percentage to find your recommended daily fat intake in grams.",
    keywords: ["daily fat intake calculator", "fat intake calculator", "how much fat should i eat", "dietary fat calculator", "daily fat needs"],
    ogTitle: "Daily Fat Intake Calculator - Recommended Fat Per Day | ToolZoneX",
    ogDescription: "Calculate your recommended daily fat intake in grams from your calories and fat percentage.",
    schemaName: "Daily Fat Intake Calculator",
    schemaDescription: "Calculate recommended daily fat intake in grams from total daily calories and desired fat percentage of diet.",
    applicationCategory: "HealthApplication",
    currency: undefined,
    faqs: [{ question: "What percentage of calories should come from fat?", answer: "Standard dietary guidelines recommend 20-35% of total calories from fat for most healthy adults. Very low-fat diets can fall below this range, while higher-fat approaches like keto intentionally go well above it — both are outside the typical recommended range and warrant more individual planning." }, { question: "Is all dietary fat the same?", answer: "No — this calculator estimates total fat grams only. Nutrition guidance generally recommends prioritizing unsaturated fats (from sources like nuts, olive oil, and fish) and limiting saturated and trans fats, regardless of your total fat target." }, { question: "How is this different from the Macro Calculator?", answer: "The Macro Calculator estimates your full daily calorie target from your stats and activity level, then splits it into protein, carbs, and fat all at once. This calculator is a focused, single-purpose tool for when you already know your calorie target (or want to enter one directly) and just want the fat number." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
