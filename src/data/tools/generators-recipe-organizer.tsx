import MenuBookIcon from '@mui/icons-material/MenuBook';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/recipe-organizer",
    navName: "Recipe Organizer",
    navDescription: "Catalog and browse full recipes with ingredients & steps.",
    name: "Recipe Organizer",
    description: "Catalog multiple full recipes with name, category, ingredients, instructions, and prep time, and browse them by category in your current session.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <MenuBookIcon fontSize="large" color="primary"/>,
    seoTitle: "Recipe Organizer - Catalog & Browse Your Recipes",
    seoDescription: "Free recipe organizer. Catalog multiple full recipes with ingredients, instructions, and prep time, and browse them by category.",
    keywords: ["recipe organizer", "recipe catalog", "recipe manager", "recipe book maker", "organize recipes online"],
    ogTitle: "Recipe Organizer - Catalog & Browse Your Recipes | ToolZoneX",
    ogDescription: "Catalog and browse full recipes with ingredients, instructions, and prep time.",
    schemaName: "Recipe Organizer",
    schemaDescription: "Catalog multiple full recipes with name, category, ingredients, instructions, and prep time, and browse them by category in your current session.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Recipe Converter?", answer: "The Recipe Converter scales a single recipe's ingredient quantities up or down for a different serving size. This Recipe Organizer does no scaling math at all — instead it organizes and catalogs multiple full recipes, each with its complete name, category, ingredients, instructions, and prep time." }, { question: "Are my recipes saved permanently?", answer: "No — this tool keeps recipes only in your browser's memory for the current session, with no persistence to a server or file. Copy out any recipe details you want to keep before closing the tab." }, { question: "Can I have recipes in multiple categories?", answer: "Each recipe has one category, but you can add as many recipes as you like across all four categories and filter the list to see just one category at a time." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
