import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/lean-body-mass-calculator",
    navName: "Lean Body Mass Calculator",
    navDescription: "Estimate LBM, fat mass & body fat %.",
    name: "Lean Body Mass Calculator",
    description: "Estimate lean body mass (LBM) using the Boer formula from height, weight, and gender. See fat mass and body fat percentage against a healthy range reference.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <FitnessCenterIcon fontSize="large" color="primary"/>,
    seoTitle: "Lean Body Mass Calculator - LBM, Fat Mass & Body Fat %",
    seoDescription: "Free lean body mass (LBM) calculator. Estimate lean body mass with the Boer formula, plus fat mass and body fat percentage, with a healthy range reference.",
    keywords: ["lean body mass calculator", "lbm calculator", "lean body mass", "boer formula", "fat mass", "body fat percentage", "fat free mass"],
    ogTitle: "Lean Body Mass Calculator - LBM, Fat Mass & Body Fat % | ToolZoneX",
    ogDescription: "Estimate lean body mass with the Boer formula, plus fat mass and body fat percentage.",
    schemaName: "Lean Body Mass Calculator",
    schemaDescription: "Estimate lean body mass (LBM) using the Boer formula from height, weight, and gender.",
    applicationCategory: "HealthApplication",
    currency: "USD",
    faqs: [{ question: "What is a healthy lean body mass?", answer: "Healthy lean mass varies by gender, age, and training; it's typically about 75–88% of body weight for men and 68–82% for women." }, { question: "Is the Boer formula accurate?", answer: "It's a widely used estimate that works well for average adults, but athletes and very muscular or obese individuals may be underrepresented. Use DEXA or calipers for high precision." }, { question: "What's the difference between lean body mass and muscle mass?", answer: "Lean body mass includes everything that isn't fat — muscle, bone, organs, and water. Muscle mass is only part of that." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
