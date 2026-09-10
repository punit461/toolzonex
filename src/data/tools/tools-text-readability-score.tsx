import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/tools/text-readability-score",
    navName: "Readability Checker",
    navDescription: "Score text with the Flesch-Kincaid test.",
    name: "Readability Checker & Score Calculator (Flesch-Kincaid)",
    description: "Check the readability of any text — Flesch Reading Ease, Flesch-Kincaid grade level, and a readability score, calculated instantly.",
    navCategory: "Tools",
    shellCategory: "Tools",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "Readability Checker & Score Calculator (Flesch-Kincaid)",
    seoDescription: "Free readability checker and score calculator. Check Flesch Reading Ease, Flesch-Kincaid grade level, and reading level from any text instantly.",
    keywords: ["readability checker", "readability analyzer", "readability test", "reading level checker", "reading level analyzer", "best readability checker", "flesch kincaid test", "flesch-kincaid grade level calculator", "flesch reading ease", "flesch reading ease score", "flesch reading ease tool", "flesch reading ease score calculator", "flesch reading calculator", "flesch kincaid tool", "flesch kincaid", "flesch kincaid grade level", "flesch kincaid reading level", "flesch kincaid readability", "flesch-kincaid readability", "flesch-kincaid readability tests", "flesch kincaid scoring", "flesch kincaid scores", "flesch kincaid reading ease score", "flesch-kincaid reading ease score", "flesch kinkaid score", "readability checker flesch kincaid", "readability checker grade level", "kincaid readability", "readability tool", "readability scores", "readability score calculator", "the readability test tool", "check reading level", "writing level analysis", "reading level calculator", "text readability score", "good calculator flesch kincaid"],
    ogTitle: "Readability Checker & Score Calculator (Flesch-Kincaid) | ToolZoneX",
    ogDescription: "Check the readability of any text — Flesch Reading Ease, Flesch-Kincaid grade level, and a readability score, calculated instantly.",
    schemaName: "Readability Checker & Score Calculator (Flesch-Kincaid)",
    schemaDescription: "Check the readability of any text — Flesch Reading Ease, Flesch-Kincaid grade level, and a readability score, calculated instantly.",
    applicationCategory: "EducationalApplication",
    currency: "INR",
    faqs: [{ question: "What does the Flesch-Kincaid Grade Level number mean?", answer: "It's an approximate US school grade level needed to understand the text. For example, a Flesch-Kincaid Grade Level of 8.0 means the text should be readable by an average 8th grader (around age 13). This calculator works it out from your text's average sentence length and average syllables per word using the standard formula: 0.39 × (words ÷ sentences) + 11.8 × (syllables ÷ words) − 15.59." }, { question: "What does a Flesch Reading Ease score of 0-100 mean?", answer: "The Flesch Reading Ease score runs from 0 to 100 — the higher the number, the easier the text is to read. Roughly: 90-100 is very easy (5th-grade level), 60-70 is plain English (8th-9th grade), 30-50 is difficult (college level), and below 30 is very difficult (college-graduate/professional level)." }, { question: "What Flesch Reading Ease score is considered \"easy\"?", answer: "Scores of 60-70 are considered plain English, easily understood by 13-15 year olds; scores above 90 are very easy to read, while scores below 30 are considered very difficult (college graduate level)." }, { question: "What is the Flesch-Kincaid test?", answer: "It's actually two related formulas — the Flesch Reading Ease score (0-100, higher is easier) and the Flesch-Kincaid Grade Level (an approximate US school grade needed to understand the text). This calculator computes both at once from the same text, plus the Automated Readability Index (ARI) as a third readability score." }, { question: "Is a readability checker the same as a Flesch-Kincaid calculator?", answer: "Yes — \"readability checker\", \"readability score calculator\", \"reading level calculator\", and \"Flesch-Kincaid calculator\" all describe this same kind of tool. It analyzes sentence length and syllable count to score how easy your text is to read." }, { question: "Is there a free Flesch-Kincaid calculator?", answer: "Yes — this tool is free, requires no sign-up, and runs entirely in your browser, so pasted text is never uploaded to a server." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
