import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/book-reading-list-generator",
    navName: "Book Reading List Generator",
    navDescription: "Track books to read, reading, and finished with ratings.",
    name: "Book Reading List Generator - Track and Rate Books",
    description: "Add books with author and a To Read, Reading, or Finished status, rate finished books 1-5 stars, and see your list organized by status.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <AutoStoriesIcon fontSize="large" color="primary"/>,
    seoTitle: "Book Reading List Generator - Track and Rate Books",
    seoDescription: "Free online book reading list generator. Track books as To Read, Reading, or Finished, rate finished books, and see your list organized by status.",
    keywords: ["book reading list generator", "to be read list maker", "reading tracker online", "book list organizer", "reading list with ratings"],
    ogTitle: "Book Reading List Generator - Track and Rate Books | ToolZoneX",
    ogDescription: "Track books as To Read, Reading, or Finished and rate the ones you've completed.",
    schemaName: "Book Reading List Generator",
    schemaDescription: "Add books with author and a To Read, Reading, or Finished status, rate finished books 1-5 stars, and see your list organized by status.",
    applicationCategory: "EducationalApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Reading Progress Calculator?", answer: "The Reading Progress Calculator tracks page-by-page progress within one current book you're reading, projecting a finish date. This Book Reading List Generator instead manages a whole list of multiple books — a to-be-read and reading tracker — rather than tracking progress inside any single book." }, { question: "Why does the rating field only appear for Finished books?", answer: "Ratings only make sense once you've actually finished a book, so the field is hidden for books still marked To Read or Reading." }, { question: "Can I have more than one book marked as Reading?", answer: "Yes — there's no restriction, so you can track multiple books in progress at once if you read more than one at a time." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
