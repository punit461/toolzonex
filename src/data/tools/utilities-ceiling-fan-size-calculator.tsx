import AirIcon from '@mui/icons-material/Air';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/ceiling-fan-size-calculator",
    navName: "Ceiling Fan Size Calculator",
    navDescription: "Find the right ceiling fan blade span.",
    name: "Ceiling Fan Size Calculator",
    description: "Find the recommended ceiling fan blade span for your room based on its floor area.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AirIcon fontSize="large" color="primary"/>,
    seoTitle: "Ceiling Fan Size Calculator - What Size Fan Do I Need?",
    seoDescription: "Free ceiling fan size calculator. Enter your room's dimensions to get a recommended ceiling fan blade span based on standard sizing guidelines.",
    keywords: ["ceiling fan size calculator", "what size ceiling fan do i need", "ceiling fan blade span calculator", "fan size for room calculator", "ceiling fan sizing guide"],
    ogTitle: "Ceiling Fan Size Calculator - What Size Fan Do I Need? | ToolZoneX",
    ogDescription: "Find the right ceiling fan size for your room.",
    schemaName: "Ceiling Fan Size Calculator",
    schemaDescription: "Recommend a ceiling fan blade span based on room floor area using standard sizing guidelines.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "What if my room is an unusual shape?", answer: "For irregularly shaped rooms, estimate the total floor area as closely as you can (breaking it into rectangular sections and adding them up works well), then use that total area with the sizing table." }, { question: "Does ceiling height matter for fan size?", answer: "Ceiling height affects mounting method (using a downrod for higher ceilings) more than blade span selection, but very high ceilings may need a longer downrod to bring the fan down to the ideal 7-9 feet above the floor for effective airflow." }, { question: "Can I use two fans instead of one large fan?", answer: "Yes — for large or oddly shaped rooms over roughly 400 sq ft, two appropriately sized fans often distribute airflow more evenly than a single very large fan, and can look better proportioned too." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
