import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/office-supply-checklist",
    navName: "Office Supply Checklist",
    navDescription: "Workspace setup checklist: desk, tech, organization & comfort.",
    name: "Office Supply Checklist",
    description: "Build an office supply checklist by checking common workspace items organized by category — Desk Essentials, Tech, Organization, and Comfort — plus your own custom items.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <BusinessCenterIcon fontSize="large" color="primary"/>,
    seoTitle: "Office Supply Checklist - Workspace Setup List",
    seoDescription: "Free office supply checklist. Build a workspace setup list organized by Desk Essentials, Tech, Organization, and Comfort.",
    keywords: ["office supply checklist", "office setup checklist", "workspace supply list", "home office checklist", "desk setup checklist"],
    ogTitle: "Office Supply Checklist - Workspace Setup List | ToolZoneX",
    ogDescription: "Build an office or workspace supply checklist organized by category.",
    schemaName: "Office Supply Checklist",
    schemaDescription: "Build an office supply checklist by checking common workspace items organized by category — Desk Essentials, Tech, Organization, and Comfort — plus your own custom items.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Can I add supplies specific to my job?", answer: "Yes — use the \"Add Custom Item\" field to add anything, and it will appear in the Other section of your final checklist." }, { question: "Is my checklist saved for next time?", answer: "No — the list resets when you reload the page, since it's generated fresh in your browser each visit rather than stored anywhere." }, { question: "Can I use this for a shared office space rather than a home office?", answer: "Yes — the categories cover general workspace setup and apply equally well to a home office, a shared office desk, or a new hire's workstation." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
