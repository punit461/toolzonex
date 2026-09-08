import LocalDiningIcon from '@mui/icons-material/LocalDining';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/meal-planner-generator",
    navName: "Meal Planner Generator",
    navDescription: "Plan Breakfast, Lunch, and Dinner across a 7-day grid.",
    name: "Meal Planner Generator",
    description: "Plan a full week of meals in a 7-day grid with Breakfast, Lunch, and Dinner slots for each day, exportable as a copyable, printable plan.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <LocalDiningIcon fontSize="large" color="primary"/>,
    seoTitle: "Meal Planner Generator - Weekly Breakfast, Lunch & Dinner Plan",
    seoDescription: "Free meal planner generator. Plan a full week of Breakfast, Lunch, and Dinner across a 7-day grid, then copy or print it.",
    keywords: ["meal planner generator", "weekly meal planner", "meal plan template", "meal prep planner", "weekly menu planner"],
    ogTitle: "Meal Planner Generator - Weekly Breakfast, Lunch & Dinner Plan | ToolZoneX",
    ogDescription: "Plan a full week of meals across Breakfast, Lunch, and Dinner slots.",
    schemaName: "Meal Planner Generator",
    schemaDescription: "Plan a full week of meals in a 7-day grid with Breakfast, Lunch, and Dinner slots for each day, exportable as a copyable, printable plan.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Weekly Planner Generator?", answer: "The Weekly Planner Generator is a general-purpose grid for free-form daily tasks, one open text box per day. This Meal Planner Generator is structured specifically around Breakfast, Lunch, and Dinner slots for each day, making it purpose-built for meal planning rather than general to-dos." }, { question: "Do I have to fill in every meal for every day?", answer: "No — leave any cell blank and it simply shows as a dash in the printable preview, so partial weeks work fine too." }, { question: "Is my meal plan saved between visits?", answer: "No — it resets on reload since it's generated fresh in your browser each time, so copy or print it if you want to keep a lasting copy for the week." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
