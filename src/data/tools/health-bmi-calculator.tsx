import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/bmi-calculator",
    navName: "BMI Calculator",
    navDescription: "Body Mass Index with Indian guidelines.",
    name: "BMI Calculator",
    description: "Calculate Body Mass Index (BMI) using Indian-specific categories.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <MonitorWeightIcon fontSize="large" color="primary"/>,
    seoTitle: "BMI Calculator - Body Mass Index with Indian Guidelines",
    seoDescription: "Free BMI calculator to calculate Body Mass Index using WHO and Indian BMI standards. Get personalized health insights based on your body mass index.",
    keywords: ["BMI calculator", "body mass index", "BMI Indian standards", "weight calculator", "health calculator", "BMI check", "obesity calculator", "bmi calculator india", "bmi calculator for indians", "indian bmi chart", "asian bmi classification"],
    ogTitle: "BMI Calculator - Body Mass Index with Indian Guidelines | ToolZoneX",
    ogDescription: "Calculate BMI using WHO and Indian BMI standards.",
    schemaName: "BMI Calculator",
    schemaDescription: "Calculate Body Mass Index with Indian guidelines.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "Is this a BMI calculator for India?", answer: "Yes — this calculator uses the lower Indian/Asian BMI classification thresholds (Underweight below 18.5, Normal 18.5-22.9, Overweight 23-24.9, Obese 25 and above) by default, rather than the standard WHO global cutoffs. It still works for anyone anywhere in the world — just enter your height and weight in metric or imperial units." }, { question: "What's a healthy BMI range?", answer: "For the Indian BMI chart, 18.5-22.9 is considered normal — slightly lower than the WHO's global standard of 18.5-24.9, reflecting a higher health risk at lower BMI levels in South Asian populations." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
