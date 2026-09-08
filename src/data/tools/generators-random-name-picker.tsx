import FilterTiltShiftIcon from '@mui/icons-material/FilterTiltShift';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-name-picker",
    navName: "Random Name Picker",
    navDescription: "Pick random names from a list.",
    name: "Random Name Picker",
    description: "Randomly pick one or more names from a list without replacement. Free online random name picker.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <FilterTiltShiftIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Name Picker - Pick Random Winners from a List",
    seoDescription: "Free online random name picker. Randomly select one or more names from a list without replacement. Track pick history.",
    keywords: ["random name picker", "pick random name", "name generator", "random winner", "draw names"],
    ogTitle: "Random Name Picker - Pick Random Winners | ToolZoneX",
    ogDescription: "Randomly select names from a list without replacement.",
    schemaName: "Random Name Picker",
    schemaDescription: "Pick random names from a list.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
