import ChecklistIcon from '@mui/icons-material/Checklist';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/document-checklist-generator",
    navName: "Document Checklist Generator",
    navDescription: "Vehicle & travel document checklists with custom items.",
    name: "Document Checklist Generator",
    description: "Check off Vehicle documents (registration, insurance, license, inspection) or Travel documents (passport, visa, tickets, hotel confirmations) with a custom item option.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ChecklistIcon fontSize="large" color="primary"/>,
    seoTitle: "Document Checklist Generator - Vehicle & Travel Documents",
    seoDescription: "Free document checklist generator for vehicle and travel documents. Check off registration, insurance, passport, visa, tickets, and more.",
    keywords: ["document checklist generator", "vehicle document checklist", "travel document checklist", "trip document checklist", "car document checklist"],
    ogTitle: "Document Checklist Generator - Vehicle & Travel Documents | ToolZoneX",
    ogDescription: "Check off Vehicle or Travel documents and build a ready-to-copy checklist.",
    schemaName: "Document Checklist Generator",
    schemaDescription: "Check off Vehicle documents (registration, insurance, license, inspection) or Travel documents (passport, visa, tickets, hotel confirmations) with a custom item option.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Do Vehicle and Travel checklists share the same checked items?", answer: "No — each context keeps its own checked state and custom items, so switching between Vehicle and Travel doesn't mix up your progress on either." }, { question: "Can I add documents that aren't on the default list?", answer: "Yes — use the \"Add Custom Item\" field, and it appears as a checkbox under the current context's document list." }, { question: "Is my checklist saved anywhere?", answer: "No — the checklist resets when you reload the page, since it's generated fresh in your browser each visit rather than stored anywhere." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
