import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/keyword-density-analyzer",
    navName: "Keyword Density Analyzer",
    navDescription: "Analyze every keyword's density, not just one.",
    name: "Keyword Density Analyzer - Full-Content SEO Analysis",
    description: "Free keyword density analyzer. Analyze every keyword's frequency, word count, and percentage usage across your whole text or webpage copy — no single target keyword required.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Keyword Density Analyzer - Full-Content SEO Analysis",
    seoDescription: "Free keyword density analyzer. Paste any text or webpage copy to analyze every keyword's frequency and density percentage online instantly — no target keyword needed.",
    keywords: ["keyword density analyzer", "keyword density analyzer tool", "keywords density analyzer", "keyword density analysis", "keyword density checker free", "free keyword density checker", "key word density checker", "keyword density tool online", "keyword density finder", "keyword density test", "seo keyword frequency", "word density counter", "keyword analyse tool"],
    ogTitle: "Keyword Density Analyzer - Full-Content SEO Analysis | ToolZoneX",
    ogDescription: "Run a keyword density analysis on text or webpage copy. See every keyword's frequency and percentage usage, no target keyword needed.",
    schemaName: "Keyword Density Analyzer",
    schemaDescription: "Analyze every keyword's density across your whole text for SEO optimization — no single target keyword required.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Is there a free keyword density analyzer?", answer: "Yes — this keyword density analyzer is completely free, works on any text or webpage copy you paste in, and requires no sign-up." }, { question: "What's a good keyword density?", answer: "There is no fixed ideal percentage. Use keyword density as an editing signal, then prioritise relevance, clarity, and complete coverage of the topic over hitting a specific number." }, { question: "Do I need to pick a target keyword first?", answer: "No — unlike a single-keyword checker, this analyzer scans your whole text and surfaces every meaningful keyword's count and density automatically, so you don't need to know in advance which keyword to check." }, { question: "How do I find keyword density online?", answer: "Paste your article, blog post, or webpage copy into the box and click \"Analyze Keyword Density\" — the tool instantly lists every keyword's count and density percentage, ranked from most to least frequent." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
