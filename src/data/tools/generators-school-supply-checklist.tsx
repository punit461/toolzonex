import SchoolIcon from '@mui/icons-material/School';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/school-supply-checklist",
    navName: "School Supply Checklist",
    navDescription: "Supply lists by grade band: Elementary, Middle, High, College.",
    name: "School Supply Checklist",
    description: "Build a school supply checklist by checking common items organized by grade band — Elementary, Middle School, High School, and College — plus your own custom items.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <SchoolIcon fontSize="large" color="primary"/>,
    seoTitle: "School Supply Checklist - Back-to-School Shopping List",
    seoDescription: "Free school supply checklist. Build a back-to-school shopping list organized by Elementary, Middle School, High School, and College.",
    keywords: ["school supply checklist", "back to school shopping list", "school supply list generator", "college supply list", "school supplies by grade"],
    ogTitle: "School Supply Checklist - Back-to-School Shopping List | ToolZoneX",
    ogDescription: "Build a back-to-school supply checklist organized by grade band.",
    schemaName: "School Supply Checklist",
    schemaDescription: "Build a school supply checklist by checking common items organized by grade band — Elementary, Middle School, High School, and College — plus your own custom items.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I add supplies specific to my school's list?", answer: "Yes — use the \"Add Custom Item\" field to add anything, and it will appear in the Other section of your final checklist." }, { question: "Is my checklist saved for next time?", answer: "No — the list resets when you reload the page, since it's generated fresh in your browser each visit rather than stored anywhere." }, { question: "Can I check items from more than one grade band?", answer: "Yes — all categories are shown together, so you can check items across multiple grade bands if you're shopping for more than one student." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
