import PetsIcon from '@mui/icons-material/Pets';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/dog-breed-finder",
    navName: "Dog Breed Finder",
    navDescription: "Look up size, lifespan & temperament by breed.",
    name: "Dog Breed Finder",
    description: "Search over 60 common dog breeds to find typical size, weight, lifespan, temperament, and energy level.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PetsIcon fontSize="large" color="primary"/>,
    seoTitle: "Dog Breed Finder - Size, Lifespan & Temperament Lookup",
    seoDescription: "Free dog breed finder. Search over 60 common dog breeds for typical size, weight, lifespan, temperament, and energy level.",
    keywords: ["dog breed finder", "dog breed lookup", "dog breed information", "dog breed temperament", "dog breed size chart"],
    ogTitle: "Dog Breed Finder - Size, Lifespan & Temperament Lookup | ToolZoneX",
    ogDescription: "Search over 60 dog breeds for size, lifespan, temperament, and energy level.",
    schemaName: "Dog Breed Finder",
    schemaDescription: "Search over 60 common dog breeds to find typical size, weight, lifespan, temperament, and energy level.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Are these facts guaranteed for every individual dog?", answer: "No — these are general, typical figures for each breed. Individual dogs can vary in size, temperament, and health regardless of breed, and mixed-breed dogs may not follow these ranges at all." }, { question: "Does this include every recognized dog breed?", answer: "No — this tool covers over 60 of the most common and widely recognized breeds rather than every breed registered by kennel clubs worldwide." }, { question: "What does \"energy level\" mean here?", answer: "It's a general indicator of how much daily exercise and mental stimulation the breed typically needs — High-energy breeds usually need substantial daily activity, while Low-energy breeds are typically content with shorter walks and more downtime." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
