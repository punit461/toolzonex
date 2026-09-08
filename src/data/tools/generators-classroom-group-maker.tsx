import GroupsIcon from '@mui/icons-material/Groups';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/classroom-group-maker",
    navName: "Classroom Group Maker",
    navDescription: "Randomly split a class into fair groups.",
    name: "Classroom Group Maker",
    description: "Randomly divide a list of student names into evenly sized groups, by target number of groups or target group size, using an unbiased Fisher-Yates shuffle.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <GroupsIcon fontSize="large" color="primary"/>,
    seoTitle: "Classroom Group Maker - Random Student Group Generator",
    seoDescription: "Free classroom group maker. Randomly split a list of student names into fair, even groups by number of groups or group size.",
    keywords: ["classroom group maker", "random group generator", "student group generator", "split class into groups", "random team generator"],
    ogTitle: "Classroom Group Maker - Random Student Group Generator | ToolZoneX",
    ogDescription: "Randomly divide student names into fair, even groups in seconds.",
    schemaName: "Classroom Group Maker",
    schemaDescription: "Randomly divide a list of student names into evenly sized groups, by target number of groups or target group size, using an unbiased Fisher-Yates shuffle.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "How is the shuffle actually randomized?", answer: "The tool uses the Fisher-Yates shuffle algorithm, a well-known unbiased method that gives every possible ordering of the names an equal chance, rather than a naive sort-by-random-number approach that can skew results." }, { question: "What happens if the names don't divide evenly?", answer: "Extra students are distributed one at a time across the groups, so group sizes never differ by more than one student." }, { question: "Can I get a different split without changing my name list?", answer: "Yes — click Regenerate to reshuffle the same list of names into a brand new random grouping." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
