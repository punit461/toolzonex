import PetsIcon from '@mui/icons-material/Pets';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/horse-feed-calculator",
    navName: "Horse Feed Calculator",
    navDescription: "Daily hay & forage amount for a horse.",
    name: "Horse Feed Calculator",
    description: "Calculate a horse's recommended daily hay or forage amount from its body weight and activity level.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PetsIcon fontSize="large" color="primary"/>,
    seoTitle: "Horse Feed Calculator - Daily Hay & Forage Amount",
    seoDescription: "Free horse feed calculator. Enter your horse's body weight and activity level to find its recommended daily hay or forage amount.",
    keywords: ["horse feed calculator", "horse hay calculator", "equine feed calculator", "how much hay does a horse need", "horse forage calculator"],
    ogTitle: "Horse Feed Calculator - Daily Hay & Forage Amount | ToolZoneX",
    ogDescription: "Calculate a horse's recommended daily hay or forage amount.",
    schemaName: "Horse Feed Calculator",
    schemaDescription: "Calculate a horse's recommended daily hay or forage amount from body weight and activity level.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Is this exact for every horse?", answer: "No — this is a general guideline based on body weight and activity level. Individual horses vary based on metabolism, breed, age, body condition, and health status. Always work with a veterinarian or equine nutritionist to fine-tune a feeding plan for a specific horse." }, { question: "Does this include grain or concentrate feed?", answer: "No — this figure is for forage (hay or pasture) only, which should make up the bulk of a horse's diet. Horses in heavier work often need additional grain or concentrate feed on top of their forage ration to meet their full energy needs." }, { question: "How do I know my horse's activity level?", answer: "Idle covers horses at rest or on very light pasture turnout. Light work includes occasional riding or light training. Moderate work covers regular riding, training, or showing. Heavy work applies to horses in intense training, racing, or heavy draft or ranch work." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
