import PoolIcon from '@mui/icons-material/Pool';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/swimming-pace-calculator",
    navName: "Swimming Pace Calculator",
    navDescription: "Pace per 100m/100yd and per pool length.",
    name: "Swimming Pace Calculator",
    description: "Convert a swim distance and time into pace per 100m/100yd and per pool length — the standard units swimmers train and compare with, distinct from running-pace tools.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <PoolIcon fontSize="large" color="primary"/>,
    seoTitle: "Swimming Pace Calculator - Pace per 100m/100yd",
    seoDescription: "Free swimming pace calculator. Enter your distance, time, and pool length to get your pace per 100m/100yd and per pool length for training and race planning.",
    keywords: ["swimming pace calculator", "swim pace calculator", "pace per 100m", "pace per 100 yards", "swim split calculator"],
    ogTitle: "Swimming Pace Calculator - Pace per 100m/100yd | ToolZoneX",
    ogDescription: "Convert swim distance and time into pace per 100m/100yd and per pool length.",
    schemaName: "Swimming Pace Calculator",
    schemaDescription: "Convert a swim distance and time into pace per 100m/100yd and per pool length.",
    applicationCategory: "HealthApplication",
    currency: undefined,
    faqs: [{ question: "Why pace per 100m instead of per km, like running?", answer: "Swimming is almost always measured and compared in 100m/100yd splits since pools are built in fixed lengths (25m, 50m, 25yd) — it's the standard unit competitive and fitness swimmers use, not distance per hour." }, { question: "Does it matter if my pool is short-course (25m) or long-course (50m)?", answer: "Yes for the per-length figure — a 50m pool length pace covers twice the distance of a 25m length, so make sure the pool length you select matches where you swam." }, { question: "How is this different from the site's Pace Calculator?", answer: "That tool is built around running/walking distance in kilometers or miles. This one is scoped specifically to swimming's pool-length-based training conventions." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
