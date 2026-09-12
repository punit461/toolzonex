import PetsIcon from '@mui/icons-material/Pets';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/health/pet-food-calculator",
    navName: "Pet Food Calculator",
    navDescription: "Daily food amount for a dog or cat.",
    name: "Pet Food Calculator",
    description: "Calculate a recommended daily food amount for a dog or cat from its weight and activity level using standard feeding guidelines.",
    navCategory: "Health",
    shellCategory: "Health",
    icon: <PetsIcon fontSize="large" color="primary"/>,
    seoTitle: "Pet Food Calculator - Daily Food Amount for Dogs & Cats",
    seoDescription: "Free pet food calculator. Enter your dog or cat's weight and activity level to find a recommended daily food amount in cups or grams.",
    keywords: ["pet food calculator", "dog food calculator", "cat food calculator", "how much should i feed my dog", "how much should i feed my cat"],
    ogTitle: "Pet Food Calculator - Daily Food Amount | ToolZoneX",
    ogDescription: "Calculate a recommended daily food amount for a dog or cat.",
    schemaName: "Pet Food Calculator",
    schemaDescription: "Calculate a recommended daily food amount for a dog or cat from weight and activity level.",
    applicationCategory: "HealthApplication",
    currency: undefined,
    faqs: [{ question: "Is this exact for my specific pet and food?", answer: "No — this is a general reference based on typical calorie density, but exact needs vary by food brand, since different foods pack different amounts of calories per cup or per gram. Always treat your specific food packaging's feeding guide, or your veterinarian's recommendation, as the final word for your pet." }, { question: "Why does activity level change the amount so much?", answer: "More active pets burn more calories and need more food to maintain a healthy weight, while sedentary pets need less to avoid excess weight gain. This calculator adjusts the baseline reference amount up to 20% higher for high activity and about 15% lower for low activity." }, { question: "Should I feed this amount all at once?", answer: "Most vets recommend splitting the daily total into two or more meals rather than one large feeding, which can help with digestion and prevent overeating at a single sitting." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
