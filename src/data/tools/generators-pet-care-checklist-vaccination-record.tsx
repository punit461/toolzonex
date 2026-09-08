import PetsIcon from '@mui/icons-material/Pets';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/pet-care-checklist-vaccination-record",
    navName: "Pet Care Checklist & Vaccination Record",
    navDescription: "General pet care checklist plus a vaccination history log.",
    name: "Pet Care Checklist & Vaccination Record",
    description: "Check off general pet care tasks organized by category, plus build a running vaccination record with vaccine name, date given, and next due date.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <PetsIcon fontSize="large" color="primary"/>,
    seoTitle: "Pet Care Checklist & Vaccination Record Generator",
    seoDescription: "Free pet care checklist and vaccination record. Track daily pet care tasks and build a vaccination history log.",
    keywords: ["pet care checklist", "pet vaccination record", "pet vaccine tracker", "dog vaccination log", "cat care checklist"],
    ogTitle: "Pet Care Checklist & Vaccination Record Generator | ToolZoneX",
    ogDescription: "Track pet care tasks and build a running vaccination record.",
    schemaName: "Pet Care Checklist & Vaccination Record",
    schemaDescription: "Check off general pet care tasks organized by category, plus build a running vaccination record with vaccine name, date given, and next due date.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I track vaccination records for more than one pet?", answer: "This tool tracks one record at a time — for multiple pets, copy and save each pet's record separately before starting a new one." }, { question: "Can I add care tasks that aren't in the pre-set categories?", answer: "Yes — use the \"Add Custom Care Item\" field to add anything, and it will appear in the Other section of your summary." }, { question: "Is my pet care and vaccination data saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets on reload, so copy the record before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
