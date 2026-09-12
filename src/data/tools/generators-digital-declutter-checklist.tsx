import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/digital-declutter-checklist",
    navName: "Digital Declutter Checklist",
    navDescription: "Clean up email, apps, files, photos & accounts.",
    name: "Digital Declutter Checklist",
    description: "Check off pre-populated digital cleanup tasks organized by Email, Apps, Files, Photos, and Accounts, with a custom item option.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CleaningServicesIcon fontSize="large" color="primary"/>,
    seoTitle: "Digital Declutter Checklist - Clean Up Email, Apps & Files",
    seoDescription: "Free digital declutter checklist. Check off cleanup tasks for email, apps, files, photos, and accounts to tidy up your digital life.",
    keywords: ["digital declutter checklist", "digital cleanup checklist", "email declutter tips", "app declutter checklist", "digital minimalism checklist"],
    ogTitle: "Digital Declutter Checklist - Clean Up Email, Apps & Files | ToolZoneX",
    ogDescription: "Check off digital cleanup tasks organized by email, apps, files, photos, and accounts.",
    schemaName: "Digital Declutter Checklist",
    schemaDescription: "Check off pre-populated digital cleanup tasks organized by Email, Apps, Files, Photos, and Accounts, with a custom item option.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does this tool actually delete anything on my devices?", answer: "No — this is a checklist to guide your own cleanup; it doesn't connect to your email, apps, or files. You check off tasks here as a reminder while you do the actual cleanup yourself." }, { question: "Can I add cleanup tasks specific to my own devices or accounts?", answer: "Yes — use the \"Add Custom Task\" field to add anything, and it will appear in the Other section of your final checklist." }, { question: "Is my checklist saved for next time?", answer: "No — the list resets when you reload the page, since it's generated fresh in your browser each visit rather than stored anywhere." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
