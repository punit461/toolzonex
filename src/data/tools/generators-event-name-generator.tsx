import CelebrationIcon from '@mui/icons-material/Celebration';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/event-name-generator",
    navName: "Event Name Generator",
    navDescription: "Generate creative titles for conferences, parties & more.",
    name: "Event Name Generator",
    description: "Generate creative event title suggestions for conferences, parties, fundraisers, or workshops, tailored to the tone of each category.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CelebrationIcon fontSize="large" color="primary"/>,
    seoTitle: "Event Name Generator - Creative Titles for Any Event",
    seoDescription: "Free event name generator. Get creative title suggestions for conferences, parties, fundraisers, and workshops.",
    keywords: ["event name generator", "event title generator", "conference name ideas", "party name generator", "fundraiser name generator"],
    ogTitle: "Event Name Generator - Creative Titles for Any Event | ToolZoneX",
    ogDescription: "Get creative event title suggestions for conferences, parties, fundraisers, and workshops.",
    schemaName: "Event Name Generator",
    schemaDescription: "Generate creative event title suggestions for conferences, parties, fundraisers, or workshops, tailored to the tone of each category.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Can I mix words from two different event types?", answer: "Not automatically — each name is built from that category's own adjective and noun lists to keep the tone consistent, but you're free to mix and match words from different generated names by hand." }, { question: "How many names can I generate at once?", answer: "Each click produces 5 unique suggestions for the selected event type. Click \"Regenerate\" as many times as you like for more options." }, { question: "Should I check the name isn't already used elsewhere?", answer: "Yes — a quick web search for your favorite suggestion is a good idea before printing invitations, banners, or marketing materials." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
