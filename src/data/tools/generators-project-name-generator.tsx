import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/project-name-generator",
    navName: "Project Name Generator",
    navDescription: "Generate creative internal project codenames.",
    name: "Project Name Generator",
    description: "Generate creative codename-style project name suggestions combining mythological names, color-animal pairs, or Greek letters with a prefix like Project or Operation.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <AutoAwesomeIcon fontSize="large" color="primary"/>,
    seoTitle: "Project Name Generator - Creative Codename Ideas",
    seoDescription: "Free project name generator. Get creative internal codename suggestions combining mythological names, color-animal pairs, and Greek letters.",
    keywords: ["project name generator", "codename generator", "project codename ideas", "internal project name generator", "operation name generator"],
    ogTitle: "Project Name Generator - Creative Codename Ideas | ToolZoneX",
    ogDescription: "Get creative internal project codename suggestions in one click.",
    schemaName: "Project Name Generator",
    schemaDescription: "Generate creative codename-style project name suggestions combining mythological names, color-animal pairs, or Greek letters with a prefix like Project or Operation.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Can I get the same name twice?", answer: "Each batch of 5 avoids exact duplicates within that batch, but regenerating can still resurface a name you saw before, since the underlying word lists are limited." }, { question: "Should I use these as public product names?", answer: "These are meant as internal codenames or working titles. Before using one publicly, check it doesn't conflict with an existing trademark or product name." }, { question: "How many name styles does it cover?", answer: "Three: a single mythological name, a color-plus-animal combination, and a Greek letter — each paired with a random prefix like \"Project\" or \"Operation\"." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
