import HeightIcon from '@mui/icons-material/Height';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/child-height-predictor",
    navName: "Child Height Predictor",
    navDescription: "Predict adult height from parents' heights.",
    name: "Child Height Predictor",
    description: "Predict a child's adult height using the mid-parental height formula, based on both parents' heights and the child's sex.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <HeightIcon fontSize="large" color="primary"/>,
    seoTitle: "Child Height Predictor - Mid-Parental Height Formula",
    seoDescription: "Free child height predictor using the mid-parental height formula. Enter both parents' heights and child's sex to estimate adult height.",
    keywords: ["child height predictor", "mid parental height calculator", "predict child height calculator", "adult height predictor", "how tall will my child be"],
    ogTitle: "Child Height Predictor - Mid-Parental Height Formula | ToolZoneX",
    ogDescription: "Predict a child's adult height using the mid-parental height formula.",
    schemaName: "Child Height Predictor",
    schemaDescription: "Predict adult height using the mid-parental height formula based on parents' heights and child's sex.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "How accurate is the mid-parental height formula?", answer: "This is a statistical estimate, not a guarantee — the typical margin of error is roughly ±10 cm (about ±4 inches) around the predicted value, meaning the true adult height usually falls somewhere within that wider range rather than landing exactly on the single predicted number. The formula captures the general genetic tendency toward parental height but cannot account for individual genetics, nutrition, childhood illness, hormonal factors, or overall health during growth years — all of which can meaningfully shift a child's actual adult height above or below this estimate." }, { question: "What is the 13 cm adjustment for?", answer: "It corrects for the average height gap between adult men and women (roughly 13 cm), so the formula adds it for boys and subtracts it for girls before averaging both parents' heights." }, { question: "Should I use this instead of a pediatrician's growth chart?", answer: "No — this tool is for general interest and rough estimation only. A pediatrician tracks your child's actual growth against standardized growth charts over time, which is a far more reliable way to monitor healthy development than a one-time genetic estimate like this." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
