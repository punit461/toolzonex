import NightlightIcon from '@mui/icons-material/Nightlight';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/good-morning-night-message-generator",
    navName: "Good Morning/Night Message Generator",
    navDescription: "Generate good morning & good night messages.",
    name: "Good Morning/Night Message Generator",
    description: "Generate a thoughtful good morning or good night message or quote, toggled with one switch between two hand-written collections.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <NightlightIcon fontSize="large" color="primary"/>,
    seoTitle: "Good Morning/Good Night Message Generator",
    seoDescription: "Free good morning and good night message generator. Toggle between two hand-written collections for a thoughtful message any time of day.",
    keywords: ["good morning message generator", "good night message generator", "good morning quotes generator", "good night quotes generator", "morning night message generator"],
    ogTitle: "Good Morning/Good Night Message Generator | ToolZoneX",
    ogDescription: "Generate a thoughtful good morning or good night message.",
    schemaName: "Good Morning/Night Message Generator",
    schemaDescription: "Generate a thoughtful good morning or good night message or quote, toggled with one switch between two hand-written collections.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Does this replace two separate generators?", answer: "Yes — this single tool covers both a Good Morning Message Generator and a Good Night Message Generator, switchable with one toggle." }, { question: "How many messages does each mode draw from?", answer: "Each mode — morning and night — has its own hand-written collection of 12 messages, so there is plenty of variety." }, { question: "Can I personalize the message with a name?", answer: "Not directly in this tool, but you can copy the generated message and add a name yourself before sending it." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
