import GroupsIcon from '@mui/icons-material/Groups';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/family-member-list-generator",
    navName: "Family Member List Generator",
    navDescription: "Build a directory of family members & relationships.",
    name: "Family Member List Generator - Family Directory Maker",
    description: "Add family members with their name, relationship to you, and optional birthdate and contact info to build an organized family directory.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <GroupsIcon fontSize="large" color="primary"/>,
    seoTitle: "Family Member List Generator - Family Directory Maker",
    seoDescription: "Free family member list generator. Build a family directory with names, relationships, birthdates, and contact info.",
    keywords: ["family member list generator", "family tree list generator", "family directory maker", "family contact list", "relatives list organizer"],
    ogTitle: "Family Member List Generator - Family Directory Maker | ToolZoneX",
    ogDescription: "Build an organized family directory with names, relationships, and contact info.",
    schemaName: "Family Member List Generator",
    schemaDescription: "Add family members with their name, relationship to you, and optional birthdate and contact info to build an organized family directory.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "Do I need to fill in a birthdate or contact info for everyone?", answer: "No — both fields are optional. Only the name is required for a family member to appear in the directory; birthdate and contact info simply won't show if left blank." }, { question: "Can I organize a full extended family tree with this?", answer: "This tool builds a flat directory list rather than a visual tree diagram — it's best for listing relationships in text form (e.g. \"Aunt\", \"Second Cousin\") rather than showing generational branching visually." }, { question: "Is my family information saved anywhere?", answer: "No — everything is kept only in your browser for the current session and resets when you reload, so copy your list before closing the tab if you want to keep it." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
