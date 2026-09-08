import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/waist-to-hip-ratio-calculator",
    navName: "Waist to Hip Ratio Calculator",
    navDescription: "Measure body fat distribution (WHR).",
    name: "Waist to Hip Ratio Calculator",
    description: "Calculate your waist-to-hip ratio (WHR) and see your health risk level.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <MonitorWeightIcon fontSize="large" color="primary"/>,
    seoTitle: "Waist to Hip Ratio Calculator - WHR Health Risk",
    seoDescription: "Free waist-to-hip ratio (WHR) calculator. Enter your waist and hip measurements to see your ratio, health risk level, and ideal range for men and women.",
    keywords: ["waist to hip ratio calculator", "whr calculator", "waist hip ratio", "body fat distribution calculator", "apple body shape", "pear body shape"],
    ogTitle: "Waist to Hip Ratio Calculator - WHR Health Risk | ToolZoneX",
    ogDescription: "Calculate your waist-to-hip ratio and see your health risk level.",
    schemaName: "Waist to Hip Ratio Calculator",
    schemaDescription: "Calculate your waist-to-hip ratio and health risk level.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What is the ideal waist-to-hip ratio?", answer: "Generally, a ratio below 0.80 for women and below 0.90 for men is considered low risk. Ratios above 0.85 for women and 0.99 for men are associated with higher cardiometabolic risk." }, { question: "Is WHR better than BMI?", answer: "WHR and BMI measure different things. BMI estimates overall body fat relative to height, while WHR describes where fat is distributed. They are best used together." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
