import CakeIcon from '@mui/icons-material/Cake';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/birthday-reminder-list-generator",
    navName: "Birthday Reminder List Generator",
    navDescription: "Sort a list of birthdays by days until they next occur.",
    name: "Birthday Reminder List Generator",
    description: "Build a list of people and birthdates, sorted by days until each person's next upcoming birthday.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <CakeIcon fontSize="large" color="primary"/>,
    seoTitle: "Birthday Reminder List Generator - Sorted Birthday List Online",
    seoDescription: "Build a list of birthdays sorted by how soon they occur, computed from today's date. Free online birthday list generator.",
    keywords: ["birthday reminder list generator", "birthday list maker", "upcoming birthdays list", "birthday tracker", "birthday calendar generator"],
    ogTitle: "Birthday Reminder List Generator - Sorted Birthday List Online | ToolZoneX",
    ogDescription: "Build a list of birthdays sorted by how soon they occur, computed from today's date.",
    schemaName: "Birthday Reminder List Generator",
    schemaDescription: "Build a list of people and birthdates, sorted by days until each person's next upcoming birthday.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Will this notify me when a birthday arrives?", answer: "No — this is a static, sorted reference list, not a reminder or notification system. It has no backend and can't send alerts; you'll need to check back on the page yourself or use a calendar app for actual notifications." }, { question: "Is my list saved between visits?", answer: "No — the list only exists in your browser's memory for the current visit and is cleared on reload, so re-enter it or keep a separate copy if you'll need it again later." }, { question: "What happens on someone's actual birthday?", answer: "If today is exactly their birthday, the days-until value shows \"Today!\" instead of a day count." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
