import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/topic-generator",
    navName: "Topic Generator",
    navDescription: "Random debate, speech, or essay topics.",
    name: "Topic Generator - Debate, Speech & Essay Topics",
    description: "Pick a topic type — Debate, Speech, or Essay — and generate a random topic from a curated list, ready for your next assignment or presentation.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <RecordVoiceOverIcon fontSize="large" color="primary"/>,
    seoTitle: "Topic Generator - Free Debate, Speech & Essay Topics",
    seoDescription: "Free topic generator for debates, speeches, and essays. Generate a random topic instantly for your next class assignment, presentation, or writing task.",
    keywords: ["topic generator", "debate topic generator", "speech topic generator", "essay topic generator", "random topic idea generator"],
    ogTitle: "Topic Generator - Free Debate, Speech & Essay Topics | ToolZoneX",
    ogDescription: "Generate a random debate, speech, or essay topic instantly.",
    schemaName: "Topic Generator",
    schemaDescription: "Pick a topic type — Debate, Speech, or Essay — and generate a random topic from a curated list.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: [{ question: "What's the difference between the three topic types?", answer: "Debate topics are phrased as yes/no propositions with two clear opposing sides, meant for structured argument. Speech topics are broader subjects for an informative, persuasive, or entertaining talk without requiring two opposing sides. Essay topics are reflective or analytical prompts meant to inspire personal, exploratory writing rather than a formal argument." }, { question: "Can I get the same topic twice?", answer: "Yes — each generation is independent and random, so it's possible (though not guaranteed) to see a repeat if you generate many times in a row." }, { question: "Are the debate topics one-sided?", answer: "No — every debate topic is written as a genuinely contestable proposition with a reasonable case on both sides, rather than one with an obvious \"correct\" answer." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
