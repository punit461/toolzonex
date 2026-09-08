import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/attendance-list-generator",
    navName: "Attendance List Generator",
    navDescription: "Generate a printable sign-in sheet or blank roster.",
    name: "Attendance List Generator - Printable Sign-In Sheet",
    description: "Generate a printable attendance sign-in sheet with Name, Date, and Signature columns, from a list of known names or a set number of blank rows.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <EventAvailableIcon fontSize="large" color="primary"/>,
    seoTitle: "Attendance List Generator - Printable Sign-In Sheet",
    seoDescription: "Free online attendance list generator. Create a printable sign-in sheet or blank roster template with Name, Date, and Signature columns.",
    keywords: ["attendance list generator", "sign in sheet template generator", "printable roster maker", "attendance sheet generator online", "blank attendance sheet"],
    ogTitle: "Attendance List Generator - Printable Sign-In Sheet | ToolZoneX",
    ogDescription: "Create a printable sign-in sheet or blank roster template in seconds.",
    schemaName: "Attendance List Generator",
    schemaDescription: "Generate a printable attendance sign-in sheet with Name, Date, and Signature columns, from a list of known names or a set number of blank rows.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Attendance Calculator?", answer: "The Attendance Calculator does percentage math — figuring out how many classes you can miss and still hit a required attendance percentage. This Attendance List Generator does something entirely different: it generates a blank, printable roster or sign-in sheet template for physically taking attendance at an event or class, with no percentage calculations involved." }, { question: "Can I mix pre-filled names with extra blank rows?", answer: "Not directly in one sheet, but you can generate a Known Names sheet and add a few blank lines at the end of your names list to leave room for walk-ins." }, { question: "Does the Print button format the sheet nicely on paper?", answer: "Yes — it uses your browser's print function on the table layout, which is designed to print cleanly on standard paper sizes." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
