import GroupsIcon from '@mui/icons-material/Groups';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/group-name-generator",
    navName: "Group Name Generator",
    navDescription: "Generate team & group name ideas.",
    name: "Group Name Generator",
    description: "Generate team or group name suggestions for a sports team, work team, friend group, or study group.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <GroupsIcon fontSize="large" color="primary"/>,
    seoTitle: "Group Name Generator - Team & Group Name Ideas",
    seoDescription: "Free group name generator. Get name suggestions for a sports team, work team, friend group, or study group.",
    keywords: ["group name generator", "team name generator", "sports team name ideas", "work team name generator", "friend group name ideas"],
    ogTitle: "Group Name Generator - Team & Group Name Ideas | ToolZoneX",
    ogDescription: "Get creative name suggestions for any group or team.",
    schemaName: "Group Name Generator",
    schemaDescription: "Generate team or group name suggestions for a sports team, work team, friend group, or study group.",
    applicationCategory: "LifestyleApplication",
    currency: "INR",
    faqs: [{ question: "Can I use these names for an official league or company team?", answer: "Most names are generic enough to use freely, but for a formal league or company setting, double-check your organization's naming rules or trademark concerns first." }, { question: "How many names are in each context's list?", answer: "Each of the 4 contexts has 12 hand-written suggestions, and each click shows 3 of them at random." }, { question: "Can I switch contexts without losing my favorites?", answer: "Switching context clears the current suggestions, so make a note of any name you like before changing the selector." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
