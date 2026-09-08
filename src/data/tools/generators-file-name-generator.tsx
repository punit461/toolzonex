import ArticleIcon from '@mui/icons-material/Article';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/file-name-generator",
    navName: "File Name Generator",
    navDescription: "Generate a clean, consistent file name from a title and date.",
    name: "File Name Generator",
    description: "Generate a clean file name from a base title, optional date, separator style, case style, and an optional version number and extension.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ArticleIcon fontSize="large" color="primary"/>,
    seoTitle: "File Name Generator - Create Consistent File Names Online",
    seoDescription: "Generate a clean, consistent file name from a title, date, separator style, case style, and version number. Free online file name generator.",
    keywords: ["file name generator", "file naming convention generator", "consistent file names", "file name maker", "document naming tool"],
    ogTitle: "File Name Generator - Create Consistent File Names Online | ToolZoneX",
    ogDescription: "Generate a clean, consistent file name from a title, date, separator style, and case style.",
    schemaName: "File Name Generator",
    schemaDescription: "Generate a clean file name from a base title, optional date, separator style, case style, and an optional version number and extension.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Why does the separator option disappear for kebab-case and snake_case?", answer: "Those two case styles always use a fixed separator by definition — hyphens for kebab-case, underscores for snake_case — so the separator toggle only applies to the plain lowercase style, where you can choose either." }, { question: "Does this rename an actual file on my computer?", answer: "No — this tool only generates a suggested file name as text for you to copy and use when saving or renaming a file yourself; it doesn't touch any files directly." }, { question: "What if I don't need a version number or extension?", answer: "Both are optional — leave them blank and the generated name will simply omit that part, combining only the title and date (if chosen)." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
