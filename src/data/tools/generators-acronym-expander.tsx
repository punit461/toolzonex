import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/acronym-expander",
    navName: "Acronym Expander",
    navDescription: "Look up what a common acronym stands for.",
    name: "Acronym Expander",
    description: "Enter any acronym you've encountered — like NASA, FYI, or CIA — and see what it commonly stands for, drawn from a curated list of roughly 140 common acronyms.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <QuestionAnswerIcon fontSize="large" color="primary"/>,
    seoTitle: "Acronym Expander - Look Up What an Acronym Stands For",
    seoDescription: "Free online acronym expander. Type any acronym like NASA, FYI, or CIA and instantly see what it commonly stands for.",
    keywords: ["acronym expander", "what does this acronym mean", "acronym lookup", "expand acronym", "acronym meaning finder"],
    ogTitle: "Acronym Expander - Look Up What an Acronym Stands For | ToolZoneX",
    ogDescription: "Type any acronym and instantly see what it commonly stands for.",
    schemaName: "Acronym Expander",
    schemaDescription: "Enter any acronym you've encountered and see what it commonly stands for, drawn from a curated list of roughly 140 common acronyms.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is this different from the Acronym Generator?", answer: "The Acronym Generator (in Phrase → Acronym mode) works in the opposite direction — you type a full phrase or title and it creates an acronym from it. This Acronym Expander goes the other way: you already have an acronym you've encountered somewhere, and it tells you what it commonly stands for." }, { question: "What if an acronym isn't in the list?", answer: "The list covers roughly 140 of the most common acronyms across everyday, tech, and business use. It's not exhaustive, so a very obscure or niche acronym may not be found." }, { question: "Why do some acronyms show more than one meaning?", answer: "Many acronyms are genuinely ambiguous — for example, \"PM\" can mean several different things depending on whether you're talking about time of day, government, or project management. This tool lists every common meaning rather than guessing which one you meant." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
