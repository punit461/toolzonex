import MoodIcon from '@mui/icons-material/Mood';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/mood-picker",
    navName: "Mood Picker",
    navDescription: "Get a suggestion based on your current mood.",
    name: "Mood Picker",
    description: "Select your current mood from eight options to see hand-written affirmations, suggestions, and small activity ideas tailored to that mood.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <MoodIcon fontSize="large" color="primary"/>,
    seoTitle: "Mood Picker - Get a Suggestion for How You're Feeling",
    seoDescription: "Free online mood picker. Select your current mood to get a small suggestion, affirmation, or activity idea tailored to how you're feeling.",
    keywords: ["mood picker", "how am I feeling tool", "mood based suggestions", "daily mood check in tool", "mood affirmation generator"],
    ogTitle: "Mood Picker - Get a Suggestion for How You're Feeling | ToolZoneX",
    ogDescription: "Select your current mood to get a small suggestion, affirmation, or activity idea.",
    schemaName: "Mood Picker",
    schemaDescription: "Select your current mood from eight options to see hand-written affirmations, suggestions, and small activity ideas tailored to that mood.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "Is this a substitute for professional mental health support?", answer: "No — this tool offers simple, general suggestions for everyday moods, not clinical advice. If you're dealing with persistent or serious distress, please reach out to a qualified mental health professional." }, { question: "Does the tool track my mood over time?", answer: "No — the Mood Picker doesn't save or track anything; it's a simple in-the-moment tool with no persistence between visits." }, { question: "What if my mood doesn't fit any of the eight options?", answer: "Pick whichever option feels closest — most moods share some overlap with these eight categories, and the suggestions are broad enough to be useful even for a related feeling." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
