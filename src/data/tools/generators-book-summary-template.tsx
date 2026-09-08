import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/book-summary-template",
    navName: "Book Summary Template",
    navDescription: "Build a formatted book summary with rating, quote & takeaways.",
    name: "Book Summary Template",
    description: "Fill in title, author, key takeaways, a favorite quote, a star rating, and a one-line summary to build a formatted, copyable book summary.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <AutoStoriesIcon fontSize="large" color="primary"/>,
    seoTitle: "Book Summary Template - Reading Log & Review Generator",
    seoDescription: "Free book summary template. Add title, author, key takeaways, quote, rating, and summary for a formatted, copyable book review.",
    keywords: ["book summary template", "book review generator", "reading log template", "book report template", "book notes generator"],
    ogTitle: "Book Summary Template - Reading Log & Review Generator | ToolZoneX",
    ogDescription: "Build a formatted, copyable book summary with rating, quote, and key takeaways.",
    schemaName: "Book Summary Template",
    schemaDescription: "Fill in title, author, key takeaways, a favorite quote, a star rating, and a one-line summary to build a formatted, copyable book summary.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Do I need to fill in every field?", answer: "No — blank fields like the quote or summary are simply omitted from the generated output, so you can use as much or as little of the template as you like." }, { question: "Can I add more than a couple of key takeaways?", answer: "Yes — click \"Add Takeaway\" as many times as you need; there's no fixed limit on how many bullet points appear in your summary." }, { question: "Is my book summary saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets on reload, so copy the summary before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
