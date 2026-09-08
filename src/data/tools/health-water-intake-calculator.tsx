import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/water-intake-calculator",
    navName: "Water Intake Calculator",
    navDescription: "Daily water intake from your weight, activity & climate.",
    name: "Water Intake Calculator",
    description: "Calculate your recommended daily water intake in liters, glasses, and ounces based on your body weight, exercise level, and climate.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <LocalDrinkIcon fontSize="large" color="primary"/>,
    seoTitle: "Water Intake Calculator - Daily Water Needs",
    seoDescription: "Free water intake calculator. Find how much water you should drink per day in liters, glasses, and ounces based on your weight, exercise, and climate.",
    keywords: ["water intake calculator", "how much water should I drink", "daily water intake calculator", "water calculator", "hydration calculator"],
    ogTitle: "Water Intake Calculator - Daily Water Needs | ToolZoneX",
    ogDescription: "Find how much water you should drink per day based on your weight, exercise, and climate.",
    schemaName: "Water Intake Calculator",
    schemaDescription: "Calculate recommended daily water intake based on body weight, exercise level, and climate.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "Is \"8 glasses a day\" accurate?", answer: "The \"8x8 rule\" (eight 8-ounce glasses, about 2 liters) is a simple, memorable guideline, but individual needs vary a lot with body size, activity, and climate — which is why this calculator scales the target to your own weight instead of using one fixed number for everyone." }, { question: "Does this include water from food and other drinks?", answer: "No — this estimate is for direct water/fluid intake. In practice, food (especially fruits and vegetables) and other beverages also contribute to total hydration, so your actual need for plain water may be somewhat lower depending on your diet." }, { question: "Can I drink too much water?", answer: "Yes — drinking far more water than your body needs in a short time can lead to a dangerous condition called hyponatremia (low blood sodium). This calculator gives a general daily estimate, not medical advice; people with kidney, heart, or liver conditions should follow fluid guidance from their doctor instead." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
