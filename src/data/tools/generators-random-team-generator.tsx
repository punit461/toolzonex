import GroupIcon from '@mui/icons-material/Group';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-team-generator",
    navName: "Random Team Generator",
    navDescription: "Split names into random teams.",
    name: "Random Team Generator",
    description: "Shuffle a list of names into evenly balanced random teams. Free online random team generator.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <GroupIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Team Generator - Shuffle Names Into Teams Online",
    seoDescription: "Free online random team generator. Paste names, pick the team count, and instantly split everyone into balanced, randomly shuffled teams.",
    keywords: ["random team generator", "team generator", "random groups", "shuffle into teams", "team splitter"],
    ogTitle: "Random Team Generator - Shuffle Names Into Teams Online | ToolZoneX",
    ogDescription: "Shuffle a list of names into evenly balanced random teams.",
    schemaName: "Random Team Generator",
    schemaDescription: "Shuffle a list of names into evenly balanced random teams.",
    applicationCategory: "GameApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
