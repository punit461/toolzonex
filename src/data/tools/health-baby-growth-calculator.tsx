import ChildCareIcon from '@mui/icons-material/ChildCare';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/baby-growth-calculator",
    navName: "Baby Growth Calculator",
    navDescription: "Weight-for-age percentile estimate.",
    name: "Baby Growth Calculator",
    description: "Estimate your baby's weight-for-age percentile using a WHO-style reference dataset, based on age, sex, and weight.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <ChildCareIcon fontSize="large" color="primary"/>,
    seoTitle: "Baby Growth Calculator - Weight-for-Age Percentile",
    seoDescription: "Free baby growth calculator to estimate your baby's weight-for-age percentile. Enter age, sex, and weight for a WHO-style growth chart estimate.",
    keywords: ["baby growth calculator", "baby weight percentile calculator", "weight for age percentile", "baby growth chart calculator", "infant weight percentile"],
    ogTitle: "Baby Growth Calculator - Weight-for-Age Percentile | ToolZoneX",
    ogDescription: "Estimate your baby's weight-for-age percentile with a WHO-style reference dataset.",
    schemaName: "Baby Growth Calculator",
    schemaDescription: "Estimate a baby's weight-for-age percentile using a WHO-style reference dataset.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "Is this an official medical growth chart?", answer: "No — this is an estimate, not a medical diagnostic tool. It uses a small representative dataset approximating the WHO growth standard curves for weight-for-age only. Your pediatrician's official growth chart, which plots your baby's measurements over multiple visits using the full WHO or CDC dataset, is the authoritative reference for your baby's health and development — always discuss any growth concerns with your baby's doctor rather than relying on this tool alone." }, { question: "Why does this only calculate weight percentile?", answer: "Weight-for-age is the most frequently referenced growth metric and the one most parents ask about, so this calculator focuses on giving that one estimate well. Height/length-for-age and head-circumference percentiles use separate reference curves and are best tracked on your pediatrician's official growth chart alongside weight." }, { question: "What if my baby's weight percentile changes a lot between visits?", answer: "Some fluctuation is normal, especially in the first year. Pediatricians generally look for a consistent trend along a similar percentile curve over time rather than a single reading — a sudden, large jump up or down is what usually prompts a closer look, not the exact percentile number itself." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
