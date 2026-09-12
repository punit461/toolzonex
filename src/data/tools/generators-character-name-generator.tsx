import BadgeIcon from '@mui/icons-material/Badge';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/character-name-generator",
    navName: "Character Name Generator",
    navDescription: "Generate names for Fantasy, Sci-Fi, Modern & Historical characters.",
    name: "Character Name Generator - Fantasy, Sci-Fi, Modern & Historical",
    description: "Choose a style — Fantasy, Sci-Fi, Modern, or Historical — and a gender lean, then generate a full character name combining a random first and last name.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <BadgeIcon fontSize="large" color="primary"/>,
    seoTitle: "Character Name Generator - Fantasy, Sci-Fi, Modern & Historical",
    seoDescription: "Free character name generator for writers and gamers. Generate Fantasy, Sci-Fi, Modern, or Historical character names with a gender-lean toggle.",
    keywords: ["character name generator", "fantasy name generator", "sci-fi name generator", "rpg character name generator", "story character names"],
    ogTitle: "Character Name Generator - Fantasy, Sci-Fi, Modern & Historical | ToolZoneX",
    ogDescription: "Generate a full character name in Fantasy, Sci-Fi, Modern, or Historical style.",
    schemaName: "Character Name Generator",
    schemaDescription: "Choose a style — Fantasy, Sci-Fi, Modern, or Historical — and a gender lean, then generate a full character name.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Does the last name change based on the gender toggle?", answer: "No — the gender toggle only affects which first-name list is used; last names are drawn from one shared surname list for each style, regardless of gender." }, { question: "Can I mix styles, like a fantasy first name with a modern last name?", answer: "Not directly — each generation uses one selected style for both the first and last name, keeping the combination thematically consistent. You can generate a few names in different styles and manually combine parts if you want a mixed result." }, { question: "Can I get the same name twice?", answer: "Yes — each click is an independent random pick from the lists, so repeats are possible, especially with a lot of clicking." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
