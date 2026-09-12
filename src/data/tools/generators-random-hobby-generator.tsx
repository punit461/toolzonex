import InterestsIcon from '@mui/icons-material/Interests';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-hobby-generator",
    navName: "Random Hobby Generator",
    navDescription: "Discover a new hobby to try.",
    name: "Random Hobby Generator",
    description: "Generate 3 random hobby suggestions from a curated list spanning Creative, Physical, Outdoor, Indoor, Social, and Learning categories, each with a short description.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <InterestsIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Hobby Generator - Find a New Hobby to Try",
    seoDescription: "Free random hobby generator. Get 3 random hobby suggestions across creative, physical, outdoor, indoor, social, and learning categories, with descriptions.",
    keywords: ["random hobby generator", "hobby idea generator", "new hobby finder", "things to do generator", "hobby suggestion tool"],
    ogTitle: "Random Hobby Generator - Find a New Hobby to Try | ToolZoneX",
    ogDescription: "Generate random hobby suggestions across six categories.",
    schemaName: "Random Hobby Generator",
    schemaDescription: "Generate 3 random hobby suggestions from a curated list spanning Creative, Physical, Outdoor, Indoor, Social, and Learning categories, each with a short description.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Can I get the same hobby twice in one click?", answer: "No — each click of \"Generate Hobbies\" picks 3 distinct hobbies without repeats, biased to spread across different categories where possible." }, { question: "How many categories are covered?", answer: "Six: Creative, Physical, Outdoor, Indoor, Social, and Learning, spanning a wide range of interests from painting to chess to hiking." }, { question: "Can I generate more than 3 at a time?", answer: "Each click shows 3 hobbies, but you can click \"Regenerate\" as many times as you like to see more suggestions." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
