import ScaleIcon from '@mui/icons-material/Scale';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/body-fat-percentage-calculator",
    navName: "Body Fat % Calculator (YMCA)",
    navDescription: "Estimate body fat from weight & waist (YMCA method).",
    name: "Body Fat Percentage Calculator",
    description: "Estimate your body fat percentage using the YMCA method, based only on your body weight and waist circumference.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <ScaleIcon fontSize="large" color="primary"/>,
    seoTitle: "Body Fat Percentage Calculator - YMCA Method",
    seoDescription: "Free body fat percentage calculator using the YMCA method — estimate your body fat from just your weight and waist circumference, no calipers needed.",
    keywords: ["body fat percentage calculator", "YMCA body fat formula", "body fat calculator weight waist", "estimate body fat percentage", "body fat percentage from waist and weight"],
    ogTitle: "Body Fat Percentage Calculator - YMCA Method | ToolZoneX",
    ogDescription: "Estimate your body fat percentage using the YMCA method from your weight and waist circumference.",
    schemaName: "Body Fat Percentage Calculator",
    schemaDescription: "Estimate body fat percentage using the YMCA method based on weight and waist circumference.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from your other body fat calculator?", answer: "This tool uses the YMCA method, which only requires body weight and waist circumference. Our separate Body Fat Calculator uses the US Navy tape-measure method, which requires neck, waist, height, and (for women) hip measurements. The two formulas can give slightly different results since they use different inputs and statistical models." }, { question: "How accurate is the YMCA body fat method?", answer: "It's a reasonable estimate for the general population but, like all circumference-based formulas, it is not as precise as lab methods such as DEXA scans or hydrostatic weighing. It tends to be less accurate for very muscular or very lean individuals. Use it to track trends over weeks and months rather than treating any single reading as an exact number. This tool is for general fitness information only and is not a substitute for professional medical or clinical body composition testing." }, { question: "What do I need to measure for this calculator?", answer: "Just your body weight and your waist circumference at the navel — no neck or hip measurement is required for the YMCA method, unlike the Navy tape-measure method." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
