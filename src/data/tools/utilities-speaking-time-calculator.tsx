import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/speaking-time-calculator",
    navName: "Speaking Time Calculator",
    navDescription: "Estimate speech length from word count and pace.",
    name: "Speaking Time Calculator - Words to Speech Duration",
    description: "Estimate how long a speech will take from word count and speaking pace, or find the word count needed for a target duration.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <RecordVoiceOverIcon fontSize="large" color="primary"/>,
    seoTitle: "Speaking Time Calculator - Words to Speech Duration",
    seoDescription: "Free speaking time calculator. Enter word count and speaking pace to estimate speech duration, or work backward from a target time to a word count.",
    keywords: ["speaking time calculator", "words to minutes calculator", "speech length calculator", "words per minute speech calculator", "how long is my speech"],
    ogTitle: "Speaking Time Calculator - Words to Speech Duration | ToolZoneX",
    ogDescription: "Estimate how long your speech or script will take to deliver.",
    schemaName: "Speaking Time Calculator",
    schemaDescription: "Estimate speech duration from word count and speaking pace, or the word count needed for a target duration.",
    applicationCategory: "UtilityApplication",
    currency: "USD",
    faqs: [{ question: "What speaking pace should I use?", answer: "130-150 words per minute is typical for a clear, conversational presentation pace. Slower, more deliberate speaking (like a formal speech with pauses) can drop to 100-120 wpm, while fast, energetic speaking can reach 160-170 wpm or more." }, { question: "Does this account for pauses, slides, or audience laughter?", answer: "No — this is a pure words-per-minute estimate based on continuous speaking. Add extra time on top of the estimate for planned pauses, slide transitions, audience interaction, or anticipated laughter and applause." }, { question: "How do I find my own speaking pace?", answer: "Time yourself reading a passage of known word count out loud at your natural pace, then divide the word count by the time in minutes — use that personal words-per-minute figure here for a more accurate estimate." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
