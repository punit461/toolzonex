import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/healthy-weight-range-calculator",
    navName: "Healthy Weight Range Calculator",
    navDescription: "BMI-based healthy weight range for your height.",
    name: "Healthy Weight Range Calculator",
    description: "Find the healthy weight range for your height using the standard BMI range of 18.5-24.9, shown in both kg and lb.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <MonitorWeightIcon fontSize="large" color="primary"/>,
    seoTitle: "Healthy Weight Range Calculator - BMI-Based Weight Range",
    seoDescription: "Free healthy weight range calculator. Enter your height to find your healthy weight range in kg and lb, based on the standard BMI range of 18.5-24.9.",
    keywords: ["healthy weight range calculator", "bmi weight range calculator", "normal weight range calculator", "healthy weight for height", "ideal weight range"],
    ogTitle: "Healthy Weight Range Calculator - BMI-Based Weight Range | ToolZoneX",
    ogDescription: "Find the healthy weight range for your height in kg and lb.",
    schemaName: "Healthy Weight Range Calculator",
    schemaDescription: "Find the healthy weight range for a given height using the standard BMI range of 18.5-24.9.",
    applicationCategory: "HealthApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Ideal Weight Calculator?", answer: "The Ideal Weight Calculator uses clinical single-point formulas — Devine, Robinson, and Miller — that each output one specific number based on height and gender, originally developed for medication dosing. This Healthy Weight Range Calculator instead uses the standard BMI classification bands (18.5-24.9 = normal weight) to show a full RANGE of healthy weights for a given height, without factoring in gender at all. They're two different, independently valid methods, and it's normal for their numbers not to match exactly." }, { question: "Why is there a range instead of one target number?", answer: "Healthy body weight naturally varies by frame size, muscle mass, and build — a single number can't capture that. The BMI-based range gives a wider, more forgiving target band that reflects the reality that many different weights are considered healthy for the same height." }, { question: "Does this account for muscle mass or body composition?", answer: "No — like all BMI-based methods, this calculator only uses height, so it can't distinguish muscle from fat. A muscular, athletic person may fall above this range while still being lean and healthy, and BMI-based ranges should be treated as a general population guideline rather than a precise individual assessment." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
