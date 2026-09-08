import TextFieldsIcon from '@mui/icons-material/TextFields';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/keyword-density-analyzer",
    navName: "Keyword Density",
    navDescription: "Analyze SEO keyword density.",
    name: "Keyword Density Checker - Free SEO Tool",
    description: "Free keyword density checker. Analyze keyword frequency, word count, and percentage usage in text or webpage copy.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFieldsIcon fontSize="large" color="primary"/>,
    seoTitle: "Keyword Density Checker - Free SEO Tool Online",
    seoDescription: "Free keyword density checker and analyzer. Paste any text or webpage copy to see keyword frequency and density percentage online instantly.",
    keywords: ["keyword density checker", "keyword density checker free", "free keyword density checker", "key word density checker", "keyword density tool online", "keyword density finder", "keyword density test", "keyword density analysis", "keyword density analyzer", "seo keyword checker", "seo keyword frequency", "word density counter", "keyword analyse tool"],
    ogTitle: "Keyword Density Checker - Free SEO Tool Online | ToolZoneX",
    ogDescription: "Run a keyword density analysis on text or webpage copy. See keyword frequency and percentage usage.",
    schemaName: "Keyword Density Checker",
    schemaDescription: "Check the keyword density of your text for SEO optimization.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Is there a free keyword density checker?", answer: "Yes — this keyword density checker is completely free, works on any text or webpage copy you paste in, and requires no sign-up." }, { question: "What's a good keyword density?", answer: "There is no fixed ideal percentage. Use keyword density as an editing signal, then prioritise relevance, clarity, and complete coverage of the topic over hitting a specific number." }, { question: "Is a keyword density checker the same as an SEO keyword checker?", answer: "Yes — this tool works as both. It finds every meaningful keyword in your text, counts how often each one appears, and calculates its density (percentage) so you can spot over-optimization or missing keyword coverage before publishing." }, { question: "How do I find keyword density online?", answer: "Paste your article, blog post, or webpage copy into the box and click \"Analyze Keyword Density\" — the tool instantly lists every keyword's count and density percentage, ranked from most to least frequent." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
