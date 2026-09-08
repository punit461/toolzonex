import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/flag-emoji-quiz-generator",
    navName: "Flag & Emoji Quiz Generator",
    navDescription: "Test your knowledge of country flags and emoji.",
    name: "Flag & Emoji Quiz Generator",
    description: "A multiple-choice quiz game covering both country flags and common emoji, with a running score for the session.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <QuestionAnswerIcon fontSize="large" color="primary"/>,
    seoTitle: "Flag & Emoji Quiz Generator - Free Online Quiz Game",
    seoDescription: "Free flag and emoji quiz generator. Test your knowledge of country flags and emoji meanings with multiple-choice questions and a running score.",
    keywords: ["flag quiz generator", "emoji quiz generator", "country flag quiz", "guess the emoji game", "flag guessing game"],
    ogTitle: "Flag & Emoji Quiz Generator - Free Online Quiz Game | ToolZoneX",
    ogDescription: "Test your knowledge of country flags and emoji with a multiple-choice quiz.",
    schemaName: "Flag & Emoji Quiz Generator",
    schemaDescription: "A multiple-choice quiz game covering both country flags and common emoji, with a running score for the session.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Country Flag Finder?", answer: "The Country Flag Finder is a lookup tool — you search a country name and instantly see its flag, with no quiz element. This Flag & Emoji Quiz Generator is a game: it shows you a flag (or emoji) and challenges you to pick the correct answer from multiple choices, tracking your score as you go." }, { question: "Are the wrong answer choices random each time?", answer: "Yes — the three incorrect options are randomly selected from the rest of the list for every new question, so the same flag or emoji can appear with different wrong-answer combinations across attempts." }, { question: "Does my score save between visits?", answer: "No — the score only tracks your current session and resets to 0 whenever you switch between Flags and Emoji mode or reload the page." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
