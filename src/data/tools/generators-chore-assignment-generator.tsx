import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/chore-assignment-generator",
    navName: "Chore Assignment Generator",
    navDescription: "Randomly assign household chores to members.",
    name: "Chore Assignment Generator",
    description: "Randomly assign a list of chores to household members as evenly as possible, with a Regenerate button for a fresh weekly rotation.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <HomeRepairServiceIcon fontSize="large" color="primary"/>,
    seoTitle: "Chore Assignment Generator - Random Chore Rotation Tool",
    seoDescription: "Free chore assignment generator. Randomly assign household chores to family members or roommates as evenly as possible each week.",
    keywords: ["chore assignment generator", "chore chart generator", "random chore rotation", "household chore assigner", "chore wheel generator"],
    ogTitle: "Chore Assignment Generator - Random Chore Rotation Tool | ToolZoneX",
    ogDescription: "Randomly assign household chores to members as evenly as possible.",
    schemaName: "Chore Assignment Generator",
    schemaDescription: "Randomly assign a list of chores to household members as evenly as possible, with a Regenerate button for a fresh weekly rotation.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "What happens if there are more chores than people?", answer: "The extra chores are distributed round-robin, so some members simply end up with two or more chores that week instead of one." }, { question: "What if there are more people than chores?", answer: "Some members will be assigned no chores that week — the tool shows this clearly rather than forcing an assignment where none is needed." }, { question: "Can I get a new rotation without retyping my lists?", answer: "Yes — click Regenerate to reshuffle the same members and chores into a new random assignment, ready for the next rotation." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
