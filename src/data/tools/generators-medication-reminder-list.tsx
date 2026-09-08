import MedicationIcon from '@mui/icons-material/Medication';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/medication-reminder-list",
    navName: "Medication Reminder List",
    navDescription: "Organize medications with dosage, timing & notes.",
    name: "Medication Reminder List - Dosage & Schedule Reference",
    description: "Add medications with name, dosage, frequency, and optional notes to build an organized reference list for tracking what to take and when.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <MedicationIcon fontSize="large" color="primary"/>,
    seoTitle: "Medication Reminder List - Dosage & Schedule Reference",
    seoDescription: "Free medication reminder list generator. Organize medications with dosage, frequency, and notes into a clean reference list.",
    keywords: ["medication reminder list", "medication list generator", "medication schedule organizer", "dosage tracker list", "pill schedule list"],
    ogTitle: "Medication Reminder List - Dosage & Schedule Reference | ToolZoneX",
    ogDescription: "Organize medications with dosage, frequency, and notes into a clean list.",
    schemaName: "Medication Reminder List",
    schemaDescription: "Add medications with name, dosage, frequency, and optional notes to build an organized reference list for tracking what to take and when.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Does this tool actually send reminders or alerts?", answer: "No — this is a reference list generator only. It has no backend and cannot send notifications, texts, or alarms. Once you've built your list, set actual phone alarms or calendar reminders based on the times and frequencies you've entered here." }, { question: "Is my medication information saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets when you reload the page, so copy your list before closing the tab if you want to keep it." }, { question: "Can I use this for someone else's medications, like a parent or child?", answer: "Yes — the tool doesn't require any personal identifying information beyond what you choose to type into the notes, so it works equally well for tracking a dependent's or family member's medications." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
