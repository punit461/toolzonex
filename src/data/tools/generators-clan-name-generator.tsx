import GroupsIcon from '@mui/icons-material/Groups';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/clan-name-generator",
    navName: "Clan Name Generator",
    navDescription: "Generate names for gaming clans.",
    name: "Clan Name Generator",
    description: "Generate a random clan or guild name for gaming communities by theme — fantasy, gaming, warrior, or mythical.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <GroupsIcon fontSize="large" color="primary"/>,
    seoTitle: "Clan Name Generator - Random Gaming Clan & Guild Names",
    seoDescription: "Free clan name generator. Choose a theme (fantasy, gaming, warrior, or mythical) to generate a random clan or guild name for your gaming team.",
    keywords: ["clan name generator", "guild name generator", "gaming clan names", "team name generator gaming", "random clan name"],
    ogTitle: "Clan Name Generator - Random Gaming Clan & Guild Names | ToolZoneX",
    ogDescription: "Generate a random clan or guild name by theme.",
    schemaName: "Clan Name Generator",
    schemaDescription: "Generate a random clan or guild name for gaming communities by theme — fantasy, gaming, warrior, or mythical.",
    applicationCategory: "GameApplication",
    currency: "INR",
    faqs: [{ question: "Can I generate more than one name?", answer: "Yes — click \"Generate Clan Name\" as many times as you like to see different prefix/suffix combinations for your chosen theme." }, { question: "Will the same combination repeat?", answer: "Yes — each generation randomly picks a prefix and suffix independently, so the same combination can come up more than once, especially with fewer clicks." }, { question: "Are these names trademark-free to use?", answer: "These are generic word combinations, but it's always a good idea to double-check that your chosen name isn't already in use by another clan, guild, or trademarked brand before adopting it, especially for competitive or public communities." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
