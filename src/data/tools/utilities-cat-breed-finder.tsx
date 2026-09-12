import PetsIcon from '@mui/icons-material/Pets';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/cat-breed-finder",
    navName: "Cat Breed Finder",
    navDescription: "Look up size, lifespan & coat type by breed.",
    name: "Cat Breed Finder",
    description: "Search over 40 common cat breeds to find typical size, lifespan, temperament, and coat type.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <PetsIcon fontSize="large" color="primary"/>,
    seoTitle: "Cat Breed Finder - Size, Lifespan & Coat Type Lookup",
    seoDescription: "Free cat breed finder. Search over 40 common cat breeds for typical size, lifespan, temperament, and coat type.",
    keywords: ["cat breed finder", "cat breed lookup", "cat breed information", "cat breed temperament", "cat breed coat types"],
    ogTitle: "Cat Breed Finder - Size, Lifespan & Coat Type Lookup | ToolZoneX",
    ogDescription: "Search over 40 cat breeds for size, lifespan, temperament, and coat type.",
    schemaName: "Cat Breed Finder",
    schemaDescription: "Search over 40 common cat breeds to find typical size, lifespan, temperament, and coat type.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Are these facts guaranteed for every individual cat?", answer: "No — these are general, typical figures for each breed. Individual cats can vary in temperament, coat, and health regardless of breed, and mixed-breed cats may not follow these patterns at all." }, { question: "Does this include every recognized cat breed?", answer: "No — this tool covers over 40 of the most common and widely recognized breeds rather than every breed registered by cat fancier associations worldwide." }, { question: "Is any coat type truly hypoallergenic?", answer: "No cat breed is completely hypoallergenic — allergens come mainly from a protein in saliva and skin, not just fur — but some people find certain coat types easier to tolerate than others." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
