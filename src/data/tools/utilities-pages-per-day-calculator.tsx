import ScheduleIcon from '@mui/icons-material/Schedule';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/pages-per-day-calculator",
    navName: "Pages Per Day Calculator",
    navDescription: "Reading pace needed to hit a deadline.",
    name: "Pages Per Day Calculator",
    description: "Calculate the pages-per-day reading pace needed to finish a book by a target date, from pages remaining and days left.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <ScheduleIcon fontSize="large" color="primary"/>,
    seoTitle: "Pages Per Day Calculator - Reading Pace for a Deadline",
    seoDescription: "Free pages per day calculator. Enter pages remaining and days left to calculate the daily reading pace needed to finish on time.",
    keywords: ["pages per day calculator", "reading pace calculator for deadline", "how many pages to read per day calculator", "book deadline calculator", "reading goal calculator"],
    ogTitle: "Pages Per Day Calculator - Reading Pace for a Deadline | ToolZoneX",
    ogDescription: "Calculate the pages-per-day reading pace needed to finish a book by a target date.",
    schemaName: "Pages Per Day Calculator",
    schemaDescription: "Calculate pages per day needed as pages remaining divided by days remaining until a target finish date.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Reading Progress Calculator?", answer: "The Reading Progress Calculator projects a finish date forward from your current, already-established reading pace. This tool works the opposite direction — it starts from a deadline and works backward to tell you the pace you need to hit it." }, { question: "What if the required pace seems unrealistic?", answer: "If the pages-per-day figure is much higher than you can comfortably manage, consider whether the deadline is flexible, or plan to read in longer sessions on days when you have more free time to average out to the required pace." }, { question: "Should I count the last day as a full reading day?", answer: "That's up to you — if your deadline is the morning of a certain date, you may want to subtract a day from your remaining days to be safe, rather than assuming you get a full extra day right up to the deadline." }],
    extraSchemaFields: undefined,
    isHub: false,
    noindex: true,
};

export default tool;
