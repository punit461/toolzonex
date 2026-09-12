import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/library-shelf-space-calculator",
    navName: "Library Shelf Space Calculator",
    navDescription: "Shelves needed by book count and spine width.",
    name: "Library Shelf Space Calculator",
    description: "Calculate total linear shelf space and shelves needed from book count, average spine width, and shelf length.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AutoStoriesIcon fontSize="large" color="primary"/>,
    seoTitle: "Library Shelf Space Calculator - Shelves Needed",
    seoDescription: "Free library shelf space calculator. Enter book count, spine width, and shelf length to calculate total shelf space and shelves needed.",
    keywords: ["library shelf space calculator", "bookshelf space calculator", "how many shelves do i need for books", "book storage calculator", "shelf space calculator"],
    ogTitle: "Library Shelf Space Calculator - Shelves Needed | ToolZoneX",
    ogDescription: "Calculate total linear shelf space and shelves needed from book count and spine width.",
    schemaName: "Library Shelf Space Calculator",
    schemaDescription: "Calculate total linear space as book count times average spine width, then shelves needed as the ceiling of total space divided by shelf length.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Why does hardcover take up more space than paperback?", answer: "Hardcover books have thicker covers, sturdier binding, and often use heavier paper stock, giving them a wider average spine — commonly around 1.25 in versus roughly 0.75 in for a typical paperback." }, { question: "Should I use a custom spine width for a mixed collection?", answer: "Yes — if your collection mixes paperbacks, hardcovers, oversized art books, or reference volumes, measure a representative sample of your actual books and enter that average under \"Custom\" for a more accurate estimate." }, { question: "Does this leave room for growth or loose shelving?", answer: "No — it calculates the space needed to fit your current book count snugly. Many librarians and organizers leave 10-20% of shelf space empty for future additions and easier browsing, so consider adding a buffer to your shelf count." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
