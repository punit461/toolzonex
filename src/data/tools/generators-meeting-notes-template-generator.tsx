import DescriptionIcon from '@mui/icons-material/Description';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/meeting-notes-template-generator",
    navName: "Meeting Notes Template Generator",
    navDescription: "Build structured meeting notes with agenda and action items.",
    name: "Meeting Notes Template Generator",
    description: "Create structured meeting notes with a title, date, attendees, agenda items, action items with assignees, and a notes section, then copy or print it.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <DescriptionIcon fontSize="large" color="primary"/>,
    seoTitle: "Meeting Notes Template Generator - Printable Meeting Notes Online",
    seoDescription: "Create structured meeting notes with agenda items, action items, and assignees. Free online meeting notes template generator.",
    keywords: ["meeting notes template generator", "meeting notes maker", "meeting agenda template", "action items tracker", "meeting minutes generator"],
    ogTitle: "Meeting Notes Template Generator - Printable Meeting Notes Online | ToolZoneX",
    ogDescription: "Create structured meeting notes with agenda items, action items, and assignees.",
    schemaName: "Meeting Notes Template Generator",
    schemaDescription: "Create structured meeting notes with a title, date, attendees, agenda items, action items with assignees, and a notes section, then copy or print it.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Are my meeting notes saved?", answer: "No — everything is kept only in your browser's memory for the current visit. Copy the text version before closing or reloading the page if you want to keep it." }, { question: "Can I add more than one assignee to an action item?", answer: "Each action item has one assignee field, but you can list multiple names in it (e.g. \"Priya, Sam\") if a task is shared between people." }, { question: "What happens to empty agenda or action item rows?", answer: "Blank rows are automatically skipped in the printable preview, so you can add extra empty rows while typing without cluttering the final output." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
