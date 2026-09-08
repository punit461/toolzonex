import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/would-you-rather-generator",
    navName: "Would You Rather Generator",
    navDescription: "Random Would You Rather questions by category.",
    name: "Would You Rather Generator - Silly, Deep, Food & Travel",
    description: "Generate a random \"Would you rather\" question from a curated, family-friendly list across Silly, Deep, Food, and Travel categories.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <QuestionAnswerIcon fontSize="large" color="primary"/>,
    seoTitle: "Would You Rather Generator - Silly, Deep, Food & Travel",
    seoDescription: "Free Would You Rather generator. Pick a category — Silly, Deep, Food, or Travel — and get a random, family-friendly question instantly.",
    keywords: ["would you rather generator", "would you rather questions", "random would you rather", "would you rather game", "icebreaker question generator"],
    ogTitle: "Would You Rather Generator - Silly, Deep, Food & Travel | ToolZoneX",
    ogDescription: "Generate a random Would You Rather question across Silly, Deep, Food, and Travel categories.",
    schemaName: "Would You Rather Generator",
    schemaDescription: "Generate a random \"Would you rather\" question from a curated, family-friendly list across Silly, Deep, Food, and Travel categories.",
    applicationCategory: "EntertainmentApplication",
    currency: undefined,
    faqs: [{ question: "Is this appropriate for a general or family audience?", answer: "Yes — every question across all four categories is written to be tasteful and family-friendly, safe to use in a classroom, workplace, or mixed group setting." }, { question: "What's the difference between the categories?", answer: "Silly leans into pure lighthearted fun, Deep asks more thoughtful or reflective questions, Food focuses on eating and cooking dilemmas, and Travel centers on places, trips, and ways of exploring the world." }, { question: "Can I get the same question twice in a row?", answer: "Yes — each click randomly selects from that category's list independently, so repeats are possible." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
