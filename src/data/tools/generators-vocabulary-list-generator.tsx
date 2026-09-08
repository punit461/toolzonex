import MenuBookIcon from '@mui/icons-material/MenuBook';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/vocabulary-list-generator",
    navName: "Vocabulary List Generator",
    navDescription: "Build an alphabetized vocabulary study list with definitions.",
    name: "Vocabulary List Generator",
    description: "Add vocabulary words with definitions and optional example sentences, and get an alphabetized, organized study list ready to copy.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <MenuBookIcon fontSize="large" color="primary"/>,
    seoTitle: "Vocabulary List Generator - Alphabetized Study List Maker",
    seoDescription: "Free vocabulary list generator. Add words, definitions, and example sentences and get an alphabetized study list ready to copy.",
    keywords: ["vocabulary list generator", "vocabulary study list maker", "spelling word list generator", "vocabulary worksheet generator", "word list organizer"],
    ogTitle: "Vocabulary List Generator - Alphabetized Study List Maker | ToolZoneX",
    ogDescription: "Add vocabulary words with definitions and get an alphabetized study list ready to copy.",
    schemaName: "Vocabulary List Generator",
    schemaDescription: "Add vocabulary words with definitions and optional example sentences, and get an alphabetized, organized study list ready to copy.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Is the example sentence required?", answer: "No — the example sentence field is optional; words without one still appear in the list with just their definition." }, { question: "Does the list re-sort automatically as I edit words?", answer: "Yes — the alphabetized list updates instantly whenever you add, edit, or remove a word." }, { question: "Is my vocabulary list saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets on reload, so copy the list before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
