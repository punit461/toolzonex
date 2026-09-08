import ChecklistIcon from '@mui/icons-material/Checklist';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/emergency-checklist-generator",
    navName: "Emergency Checklist",
    navDescription: "Pre-populated emergency preparedness supply checklist.",
    name: "Emergency Checklist Generator - Preparedness Supply Kit List",
    description: "Check off pre-populated emergency preparedness supplies across five categories, or add custom items, to build a personalized emergency kit checklist.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ChecklistIcon fontSize="large" color="primary"/>,
    seoTitle: "Emergency Checklist Generator - Preparedness Supply Kit List",
    seoDescription: "Free emergency checklist generator. Build a personalized emergency preparedness kit list across water, first aid, documents, and more.",
    keywords: ["emergency checklist generator", "emergency preparedness checklist", "emergency kit list maker", "disaster supply checklist", "emergency supplies list"],
    ogTitle: "Emergency Checklist Generator - Preparedness Supply Kit List | ToolZoneX",
    ogDescription: "Build a personalized emergency preparedness kit checklist by category.",
    schemaName: "Emergency Checklist Generator",
    schemaDescription: "Check off pre-populated emergency preparedness supplies across five categories, or add custom items, to build a personalized emergency kit checklist.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Emergency/ID Contact Card Generator?", answer: "The Emergency/ID Contact Card Generator builds a personal identification and emergency-contact CARD meant to carry with you (your name, medical info, and emergency contacts). This Emergency Checklist is instead a PREPAREDNESS SUPPLIES list for building an actual emergency kit at home — a completely different purpose from a personal ID card." }, { question: "Can I add items that aren't in the pre-set categories?", answer: "Yes — use the \"Add Custom Item\" field to add anything specific to your household, and it will appear in the Other section of your final checklist." }, { question: "Is my checklist saved for next time?", answer: "No — the list resets when you reload the page, since it's generated fresh in your browser each visit rather than stored anywhere. Copy your finished list before closing the tab." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
