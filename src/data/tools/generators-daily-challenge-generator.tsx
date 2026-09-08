import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/daily-challenge-generator",
    navName: "Daily Challenge Generator",
    navDescription: "Random daily challenge across six categories.",
    name: "Daily Challenge Generator",
    description: "Generate a random small daily challenge from a hand-written collection spanning Fitness, Productivity, Kindness, Creativity, Learning, and Mindfulness.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <MilitaryTechIcon fontSize="large" color="primary"/>,
    seoTitle: "Daily Challenge Generator - Random Daily Challenge Ideas",
    seoDescription: "Free online daily challenge generator. Get a random small challenge across fitness, productivity, kindness, creativity, learning, and mindfulness.",
    keywords: ["daily challenge generator", "daily challenge ideas", "random daily challenge", "self improvement challenge generator", "daily habit challenge"],
    ogTitle: "Daily Challenge Generator - Random Daily Challenge Ideas | ToolZoneX",
    ogDescription: "Get a random small daily challenge across six categories of personal growth.",
    schemaName: "Daily Challenge Generator",
    schemaDescription: "Generate a random small daily challenge from a hand-written collection spanning Fitness, Productivity, Kindness, Creativity, Learning, and Mindfulness.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Can I pick a specific category?", answer: "The generator currently picks randomly across all six categories rather than letting you filter by one, so each click can surface a challenge from any category." }, { question: "Does it track which challenges I've completed?", answer: "No — this tool doesn't save or track progress between visits; it's meant purely as a source of quick daily challenge ideas." }, { question: "Can the same challenge repeat right after another?", answer: "No — clicking New Challenge always shows a different challenge than the one currently displayed." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
