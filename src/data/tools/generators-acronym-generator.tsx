import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/acronym-generator",
    navName: "Acronym Generator",
    navDescription: "Convert phrases to acronyms.",
    name: "Acronym Generator",
    description: "Instantly convert phrases or titles into acronyms. Free online abbreviation maker.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Acronym Generator - Phrase to Acronym & Acronym to Words",
    seoDescription: "Convert phrases to acronyms, or expand an acronym back into words — real meanings for common acronyms, backronyms for the rest. Free online abbreviation maker.",
    keywords: ["acronym generator", "abbreviation maker", "phrase to acronym", "create acronym online", "abbreviation generator", "word abbreviation generator", "word abbreviations generator", "make an abbreviation", "create an abbreviation", "abbreviations maker", "acronym maker", "abbreviate a phrase", "acronym to words generator", "acronymic sentence generator", "sentence acronym generator", "backronym generator", "what does this acronym stand for"],
    ogTitle: "Acronym Generator - Phrase to Acronym & Acronym to Words | ToolZoneX",
    ogDescription: "Convert phrases to acronyms, or expand an acronym back into words — real meanings for common acronyms, backronyms for the rest.",
    schemaName: "Acronym Generator",
    schemaDescription: "Instantly convert long phrases or titles into short acronyms, or expand an acronym back into its real meaning or a generated backronym.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does it always skip small words like \"and\" and \"the\"?", answer: "Yes, common stop words (and, or, of, the, a, an, in, on, at, for, to, with) are excluded by default so the acronym reads more naturally." }, { question: "How do I create an abbreviation from a phrase?", answer: "Type or paste the full phrase or title into the input box and click \"Generate Acronym\" — the tool takes the first letter of each significant word (skipping stop words) and joins them into an uppercase abbreviation." }, { question: "Can this tool expand an acronym back into the full words it stands for?", answer: "Yes, in the \"Acronym → Words\" mode. For well-known acronyms (like NASA, ASAP, or WHO) it returns the real, recognized meaning from a curated list. For anything it doesn't recognize, it generates a backronym instead — a plausible-sounding sentence built one word per letter, clearly labeled as generated rather than an official meaning." }, { question: "Is this the same as an abbreviation maker?", answer: "Yes — \"acronym generator,\" \"abbreviation maker,\" and \"word abbreviation generator\" all describe the same phrase-to-acronym conversion this tool performs." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
