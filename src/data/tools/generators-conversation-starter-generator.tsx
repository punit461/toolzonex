import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/conversation-starter-generator",
    navName: "Conversation Starter Generator",
    navDescription: "Random casual conversation-starter questions.",
    name: "Conversation Starter Generator",
    description: "Generate a random casual conversation-starter question from a hand-written collection suited for dates, meetups, family gatherings, and small talk.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <QuestionAnswerIcon fontSize="large" color="primary"/>,
    seoTitle: "Conversation Starter Generator - Random Conversation Questions",
    seoDescription: "Free online conversation starter generator. Get a random casual conversation-starter question for dates, meetups, and small talk.",
    keywords: ["conversation starter generator", "conversation starter questions", "random conversation starters", "things to talk about", "date conversation starters"],
    ogTitle: "Conversation Starter Generator - Random Conversation Questions | ToolZoneX",
    ogDescription: "Get a random casual conversation-starter question for dates, meetups, and small talk.",
    schemaName: "Conversation Starter Generator",
    schemaDescription: "Generate a random casual conversation-starter question from a hand-written collection suited for dates, meetups, family gatherings, and small talk.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Icebreaker Question Generator?", answer: "This Conversation Starter Generator is built for general, casual one-on-one or small social settings like dates, meetups, and family gatherings. The Icebreaker Question Generator is specifically framed for GROUP settings where people are meeting for the first time, like team meetings or classrooms." }, { question: "Can the same question appear twice in a row?", answer: "No — the generator always picks a different question than the one currently shown, so clicking Regenerate always gives you something new." }, { question: "Are these questions appropriate for any audience?", answer: "Yes — all prompts are deliberately kept light, positive, and broadly appropriate for casual social situations across ages and contexts." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
