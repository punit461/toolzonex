import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/weight-gain-calculator",
    navName: "Weight Gain Calculator",
    navDescription: "Calorie surplus & timeline to reach a target weight gain.",
    name: "Weight Gain Calculator",
    description: "Calculate your daily calorie surplus target and estimate how many weeks it will take to reach a target weight gain.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <TrendingUpIcon fontSize="large" color="primary"/>,
    seoTitle: "Weight Gain Calculator - Surplus & Bulking Timeline",
    seoDescription: "Free weight gain calculator. Find your daily calorie surplus target and estimate how many weeks it'll take to reach your weight-gain or bulking goal.",
    keywords: ["weight gain calculator", "calorie surplus calculator", "how to gain weight calculator", "bulking calculator", "calories to gain weight"],
    ogTitle: "Weight Gain Calculator - Surplus & Bulking Timeline | ToolZoneX",
    ogDescription: "Find your daily calorie surplus target and estimated weight-gain timeline.",
    schemaName: "Weight Gain Calculator",
    schemaDescription: "Calculate daily calorie surplus target and estimated timeline to reach a target weight gain.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "How big a calorie surplus should I eat to gain weight?", answer: "A surplus of 250–500 kcal/day (a \"lean bulk\") tends to favor muscle gain over fat gain compared to a larger surplus, though the exact split between muscle and fat also depends on training, protein intake, and genetics. Faster bulks pack on weight quicker but with more fat." }, { question: "Why 7,700 kcal per kg?", answer: "It's the standard estimate for the energy stored in 1 kg of body tissue, used here for a rough timeline. Actual weight gain includes water, muscle, and fat in a mix that varies by person and training program, so treat the estimate as a starting point rather than an exact prediction." }, { question: "How is this different from the Calorie Calculator?", answer: "The general Calorie Calculator gives calorie targets for several goals at once (loss, maintenance, gain). This tool is built specifically around a weight-gain goal, letting you pick a bulking pace and see an estimated timeline to a target weight gain." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
