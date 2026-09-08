import LocalDiningIcon from '@mui/icons-material/LocalDining';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/tdee-calculator",
    navName: "TDEE Calculator",
    navDescription: "Total Daily Energy Expenditure by activity.",
    name: "TDEE Calculator",
    description: "Find out your Total Daily Energy Expenditure to understand how many calories you burn.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <LocalDiningIcon fontSize="large" color="primary"/>,
    seoTitle: "TDEE Calculator - Total Daily Energy Expenditure",
    seoDescription: "Free TDEE calculator to calculate total daily calories burned based on activity level. Perfect for fitness tracking, weight loss, and muscle gain goals.",
    keywords: ["TDEE calculator", "total daily energy expenditure", "calories burned", "daily calorie needs", "fitness calculator", "weight loss calculator", "macro calculator"],
    ogTitle: "TDEE Calculator - Total Daily Energy Expenditure | ToolZoneX",
    ogDescription: "Calculate total daily calories burned based on activity level.",
    schemaName: "TDEE Calculator",
    schemaDescription: "Calculate Total Daily Energy Expenditure by activity.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "What does TDEE stand for?", answer: "TDEE stands for Total Daily Energy Expenditure — the total number of calories your body burns in a full day, combining your resting metabolism (BMR) with all activity, exercise, and digestion." }, { question: "How is TDEE different from BMR?", answer: "BMR is calories burned at complete rest; TDEE (Total Daily Energy Expenditure) adds your activity level on top, giving a more realistic picture of your actual daily calorie burn." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
