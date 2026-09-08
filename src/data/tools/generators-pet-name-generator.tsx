import PetsIcon from '@mui/icons-material/Pets';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/pet-name-generator",
    navName: "Pet Name Generator",
    navDescription: "Generate random names for your pet.",
    name: "Pet Name Generator",
    description: "Generate a random pet name by pet type (dog, cat, bird, or other) and theme (cute, funny, or majestic).",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <PetsIcon fontSize="large" color="primary"/>,
    seoTitle: "Pet Name Generator - Random Names for Dogs, Cats & More",
    seoDescription: "Free pet name generator. Choose a pet type and theme (cute, funny, or majestic) to generate a random name for your dog, cat, bird, or other pet.",
    keywords: ["pet name generator", "dog name generator", "cat name generator", "random pet names", "pet name ideas"],
    ogTitle: "Pet Name Generator - Random Names for Dogs, Cats & More | ToolZoneX",
    ogDescription: "Generate a random pet name by type and theme.",
    schemaName: "Pet Name Generator",
    schemaDescription: "Generate a random pet name by pet type (dog, cat, bird, or other) and theme (cute, funny, or majestic).",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Can I get more than one name at a time?", answer: "Each click generates one name — click \"Generate Pet Name\" again as many times as you like to see more options for the same pet type and theme." }, { question: "Will the same name repeat?", answer: "Yes — each generation is an independent random pick from the list, so repeats are possible, especially with fewer clicks." }, { question: "What does the \"Other\" pet type cover?", answer: "\"Other\" is a general-purpose name list suited to small pets like rabbits, hamsters, guinea pigs, reptiles, and fish that don't fit neatly into the dog, cat, or bird categories." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
