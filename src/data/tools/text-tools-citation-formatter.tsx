import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/citation-formatter",
    navName: "Citation Formatter",
    navDescription: "Generate APA, MLA, and Chicago citations.",
    name: "Citation Formatter - APA, MLA & Chicago Style",
    description: "Generate a properly formatted citation in APA, MLA, and Chicago style for a book, website, or journal article from author, title, year, and publisher details.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "Citation Formatter - APA, MLA & Chicago Style Citations",
    seoDescription: "Free online citation formatter. Generate APA, MLA, and Chicago style citations for a book, website, or journal article in one step.",
    keywords: ["citation formatter", "apa citation generator", "mla citation generator", "chicago citation generator", "how to cite a website"],
    ogTitle: "Citation Formatter - APA, MLA & Chicago Style Citations | ToolZoneX",
    ogDescription: "Generate APA, MLA, and Chicago style citations for a book, website, or journal article.",
    schemaName: "Citation Formatter",
    schemaDescription: "Generate a properly formatted citation in APA, MLA, and Chicago style for a book, website, or journal article from author, title, year, and publisher details.",
    applicationCategory: "EducationalApplication",
    currency: undefined,
    faqs: [{ question: "Are these citations guaranteed to be perfectly correct?", answer: "They follow standard formatting conventions for the common cases of books, websites, and journal articles, but full citation style rules have many real-world edge cases — such as multiple authors, missing dates, or edited volumes. Always verify against an official style guide (APA, MLA, or Chicago manual) for unusual sources." }, { question: "Why do I only see URL and access date fields for websites?", answer: "Books and journal articles are traditionally cited without a URL or access date in these three styles, since they're treated as stable, permanently published sources rather than pages that can change or disappear." }, { question: "How should I format multiple authors?", answer: "Type them into the Author Name(s) field the way your chosen style requires (for example, \"Doe, J., & Smith, A.\") — the tool inserts your text as-is rather than reformatting author name order or punctuation." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
