import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/body-fat-calculator",
    navName: "Body Fat Calculator",
    navDescription: "Estimate body fat percentage.",
    name: "Body Fat Calculator",
    description: "Estimate your body fat percentage and lean body mass online using the US Navy tape measure method.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <MonitorWeightIcon fontSize="large" color="primary"/>,
    seoTitle: "Body Fat Calculator - US Navy Method",
    seoDescription: "Estimate your body fat percentage and lean body mass online using the US Navy tape measure method.",
    keywords: ["body fat calculator", "us navy body fat", "calculate body fat", "fat percentage", "lean mass calculator", "us navy body fat calculator accuracy", "is the navy body fat calculator accurate", "navy body fat calculator accuracy", "body fat calculator tape measure", "body fat tape measure calculator", "tape body fat calculator"],
    ogTitle: "Body Fat Calculator - US Navy Method | ToolZoneX",
    ogDescription: "Estimate your body fat percentage and lean body mass online using the US Navy tape measure method.",
    schemaName: "Body Fat Calculator",
    schemaDescription: "Estimate your body fat percentage and lean body mass online using the US Navy tape measure method.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "How accurate is the US Navy body fat calculator?", answer: "The US Navy tape-measure method is a reasonable estimate for most people — often within a few percentage points of lab methods like DEXA or hydrostatic weighing — but it is not as precise as those methods. It works by estimating body fat from circumference measurements rather than directly measuring fat tissue, so it can be less accurate for very lean, very muscular, or unusually shaped individuals. It's best used to track trends over time rather than as an exact number." }, { question: "Is this a tape measure body fat calculator?", answer: "Yes — this calculator uses the US Navy method, which only requires a flexible tape measure. Enter your neck, waist, height, and (for women) hip measurements to estimate body fat percentage without calipers or a DEXA scan." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
