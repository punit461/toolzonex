import HikingIcon from '@mui/icons-material/Hiking';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/hiking-time-calculator",
    navName: "Hiking Time Calculator",
    navDescription: "Estimate hike duration with Naismith's Rule.",
    name: "Hiking Time Calculator",
    description: "Estimate total hiking time from trail distance, elevation gain, and pace using Naismith's Rule.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <HikingIcon fontSize="large" color="primary"/>,
    seoTitle: "Hiking Time Calculator - Estimate Hike Duration",
    seoDescription: "Free hiking time calculator using Naismith's Rule. Enter distance, elevation gain, and pace to estimate total hiking time.",
    keywords: ["hiking time calculator", "naismith's rule calculator", "hike duration calculator", "trail time estimator", "hiking pace calculator"],
    ogTitle: "Hiking Time Calculator - Estimate Hike Duration | ToolZoneX",
    ogDescription: "Estimate total hiking time from distance, elevation gain, and pace using Naismith's Rule.",
    schemaName: "Hiking Time Calculator",
    schemaDescription: "Estimate total hiking time from trail distance and elevation gain using Naismith's Rule, adjusted by pace.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How accurate is Naismith's Rule?", answer: "It's a widely used estimate, not a precise prediction — actual time varies with fitness, trail conditions, weather, pack weight, and rest breaks. Treat the result as a solid planning baseline rather than an exact figure, and add extra time for breaks, photos, or difficult terrain." }, { question: "Does this account for descent?", answer: "Not separately — Naismith's Rule as implemented here only adds time for ascent, since descending is generally close to flat-ground pace on most trails. Very steep or technical descents can still take meaningfully longer than the base estimate suggests." }, { question: "What pace should I choose?", answer: "Average fits most reasonably fit hikers on a moderate trail. Choose Slow for large groups, young children, or difficult terrain, and Fast only for experienced hikers moving at a brisk, sustained pace." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
