import MoodIcon from '@mui/icons-material/Mood';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/compliment-generator",
    navName: "Compliment Generator",
    navDescription: "A random, genuine compliment by category.",
    name: "Compliment Generator - Random Genuine Compliments",
    description: "Generate a random, genuine, tasteful compliment about appearance, personality, or achievement.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <MoodIcon fontSize="large" color="primary"/>,
    seoTitle: "Compliment Generator - Random Genuine Compliments",
    seoDescription: "Free compliment generator. Pick a category — Appearance, Personality, or Achievement — and get a random, genuine, tasteful compliment instantly.",
    keywords: ["compliment generator", "random compliment generator", "nice things to say", "compliment generator online", "kind words generator"],
    ogTitle: "Compliment Generator - Random Genuine Compliments | ToolZoneX",
    ogDescription: "Generate a random, genuine, tasteful compliment about appearance, personality, or achievement.",
    schemaName: "Compliment Generator",
    schemaDescription: "Generate a random, genuine, tasteful compliment from a curated list, optionally filtered by category.",
    applicationCategory: "EntertainmentApplication",
    currency: undefined,
    faqs: [{ question: "Are these compliments appropriate to share with anyone?", answer: "Yes — every compliment is written to be warm, genuine, and appropriate for a general audience, whether you're sharing it with a friend, family member, or coworker." }, { question: "How many compliments does this generate from?", answer: "The tool draws from a curated list of over 30 compliments spread across the three categories." }, { question: "Can I get the same compliment twice in a row?", answer: "Yes — each click picks independently from the selected category's list, so repeats are possible." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
