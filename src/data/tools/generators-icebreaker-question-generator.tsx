import GroupsIcon from '@mui/icons-material/Groups';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/icebreaker-question-generator",
    navName: "Icebreaker Question Generator",
    navDescription: "Random icebreaker questions for group settings.",
    name: "Icebreaker Question Generator",
    description: "Generate a random icebreaker question from a hand-written collection specifically framed for group and first-meeting settings like team meetings and classrooms.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <GroupsIcon fontSize="large" color="primary"/>,
    seoTitle: "Icebreaker Question Generator - Random Group Icebreakers",
    seoDescription: "Free online icebreaker question generator. Get a random icebreaker question for team meetings, classrooms, and new-group gatherings.",
    keywords: ["icebreaker question generator", "icebreaker questions for groups", "team meeting icebreakers", "classroom icebreaker questions", "first day icebreaker questions"],
    ogTitle: "Icebreaker Question Generator - Random Group Icebreakers | ToolZoneX",
    ogDescription: "Get a random icebreaker question for team meetings, classrooms, and new-group gatherings.",
    schemaName: "Icebreaker Question Generator",
    schemaDescription: "Generate a random icebreaker question from a hand-written collection specifically framed for group and first-meeting settings like team meetings and classrooms.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "How is this different from the Conversation Starter Generator?", answer: "The Conversation Starter Generator is built for general, casual one-on-one or small social conversation, like dates or family gatherings. This Icebreaker Question Generator is specifically framed for GROUP settings where people are meeting each other for the first time, like team meetings, classrooms, and new-group gatherings." }, { question: "Are these suitable for a professional workplace setting?", answer: "Yes — the prompts are written to be broadly appropriate for team meetings, onboarding sessions, and classrooms, while still being fun and engaging." }, { question: "Can I use these for a virtual/remote team meeting?", answer: "Yes — these questions work equally well for in-person and virtual settings, since they only require a verbal answer rather than any physical materials." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
