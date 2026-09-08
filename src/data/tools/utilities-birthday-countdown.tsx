import CakeIcon from '@mui/icons-material/Cake';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/birthday-countdown",
    navName: "Birthday Countdown",
    navDescription: "Live countdown to your next birthday.",
    name: "Birthday Countdown - Days Until My Birthday",
    description: "Enter your birthday and see a live countdown to your next birthday. Shows days, hours, minutes, and seconds remaining, plus the day of the week and age on next birthday.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <CakeIcon fontSize="large" color="primary"/>,
    seoTitle: "Birthday Countdown - Days Until My Birthday",
    seoDescription: "Free online birthday countdown timer. Enter your birthday to see a live countdown in days, hours, minutes, and seconds. Shows the day of the week and your next age.",
    keywords: ["birthday countdown", "days until my birthday", "birthday timer", "birthday calculator", "countdown to birthday", "birthday date calculator"],
    ogTitle: "Birthday Countdown - Days Until My Birthday | ToolZoneX",
    ogDescription: "Live countdown to your next birthday with days, hours, minutes, and seconds. Free online birthday timer.",
    schemaName: "Birthday Countdown",
    schemaDescription: "Live countdown timer to your next birthday with days, hours, minutes, and seconds.",
    applicationCategory: "UtilitiesApplication",
    currency: undefined,
    faqs: undefined,
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
