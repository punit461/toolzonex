import TerminalIcon from '@mui/icons-material/Terminal';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/developer-tools/chmod-generator",
    navName: "CHMOD Generator",
    navDescription: "Generate Unix file permission codes.",
    name: "CHMOD Generator",
    description: "Generate Unix/Linux chmod permission codes visually — numeric, symbolic, and the full command, kept in sync both ways.",
    navCategory: "Developer Tools",
    shellCategory: "Developer Tools",
    icon: <TerminalIcon fontSize="large" color="primary"/>,
    seoTitle: "CHMOD Generator - Unix File Permission Calculator",
    seoDescription: "Generate Unix/Linux chmod permission codes visually. Get the numeric value, symbolic string, and full chmod command. Free online tool.",
    keywords: ["chmod generator", "chmod calculator", "unix permissions generator", "file permissions calculator", "chmod 755"],
    ogTitle: "CHMOD Generator - Unix File Permission Calculator | ToolZoneX",
    ogDescription: "Generate Unix/Linux chmod permission codes visually — numeric, symbolic, and the full command.",
    schemaName: "CHMOD Generator",
    schemaDescription: "Generate Unix/Linux chmod permission codes visually — numeric, symbolic, and the full command, kept in sync both ways.",
    applicationCategory: "DeveloperApplication",
    currency: "INR",
    faqs: [{ question: "What do Owner, Group, and Other mean?", answer: "Every file on a Unix/Linux system has one owning user and one owning group. \"Owner\" permissions apply to that user, \"Group\" permissions apply to other members of the owning group, and \"Other\" permissions apply to everyone else on the system." }, { question: "How does each permission digit get calculated?", answer: "Read is worth 4, Write is worth 2, and Execute is worth 1. Adding up the values for the permissions you want gives the digit for that category — for example Read + Execute (4 + 1) gives 5." }, { question: "Can I type a numeric value instead of clicking checkboxes?", answer: "Yes — type any 3-digit value from 000 to 777 into the numeric field and the checkbox grid updates automatically to match it." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
