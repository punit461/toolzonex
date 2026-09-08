import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/random-line-picker",
    navName: "Random Line Picker",
    navDescription: "Pick a random winner from a list.",
    name: "Random Line Picker - Choose a Random Winner",
    description: "Fairly pick a random name, winner, or item from a list. Free online random line picker.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <ChangeHistoryIcon fontSize="large" color="primary"/>,
    seoTitle: "Random Line Picker - Pick a Random Winner from List",
    seoDescription: "Fairly pick a random name, winner, or item from a list. Free online random line picker.",
    keywords: ["random line picker", "random winner generator", "pick name from list", "randomizer wheel alternative"],
    ogTitle: "Random Line Picker - Pick a Random Winner from List | ToolZoneX",
    ogDescription: "Fairly pick a random name, winner, or item from a list. Free online random line picker.",
    schemaName: "Random Line Picker",
    schemaDescription: "Fairly pick a random name, winner, or item from a list.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
