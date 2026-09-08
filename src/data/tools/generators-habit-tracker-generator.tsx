import GridOnIcon from '@mui/icons-material/GridOn';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/generators/habit-tracker-generator",
    navName: "Habit Tracker Generator",
    navDescription: "Build a habit-tracking grid for a custom number of days.",
    name: "Habit Tracker Generator",
    description: "Generate a habit tracker grid with your own list of habits as rows and days as columns, with checkable cells and a printable text output.",
    navCategory: "Generators",
    shellCategory: "Generators",
    icon: <GridOnIcon fontSize="large" color="primary"/>,
    seoTitle: "Habit Tracker Generator - Printable Habit Tracker Online",
    seoDescription: "Generate a habit tracker grid with your own habits and a custom number of days to track. Free online habit tracker generator.",
    keywords: ["habit tracker generator", "printable habit tracker", "habit tracking grid", "daily habit tracker", "habit checklist maker"],
    ogTitle: "Habit Tracker Generator - Printable Habit Tracker Online | ToolZoneX",
    ogDescription: "Generate a habit tracker grid with your own habits and a custom number of days to track.",
    schemaName: "Habit Tracker Generator",
    schemaDescription: "Generate a habit tracker grid with your own list of habits as rows and days as columns, with checkable cells and a printable text output.",
    applicationCategory: "UtilityApplication",
    currency: "INR",
    faqs: [{ question: "Does my progress get saved?", answer: "No — this tool uses client-side state only, with no persistence. Checked cells reset the moment you reload the page, so it's best used for printing a blank grid or building a quick reference rather than long-term tracking." }, { question: "How many habits or days can I add?", answer: "You can add as many habit rows as you like, and the day count accepts anywhere from 1 to 366 days, though very large grids may require scrolling to view comfortably." }, { question: "Can I print the grid itself instead of the text version?", answer: "The plain-text preview is designed for copying into a document to print, since it keeps the exact grid alignment in a simple format any text editor or printer can handle." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
