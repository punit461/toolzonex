import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/one-rep-max-calculator",
    navName: "One Rep Max Calculator",
    navDescription: "Estimate your 1RM from a submaximal set.",
    name: "One Rep Max Calculator",
    description: "Estimate your one-rep max (1RM) from a submaximal set using the Epley, Brzycki, and Lander formulas.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <FitnessCenterIcon fontSize="large" color="primary"/>,
    seoTitle: "One Rep Max Calculator - Estimate Your 1RM",
    seoDescription: "Free one rep max calculator to estimate your 1RM using the Epley, Brzycki, and Lander formulas. Enter weight and reps to see your strength estimate.",
    keywords: ["one rep max calculator", "1rm calculator", "epley formula calculator", "brzycki calculator", "strength calculator", "max lift calculator"],
    ogTitle: "One Rep Max Calculator - Estimate Your 1RM | ToolZoneX",
    ogDescription: "Estimate your one-rep max using the Epley, Brzycki, and Lander formulas.",
    schemaName: "One Rep Max Calculator",
    schemaDescription: "Estimate one-rep max (1RM) from a submaximal set using the Epley, Brzycki, and Lander formulas.",
    applicationCategory: "HealthApplication",
    currency: "INR",
    faqs: [{ question: "Which formula should I trust?", answer: "The three formulas agree closely for lower rep counts (1–5). They diverge as reps rise, so the average shown here gives a balanced estimate — treat it as approximate." }, { question: "Are these estimates accurate?", answer: "They're good ballpark figures but not a substitute for a tested max. Always use conservative loads when training near your estimated 1RM." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
