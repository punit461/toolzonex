import FlipIcon from '@mui/icons-material/Flip';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/flashcard-text-generator",
    navName: "Flashcard Text Generator",
    navDescription: "Turn term/definition pairs into printable flashcard text.",
    name: "Flashcard Text Generator",
    description: "Add term and definition pairs and generate formatted, numbered Front/Back flashcard text ready to print and cut into physical cards.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <FlipIcon fontSize="large" color="primary"/>,
    seoTitle: "Flashcard Text Generator - Printable Front/Back Cards",
    seoDescription: "Free flashcard text generator. Turn term and definition pairs into printable, numbered Front/Back flashcard text.",
    keywords: ["flashcard generator", "flashcard text generator", "printable flashcard maker", "study flashcard maker", "flashcard creator online"],
    ogTitle: "Flashcard Text Generator - Printable Front/Back Cards | ToolZoneX",
    ogDescription: "Turn term and definition pairs into printable, numbered flashcard text.",
    schemaName: "Flashcard Text Generator",
    schemaDescription: "Add term and definition pairs and generate formatted, numbered Front/Back flashcard text ready to print and cut into physical cards.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Do both the term and definition need to be filled in?", answer: "Yes — a card only appears in the generated text once both its term and definition fields have content, so incomplete entries are simply skipped." }, { question: "Can I paste the output into a word processor to print physical cards?", answer: "Yes — copy the generated text into a document, then use your word processor's print or page-break settings to space out and cut each card." }, { question: "Is my flashcard set saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets on reload, so copy the text before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
