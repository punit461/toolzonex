import LocalDiningIcon from '@mui/icons-material/LocalDining';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/calorie-calculator",
    navName: "Calorie Calculator",
    navDescription: "Daily calorie needs for weight goals.",
    name: "Calorie Calculator",
    description: "Calculate your daily calorie needs for weight loss, maintenance, or muscle gain using the accurate Mifflin-St Jeor equation.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <LocalDiningIcon fontSize="large" color="primary"/>,
    seoTitle: "Calorie Calculator - Daily Calorie Needs",
    seoDescription: "Calculate your daily calorie needs for weight loss, maintenance, or muscle gain using the accurate Mifflin-St Jeor equation.",
    keywords: ["calorie calculator", "daily calories", "weight loss calories", "maintenance calories", "tdee calculator"],
    ogTitle: "Calorie Calculator - Daily Calorie Needs | ToolZoneX",
    ogDescription: "Calculate your daily calorie needs for weight loss, maintenance, or muscle gain.",
    schemaName: "Calorie Calculator",
    schemaDescription: "Calculate your daily calorie needs for weight loss, maintenance, or muscle gain.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
