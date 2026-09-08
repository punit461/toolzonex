import FavoriteIcon from '@mui/icons-material/Favorite';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/bmr-calculator",
    navName: "BMR Calculator",
    navDescription: "Basal Metabolic Rate using Mifflin-St Jeor.",
    name: "BMR Calculator",
    description: "Calculate your Basal Metabolic Rate (BMR) to understand your resting calorie needs.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <FavoriteIcon fontSize="large" color="primary"/>,
    seoTitle: "BMR Calculator - Basal Metabolic Rate using Mifflin-St Jeor",
    seoDescription: "Free BMR calculator to calculate Basal Metabolic Rate using Mifflin-St Jeor equation. Understand your body's calorie needs at rest for effective diet planning.",
    keywords: ["BMR calculator", "basal metabolic rate", "Mifflin-St Jeor", "metabolism", "calorie needs", "BMR formula", "metabolic rate", "mifflin st jeor calculator", "mifflin st jeor equation calculator", "mifflin equation calculator", "mifflin st jeor bmr calculator", "mifflin-st jeor bmr calculator", "mifflin-st. jeor equation calculator", "mifflin st. jeor equation calculator", "mifflin st jeor calorie calculator", "msj equation", "bmr calculator mifflin st jeor", "bmr calculator guide", "total daily energy expenditure"],
    ogTitle: "BMR Calculator - Basal Metabolic Rate | ToolZoneX",
    ogDescription: "Calculate BMR using Mifflin-St Jeor equation.",
    schemaName: "BMR Calculator",
    schemaDescription: "Calculate Basal Metabolic Rate using Mifflin-St Jeor.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "Is BMR the same as the calories I burn in a day?", answer: "No — BMR is calories burned at complete rest. Your total daily burn (TDEE) is higher and includes activity, exercise, and digestion." }, { question: "Is this a Mifflin-St Jeor calculator?", answer: "Yes — every result on this page is computed with the Mifflin-St Jeor equation rather than the older (less accurate) Harris-Benedict formula." }, { question: "What is the Mifflin-St Jeor equation?", answer: "The Mifflin-St Jeor equation is the most widely used formula for estimating BMR. For men: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) + 5. For women: BMR = 10 × weight(kg) + 6.25 × height(cm) - 5 × age(years) - 161. It replaced the older Harris-Benedict equation as the modern clinical standard because it more closely matches measured resting energy expenditure." }, { question: "How does BMR relate to TDEE (Total Daily Energy Expenditure)?", answer: "TDEE = BMR × activity multiplier. Your BMR (Mifflin-St Jeor result) is the calories you'd burn lying still all day; TDEE adds in movement, exercise, and daily activity on top of that. Use our TDEE calculator to apply an activity multiplier to the BMR figure from this page." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
