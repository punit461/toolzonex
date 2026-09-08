import TextFormatIcon from '@mui/icons-material/TextFormat';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/text-tools/case-converter",
    navName: "Case Converter",
    navDescription: "UPPERCASE, camelCase, snake_case & more.",
    name: "Case Converter",
    description: "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case instantly.",
    navCategory: "Text Tools",
    shellCategory: "Text Tools",
    icon: <TextFormatIcon fontSize="large" color="primary"/>,
    seoTitle: "Case Converter - UPPERCASE, camelCase, snake_case & More",
    seoDescription: "Free online case converter. Instantly convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, or kebab-case.",
    keywords: ["case converter", "text case converter", "camelcase converter", "snake case converter", "kebab case converter", "title case converter", "uppercase to lowercase converter"],
    ogTitle: "Case Converter - UPPERCASE, camelCase, snake_case & More | ToolZoneX",
    ogDescription: "Instantly convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case.",
    schemaName: "Case Converter",
    schemaDescription: "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What's the difference between camelCase and PascalCase?", answer: "camelCase starts with a lowercase letter (e.g. myVariableName), while PascalCase capitalizes every word including the first (e.g. MyVariableName). camelCase is common for variables and functions; PascalCase is common for class and component names." }, { question: "How does the converter decide where words start?", answer: "It splits your text on spaces, hyphens, and underscores to find word boundaries, then rebuilds it in the selected case style — so text already written in snake_case or kebab-case converts cleanly too." }, { question: "Does converting case change punctuation or numbers?", answer: "Numbers are preserved as-is. For snake_case, kebab-case, camelCase, and PascalCase, punctuation is dropped from word boundaries since those formats don't use punctuation; other modes leave punctuation untouched." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
