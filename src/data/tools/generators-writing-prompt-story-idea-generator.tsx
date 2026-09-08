import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/writing-prompt-story-idea-generator",
    navName: "Writing Prompt & Story Idea Generator",
    navDescription: "Random creative writing prompts and story ideas.",
    name: "Writing Prompt & Story Idea Generator",
    description: "Generate a random creative-writing prompt or story premise from a curated list of over 60 ideas, ready to spark your next story, scene, or writing exercise.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <AutoStoriesIcon fontSize="large" color="primary"/>,
    seoTitle: "Writing Prompt & Story Idea Generator - Free Creative Prompts",
    seoDescription: "Free writing prompt and story idea generator. Beat writer's block with a random creative-writing prompt or story premise, generated instantly.",
    keywords: ["writing prompt generator", "story idea generator", "creative writing prompts", "random story starter", "fiction writing prompt tool"],
    ogTitle: "Writing Prompt & Story Idea Generator - Free Creative Prompts | ToolZoneX",
    ogDescription: "Generate a random creative-writing prompt or story idea instantly.",
    schemaName: "Writing Prompt & Story Idea Generator",
    schemaDescription: "Generate a random creative-writing prompt or story premise from a curated list of over 60 ideas.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "What's the difference between a \"writing prompt\" and a \"story idea\" here?", answer: "This tool intentionally combines both into one list — some entries are open-ended scenarios meant to spark any kind of writing, while others are more fleshed-out story premises with a clear setup. Either way, they're meant as a starting point you can take in your own direction." }, { question: "Can I get the same prompt twice?", answer: "Yes — each click is an independent random pick, so repeats are possible, especially with frequent clicking." }, { question: "Is there a \"save\" feature for prompts I like?", answer: "No — the tool only displays the current prompt; copy or write down any prompt you want to keep before generating another one." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
