import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import type { ToolRegistryEntry } from '../toolRegistryTypes';

const tool: ToolRegistryEntry = {
    route: "/utilities/reading-progress-calculator",
    navName: "Reading Progress Calculator",
    navDescription: "Project finish date from your current reading pace.",
    name: "Reading Progress Calculator",
    description: "Track reading progress and project a finish date from total pages, current page, and your average pages-per-day pace.",
    navCategory: "Utilities",
    shellCategory: "Utilities",
    icon: <AutoStoriesIcon fontSize="large" color="primary"/>,
    seoTitle: "Reading Progress Calculator - Book Finish Date Estimate",
    seoDescription: "Free reading progress calculator. Enter total pages, current page, and pace to estimate your book finish date.",
    keywords: ["reading progress calculator", "book finish date calculator", "when will i finish this book calculator", "reading pace calculator", "pages left to read calculator"],
    ogTitle: "Reading Progress Calculator - Book Finish Date Estimate | ToolZoneX",
    ogDescription: "Track reading progress and project a finish date from total pages, current page, and pace.",
    schemaName: "Reading Progress Calculator",
    schemaDescription: "Calculate pages remaining and days to finish by dividing remaining pages by average pages read per day, projecting a finish date from today.",
    applicationCategory: "UtilityApplication",
    currency: undefined,
    faqs: [{ question: "How is this different from the Pages Per Day Calculator?", answer: "This tool tracks your current progress and projects a finish date forward from your existing reading pace. The Pages Per Day Calculator works the opposite way — it starts from a deadline and works backward to tell you what pace you need to hit it." }, { question: "How do I know my average pages-per-day pace?", answer: "Divide the pages you've read so far by the number of days you've been reading the book, or just estimate based on a recent typical reading session." }, { question: "Does the finish date account for days I might not read?", answer: "No — it assumes you keep reading at your stated pace every day. If you expect to skip some days, either lower your average pace input or add a buffer of a few extra days to the projected finish date." }],
    extraSchemaFields: undefined,
    isHub: false,
};

export default tool;
