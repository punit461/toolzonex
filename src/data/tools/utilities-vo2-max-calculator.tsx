import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/vo2-max-calculator",
    navName: "VO2 Max Calculator",
    navDescription: "Estimate your VO2 max from heart rate or walk test.",
    name: "VO2 Max Calculator",
    description: "Estimate your VO2 max using resting heart rate or the 1-mile walk test. Includes age- and gender-specific fitness ratings.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <MonitorHeartIcon fontSize="large" color="primary"/>,
    seoTitle: "VO2 Max Calculator - Estimate Your Aerobic Fitness",
    seoDescription: "Free VO2 max calculator. Estimate your aerobic capacity using resting heart rate or 1-mile walk test with age/gender fitness ratings.",
    keywords: ["vo2 max calculator", "vo2 max test", "aerobic capacity calculator", "cardiovascular fitness", "vo2 max estimate", "resting heart rate vo2"],
    ogTitle: "VO2 Max Calculator - Estimate Your Aerobic Fitness | ToolZoneX",
    ogDescription: "Estimate your VO2 max using resting heart rate or the 1-mile walk test.",
    schemaName: "VO2 Max Calculator",
    schemaDescription: "Estimate your VO2 max using resting heart rate or the 1-mile walk test.",
    applicationCategory: "HealthApplication",
    currency: "USD",
    faqs: [{ question: "What is a good VO2 max score?", answer: "A 'good' VO2 max varies by age and gender. For a 30-year-old male, above 42 mL/kg/min is good and above 48 is excellent." }, { question: "Can I improve my VO2 max?", answer: "Yes — consistent aerobic training (running, cycling, swimming) at moderate to high intensity can significantly improve VO2 max. HIIT is particularly effective." }, { question: "Is the resting HR method accurate?", answer: "The resting HR method provides a reasonable estimate but is less precise than a laboratory treadmill test. It works best as a quick, non-invasive screening tool." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
