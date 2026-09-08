import PercentIcon from '@mui/icons-material/Percent';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/calorie-deficit-calculator",
    navName: "Calorie Deficit Calculator",
    navDescription: "Daily deficit target & time to reach your goal weight.",
    name: "Calorie Deficit Calculator",
    description: "Calculate your daily calorie deficit target and estimate how many weeks it will take to reach a target weight loss.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <PercentIcon fontSize="large" color="primary"/>,
    seoTitle: "Calorie Deficit Calculator - Deficit & Weight Loss Timeline",
    seoDescription: "Free calorie deficit calculator. Find your daily calorie deficit target and estimate how many weeks it'll take to reach your weight-loss goal.",
    keywords: ["calorie deficit calculator", "maintenance calories calculator", "weight loss calorie calculator", "how many calories to lose weight", "calorie deficit for weight loss"],
    ogTitle: "Calorie Deficit Calculator - Deficit & Weight Loss Timeline | ToolZoneX",
    ogDescription: "Find your daily calorie deficit target and estimated weight-loss timeline.",
    schemaName: "Calorie Deficit Calculator",
    schemaDescription: "Calculate daily calorie deficit target and estimated timeline to reach a target weight loss.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "What's a safe calorie deficit?", answer: "A deficit of 500–750 kcal/day (roughly 0.5–0.75 kg/week) is generally considered a sustainable pace for most people. Larger deficits can speed up short-term results but are harder to maintain and more likely to cause muscle loss and fatigue. This calculator is for general planning only and isn't a substitute for advice from a doctor or dietitian, especially for larger deficits." }, { question: "Why 7,700 kcal per kg of fat?", answer: "One kilogram of body fat stores roughly 7,700 kilocalories of energy, so a cumulative deficit of that size corresponds to losing about 1 kg. It's a widely used estimate, though actual results vary with water weight, muscle changes, and individual metabolism." }, { question: "Why shouldn't I go below 1,200 calories?", answer: "Very low calorie intakes can make it hard to get enough nutrients and are difficult to sustain, which is why this calculator caps its suggested target at a minimum of 1,200 kcal/day. Extreme deficits should only be attempted under medical supervision." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
